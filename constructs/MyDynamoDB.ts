import * as cdk from "@aws-cdk/core";
import * as dynamoDB from "@aws-cdk/aws-dynamodb";

export class MyDynamoDB extends cdk.Construct {
    
    transactionsTable: dynamoDB.Table;
    
    constructor(scope : cdk.Construct, id : string, props : dynamoDB.TableProps){
        super(scope, id);

        this.transactionsTable = new dynamoDB.Table(this, "TransactionsTable", {
            ...props
        });
    }
}