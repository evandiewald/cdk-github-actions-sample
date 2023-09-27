import { execSync } from 'child_process';

export function lookupStringParameterValue(parameterName: string): string {
    return execSync(`aws ssm get-parameter --name ${parameterName} | jq '.Parameter.Value' | tr -d '"'`, { stdio: 'pipe' }).toString().trim();
}