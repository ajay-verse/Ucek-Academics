import googleIt from "google-it"
import metaData from "../models/metaData.js"
import searchQuery from "../models/searchQueries.js"
import student from "../models/student.js"
import sw from "stopword"
import { bigram, trigram, nGram } from "n-gram"

let library = new Map([
    ["computer networks", 0],
    ["computer engineering", 0],
    ["computer programming", 0],
    ["programming languages", 0],
    ["machine learning", 0],
    ["machine learning in python", 0],
    ["web sockets and network", 0],
    ["web programming", 0],
    ["socket programming", 0],
    ["blockchain programming with python", 0],
    ["blockchain programming with seleriam", 0],
    ["deep Learning with neural networks", 0],
    ["deep learning with tensorflow", 0],
    ["deep learning with keras", 0],
    ["deep learning with tensorflow and keras", 0],
    ["deep learning with pytorch", 0],
    ["deep learning with pytorch and keras", 0],
    ["algorithms", 0],
    ["competative programming", 0],
    ["dynamic programming", 0],
    ["dynamic programming in machine learning", 0],
    ["supervised learning", 0],
    ["unsupervised learning", 0],
    ["semisupervised learning", 0],
    ["machine learning in node", 0],
    ["bigdata and machine learning", 0],
    ["bigdata and analytics", 0],
    ["cyber security with python", 0],
    ["cyber security with machine learning", 0],
    ["cryptography with blockchain", 0]
])

let selected = {}

let positive_words = new Set(['more', 'like', 'need', 'popular', 'trending', 'creative', 'useful', 'important', 'most', 'good', 'super'])
let negative_words = new Set(['less', 'deprecated', 'static', 'bad', 'unimportant', 'useless', 'needless', 'old', 'boring'])

let negation_words = new Set(['not', 'do not', 'don\'t', 'dont', 'did not', 'didn\'t', 'didnt'])

function getSimilarity(a, b) {
    let union = []
    let set_ = new Set(a)
    for (let i of b) {
        if (set_.has(i)) {
            union.push(i)
        }
    }
    return (union.length + 1) / (Math.min(a.length, b.length) + 1)
}

function processQuery({ query }) {
    let main_words = sw.removeStopwords(query.split(" "))
    let ngrams = {
        monogram_tuples: main_words,
        bigram_tuples: bigram(main_words),
        trigram_tuples: trigram(main_words),
        quardgram_tuples: nGram(4)(main_words),
        pentagram_tuples: nGram(5)(main_words)
    }
    let negation = 0, positive = 0, negative = 0
    for (const word in main_words) {
        if (positive_words.has(word)) {
            positive++
        }
        if (negative_words.has(word)) {
            negative++
        }
        if (negation_words.has(word)) {
            negation = 1 - negation
        }
    }
    let increment = ((positive - negative) / (positive + negative)) * (negative ? -1 : 1)
    selected = {}
    for (let [key, values] of Object.entries(ngrams)) {
        let argmax = [], max_ = 0
        for (let [k, v] of library.entries()) {
            let val = getSimilarity(k.split(" "), values)
            if (val >= max_) {
                max_ = val
                argmax = k
            }
        }
        library.set(argmax, library.get(argmax) + (increment || 0.1))
        selected[key] = argmax
    }
}

export default function NewsFeedController() {
    return {
        searchNews: async function ({ roll, query, limit, save }) {
            try {
                if (save) {
                    const new_query = new searchQuery({
                        query: query
                    })
                    await new_query.save()
                    await student.updateOne({ roll: roll }, {
                        $inc: {
                            "queries.total": 1,
                            "queries.monthly": 1
                        }
                    })
                    console.log(selected)
                    await metaData.updateOne({ key: 'total_queries_count' }, { $inc: { value: 1 } })
                    processQuery({ query: query })
                    return await googleIt({ query: query, limit: limit || 10 })
                }
                console.log(selected)
                let result = {}
                for (const [k, v] of Object.entries(selected)) {
                    const query = 'about ' + v
                    const current_result = await googleIt({ query: query, limit: limit || 10 })
                    result[k] = current_result
                }
                console.log(result)
                return result
            } catch (e) {
                return { ...e, errno: 404 }
            }
        },
        test: async function (body) {
            return processQuery(body)
        }
    }
}
