let numberTower = 3 // So luong thap
let towers = []
let disks = []

$('#draw').on('click', function () {
  try {
    d3.selectAll('svg >*').remove()
    disks = []
    let bird = new Bird('bird')
    bird.drawBird()
    let numberDisk = $('#disk').val()
    console.log(numberDisk);

    // Draw Tower
    for (let i = 0; i < numberTower; i++) {
      if (i === 0) {
        towers.push(new Tower('Tower' + (i + 1), disks)) // Ve dia tren Tower1
      } else {
        towers.push(new Tower('Tower' + (i + 1), [])) // Cac Tower khac trong
      }
      towers[i].drawTower(i)
    }

    if (numberDisk > 0 && numberDisk < 10) {
      // Draw Disk
      for (let i = 0; i < numberDisk; i++) {
        disks.push(new Disk('Disk' + (i + 1), i + 1, numberDisk - 1 - i))
        disks[i].drawDisk()
      }
    } else if (numberDisk >= 10 && numberDisk <= 15) {
      svgFrame.diskHeight = 15
      // Draw Disk
      for (let i = 0; i < numberDisk; i++) {
        disks.push(new Disk('Disk' + (i + 1), i + 1, numberDisk - 1 - i))
        disks[i].drawDisk()
      }
    }
    else {
      alert('Wrong input')
    }
  } catch (error) {
    alert(error.message)
  }

})

// Start game
$('#start').on('click', function () {
  try {
    let game = new GameEngine()
    game.move(disks.length, towers[0], towers[1], towers[2])
    game.start()
  } catch (error) {
    alert(error.message)
  }

})