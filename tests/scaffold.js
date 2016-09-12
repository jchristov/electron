'use strict'

const templateName = process.argv[2]

const suppose = require('suppose')
const template = require('./builds.json')[templateName]

const YELLOW = '\x1b[33m'
const END = '\x1b[0m'

process.chdir(process.cwd() + '/builds')

generate(templateName, template)

setTimeout(() => {
  process.exit()
}, 10000)

function generate (key, build) {
  console.log(`${YELLOW}Generating \`${key}\`${END}`)
  suppose('vue', ['init', 'simulatedgreg/electron-vue', key], { debug: process.stdout })
    .when(/Application Name/g).respond(build[0])
    .when(/Project description/g).respond(build[1])
    .when(/version/g).respond(build[2])
    .when(/ESLint/g).respond(build[3])
    .when(/config/g).respond(build[4])
    .when(/plugins/g).respond(build[5])
    .when(/author/g).respond(build[6])
  .on('error', err => {
    console.log(err.message)
  })
  .end(code => {
    process.exit(code)
  })
}
