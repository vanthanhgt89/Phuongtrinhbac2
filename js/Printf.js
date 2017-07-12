exports.Printf = class {
  constructor(arg){
    this.arg = arg
  }

  print(){
    console.log(this.arg)
  }
}