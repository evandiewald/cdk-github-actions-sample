import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CdkGithubActionsSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // example resource
    const queue = new sqs.Queue(this, 'CdkGithubActionsSampleQueue', {
      visibilityTimeout: cdk.Duration.seconds(240)
    });

    const lambdaLayer = new lambda.LayerVersion(this, 'LambdaLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../runtime/layer.zip'))
    });
  }
}
