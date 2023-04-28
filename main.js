const dayInp = document.getElementById("day");
const monthInp = document.getElementById("month");
const yearInp = document.getElementById("year");

const dayOtp = document.getElementById("DD");
const monthOtp = document.getElementById("MM");
const yearOtp = document.getElementById("YY");

const form = document.querySelector("form");

const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;
  inputs.forEach((i) => {
    const parent = i.parentElement;
    if (!i.value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "this field is required.";
      validator = false;
    } else if (monthInp.value > 12 || monthInp.value<1) {
        monthInp.style.borderColor = "red";
        monthInp.parentElement.querySelector("small").innerText = "must be valid month.";
        validator = false;
    } else {
      const year = parseInt(yearInp.value);
      const month = parseInt(monthInp.value);
      const day = parseInt(dayInp.value);
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth || day<1) {
       dayInp.style.borderColor = "red";
        dayInp.parentElement.querySelector("small").innerText = "must be a valid date.";
        validator = false;
      } else {
        i.style.borderColor = "black";
        parent.querySelector("small").innerText = "";
        validator = true;


      }
    }
  });
  return validator;
}


function handleSubmit(e) {
  e.preventDefault();
  if (validate()) {
    if (yearInp.value > year || (yearInp.value == year && monthInp.value > month) || (yearInp.value == year && monthInp.value == month && dayInp.value > day)) {
      dayOtp.innerHTML = "00";
      monthOtp.innerHTML = "00";
      yearOtp.innerHTML = "00";
    } else {
     
      if (dayInp.value > day) {
        day = day + months[month - 1] ;
        month =  month - 1;
      } 
      

      if ((monthInp.value) > month) {
       month=month+12;
        year=year-1;
      } 
      const d=day-dayInp.value;
      const m=month-monthInp.value;
      const y=year-yearInp.value;
      
      let p = (year - parseInt(yearInp.value))/4;
      let result = Math.round(p);
      if(parseInt(monthInp.value) > 2) {
        result--;}
        if (m>=12){
          y=y+1;
          m=m-12;

          
        }
        if(d>=30){
          m=m+1;
          d=d-30;

        }

        

      dayOtp.innerHTML = d +result;
      monthOtp.innerHTML = m;
      yearOtp.innerHTML = y;
    }
  }
}


form.addEventListener("submit", handleSubmit);
