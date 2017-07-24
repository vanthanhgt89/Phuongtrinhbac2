// Kiem tra nam nhuan: 
// Năm nhuận là một năm có thêm một ngày được thêm vào để giữ cho năm theo lịch đồng bộ với năm thiên văn hoặc theo mùa

function checkLeapYear(year){
  return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0)
}
// console.log(checkLeapYear(1608))

// Write a JavaScript program to find which 1st January is being a Sunday between 2014 and 2050.
// Tim ngay 1/1 sunday tu nam 2014 den 2050
// dd = new Date(year, mouth, date)
// return year: fullYear, mouth: 0-->11, date: 1 --> 31

function findDay(){
  let days =[]
  // let listDay = [ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  for (let i = 2014; i <= 2050 ; i ++){
    let day = new Date(i, 0, 1)
    let dd = day.getDay()
    if(dd === 0){
      let fullDay =  'sunday 1/1/' + day.getFullYear(i) 
      days.push(fullDay)
    }
  }
  return days
}

// console.log(findDay());


// Write a JavaScript program to calculate number of days left until next Christmas.

function calDayToChris(){
  let today = new Date()
  let cms = new Date(today.getFullYear(),11,25)
  console.log(cms);

}

console.log(calDayToChris());