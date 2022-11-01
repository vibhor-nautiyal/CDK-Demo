import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
export class UploaderLambda extends cdk.Construct {
    uploader : lambda.Function;
    constructor(scope : cdk.Construct, id : string, props : lambda.FunctionOptions) {
        super(scope, id);

        this.uploader = new lambda.Function(this, "S3UploaderMethod", {
            runtime : lambda.Runtime.NODEJS_16_X,
            code : lambda.Code.fromAsset('./lambdas'),
            handler : 'uploader.handler',
            ...props
        });
    }
}