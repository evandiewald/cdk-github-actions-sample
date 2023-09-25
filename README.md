# cdk-github-actions-sample

This CDK app and associated workflow demonstrates how to deploy infrastructure via GitHub Actions. 

## Prerequisites

The workflow retrieves short-lived credentials to authenticate with AWS by assuming a role managed by another [repository](https://github.com/evandiewald/cdk-github-actions-setup). To use that role to deploy additional repositories' workflows, you need to update the trust policy in that role. See the README in [`cdk-github-actions-setup`](https://github.com/evandiewald/cdk-github-actions-setup) for more details.

## Details

There are two, similar workflows associated with this sample. 

1. **Preview Build**: when a PR is **opened** - the stack is synthesized and a `cdk diff` is run so that you can preview and changes that would be made to the development account.
2. **Build and Deploy**: when a PR is **merged** - during the build phase, CDK stacks are synthesized for multiple environments using CDK Stages. This allows you to deploy multiple environments either in parallel or serially (e.g. to ensure that the development deployment succeeds before proceeding to staging).

For production deployments, I would recommend tagging a release as the final step of the automated workflow and then deploying it via workflow triggers (i.e. manually-triggered workflows). I'll try adding an example for this.
