# Next Package Version

This github action finds the next semantic version tag based on the tags currently existing in the `package.json` and which release-type is specified.

## Inputs

### `path`

```yml
description: Path to a package.json file to look for existing version. It needs to have a valid { "version" : "x.y.z" } field
required: false
default: './package.json'
type: string
```


### `release`

```yml
description: Defines if major, minor or patch should be bumped
required: false
default: 'patch'
type: string
```
Valid inputs: `'major' | 'minor' | 'patch'`

### `pre-release`

```yml
description: True if this should be a pre-release
required: false
default: false
type: boolean
```
Valid inputs: `true | false`

## Outputs

### `version`

```yml
description: The calculated new version tag to use
```
