import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CdkGithubActionsSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // example resource
    new sqs.Queue(this, 'CdkGithubActionsSampleQueue', {
      visibilityTimeout: cdk.Duration.seconds(240),
    });

    new lambda.LayerVersion(this, 'LambdaLayer', {
      code: lambda.Code.fromAsset(path.join(__dirname, '../runtime/layer.zip'))
    });

    new cdk.CfnOutput(this, 'ParameterInDeploymentAccount', {
      value: ssm.StringParameter.valueFromLookup(this, 'cdk-github-action-role-arn')
    });

    new cdk.CfnOutput(this, 'ParameterInTargetAccount', {
      value: ssm.StringParameter.fromStringParameterName(this, 'EnvironmentNameParameter', 'environment-name').stringValue,
    });
  }
}
