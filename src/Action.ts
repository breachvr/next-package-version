import * as core from '@actions/core';
import { ReleaseType } from 'semver';
import { Semver } from './Semver';
import * as fs from 'fs';


export class Action {

    private semver: Semver;

    constructor() {
        this.semver = new Semver();
    }

    public async Run() {

        const path = core.getInput('path');
        if (!path) {
            core.setFailed('Not a valid path');
            return;
        }

        if (!fs.existsSync(path)) {
            core.setFailed('Path does not point to valid file: ' + path);
            return;
        }

        const raw_data = fs.readFileSync(path, { encoding: 'utf8' });
        if (!raw_data) {
            core.setFailed('File empty or not existing: ' + path);
            return;
        }

        const current_version = JSON.parse(raw_data).version;
        if (!this.semver.ValidTag(current_version)) {
            core.setFailed('No valid tags found in ' + path);
            return;
        }

        const release = this.GetReleaseType();
        const pre_release = this.GetPreRelease();

        if (!release || pre_release === undefined)
        {
            core.setFailed('Release or pre-release not valid.');
            return;
        }

        const next_version = this.semver.GetNextVersion(current_version, release, pre_release);
        console.log('Next version: ' + next_version);
        core.setOutput('version', next_version);
    }

    private GetReleaseType() : ReleaseType | undefined {
        try {
            const input = core.getInput('release');
            if (!input) {
                throw Error("Invalid release mode! Valid inputs are 'major', 'minor' and 'patch'");
            }
            return input as ReleaseType;
        } catch(e) {
            console.log("Error: " + (e as Error).message);
        }
    }

    private GetPreRelease() : boolean | undefined {
        try {
            const result = core.getBooleanInput('pre-release');
            return result;
        } catch(e) {
            console.log("Error: " + (e as Error).message);
        }
    }
}

try {
    new Action().Run();
} catch (error: any) {
    core.setFailed(error.message as string);
}