import * as cdk from "@aws-cdk/core";
import { DownloaderLambda } from "../constructs/DownloaderLambda";
import { MyBuckets } from "../constructs/myBuckets";
import { MyDynamoDB } from "../constructs/MyDynamoDB";
import { UploaderLambda } from "../constructs/UploaderLambda";
import * as s3 from '@aws-cdk/aws-s3';
import * as s3n from "@aws-cdk/aws-s3-notifications";
import * as dynamoDB from "@aws-cdk/aws-dynamodb";

export class S3ToDynamoDB extends cdk.Stack{

    myTransactionsTable : MyDynamoDB;
    downloaderLambda : DownloaderLambda;
    myBucket : MyBuckets;
    uploaderLambda : UploaderLambda;

    constructor(scope : cdk.Construct, id : string, props : any) {
        super(scope, id);

        this.myBucket = new MyBuckets(this, "TransactionsBucket", {
            bucketName : props.bucketName
        });

        this.uploaderLambda = new UploaderLambda(this, "UploaderLambda", {
            environment : {
                "bucketName" : this.myBucket.myS3.bucketName
            },
            functionName : "uploader-lambda",
            description : "Lambda to upload file to s3"
        });

        this.myBucket.myS3.grantWrite(this.uploaderLambda.uploader);
        
        // const s3PutEventSource = new lambdaEventSources.S3EventSource(myBucket, {
        //     events: [
        //       s3.EventType.OBJECT_CREATED_PUT
        //     ]
        //   });
        this.myTransactionsTable = new MyDynamoDB(this, "TranasctionsTable", {
            tableName : "TransactionsTable",
            partitionKey : {
                name : "transactionId",
                type : dynamoDB.AttributeType.STRING
            }
        });
        this.downloaderLambda = new DownloaderLambda(this, "DownloaderLambda", {
            environment : {
                "bucketName" : this.myBucket.myS3.bucketName,
                "tableName" : this.myTransactionsTable.transactionsTable.tableName
            },
            functionName : "downloader-lambda",
            description : "Lambda to download file from s3 and upload to dynamoDB table"
        });
        
        // const s3PutEventSource = new lambdaEventSources.S3EventSource(props.bucket, {
        //     events: [
        //       s3.EventType.OBJECT_CREATED_PUT
        //     ]
        //   });
        this.myBucket.myS3.grantRead(this.downloaderLambda.downloader);
        this.myTransactionsTable.transactionsTable.grantReadWriteData(this.downloaderLambda.downloader);
        this.myBucket.myS3.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(this.downloaderLambda.downloader));


    }
}