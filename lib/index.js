//imports
const path = require("path");
const child_process = require("child_process");

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
export function spawn(...args) {
  var dir, file, fp, params, opts;

  //(1) arguments
  if (args.length == 1) {
    file = args[0];
  } else if (args.length == 2) {
    if (args[1] instanceof Array) [file, params] = args;
    else if (typeof(args[1]) == "string") [dir, file] = args;
    else [file, opts] = args;
  } else if (args.length == 3) {
    if (args[1] instanceof Array) [file, params, opts] = args;
    else if (args[2] instanceof Array) [dir, file, params] = args;
    else [dir, file, opts] = args;
  } else if (args.length > 3) {
    [dir, file, params, opts] = args;
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
