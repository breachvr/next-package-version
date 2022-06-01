import * as sem from 'semver';

export class Semver {

    public ValidTag(string: string | undefined) {
        return sem.valid(string);
    }

    public ValidTags(tags: Array<string>) {
        let valid_tags: Array<string> = [];
        tags.forEach(tag => {
            if (sem.valid(tag)) valid_tags.push(tag)
        });

        return valid_tags;
    }

    public GetLatest(tags: Array<string>): string {
        return tags.sort((a, b) => sem.rcompare(a, b))[0];
    }

    public GetNextVersion(current: string, mode: sem.ReleaseType, prerelease: boolean) : string {
        
        let release_type: sem.ReleaseType;
    
        switch (mode) {
            case 'major':
                release_type = prerelease ? 'premajor' : 'major';
                break;
            case 'minor':
                release_type = prerelease ? 'preminor' : 'minor';
                break;
            case 'patch':
                release_type = prerelease ? 'prepatch' : 'patch';
            default:
                release_type = mode;
                break;
        }

        const next = sem.inc(current, release_type);
        if (next === null) throw Error(`Unable to increment to next semver from ${ current }`);
        return next;
    }
}