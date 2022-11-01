import { RemovalPolicy } from "aws-cdk-lib";
import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";

export class MyBuckets extends cdk.Construct {
    myS3 : s3.Bucket;
    constructor(scope : cdk.Construct, id : string, props : s3.BucketProps) {
        super(scope, id);

        this.myS3 = new s3.Bucket(this, "MyS3Bucket", {
            bucketName : props.bucketName,
            removalPolicy : RemovalPolicy.DESTROY
        });
    }
}