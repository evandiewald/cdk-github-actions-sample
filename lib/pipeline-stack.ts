import * as cdk from 'aws-cdk-lib';
import { GitHubWorkflow, AwsCredentials } from 'cdk-pipelines-github';
import { ShellStep } from "aws-cdk-lib/pipelines";
import { Construct } from 'constructs';

export class PipelineStack extends cdk.Stack {
    public pipeline: GitHubWorkflow;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // const githubActionRoleArn = ssm.StringParameter.fromStringParameterName(this, 'githubActionRoleArn', 'cdk-github-action-role-arn');

        this.pipeline = new GitHubWorkflow(this, 'Pipeline', {
            synth: new ShellStep('Build', {
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth',
                ],
            }),
            awsCreds: AwsCredentials.fromOpenIdConnect({
                gitHubActionRoleArn: '${{ secrets.ACTIONS_ROLE_ARN }}',
            }),
            preBuildSteps: [
                { uses: 'actions/setup-node@v3', with: { nodeVersion: process.version }},
            ],
        });

    }

}


