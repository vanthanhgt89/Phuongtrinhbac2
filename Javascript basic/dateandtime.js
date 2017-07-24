/**
 * Hien thi ngay thang
 */

class displayDate{
  constructor(){
    this.listDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
  getDay(){
    let today = new Date()
    let day = today.getDay() // return day (0-->6)
    console.log('Today: ' + this.listDay[day]) 
    let hours = today.getHours()
    let minute = today.getMinutes()
    let second = today.getSeconds()
    console.log(`hours: ${hours} minute: ${minute} second: ${second}`)
    
    let day1 = new Date()
    day1.setDate(16)
    console.log(day1);

    let day2 = new Date()
    let dd = day2.getDate()
    let mm = day2.getMonth() + 1
    let yy = day2.getFullYear()

    if(dd < 10){
      dd = '0' + dd
    }
    if(mm < 10){
      mm = '0' + mm
    }

    console.log(`Today: ${dd}/${mm}/${yy}`)
  }
}


let day = new displayDate()
day.getDay()