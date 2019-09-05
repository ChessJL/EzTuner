var gs1=document.getElementById("gs1");
var gs2=document.getElementById("gs2");
var gs3=document.getElementById("gs3");
var gs4=document.getElementById("gs4");
var gs5=document.getElementById("gs5");
var gs6=document.getElementById("gs6");
var gs=document.getElementsByClassName("gs");


gs1.addEventListener("click",selectstring);
gs2.addEventListener("click",selectstring);
gs3.addEventListener("click",selectstring);
gs4.addEventListener("click",selectstring);
gs5.addEventListener("click",selectstring);
gs6.addEventListener("click",selectstring);

// Change color when select the string
function selectstring(){
  var counter = 0;
  for (var i = 0; i < gs.length; i++) { //chech any string is selected or not.
    if(gs[i].style.background === "blue"){
      counter = counter +1;
    }
  }
  if (counter == 6 ) {   // no strings have been selected
    this.style.background = "red";
  }else{   // some string have been selected
    for (var i = 0; i < gs.length; i++) {
      gs[i].style.background = "blue" //change all back to blue
    }
    this.style.background = "red";  //change the select one to red
  }
}
