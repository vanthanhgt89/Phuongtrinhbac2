// let json = require('./data-json.json')


let graph = {
  "nodes": [
    { x: 100, y: 100, name: 'A-0', fixed: true },
    { x: 400, y: 200, name: 'B-1', fixed: true },
    { x: 400, y: 400, name: 'C-2', fixed: true },
  ],
  "links": [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 1, target: 2 }
  ]
}

const width = 640
const height = 480

let svg = d3.select('body').append('sgv').attr(width, width).attr(height, height)

let nodes = graph.nodes
let links = graph.links
let force = d3.layout.force()
  .size([width, height]) //đặt giá trị trọng tâm là w/2,h/2
  .nodes(nodes) // gán nodes
  .links(links) // gán links
  .linkDistance(100) // đặt linkDistance
  .on('tick', tick) // gọi tới tick() function




// tạo link với data là mảng links
let link = svg.selectAll('.link')
  .data(links) //gán data links
  .enter().append('line') //tạo ra thẻ line
  .attr('class', 'link') //gán class

// tạo node với data là nodes
let node = svg.selectAll('.node')
  .data(nodes) //gán data nodes

// tạo nodeEnter vẽ ra thẻ g là thẻ cha
let nodeEnter = node
  .enter() //chạy vào thẻ đã gán data
  .append('g') //tạo ra các thẻ cha là g
  .call(force.drag)
//gọi tới force.drag để gán hành vi drag-drop cho thẻ g
// là thẻ cha của text và circle ở dưới

// trong thẻ g tạo ra thẻ circle là các hình tròn
nodeEnter.append('circle')
  .attr('r', 20) //gán bán kính bằng 20
  .attr('class', 'node') //gán class

// trong thẻ g tạo ra thẻ text để điền name của data
nodeEnter.append('text')
  .attr('dx', '-0.75em') //còn có thể bỏ attr này bằng CSS
  .attr('dy', '0.35em') //dx và dy để text ra giữa thẻ circle
  .text(function (d) {
    return d.name //trả về thuộc tính name của data cho text.
  })

force.start() //khởi động force layout với phương thức .start()

function tick() {
  // tick event chạy trong mỗi tick của mô phỏng và event đó sẽ update và hiển thị các nodes và links như code dưới đây
  // 'ontick' sẽ hiển thị layout ngay lập tức, còn 'onend' chỉ hiển thị 
  // sau khi layout đã hết động năng bên trong,làm ảnh hiển thị sau một 
  // thời gian ngắn.

  // ta có thể dùng attr transform thay cho cx và cy
  node.attr('transform', function (d) {
    return `translate( ${d.x} , ${d.y} )` //gán tọa độ x,y cho cx,cy
  }) //Vẫn ra kết quả tương tự trên
  // .attr('cx', function(d) { return d.x })
  // .attr('cy', function(d) { return d.y })

  link.attr('x1', function (d) {
    return d.source.x // gán tọa độ x của nguồn cho x1 của link
  })
    .attr('y1', function (d) {
      return d.source.y // gán tọa độ y của nguồn cho y1 của link
    })
    .attr('x2', function (d) {
      return d.target.x // gán tọa độ x của đích cho x2 của link
    })
    .attr('y2', function (d) {
      return d.target.y // gán tọa độ y của đích cho y2 của link
    })
}