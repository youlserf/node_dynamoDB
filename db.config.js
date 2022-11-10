//import AWS from 'aws-sdk'

const AWS = require('aws-sdk');



AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
})

const db = new AWS.DynamoDB.DocumentClient()

const Table = 'contactos'

module.exports = {
    db,
    Table
};
/* export {
    db,
    Table
} */