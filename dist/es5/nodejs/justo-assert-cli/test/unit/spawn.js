//imports
const spawn = require("../../dist/es5/nodejs/justo-assert-cli").spawn;

//suite
describe("#spawn()", function() {
  it("spawn(file, args)", function() {
    var res = spawn("node", ["-e", "console.log(1+2)"]);

    res.must.have({
      command: "node",
      arguments: ["-e", "console.log(1+2)"],
      workingDir: undefined,
      exitCode: 0,
      stdin: undefined,
      stdout: "3\n",
      stderr: ""
    });
    res.pid.must.be.instanceOf(Number);
  });

  it("spawn(file, opts)", function() {
    var res = spawn("node", {stdin: "console.log(1+2)"});

    res.must.have({
      command: "node",
      arguments: [],
      workingDir: undefined,
      exitCode: 0,
      stdin: "console.log(1+2)",
      stdout: "3\n",
      stderr: "",
      error: undefined
    });
    res.pid.must.be.instanceOf(Number);
  });

  it("spawn(file, args, opts)", function() {
    var res = spawn("node", [], {stdin: "console.log('Msg'); console.error('Error msg')"});

    res.must.have({
      command: "node",
      arguments: [],
      workingDir: undefined,
      exitCode: 0,
      stdin: "console.log('Msg'); console.error('Error msg')",
      stdout: "Msg\n",
      stderr: "Error msg\n",
      error: undefined
    });
    res.pid.must.be.instanceOf(Number);
  });
});
