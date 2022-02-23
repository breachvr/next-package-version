import * as core from '@actions/core';
import simpleGit, { SimpleGit } from 'simple-git'

class Action {

    private git: SimpleGit;

    constructor() {
        this.git = simpleGit();
    }

    public async Run() {
        const release = core.getInput('release');
        const pre_release = core.getBooleanInput('pre-release');

        let response = await this.git.tags();

        response.all.forEach(element => {
            console.log('Tag: ' + element);
        });
    }
}

try {
    new Action().Run();
} catch (error: any) {
    core.setFailed(error.message);
}