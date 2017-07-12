/**
 * In dao nguoc n so nguyen duong
 */

let out = console.log
function printReverse(n){
  if(n === 1 ) return 1
  return '1 / ' + n.toString() + ' --> '+ printReverse(n-1) 
}

// out(printReverse(5))

/**
 * Dem so luong so nguyen duong n
 */

function couterNumber(n){
  if(n === 0) return 0
  if(n > 0 && n < 10) return 1
  return 1 + couterNumber(n/10)
}

// out(couterNumber(55555))


/**
 * Tim chu so co gia tri lon nhat cua so nguyen duong n
 * 
 */
 function maxNumber(n){
   if(n > 0 && n < 10) return n
   return Math.max.apply(null,n.toString().split(''))
 }

// out(maxNumber(1954))

//  Tính S(n)=1+3+5+…+(2.n+1) với n>=0


