# Contributing to Frontigrade
Contributing to Frontigrade encompasses repository specific requirements and the global [Cloudigrade contribution guidelines](https://gitlab.com/cloudigrade/cloudigrade/blob/master/CONTRIBUTING.rst).


## Frontigrade contributions
### Commits
Frontigrade currently has a variety of commit messaging taking place. In an effort to bring in future automation around 
[CHANGELOG.md](./CHANGELOG.md) and tagging we make use of [Standard Version](https://github.com/conventional-changelog/standard-version#readme) and [Conventional Commits](https://www.conventionalcommits.org).

It's encouraged that UI related commit messaging in Frontigrade follow the format
```
   <type>[optional scope]: <issue number><description>
```

Settings for [Standard Version](https://github.com/conventional-changelog/standard-version#readme) can be found in [package.json](./package.json)


### Build Requirements
#### dotenv files
Our current build leverages `dotenv`, or `.env*`, files to apply environment build configuration. 

There are currently build processes in place that leverage the `.env*.local` files, these files are actively applied in our `.gitignore` in order to avoid build conflicts. They should continue to remain ignored, and not be added to the repository.

Specific uses:
- `env.local`, is used for development purposes typically around displaying Redux logging
- `.env.production.local`, is used by the build to relate Frontigrade version information, references can be found with the `Dockerfile`
  - `.env.development.local`, can be used to spoof any values generated with `.env.production.local`


### Testing Requirements
#### Code Coverage
The requirements for code coverage on Frontigrade are currently maintained around `mid 70%`, this will be increased in the future. 

Updates that drop coverage below the current threshold will need to have their coverage expanded accordingly before being merged. 

Settings for coverage can be found in [package.json](./package.json)

#### Integration Testing
Our testing team handles integration testing. To help with integration tests occasionally we add the attribute `data-test` to elements, for example:
  ```
  <someElement data-test="some value">
  ```

If you come across these attributes the testing team should be consulted before alteration. Typically the HTML can be modified, but the attributes and values will be retained.
