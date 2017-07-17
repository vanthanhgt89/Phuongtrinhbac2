class Disk {
  constructor(nameTower) {
    this.name = nameTower
    this.height = svgFrame.diskHeight
    this.maxWidth = svgFrame.width / 3 - (2 * svgFrame.marginX)
  }

  drawDisk(i, n) {
    if (n <= (this.maxWidth / this.height)) {
      svg.append('rect')
        .attr('class', 'disk-svg')
        .attr('rx', 5) // border-radius trục X
        .attr('ry', 5) // boder-radius trục Y
        .attr('width', this.height * (i + 1)) // Chiều dài đĩa 
        .attr('height', this.height) // Chiều rộng đĩa
        .attr('x', (svgFrame.width / 3) / 2 - (this.height * (i + 1)) / 2) // Tọa độ X (i số tự tự đĩa: i tăng 0 ---> length)
        .attr('y', (svgFrame.height - svgFrame.marginY - this.height) - this.height * n) // Tọa độ Y (n tọa độ trục Y: n tăng length ---> 0)
        .style('fill', function () {
          return "hsl(" + Math.random() * 360 + ",80%,60%)";
        })
    }
  }
}

class Tower {
  constructor(name) {
    this.name = name
    this.towerWidth = svgFrame.width / 3
    this.thick = svgFrame.thick
    this.marginX = svgFrame.marginX
    this.marginY = svgFrame.marginY
  }

  drawTower(n) {
    svg.append('rect')
      .attr('class', 'rect-svg') // add class rect-svg
      .attr('rx', 5) // border-radius trục X
      .attr('ry', 5) // boder-radius trục Y
      .attr('width', this.towerWidth - (2 * this.marginX)) // Chiều dài tháp = width - k/c 2 bên
      .attr('height', this.thick) // Chiểu rộng tháp theo trục X
      .attr('x', this.marginX + this.towerWidth * n) //Tọa độ X = marginX + ứng với mỗi tháp mặc định n = 0, distance = 400
      .attr('y', svgFrame.height - this.marginY) // Tọa độ Y = Height khung - k/c dưới (marginY)
    svg.append('rect')
      .attr('class', 'rect-svg')  // add class rect-svg
      .attr('rx', 2) // border-radius trục X
      .attr('ry', 2) // boder-radius trục Y
      .attr('width', this.thick) // Chiểu rộng tháp theo trục Y
      .attr('height', this.towerWidth - (2 * this.marginX)) // Chiều dài tháp = width - k/c 2 bên
      .attr('x', (this.towerWidth / 2) - (this.thick / 2) + (this.towerWidth * n)) // Tọa dộ trục X  
      .attr('y', svgFrame.height - this.marginY - (this.towerWidth - (2 * this.marginX))) // Tọa độ trục Y
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
  width: 1300,
  height: 500,
  diskHeight: 50,
  marginX: 50,
  marginY: 50,
  thick: 15
}

const svg = d3.select('body').append('svg')
svg.attr('class', 'main-svg')
svg.attr('width', svgFrame.width)
svg.attr('height', svgFrame.height)


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





