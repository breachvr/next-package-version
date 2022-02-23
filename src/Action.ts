import * as core from '@actions/core';

class Action {

    constructor() { }

    public async Run() { }
}

try {
    new Action().Run();
} catch (error: any) {
    core.setFailed(error.message);
}