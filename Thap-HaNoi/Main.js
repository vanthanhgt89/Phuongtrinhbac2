const Disk = require('./ClassExport.js').Disk
const Tower = require('./ClassExport.js').Tower

let towers = [new Tower('Tower1'), new Tower('Tower2'), new Tower('Tower3')]
let disks = [new Disk('Disk1'), new Disk('Disk2'), new Disk('Disk3')]
let length = disks.length
towers.forEach((towers, i) => {
  towers.drawTower(i)
})

disks.forEach((disk, i) => {
  disk.drawDisk(i, (length - 1) - i)
})




// let game = new GameEngine()
// game.run(disks.length, towers[0], towers[1], towers[2])
