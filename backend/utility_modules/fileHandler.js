import dotenv from "dotenv"
import S3 from "aws-sdk/clients/s3.js"
dotenv.config()

export default async function s3Uploadv2(files, keys) {
    const s3 = new S3({
        // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    })
    const params = files.map((file, index) => {
        const ext = file.originalname.split('.').pop()
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: 'upload/' + keys[index] + '.' + ext,
            Body: file.buffer,
        }
    })
    const results = await Promise.all(params.map(param => s3.upload(param).promise()))
    return results
}


// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
// export default async function s3Uploadv2(files, keys) {
//     console.log('upload', 1)
//     const s3Client = new S3Client({
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     })
//     console.log('upload', 2)
//     const params = files.map((file, index) => {
//         const ext = file.originalname.split('.').pop()
//         return {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: 'upload/' + keys[index] + '.' + ext,
//             Body: file.buffer,
//             Region: process.env.AWS_REGION
//         }
//     })
//     console.log('upload', 3)
//     return s3Client.send(new PutObjectCommand(params[0]))
// }