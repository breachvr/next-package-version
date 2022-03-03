# Semver-Action


This github action finds the next semantic version tag based on the tags currently existing in the repo. To do that it does the following:

1. Collect all semantic version tags from the repo
    - using format `*.*.*-*+*`
2. uses provided input:
    - release: `'major' | 'minor' | 'patch'`
    - pre-release: `true | false`
3. outputs the next version, adhering to semantic versioning as defined in https://semver.org/spec/v2.0.0.html
