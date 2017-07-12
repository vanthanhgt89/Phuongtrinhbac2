// module doc ghi file
const fs = require('fs')

// module lay dia chi duong dan
const path = require('path')


let firstPath = '├── '
let lastPath = '└── '
let spacing = ''
function filterPath(sourcePath) {

  /** let stat = fs.statSync(path)
   *  Returns an instance of fs.Stats.
   *  stats.isFile() tra ve true / fasle dinh dang file
      stats.isDirectory() tra ve true / fasle ding dang folder
      stats.isBlockDevice()
      stats.isCharacterDevice()
      stats.isSymbolicLink() (only valid with fs.lstat())
      stats.isFIFO()
      stats.isSocket()
   */
  let stat = fs.statSync
  if (stat(sourcePath).isFile()) {
    return sourcePath
  } else {

    /**
     * let listItem = fs.readdirSync(path)
     * tra ve danh sach thu dung co trong path
     */
    let listItem = fs.readdirSync(sourcePath)
    listItem.forEach((file, i) => {
      if (stat(`${sourcePath}/${file}`).isFile()) {
        if (i === listItem.length - 1) {
          console.log(`${spacing}${lastPath} ${file}`)
        } else {
          console.log(`${spacing}${firstPath}${file}`)
        }

      } else {
        if (i === listItem.length - 1) {
          console.log(`${spacing}${lastPath}` + path.basename(`${sourcePath}/${file}`))
        } else {
          console.log(`${spacing}${firstPath}` + path.basename(`${sourcePath}/${file}`))
        }
        if (spacing == '') {
          spacing = '   '
          filterPath(`${sourcePath}/${file}`)
          spacing = ''
        } else {
          spacing = spacing.concat(spacing)
          filterPath(`${sourcePath}/${file}`)
        }
      }
    });
  }
}
let sourcePath = '/Users/vanthanh/Desktop/example/js'
// console.log(path.basename(sourcePath))
filterPath(sourcePath)


// cau truc express
const itemOfFolder = (sourcePath) => {
  let listItem = fs.readdirSync(sourcePath)
  listItem.forEach(item => {
    if (fs.statSync(sourcePath + '/' + item).isDirectory()) {
      console.log('---' + sourcePath + '/' + item)
      itemOfFolder(sourcePath + '/' + item)
    } else {
      console.log(item)
    }
  })
}
