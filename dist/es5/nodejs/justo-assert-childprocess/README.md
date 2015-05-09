[![Build Status](https://travis-ci.org/JustoJS/justo-assert-childprocess.svg)](https://travis-ci.org/JustoJS/justo-assert-childprocess)

An assertion library for child processes.

*Proudly made in Valencia, Spain, EU.*

Features:

- Allow to assert child processes.

## Install

```
npm install justo-assert-childprocess
```

## Table of content

1. [Child processes](#child-processes)

## Child processes

A **child processes** is a process created by another process. With
this library we can create child processes and assert their outputs easily.

### spawn()

To run a child process, we must use the `spawn()` function:

```
spawn(file : string, opts : object = {}) : object
spawn(file : string, args : string[], opts : object = {}) : object
spawn(dir : string, file : string, opts : object = {}) : object
spawn(dir : string, file : string, args : string[], opts : object = {}) : object
```

The `dir` indicates the parent directory and the `file` parameter the file.
The `args` contains the arguments to pass. And the `opts` parameter contains
additional info:

- `workDir` (string). The working directory.
- `stdin` (string). The standard input.
- `env` (object). The environment.
- `timeout` (number). The maximum amount of time to run, in milliseconds.

The library runs the command and it returns a result object with the following attributes:

- `filePath` (string). The file path.
- `arguments` (string[]). The arguments.
- `workingDir` (string). The working directory.
- `pid` (number). The PID.
- `stdin` (string). The standard input.
- `stdout` (string). The standard output.
- `stderr` (string). The standard error output.
- `exitCode` (number). The exit code.
- `error` (object). If error, the error object.

Here are some examples, asserting with `justo-assert`:

```
const spawn = require("justo-assert-childprocess").spawn;

spawn("node", ["-e", "console.log(1+2)"]).must.have({
  filePath: "node",
  arguments: ["-e", "console.log(1+2)"],
  workingDir: undefined,
  stdin: undefined,
  stdout: "3\n",
  stderr: "",
  exitCode: 0,
  error: undefined
});

spawn("node", {stdin: "console.log('Msg'); console.error('Error msg')"}).must.have({
  filePath: "node",
  arguments: [],
  workingDir: undefined,
  stdin: "console.log('Msg'); console.error('Error msg')",
  stdout: "Msg\n",
  stderr: "Error msg\n",
  exitCode: 0,
  error: undefined
});
```
