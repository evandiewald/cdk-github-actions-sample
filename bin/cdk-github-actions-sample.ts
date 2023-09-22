#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from "../lib/pipeline-stack";
import {PipelineAppStage} from "../lib/pipeline-app-stage";


const app = new cdk.App();
const stack = new PipelineStack(app, 'PipelineStack', {});
stack.pipeline.addStage(new PipelineAppStage(app, 'devStage', {
    env: {
        account: '352937523354',
        region: 'us-east-1',
    },
}));

app.synth();
