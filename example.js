// let i = 0;

// do {
//   setTimeout(function() {
//     console.log(i)    
//   }, 0);
//   i++
// } while (i < 10);

let i = 0

function print(i) {
  setTimeout(function() {
    console.log(i)
  }, 0);
}
// async - await
async function loop() {
  do {
    await print(i)
    i++
  } while (i<10);
}

loop()