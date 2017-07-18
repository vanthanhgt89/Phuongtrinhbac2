class Disk {
  constructor(nameTower,posOfDisks,posOfTower) {
    this.name = nameTower
    this.posOfDisks = posOfDisks
    this.posOfTower = posOfTower
    this.height = svgFrame.diskHeight
    this.x_ = 0
    this.maxWidth = svgFrame.towerFrame - (2 * svgFrame.marginX)
  }
  drawDisk() {
    if (this.posOfTower <= (this.maxWidth / this.height)) {
      svg.append('rect')
        .attr('class', 'disk-svg' + this.posOfDisks)
        .attr('rx', 5) // border-radius trục X
        .attr('ry', 5) // boder-radius trục Y
        .attr('width', this.height * (this.posOfDisks + 1)) // Chiều dài đĩa 
        .attr('height', this.height) // Chiều rộng đĩa
        .attr('x', (svgFrame.towerFrame / 2) - (this.height * (this.posOfDisks + 1)) / 2 ) // Tọa độ X (i số tự tự đĩa: i tăng 0 ---> length)
        .attr('y', (svgFrame.height - svgFrame.marginY - this.height) - this.height * this.posOfTower) // Tọa độ Y (n so thu tutọa độ trục Y: n giam length ---> 0)
        .style('fill', function () {
          return "hsl(" + Math.random() * 360 + ",80%,60%)";
        })
    }
  }
}

class Tower {
  constructor(name, diskOfTower) {
    this.name = name
    this.diskOfTower = diskOfTower
    this.towerWidth = svgFrame.towerFrame
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
      .attr('height', this.towerWidth - (3 * this.marginX) ) // Chiều dài tháp = width - k/c 2 bên 
      .attr('x', (this.towerWidth / 2) - (this.thick / 2) + (this.towerWidth * n)) // Tọa dộ trục X  
      .attr('y', svgFrame.height - this.marginY - (this.towerWidth - (3 * this.marginX))) // Tọa độ trục Y
  }
}

class GameEngine {
  constructor() {
    this.counter = 0
    this.step = {}
    this.data = []
  }

  move(n, col1, col2, col3) {
    if (n > 0) {
      this.move(n - 1, col1, col3, col2)
      console.log(`Move  Disk ${n} from ${col1.name} to ${col3.name}`)

      this.step = {
        name: disks[n - 1],
        fromTower: col1,
        toTower: col3
      }
      this.data.push(this.step)
      this.counter++

      this.move(n - 1, col2, col1, col3)
    }
  }

  distanceTower(tower1, tower2) {
    if (tower1 === 'Tower1' && tower2 === 'Tower2' || tower1 === 'Tower2' && tower2 === 'Tower3') {
      return svgFrame.disNear // Khoang cach thap 1 ---> 2 , 2 ---->3 : disNear
    } else if (tower1 === 'Tower2' && tower2 === 'Tower1' || tower1 === 'Tower3' && tower2 === 'Tower2'){
      return -svgFrame.disNear // Khoang cach thap 2 ---> 1 , 3 ---->1 : -disNear di nguoc
    }else if(tower1 === 'Tower1' && tower2 === 'Tower3'){
      return svgFrame.disFar // Khoang cach thap 1 ---> 3:  disFar
    }else if(tower1 === 'Tower3' && tower2 === 'Tower1'){
      return -svgFrame.disFar // Khoang cach thap 3 ---> 1:  -disFar Di nguoc
    }
  }

  diskOfTowerUpdate(disk, tower1, tower2){
    tower1.diskOfTower.pop() // Loai bo dia cuoi cung trong thap khi di chuyen tu thap bat dau sang thap dick
    tower2.diskOfTower.push(disk) // Them dia vao thap dick
  }

  start() {
    this.data.forEach((disk,i) => {
      // Khoang cach giua 2 thap
      let distance = this.distanceTower(disk.fromTower.name, disk.toTower.name)

      // Chieu cao cua disk 
      let heightDisk = disk.name.height
      // Vi tri cua disk trong mang Disks
      let posOfDisks = disk.name.posOfDisks
      //Vi tri cua disk trong Tower
      let posOfTower = disk.name.posOfTower
      console.log('posOfTower:' + posOfTower);
      // Toa do cua dia ban dau theo truc X 
      let cooX = disk.name.x_

      // Toa do cua dia ban dau theo truc Y
      let cooY =  svgFrame.towerFrame - (3 * svgFrame.marginX) - heightDisk * posOfTower
      //  let cooY = (svgFrame.height - svgFrame.marginY - heightDisk) - heightDisk * posOfTower 
      //  console.log(cooY)

      // Kiem tra so luong dia trong thap dich
      let counter = disk.toTower.diskOfTower
      // console.log(counter.length)
      // Toa do moi cua Disk khi di chuyen truc X 
      let newCooX = cooX + distance
      // Toa do moi cua Disk theo truc Y
      

      let newCooY =  heightDisk * posOfTower - counter * 
      console.log("newCooY: " + newCooY);

      this.diskOfTowerUpdate(disk.name, disk.fromTower, disk.toTower)
      

      d3.selectAll('.disk-svg' + posOfDisks )
      .transition()
      .delay(i * 3000)
      .duration(1000)
      .attr('transform', 'translate('+ cooX +','+ -cooY +')')
      .transition()
      .attr('transform', 'translate('+ newCooX +', '+ -cooY +')')
      .transition()
      .attr('transform', 'translate('+ newCooX +','+ newCooY +')')

      disk.name.x_  += distance
      
    })
  }
}


// Khai bao khung SVG
const svgFrame = {
  width: 1200,
  height: 500,
  towerFrame: 400,
  disNear: 400,
  disFar: 800,
  diskHeight: 50,
  marginX: 50,
  marginY: 50,
  thick: 15
}

const svg = d3.select('body').append('svg')
svg.attr('class', 'main-svg')
svg.attr('width', svgFrame.width)
svg.attr('height', svgFrame.height)


let numberTower = 3 // So luong thap
let numberDisk = 2
let towers = []
let disks = []




// Draw Tower
for (let i = 0; i < numberTower; i++) {
  if (i === 0) {
    towers.push(new Tower('Tower' + (i + 1), disks)) // Ve dia tren Tower1
  } else {
    towers.push(new Tower('Tower' + (i + 1), [])) // Cac Tower khac trong
  }
  towers[i].drawTower(i)
}

// Draw Disk
for (let i = 0; i < numberDisk; i++) {
  disks.push(new Disk('Disk' + (i+1), i + 1, numberDisk - 1 - i))
  disks[i].drawDisk()
}







let game = new GameEngine()
game.move(disks.length, towers[0], towers[1], towers[2])
game.start()





