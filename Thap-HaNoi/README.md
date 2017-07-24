# Hà Nội Tower
## Giới thiệu
* Ngôn ngữ JavaScript: Lập trình hướng đối tượng
* D3Js 
## Logic (algrorithm)
#### Sử dụng đệ qui 
```js
class TowerDemo {
  constructor() { }
  changeDisk(Disk, colA, colB, colC) {
    if (Disk > 0) {
      this.changeDisk(Disk - 1, colA, colC, colB)
      console.log(`Move ${Disk} from ${colA} --> ${colC} `)
      this.changeDisk(Disk - 1, colB, colA, colC)
    }
  }
}
let tower = new Tower()
tower.changeDisk(2, "colA", "colB", "colC")
```
  * colA: tháp bắt đầu
  * colB: tháp trung gian,
  * colC: tháp đích
  * Disk: số lượng đĩa cần di chuyển
  
#### Các giải
  * Chuyển n - 1  đĩa từ tháp bắt đầu A () tới tháp trung gianB--->(~ tháp đích) chuyển B tháp bắt đầu lúc này C là tháp trung gian
  * Chuyển đĩa n từ tháp bắt đầu A tới tháp đích C
  * Chuyển n - 1 đĩa từ tháp B (~ tháp bắt đầu) qua tháp C (~ tháp đích) lúc này A là tháp trung gian
  * Tiến hành bước 1 và 3, áp dụng lại thuật giải cho n-1.
## Soure code: sử dụng ES6 and OOPOOP
#### Bước 1
* Tạo các đối tượng Disk, Tower, GameEngine
```js
class Disk {
  constructor(name){
    this.name = name
  }
}

class Tower{
  constructor(name){
    this.name = name
  }
}

class GameEngine{
  constructor(){
    this.counter // Dem cac buoc thuc hien 
  }
  move(disk,col1,col2,col3){
    if(disk > 0){
      move(disk - 1, col1, col3, col2)
      console.log(`move ${disk} from ${col1} to ${col2}`)
      move(disk-1, col2, col1, col3)
    }
  }
}
```
* Khởi tạo các đối tượng chạy thử trên console
```js
  let disks = [new Disk('Disk1'), new Disk('Disk2'), new Disk('Disk3')]
  let towers = [new Tower('Tower1'), new Tower('Tower2'), new Tower('Tower3'),]
  let game = new GameEngine()
  game.move(disks.length, towers[0], tower[1], tower[2])
```
```
console hien thi
Move 1 from colA --> colB 
Move 2 from colA --> colC 
Move 1 from colB --> colC 

```
#### Bước 2: Thêm biến data cho class GameEngine để lưu lại các bước thực hiện bài toán
* Lưu dữ liệu từng bước (step) chuyển đĩa vào đối tượng GameEngine để xử lý
* Dữ liệu step kiểu đối tượng các 3 thuộc tính:
  * name: tên đĩa {object Disk}
  * fromTower: di chuyển từ tháp {} 
  * toTower: di chuyển đến tháp {}
* Mỗi step được lưu trữ trong dữ liệu data []

```js
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
        name: disks[n - 1] // Phần tử cuối cùng của disks[]
        fromTower: col1, // Tháp bắt đầu
        toTower: col3 // Tháp đích
      }
      this.data.push(this.step)
      this.counter++
      this.move(n - 1, col2, col1, col3)
    }
  }
}
```
* Data lưu tại step với thông tin đối tượng disk đi chuyển, đối tượng tháp bắt đầu, đối tượng tháp đến từ đó ta có thể lấy ta dữ liệu từng step để tính toán

#### Bước 3: Draw
* Thêm phương thức draw cho đối tượng Disk và Tower (mặc định 3 tháp)
* Tạo khung SVG để vẽ tháp, tính toán các khoảng các cho 1 khung chứa 1 tháp (tháp còn lại tượng tự cộng thêm k/c toạ độ X)
```js
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
```

* Dựa vào khung ở trên chia 1 tower chiếm 1200/3 = 400 width tiến hành vẽ tháp
* Thêm các thuộc tính từ svgFrame để vẽ tháp

```js
> Tower
// Them thuộc tính (disOfTower) để kiểm tra số lượng đĩa trong tháp từ đó tính toạ độ Y của đĩa trong tháp
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
> Disk
// Trong đối tượng Disk thêm 2 thuộc tính vị trí trong mảng disks (posOfTower) và vị trí trên tháp (posOfTower)
// Vị trí trong mảng để tính độ dài của đĩa vị trí càng lớn độ dài càng lớn
// Vị trí trong tháp để tính toạn độ theo trục Y vị trí càng cao thì Y càng giảm
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
let numberTower = 3 // So luong thap
let numberDisk = 3 // Số lượng đĩa
let towers = []
let disks = []
// Vẽ tháp
for (let i = 0; i < numberTower; i++) {
      if (i === 0) {
        towers.push(new Tower('Tower' + (i + 1), disks)) // Vẽ đĩa tên Tower1
      } else {
        towers.push(new Tower('Tower' + (i + 1), [])) // Các Tower còn lại trống
      }
      towers[i].drawTower(i)
}

//Vẽ đĩa
for (let i = 0; i < numberDisk; i++) {
        disks.push(new Disk('Disk' + (i + 1), i + 1, numberDisk - 1 - i))
        disks[i].drawDisk()
}
```

* Trong đối tượng GameEngine thêm 2 phương thức:
  * distanceTower(tower1,tower2)==> trả về khoảng cách giữa 2 tháp khi đĩa di chuyển
  * diskOfTowerUpdate(disk, tower1, tower2) ==> khi đĩa di chuyển số lượng đĩa trong tháp bắt đầu loại bỏ phần tử cuối, và tháp đích thêm đĩa di chuyển tới  
#### Animation

* Trong GameEngine thêm phương thức start() để tạo animation cho game
```js
  start() {
    this.data.forEach((disk, i) => {
      // Lấy khoảng cách giữa 2 tháp theo từng step
      let distance = this.distanceTower(disk.fromTower.name, disk.toTower.name)
      // Chiều cao của đĩa
      let heightDisk = disk.name.height
      // Vị trí của đĩa trong mảng Disks
      let posOfDisks = disk.name.posOfDisks
      //Vị trí của đĩa trong Tower
      let posOfTower = disk.name.posOfTower
      // Toa do cua dia ban dau theo truc X (lúc đầu chưa di chuyển toạ độ (0,0))
      let cooX = disk.name.x_ 
      // Toa do cua dia ban dau theo truc Y
      let cooY = svgFrame.towerFrame - (3 * svgFrame.marginX) - heightDisk * posOfTower
      // Kiểm tra số lượng đĩa đang có trong tháp đích
      let counter = disk.toTower.diskOfTower.length
      // console.log(counter.length)
      // Toạ độ mới của disk theo trục X
      let newCooX = cooX + distance
      // Toạ độ mới của disk theo theo trục Y
      let newCooY = heightDisk * posOfTower - counter * heightDisk
      // Cập nhập lại đĩa có trong tháp
      this.diskOfTowerUpdate(disk.name, disk.fromTower, disk.toTower)

       // Disk amimate  sử dụng D3JS
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

       
      // Cập nhật lại toạ độ của disk 
      disk.name.x_ += distance

    })
  }

```
#### Bước 5: Hoàn thiện thêm đối tượng Bird tạo thêm hiệu ứng animation cho đẹp, sử lý thêm logic tuỳ thuộc và độ các của tháp khi vẽ ở trên

```js
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
```

* Hoàn thành source code runing trên wedbower để kiểm tra từng bước






