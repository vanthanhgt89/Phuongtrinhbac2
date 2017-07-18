
let towers = [new Tower('Tower1'), new Tower('Tower2'), new Tower('Tower3')]
let disks = [new Disk('Disk1'), new Disk('Disk2'), new Disk('Disk3')]

let length = disks.length

towers.forEach((towers, i) => {
  towers.drawTower(i)
})

disks.forEach((disk, i) => {
  disk.drawDisk(i, (length - 1) - i)
})







let game = new GameEngine()
game.run(disks.length, towers[0], towers[1], towers[2])


[{ "name": { "name": "Disk1", "posOfDisks": 1, "posOfTower": 1, "height": 50, "maxWidth": 300 }, "fromTower": { "name": "Tower1", "diskOfTower": [{ "name": "Disk1", "posOfDisks": 1, "posOfTower": 1, "height": 50, "maxWidth": 300 }, { "name": "Disk2", "posOfDisks": 2, "posOfTower": 0, "height": 50, "maxWidth": 300 }], "towerWidth": 400, "thick": 15, "marginX": 50, "marginY": 50 }, "toTower": { "name": "Tower2", "diskOfTower": [], "towerWidth": 400, "thick": 15, "marginX": 50, "marginY": 50 } }, { "name": { "name": "Disk2", "posOfDisks": 2, "posOfTower": 0, "height": 50, "maxWidth": 300 }, "fromTower": { "name": "Tower1", "diskOfTower": [{ "name": "Disk1", "posOfDisks": 1, "posOfTower": 1, "height": 50, "maxWidth": 300 }, { "name": "Disk2", "posOfDisks": 2, "posOfTower": 0, "height": 50, "maxWidth": 300 }], "towerWidth": 400, "thick": 15, "marginX": 50, "marginY": 50 }, "toTower": { "name": "Tower3", "diskOfTower": [], "towerWidth": 400, "thick": 15, "marginX": 50, "marginY": 50 } }, { "name": { "name": "Disk1", "posOfDisks": 1, "posOfTower": 1, "height": 50, "maxWidth": 300 }, "fromTower": { "name": "Tower2", "diskOfTower": [], "towerWidth": 400, "thick": 15, "marginX": 50, "marginY": 50 }, "toTower": { "name": "Tower3", "diskOfTower": [], "towerWidth": 400, "thick": 15, "marginX": 50, "marginY": 50 } }]