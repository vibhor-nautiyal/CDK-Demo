const AWS = require("aws-sdk");
/*
This lambda uploads a payload into an s3 bucket
*/

exports.handler = async function(event, context){

    const transactionType = event["type"];

    const amount = event["amount"];

    const transactionId = context.awsRequestId;

    const payload = {
        transactionId : transactionId,
        transactionType : transactionType,
        amount : amount
    };

    const s3 = new AWS.S3();
    const bucketName = process.env["bucketName"]
    const key = transactionId;

    const uploadParams = {
        Body : JSON.stringify(payload),
        Bucket : bucketName,
        Key : key
    };
    
    console.log(uploadParams);
    try{

        s3.putObject(uploadParams, (err,data)=>{
            if(err) {
                console.log(err);
            }
            else {
                console.log(data);
                console.log("Done");
            }
        })
    } catch(e) {
        console.log("upload Error", e)
    }
    
}