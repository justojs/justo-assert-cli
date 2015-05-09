//imports
const spawn = require("../../dist/es5/nodejs/justo-assert-childprocess").spawn;

//suite
describe("#spawn()", function() {
  it("spawn(file, args)", function() {
    var ps = spawn("node", ["-e", "console.log(1+2)"]);

    ps.must.have({
      filePath: "node",
      arguments: ["-e", "console.log(1+2)"],
      workingDir: undefined,
      exitCode: 0,
      stdin: undefined,
      stdout: "3\n",
      stderr: ""
    });
    ps.pid.must.be.instanceOf(Number);
  });

  it("spawn(file, opts)", function() {
    var ps = spawn("node", {stdin: "console.log(1+2)"});

    ps.must.have({
      filePath: "node",
      arguments: [],
      workingDir: undefined,
      exitCode: 0,
      stdin: "console.log(1+2)",
      stdout: "3\n",
      stderr: "",
      error: undefined
    });
    ps.pid.must.be.instanceOf(Number);
  });

  it("spawn(file, args, opts)", function() {
    var ps = spawn("node", [], {stdin: "console.log('Msg'); console.error('Error msg')"});

    ps.must.have({
      filePath: "node",
      arguments: [],
      workingDir: undefined,
      exitCode: 0,
      stdin: "console.log('Msg'); console.error('Error msg')",
      stdout: "Msg\n",
      stderr: "Error msg\n",
      error: undefined
    });
    ps.pid.must.be.instanceOf(Number);
  });
});
