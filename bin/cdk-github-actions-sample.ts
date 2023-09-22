#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from "../lib/pipeline-stack";
import {PipelineAppStage} from "../lib/pipeline-app-stage";
import {CdkGithubActionsSampleStack} from "../lib/cdk-github-actions-sample-stack";


const app = new cdk.App();

// const devAccountId = process.env.DEVELOPER_ACCOUNT_ID;
const stack = new CdkGithubActionsSampleStack(app, 'CdkGithubActionsSampleStack', {});

app.synth();
