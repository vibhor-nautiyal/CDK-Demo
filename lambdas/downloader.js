const AWS = require("aws-sdk");
/*
This lambda downloads a payload into an s3 bucket
*/

exports.handler = async function(event, context){

    console.log(event);
    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    }; 
    console.log(params);
    const s3 = new AWS.S3();
    const ddb = new AWS.DynamoDB();
    try {
        const payload = await s3.getObject(params).promise();
        console.log(payload);
        const responseString = payload.Body.toString("utf-8");
        const response = (JSON.parse(responseString));
        const ddbParams = {
            "transactionId" : {
                "S" : response["transactionId"]
            },
            "transactionType" : {
                "S" : response["transactionType"]
            },
            "amount" : {
                "N" : response["amount"]
            },
        };
        const ddbInput = {
            TableName : process.env["tableName"],
            Item : ddbParams
        };
        const ddbResponse = await ddb.putItem(ddbInput).promise();
        console.log("Done");
        console.log(ddbResponse);
        }
        // console.log('PAYLOAD:', payload.Body.toString("utf-8"));
        catch (err) {
        console.log(err);
        throw new Error("err");
    }
}