import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import { GitHubWorkflow, AwsCredentials } from 'cdk-pipelines-github';
import { ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from 'constructs';
import { PipelineAppStage } from "./pipeline-app-stage";

export class PipelineStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const githubActionRoleArn = ssm.StringParameter.fromStringParameterName(this, 'githubActionRoleArn', 'cdk-github-action-role-arn');

        const pipeline = new GitHubWorkflow(this, 'Pipeline', {
            synth: new ShellStep('Build', {
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth',
                ],
            }),
            awsCreds: AwsCredentials.fromOpenIdConnect({
                gitHubActionRoleArn: githubActionRoleArn.stringValue,
            }),
            preBuildSteps: [
                { uses: 'actions/setup-node@v3', with: { nodeVersion: process.version }},
            ],
        });

        pipeline.addStage(new PipelineAppStage(this, 'PipelineAppStage'));
    }

}


