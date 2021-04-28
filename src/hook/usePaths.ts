export type Path = [string, string]

let paths: Path[] = []
const setPaths = (_paths: Path[]) => {
  paths = _paths.slice()
}
export const usePaths = (_paths?: Path[]) => {
  if (_paths) {
    paths = _paths.slice()
  }
  return [paths, setPaths] as const
}
