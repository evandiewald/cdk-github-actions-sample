#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {CdkGithubActionsSampleStack} from "../lib/cdk-github-actions-sample-stack";


const app = new cdk.App();

new CdkGithubActionsSampleStack(app, 'CdkGithubActionsSampleStack', {});

app.synth();
