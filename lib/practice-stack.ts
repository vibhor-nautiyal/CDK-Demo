import * as cdk from '@aws-cdk/core';
import { S3ToDynamoDB } from '../stacks/S3ToDynamoDB';

export class PracticeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'PracticeQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const myProps = {
      bucketName : "my-s3-assets",
    }
    new S3ToDynamoDB(this, "S3ToDyanmoDB", myProps);
  }
}
