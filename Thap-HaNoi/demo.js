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
let tower = new TowerDemo()
tower.changeDisk(2, "colA", "colB", "colC")