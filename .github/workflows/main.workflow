workflow "Line Maintenance" {
  on = "push"
  resolves = ["ESLint", "license-checker"]
}

action "ESLint" {
  uses = "stefanoeb/eslint-action@master"
}

action "license-checker" {
  uses = "docker://cdssnc/node-license-checker-github-action",
  args = "--onlyAllow 'MIT; MIT OR X11; BSD; ISC'"
}