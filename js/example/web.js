function palindrome(str) {
  let arr = str.split(' ')

  for(let i = 0; i < arr.length; i ++){
    let item = arr[i].slice(0,1).toUpperCase().concat(arr[i].slice(1,arr[i].length))
    
  }
  return arr.join(' ');
  
  
  
  
}



console.log(palindrome("I'm a little tea pot"))