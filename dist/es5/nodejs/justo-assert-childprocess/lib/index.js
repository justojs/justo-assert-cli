"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Creates a new process.
 *
 * @overload
 * @param dir:string    The parent directory.
 * @param file:string   The file.
 * @param args:string[] The arguments.
 * @param [opts]:object The exec options: workDir (string), stdin (string), env (object),
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
exports.spawn = spawn;

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A process wrapper.
 *
 * @readonly filePath:string    The file path.
 * @readonly arguments:string[] The arguments.
 * @readonly workingDir:string  The working directory.
 * @readonly pid:number         The process id.
 * @readonly stdin:string       The standard input.
 * @readonly stdout:string      The standard output.
 * @readonly stderr:string      The standard error.
 * @readonly exitCode:number    The exit code.
 */

var Process =
/**
 * Constructor.
 *
 * @param(attr) filePath
 * @param(attr0arguments) args
 * @param res:object            The result.
 */
function Process(filePath, args, res) {
  _classCallCheck(this, Process);

  Object.defineProperty(this, "filePath", { value: filePath, enumerable: true });
  Object.defineProperty(this, "arguments", { value: args, enumerable: true });
  Object.defineProperty(this, "workingDir", { value: res.options.cwd, enumerable: true });
  Object.defineProperty(this, "pid", { value: res.pid, enumerable: true });
  Object.defineProperty(this, "stdin", { value: res.options.input, enumerable: true });
  Object.defineProperty(this, "stdout", { value: res.stdout, enumerable: true });
  Object.defineProperty(this, "stderr", { value: res.stderr, enumerable: true });
  Object.defineProperty(this, "exitCode", { value: res.status, enumerable: true });
  Object.defineProperty(this, "error", { value: res.error, enumerable: true });
};

exports.Process = Process;

//imports
var path = require("path");
var child_process = require("child_process");
function spawn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var dir, file, fp, params, opts;

  //(1) arguments
  if (args.length == 1) {
    file = args[0];
  } else if (args.length == 2) {
    if (args[1] instanceof Array) {
      ;
      var _temp = args;

      var _temp2 = _slicedToArray(_temp, 2);

      file = _temp2[0];
      params = _temp2[1];
      _temp;
    } else if (typeof args[1] == "string") {
      ;
      var _temp3 = args;

      var _temp32 = _slicedToArray(_temp3, 2);

      dir = _temp32[0];
      file = _temp32[1];
      _temp3;
    } else {
      ;
      var _temp4 = args;

      var _temp42 = _slicedToArray(_temp4, 2);

      file = _temp42[0];
      opts = _temp42[1];
      _temp4;
    }
  } else if (args.length == 3) {
    if (args[1] instanceof Array) {
      ;
      var _temp5 = args;

      var _temp52 = _slicedToArray(_temp5, 3);

      file = _temp52[0];
      params = _temp52[1];
      opts = _temp52[2];
      _temp5;
    } else if (args[2] instanceof Array) {
      ;
      var _temp6 = args;

      var _temp62 = _slicedToArray(_temp6, 3);

      dir = _temp62[0];
      file = _temp62[1];
      params = _temp62[2];
      _temp6;
    } else {
      ;
      var _temp7 = args;

      var _temp72 = _slicedToArray(_temp7, 3);

      dir = _temp72[0];
      file = _temp72[1];
      opts = _temp72[2];
      _temp7;
    }
  } else if (args.length > 3) {
    var _temp8 = args;

    var _temp82 = _slicedToArray(_temp8, 4);

    dir = _temp82[0];
    file = _temp82[1];
    params = _temp82[2];
    opts = _temp82[3];
    _temp8;
  }

  if (dir) file = path.join(dir, file);
  if (!params) params = [];
  if (!opts) opts = {};

  if (opts.hasOwnProperty("workDir")) opts.cwd = opts.workDir;
  if (opts.hasOwnProperty("stdin")) {
    opts.input = opts.stdin;
    delete opts.stdin;
  }
  opts.encoding = "utf8";

  //(2) run
  return new Process(file, params, child_process.spawnSync(file, params, opts));
}