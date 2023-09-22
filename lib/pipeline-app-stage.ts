import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { CdkGithubActionsSampleStack } from "./cdk-github-actions-sample-stack";

export class PipelineAppStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        const sampleStack = new CdkGithubActionsSampleStack(this, 'CdkGithubActionsSampleStack');
    }
}