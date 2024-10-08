// yaml now imported in the site file

export function parseYAMLImpl (left, right, str) {
  try {
    return right(jsyaml.load(str))
  }
  catch (e) {
    return left(e.toString())
  }
}