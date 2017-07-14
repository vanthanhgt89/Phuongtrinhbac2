class Tower {
  contructor(){}

  changeDist(dist, colA,colB,colC){
    if(dist > 0){
      this.changeDist(dist-1,colA,colC,colB)
      console.log(`Move ${dist} from ${colA} --> ${colC}: `)
      this.changeDist(dist-1,colB,colA,colC)
    }
  }
}


let tower = new Tower()

tower.changeDist(3, "colA", "colB", "colC")