//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spawn = spawn;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require("path");
var child_process = require("child_process");

/**
 * Creates a new process.
 *
 * @overload
 * @param dir:string    The parent directory.
 * @param file:string   The file.
 * @param args:string[] The arguments.
 * @param [opts]:object The exec options: workingDir (string), stdin (string), env (object),
 *                      timeout (number).
 *
 * @overload
 * @param dir:string    The parent directory.
 * @param file:string   The file.
 * @param [opts]:object The exec options.
 *
 * @overload
 * @param file:string   The file path.
 * @param args:string[] The arguments.
 * @param [opts]:object The exec options.
 *
 * @overload
 * @param file:string   The file path.
 * @param [opts]:object The exec options.
 */

function spawn() {
  var dir, file, fp, params, opts;

  //(1) arguments

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length == 1) {
    file = args[0];
  } else if (args.length == 2) {
    if (args[1] instanceof Array) {
      ;
      file = args[0];
      params = args[1];
    } else if (typeof args[1] == "string") {
      ;
      dir = args[0];
      file = args[1];
    } else {
      ;
      file = args[0];
      opts = args[1];
    }
  } else if (args.length == 3) {
    if (args[1] instanceof Array) {
      ;
      file = args[0];
      params = args[1];
      opts = args[2];
    } else if (args[2] instanceof Array) {
      ;
      dir = args[0];
      file = args[1];
      params = args[2];
    } else {
      ;
      dir = args[0];
      file = args[1];
      opts = args[2];
    }
  } else if (args.length > 3) {
    dir = args[0];
    file = args[1];
    params = args[2];
    opts = args[3];
  }

  if (dir) file = path.join(dir, file);
  if (!params) params = [];
  if (!opts) opts = {};

  if (opts.hasOwnProperty("workingDir")) opts.cwd = opts.workingDir;
  if (opts.hasOwnProperty("stdin")) {
    opts.input = opts.stdin;
    delete opts.stdin;
  }
  opts.encoding = "utf8";

  //(2) run
  return new Result(file, params, child_process.spawnSync(file, params, opts));
}

/**
 * A result.
 *
 * @readonly command:string     The executed command.
 * @readonly arguments:string[] The arguments.
 * @readonly workingDir:string  The working directory.
 * @readonly pid:number         The process id.
 * @readonly stdin:string       The standard input.
 * @readonly stdout:string      The standard output.
 * @readonly stderr:string      The standard error.
 * @readonly exitCode:number    The exit code.
 */

var Result =
/**
 * Constructor.
 *
 * @param(attr) command
 * @param(attr0arguments) args
 * @param res:object            The result.
 */
function Result(command, args, res) {
  _classCallCheck(this, Result);

  Object.defineProperty(this, "command", { value: command, enumerable: true });
  Object.defineProperty(this, "arguments", { value: args, enumerable: true });
  Object.defineProperty(this, "workingDir", { value: res.options.cwd, enumerable: true });
  Object.defineProperty(this, "pid", { value: res.pid, enumerable: true });
  Object.defineProperty(this, "stdin", { value: res.options.input, enumerable: true });
  Object.defineProperty(this, "stdout", { value: res.stdout, enumerable: true });
  Object.defineProperty(this, "stderr", { value: res.stderr, enumerable: true });
  Object.defineProperty(this, "exitCode", { value: res.status, enumerable: true });
  Object.defineProperty(this, "error", { value: res.error, enumerable: true });
};
