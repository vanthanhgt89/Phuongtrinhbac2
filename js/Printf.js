const fs = require('fs')
let path = require('path')

exports.Printf = class {
  constructor() {
    this.spacing = '    '
    this.firstPath = '├── '
    this.lastPath = '└── '
  }

  print(sourcePath) {
    let listItem = fs.readdirSync(sourcePath)
    listItem.forEach((file, i) => {
      // console.log(file)
      if (fs.statSync(sourcePath + '/' + file).isFile()) {
        if (i === listItem.length - 1) {
          console.log(this.spacing + this.lastPath + file)
        } else {
          console.log(this.spacing + this.firstPath + file)
        }
      } else {
        if (i === listItem.length - 1) {
          console.log(this.lastPath + file)
        } else {
          console.log(this.firstPath + file)
        }
        if (this.spacing === '') {
            this.spacing = '    '
            this.print(sourcePath + '/' + file)
            this.spacing = ''
        } else {
            this.spacing = this.spacing.concat(this.spacing)
            this.print(sourcePath + '/' + file)
          }
        }
      }
    )
  }
}
