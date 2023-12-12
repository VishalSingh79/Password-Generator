let passwordLength=document.querySelector(".displayLength");
let rangeLength=document.querySelector(".displayrange");
//console.log(passwordLength);
//console.log(rangeLength);
let password="";
let passw=10;
handleSlider();
function handleSlider(){
    passwordLength.innerText=passw;
    rangeLength.value=passw;
    let min=passw;
    let max=20;

    let per=(((min)/max)*100);
    rangeLength.style.cssText=`background-size:${per}% 100%`;
}

rangeLength.addEventListener("input",function(event)
{
passw=event.target.value;
handleSlider();
});

//other method to update the password Length

// rangeLength.addEventListener("click",function(event)
// {
// passw=event.target.value;
// handleSlider();
// });

function getrndnumber(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}
let j=0;
function getUppercase()
{
    return String.fromCharCode(getrndnumber(65,91));
   
}


function getLowercase()
{
    return String.fromCharCode(getrndnumber(97,123));
}

function getnumber()
{
    return getrndnumber(0,9);
}

let arr=['~','!','@','#','$','%','^','&','*','(',')','/','<','>','?','-'];

function getSymbols()
{
    return arr[getrndnumber(0,arr.length-1)];
}
let setindicator=document.querySelector(".displayStrength");
function getindicator(color){
    //  <-----------------Method 1 to change shadow------------------------->
  //  if(color=="green")
    //  setindicator.style.cssText="box-shadow:0px 0px 20px green";
    // if(color=="orange")
    //  setindicator.style.cssText="box-shadow:0px 0px 20px orange";
    // if(color=="red")
    //  setindicator.style.cssText="box-shadow:0px 0px 20px red";
    //  <-----------------Method 2 to change shadow-------------------------> :
    setindicator.style.boxShadow=`0px 0px 20px ${color}`;
    return setindicator.style.background=color;
}


let hasUppercase=document.querySelector("[hasuppercase]");
let hasLowercase=document.querySelector("[haslowercase]");
let hasNumber=document.querySelector("[hasnum]");
let hasSymbol=document.querySelector("[hassymbol]");


function strengthCalc()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSymbol=false;
    if(hasUppercase.checked) hasUpper=true;
    if(hasLowercase.checked) hasLower=true;
    if(hasNumber.checked) hasNum=true;
    if(hasSymbol.checked) hasSymbol=true;

    if(hasUpper&&hasLower&&(hasNum||hasSymbol)&&passw>=8){
        getindicator("green");
    }
    else if((hasUpper||hasLower)&&(hasNum||hasSymbol)&&passw>=6){
        getindicator("orange");
    }
    else{
       getindicator("red");
    }
}
let copytext=document.querySelector(".copytext");
let showpassword=document.querySelector(".passwordDisplay")
async function copymsg(){
   if(password){
    try{
        await navigator.clipboard.writeText(showpassword.value);
        copytext.innerText="copied";
    }
    catch(e){
        copytext.innerText="failed";
    }
    copytext.classList.add("active");
    setTimeout(()=>{
        copytext.classList.remove("active");
    },2000);
} 
}

let cpybtn=document.querySelector("[cpybtn]");

cpybtn.addEventListener('click',()=>{
    copymsg();
});

function checkcount(){
    let count=0;
    if(hasUppercase.checked){
        count++;
       } 
        if(hasLowercase.checked) {
            count++;
        }
        if(hasNumber.checked){
            
            count++;
        }
        if(hasSymbol.checked){
            count++;
        }
        if(passw<count)
        {
        passw=count;
        handleSlider();
        }
}


let getPassword=document.querySelector("[getpassword]");

function generatePassword(){
   password="";
   
   let funcarr=[];
   let count=0;
   if(hasUppercase.checked){
    funcarr.push(getUppercase);
    count++;
   } ;
    if(hasLowercase.checked) {
        funcarr.push(getLowercase);
        count++;
    };
    if(hasNumber.checked){
        funcarr.push(getnumber);
        count++;
    };
    if(hasSymbol.checked){
        funcarr.push(getSymbols);
        count++;
    };
    if(count==0)
         return ;
    
    else if(passw<count)
    {
        passw=count;
        handleSlider();
    }     

    for(let i=0;i<count;i++){
        password=password + funcarr[i]();
      //  console.log(password);
    }
    for(i=count;i<passw;i++)
    {
       // console.log(i);
       let c=getrndnumber(0,count);
        password=password + funcarr[c]();
       // console.log(password);
    }
   // console.log(passw);
   //console.log(getrndnumber(0,count));
    showpassword.value=password;
    strengthCalc();
    
}