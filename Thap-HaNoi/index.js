// class TowerDemo {
//   constructor() { }

//   changeDisk(Disk, colA, colB, colC) {
//     if (Disk > 0) {
//       this.changeDisk(Disk - 1, colA, colC, colB)
//       console.log(`Move ${Disk} from ${colA} --> ${colC} `)
//       this.changeDisk(Disk - 1, colB, colA, colC)
//     }
//   }
// }
// let tower = new Tower()
// tower.changeDisk(2, "colA", "colB", "colC")




// class Disk {
//   constructor(nameTower) {
//     this.name = nameTower
//   }

//   drawDisk() {
//     svg.append('rect')
//       .attr('width', 150)
//       .attr('height', 50)
//       .attr('x', 125)
//       .attr('y', 420)
//       .attr('rx', 5)
//       .attr('ry', 5)
//       .attr('class', 'rect-svg')
//   }
// }




class Tower {
  constructor(name) {
    this.name = name
    this.towerWidth = svgFrame.width / 3
    this.thick = 10
    this.marginX = 50
    this.marginY = 50
  }

  drawTower(n) {
    svg.append('rect')
      .attr('class', 'rect-svg')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('width', this.towerWidth - (2 * this.marginX))
      .attr('height', this.thick)
      .attr('x', this.marginX + this.towerWidth * n)
      .attr('y', svgFrame.height - this.marginY)


    svg.append('rect')
      .attr('class', 'rect-svg')
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('width', this.thick )
      .attr('height', this.towerWidth - (2 * this.marginX))
      .attr('x',this.towerWidth/2 - this.thick/2 + this.towerWidth * n)
      .attr('y', svgFrame.height - this.marginY  - (this.towerWidth - (2 * this.marginX)))  
  }
}




class GameEngine {

  constructor() {
    this.counter = 0
    this.diskMove = {}
    this.data = []
  }
  run(n, col1, col2, col3) {
    if (n > 0) {
      this.run(n - 1, col1, col3, col2)
      // console.log(`Move  Disk ${n} from ${col1.name} to ${col3.name}`)
      this.counter++
      this.diskMove = {
        name: 'disk' + n,
        from: col1,
        to: col3
      }
      this.data.push(this.diskMove)
      console.log(this.counter);
      this.run(n - 1, col2, col1, col3)
    }
  }

}

const svgFrame = {
  width: 1200,
  height: 500,
  distance: function(){
    return this.width/3
  }
}

const svg = d3.select('body').append('svg')
svg.attr('class', 'main-svg')
svg.attr('width', svgFrame.width)
svg.attr('height', svgFrame.height)


let towers = [new Tower('Tower1'), new Tower('Tower2'), new Tower('Tower3')]

towers.forEach((towers,i) => {
  let a = svgFrame.distance
  console.log(a)
  towers.drawTower(i)
})





// let disks = [new Disk('Disk1'), new Disk('Disk2', new Disk('Disk3'))]





// let game = new GameEngine()

// game.run(disks.length, towers[0], towers[1], towers[2])





