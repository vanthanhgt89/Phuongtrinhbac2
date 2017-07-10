/**
 * Arrow funcition demo
 * - Mot tham so co the xoa dau ()
 * - 1 dong lenh co the bo return
 */
let arr = [1,4,5,6,3,5]
// arr.forEach(function(e){
//   console.log(e)
// })

// let arr1 = arr.map(function (e) {
//   return e * 2
// })
// console.log(arr1)

let arr1 = arr.map(e =>{
  return e * 2
})
let arr2 = arr.map(e =>
  e * 2
)
console.log(arr1)

// arr.forEach( (e) => console.log(e) )
// let arr2 = arr.map( (e) => e * 2)
// console.log(arr2)

// function add(a, b){
//   return a + b
// }

let add = (a, b) => a + b
console.log(add(4,5))
