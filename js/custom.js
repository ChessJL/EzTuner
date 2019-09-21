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


//Find the loudest Frequency

function getLoudestFrequency() {
    var halfsampleRate = sampleRate() / 2; // 22050
    var spectrum = fft.analyze(); // array of amplitudes in bins
    var bins = spectrum.length;  // 16384 bins
    var maxAmp = 0;
    var largestBin;
  // each bin equal to 22050/16384 = 1.346 Hz
    for (var i = 0; i < 500; i++) { //for loop to find the largest amplitude of bin
        var thisAmp = spectrum[i]; // amplitude of current bin
        if (thisAmp > maxAmp) {
            maxAmp = thisAmp;
            largestBin = i; //store the location of largestbin
        }
    }
    var loudestFreq = largestBin * (halfsampleRate / bins);
    return loudestFreq;
}

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
