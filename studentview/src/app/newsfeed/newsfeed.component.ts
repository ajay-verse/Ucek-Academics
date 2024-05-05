import { Component } from '@angular/core';
import { BackendService } from '../services/backend/backend.service';

@Component({
	selector: 'app-newsfeed',
	templateUrl: './newsfeed.component.html',
	styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent {
	constructor(private bk: BackendService) { }

	loading: boolean = true
	class_name: String = ''
	changeClass() {
		if (this.class_name == '') {
			this.class_name = 'toggle-sidebar'
		} else {
			this.class_name = ''
		}
	}

	ngOnInit(): void {
		this.getDefaultResult()
	}

	search: string = ''
	feeds: any = []

	getDefaultResult() {
		this.feeds = []
		this.bk.get('/newsfeed/current', {}).subscribe(result => {
			console.log(result)
			for (let feed of ['monogram_tuples', 'bigram_tuples', 'trigram_tuples', 'quardgram_tuples', 'pentagram_tuples']) {
				for (let f of result.feeds[feed]) {
					f.snippet = f.snippet.split(". ,").join("\n")
					this.feeds.push(f)
				}
			}
			this.loading = false
		})
	}

	getSearchResults() {
		console.log(this.search)
		this.bk.post('/newsfeed/search', { roll: localStorage.getItem('roll'), query: this.search }).subscribe(result => {
			for (let feed of result.feeds) {
				feed.snippet = feed.snippet.split(". ,").join("\n")
			}
			this.feeds = result.feeds
		})
	}
}
