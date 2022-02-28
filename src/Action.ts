import * as core from '@actions/core';
import { ReleaseType } from 'semver';
import simpleGit, { SimpleGit } from 'simple-git'
import { Semver } from './Semver';

const default_tag: string = '0.1.0';

export class Action {

    private git: SimpleGit;
    private semver: Semver;

    constructor() {
        this.git = simpleGit();
        this.semver = new Semver();
    }

    public async Run() {

        let release = this.GetReleaseType();
        let pre_release = this.GetPreRelease();

        if (!release || pre_release === undefined)
        {
            // throw new Error('Invalid inputs');
        }
        else
        {
            let next_tag: string;

            let git_tags = await this.git.tags();

            // If we find some tags
            if (git_tags.all && git_tags.all.length > 0) {
                let tags = this.semver.ValidTags(git_tags.all);
                let latest = this.semver.GetLatest(tags);

                next_tag = this.semver.GetNextVersion(latest, release, pre_release);
                console.log('Next tag: ' + next_tag);
            } else {
                next_tag = default_tag;
                console.log('No tags found in repo, using default: ' + next_tag);
            }

            core.setOutput('version', next_tag);
        }
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
    console.log('Action failed: ' + (error as Error).message);
    core.setFailed(error.message);
}