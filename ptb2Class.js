class Ptb2 {
  constructor(a, b, c) {
    this.a = a
    this.b = b
    this.c = c
  }
  input() {
    if (this.a !== 0) {
      let delta = (this.b * this.b) - (4 * this.a * this.c);
      if (delta < 0) {
        return 'phuong trinh vo nghiem'
      } else if (delta === 0) {
        return x = -this.b / (2 * this.a)
      } else if (delta > 0) {
        let x1 = (-this.b + Math.sqrt(delta)) / (2 * this.a)
        let x2 = (-this.b - Math.sqrt(delta)) / (2 * this.a)
        return [x1, x2]
      }
    } else {
      return 'a phai khac khong'
    }
  }
}

// let a = new Ptb2(1,2,3);
// console.log(a.input())
class Ptb3 {
  constructor() {
    
  }
  input(a,b,c) {
    if (a !== 0) {
      let delta = (b * b) - (4 * a * c);
      if (delta < 0) {
        console.log(delta)
        return 'phuong trinh vo nghiem'
      } else if (delta === 0) {
        return x = -b / (2 * a)
      } else if (delta > 0) {
        let x1 = (-b + Math.sqrt(delta)) / (2 * a)
        let x2 = (-b - Math.sqrt(delta)) / (2 * a)
        return [x1, x2]
      }
    } else {
      return 'a phai khac khong'
    }
  }
}

// let b = new Ptb3();
// console.log(b.input(1,2,3))

class Pt4 extends Ptb2{
  constructor(a,b,c,d){
    super(a,b,c)
    this.d = d
  }
}

let c = new Pt4(1,2,3,4)
// console.log(c.input())
// console.log(c.d)


class Pt5 extends Ptb3{
  constructor(){
    super()
  }
}
let f = new Pt5();
console.log(f.input(1,2,3))

