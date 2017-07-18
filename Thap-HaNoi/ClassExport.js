class Disk {
  constructor(nameTower, posOfDisks, posOfTower) {
    this.name = nameTower // tên đĩa
    this.posOfDisks = posOfDisks // Vị trí trong mảng chứa đĩa Disks
    this.posOfTower = posOfTower  // Vị trí trên tháp
    this.height = svgFrame.diskHeight // Chiều dày của đĩa
    this.x_ = 0 // Tọa độ sau khi vẽ xong ở điểm bắt đầu (0,0)
  }
  drawDisk() {
    svg.append('rect') // Vẽ hình chữ nhật
      .attr('class', 'disk-svg' + this.posOfDisks) // Thêm class
      .attr('rx', 5) // border-radius trục X
      .attr('ry', 5) // boder-radius trục Y
      .attr('width', this.height * (this.posOfDisks + 1)) // Chiều dài đĩa 
      .attr('height', this.height) // Chiều rộng đĩa
      .attr('x', (svgFrame.towerFrame / 2) - (this.height * (this.posOfDisks + 1)) / 2) // Tọa độ X (i số tự tự đĩa: i tăng 0 ---> length)
      .attr('y', (svgFrame.height - svgFrame.marginY - this.height) - this.height * this.posOfTower) // Tọa độ Y (n so thu tutọa độ trục Y: n giam length ---> 0)
      .style('fill', function () { // Random màu fill
        return "hsl(" + Math.random() * 360 + ",80%,60%)";
      })
  }
}

class Bird {
  constructor(name) {
    this.name
    this.height = 100
  }

  drawBird() {
    svg.append('image')
      .attr('href', svgFrame.birdImg)
      .attr('x', (svgFrame.towerFrame / 2) - this.height)
      .attr('y', 100)
      .attr('width', 100)
      .attr('height', 100)
      .attr('class','bird')
  }
}


class Tower {
  constructor(name, diskOfTower) {
    this.name = name // Tên tháp
    this.diskOfTower = diskOfTower // Số lượng đĩa có trong tháp dạng array
    this.towerWidth = svgFrame.towerFrame // khung tower
    this.thick = svgFrame.thick // Chiều dày tháp
    this.marginX = svgFrame.marginX // Khoảng cách trục X
    this.marginY = svgFrame.marginY // Khoảng cách trục Y
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
      .attr('height', this.towerWidth - (3 * this.marginX)) // Chiều dài tháp = width - k/c 2 bên 
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
      // console.log(`Move  Disk ${n} from ${col1.name} to ${col3.name}`)

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
    } else if (tower1 === 'Tower2' && tower2 === 'Tower1' || tower1 === 'Tower3' && tower2 === 'Tower2') {
      return -svgFrame.disNear // Khoang cach thap 2 ---> 1 , 3 ---->1 : -disNear di nguoc
    } else if (tower1 === 'Tower1' && tower2 === 'Tower3') {
      return svgFrame.disFar // Khoang cach thap 1 ---> 3:  disFar
    } else if (tower1 === 'Tower3' && tower2 === 'Tower1') {
      return -svgFrame.disFar // Khoang cach thap 3 ---> 1:  -disFar Di nguoc
    }
  }

  diskOfTowerUpdate(disk, tower1, tower2) {
    tower1.diskOfTower.pop() // Loai bo dia cuoi cung trong thap khi di chuyen tu thap bat dau sang thap dick
    tower2.diskOfTower.push(disk) // Them dia vao thap dick
  }

  start() {
    this.data.forEach((disk, i) => {
      // Khoang cach giua 2 thap
      let distance = this.distanceTower(disk.fromTower.name, disk.toTower.name)
      // Chieu cao cua disk 
      let heightDisk = disk.name.height
      // Vi tri cua disk trong mang Disks
      let posOfDisks = disk.name.posOfDisks
      //Vi tri cua disk trong Tower
      let posOfTower = disk.name.posOfTower
      // Toa do cua dia ban dau theo truc X 
      let cooX = disk.name.x_
      // Toa do cua dia ban dau theo truc Y
      let cooY = svgFrame.towerFrame - (3 * svgFrame.marginX) - heightDisk * posOfTower
      // Kiem tra so luong dia trong thap dich
      let counter = disk.toTower.diskOfTower.length
      // console.log(counter.length)
      // Toa do moi cua Disk khi di chuyen truc X 
      let newCooX = cooX + distance
      // Toa do moi cua Disk theo truc Y
      let newCooY = heightDisk * posOfTower - counter * heightDisk
      // Cập nhập lại đĩa có trong tháp
      this.diskOfTowerUpdate(disk.name, disk.fromTower, disk.toTower)


       // Disk amimate  
      // d3.selectAll(('.disk-svg' + posOfDisks) + ',' + '.bird')
      d3.selectAll(('.disk-svg' + posOfDisks))
        .transition()
        .delay(i * 3000 + 1000)
        .duration(1000)
        .attr('transform', 'translate(' + cooX + ',' + -cooY + ')')
        .transition()
        .attr('transform', 'translate(' + newCooX + ', ' + -cooY + ')')
        .transition()
        .attr('transform', 'translate(' + newCooX + ',' + newCooY + ')')
 

      // Bird amimate
       d3.selectAll('.bird')
        .transition()
        .delay(i * 3000)
        .duration(1000)
        .attr('transform', 'translate(' + cooX + ',' + cooY + ')')
        .transition()
        .attr('transform', 'translate(' + cooX + ',' + 0 + ')')
        .transition()
        .attr('transform', 'translate(' + newCooX + ', ' + 0 + ')')
        .transition()
        .attr('transform', 'translate(' + newCooX + ',' + cooY + ')')
        .transition()
        .attr('transform', 'translate(' + newCooX + ',' + 0 + ')')
        .transition()
        .attr('transform', 'translate(' + -cooX + ',' + 0 + ')')
        .transition()
        .attr('transform', 'translate(' + -cooX + ',' + cooY + ')')

       
      // Thay đổi vị trí đĩa  
      disk.name.x_ += distance

    })
  }
}


// Khai báo khung SVG
const svgFrame = {
  width: 1200, // Width khung svg để vẽ tháp
  height: 500, // Height khung svg
  towerFrame: 400, // Khung tower có 3 tháp nên chia đều khung svg cho 3 tháp
  disNear: 400, // Khoảng cách tower liền kề nhau
  disFar: 800, // Khoảng cách tower xa nhau
  diskHeight: 30, // Chiều dày đĩa
  marginX: 50, // margin trục X trong khung tower
  marginY: 50, // margin trục Y trong khung tower
  thick: 15, // Chiều dày tháp tower
  birdImg: './bird.gif' // url image
}

const svg = d3.select('body').append('svg')
svg.attr('class', 'main-svg')
svg.attr('width', svgFrame.width)
svg.attr('height', svgFrame.height)








