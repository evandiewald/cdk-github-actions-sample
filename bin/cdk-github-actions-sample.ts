#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkGithubActionsSampleStack } from '../lib/cdk-github-actions-sample-stack';
import { PipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack');

