<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>

## Description

This project was created with NestJS, Docker and MySQL. For use, please follow the installation and the running steps.

## Installation

Installing nodejs
<a href="https://nodejs.org/en/download" target="_blank"><img src="https://imgur.com/VRL6erP" alt="nodejs download" /></a>

Installing nestjs:

```bash
$ npm i -g @nestjs/cli
```

The npm command installs all the modules need it within the project:

```bash
$ npm install
```

Installing Docker on windows:
<a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank"><img src="https://imgur.com/PgdzSa8" alt="docker download" /></a>

Docker is better to run as administrator.

Installing MySQL Workbench:
<a href="https://www.mysql.com/downloads/" target="_blank"><img src="https://imgur.com/z1pLC5E" alt="mysql download" /></a>

Installing MySQL Server:
<a href="[https://www.mysql.com/downloads/](https://dev.mysql.com/downloads/mysql/)" target="_blank"><img src="https://imgur.com/z1pLC5E" alt="mysql server download" /></a>

## Commit messages

An efficent way for us to organize the repository, please use the Semantic Commit Messages before commiting a change:

Example:

feat: add hat wobble
^--^ ^------------^
| |
| +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.

More Examples:

feat: (new feature for the user, not a new feature for build script)
fix: (bug fix for the user, not a fix to a build script)
docs: (changes to the documentation)
style: (formatting, missing semi colons, etc; no production code change)
refactor: (refactoring production code, eg. renaming a variable)
test: (adding missing tests, refactoring tests; no production code change)
chore: (updating grunt tasks etc; no production code change)

for more information: <a href="https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716" target="_blank">

## Branches

Each developer have its own branch to work with. Please, DO NOT work in the masters branch, if any mistakes are made, it can be difficult to fix if worked within the master branch.

Also, after making any commit, it's important to go and ask for a pull request directly in the github repository. Resolving merged conflict it's a MUST every time a dev commits.

## Running the app

Nestjs:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

TIP: For development is better to use "npm run start:dev". This command allows the developer to watch the changes in real-time, meaning, there won't be need to exit the program to
save changes and run the app again so it can show them.

Docker:

```bash
$ docker-compose up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
