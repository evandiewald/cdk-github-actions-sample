import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { GitHubWorkflow, AwsCredentials } from 'cdk-pipelines-github';
import { ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from 'constructs';

export class PipelineStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const githubActionRoleArn = ssm.StringParameter.fromStringParameterName(this, 'githubActionRoleArn', 'cdk-github-action-role-arn');

        const pipeline = new GitHubWorkflow(this, 'Pipeline', {
            synth: new ShellStep('Build', {
                commands: [
                    'npm ci',
                    'npm run build:runtime',
                    'npm run build',
                    'npm run cdk synth',
                    'npm run lint',
                    'npm run test',
                ],
            }),
            awsCreds: AwsCredentials.fromOpenIdConnect({
                gitHubActionRoleArn: githubActionRoleArn.stringValue,
            }),
            preBuildSteps: [
                { uses: 'actions/setup-node@v2', with: { nodeVersion: process.version }}
            ],
        });

    }

}


