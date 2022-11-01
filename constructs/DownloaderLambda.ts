import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";

export class DownloaderLambda extends cdk.Construct {
    downloader : lambda.Function;
    constructor(scope : cdk.Construct, id : string, props : lambda.FunctionOptions) {
        super(scope, id);

        this.downloader = new lambda.Function(this, "S3DownloaderMethod", {
            runtime : lambda.Runtime.NODEJS_16_X,
            code : lambda.Code.fromAsset("./lambdas"),
            handler : "downloader.handler",
            ...props,
        });
    }
}