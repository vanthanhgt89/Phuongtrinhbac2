const fs = require('fs')
let path = require('path')

class convertDirJson {
  constructor() {

  }

  // Using map() to return new arr and readdirSync
  readDir(pathDir) {
    let stat = fs.statSync,
      info = {
        path: pathDir,
        name: path.basename(pathDir)
      }
    if(stat(pathDir).isDirectory()) {
      info.type = "folder"
      info.children = fs.readdirSync(pathDir)
        .map((file) => {
          if (stat(pathDir + "/" + file).isDirectory) {
            info.type = "folder"
            return this.readDir(pathDir + '/' + file)
          } else {
            info.type = 'file'
          }
        })
    } else {
      info.type = "file"
    }
    return info
  }


  // Using forEach() same for lap qua tung phan tu and readdir (aync)
  // readDir2(pathDir) {
  //   let results = [],
  //     stat = fs.statSync
  //   if (stat(pathDir).isFile()) {
  //     return result.push({ name: path.basename(pathDir), type: "file" }) || null;
  //   } else {
  //     fs.readdir((err, files) => {
  //       if (err) {
  //         throw new Error('Loi duong dan')
  //       }
  //       files.forEach((file) => {
  //         if (stat.isDirectory(pathDir + "/" + file)) {
  //           result.push({
  //             name: file,
  //             type: 'folder',
  //             children: results
  //           })
  //           readDir2(pathDir + "/" + file)
  //         } else {
  //           results.push({
  //             name: file,
  //             type: 'file'
  //           })
  //         }
  //       })
  //       return results
  //     })
  //   }
  // }
}

let sourcePath = '/Users/vanthanh/Desktop/node'
let d3 = new convertDirJson()

let json = JSON.stringify(d3.readDir(sourcePath))
// let json1 = JSON.stringify(d3.readDir2(sourcePath))


fs.writeFileSync('abcJson.json', json)
// fs.writeFileSync('abcJson1.json', json)

