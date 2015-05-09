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
export class Process {
  /**
   * Constructor.
   *
   * @param(attr) filePath
   * @param(attr0arguments) args
   * @param res:object            The result.
   */
  constructor(filePath, args, res) {
    Object.defineProperty(this, "filePath", {value: filePath, enumerable: true});
    Object.defineProperty(this, "arguments", {value: args, enumerable: true});
    Object.defineProperty(this, "workingDir", {value: res.options.cwd, enumerable: true});
    Object.defineProperty(this, "pid", {value: res.pid, enumerable: true});
    Object.defineProperty(this, "stdin", {value: res.options.input, enumerable: true});
    Object.defineProperty(this, "stdout", {value: res.stdout, enumerable: true});
    Object.defineProperty(this, "stderr", {value: res.stderr, enumerable: true});
    Object.defineProperty(this, "exitCode", {value: res.status, enumerable: true});
    Object.defineProperty(this, "error", {value: res.error, enumerable: true});
  }
}
