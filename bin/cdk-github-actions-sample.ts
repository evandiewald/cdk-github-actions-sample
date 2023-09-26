#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CdkGithubActionsSampleStack} from "../lib/cdk-github-actions-sample-stack";



class DeployStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props: cdk.StageProps) {
        super(scope, id, props);

        new CdkGithubActionsSampleStack(this, 'CdkGithubActionsSampleStack', {
            env: props.env,
        });
    }
}

const app = new cdk.App();


const developmentAccountId = app.node.tryGetContext('developmentAccountId');
const stagingAccountId = app.node.tryGetContext('stagingAccountId');
const productionAccountId = app.node.tryGetContext('productionAccountId');

if (developmentAccountId === undefined || stagingAccountId === undefined || productionAccountId === undefined) {
    new CdkGithubActionsSampleStack(app, 'CdkGithubActionsSampleStack', {});
} else {

    new DeployStage(app, 'Dev', {
        env: {
            account: developmentAccountId,
            region: "us-east-1",
        }
    });

    new DeployStage(app, 'Staging', {
        env: {
            account: stagingAccountId,
            region: "us-east-1",
        }
    });

    new DeployStage(app, 'Prod', {
        env: {
            account: productionAccountId,
            region: "us-east-1",
        }
    });
}


app.synth();
