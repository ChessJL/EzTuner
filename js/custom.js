var gs1=document.getElementById("gs1");
var gs2=document.getElementById("gs2");
var gs3=document.getElementById("gs3");
var gs4=document.getElementById("gs4");
var gs5=document.getElementById("gs5");
var gs6=document.getElementById("gs6");
var gs=document.getElementsByClassName("gs");

var freq_gs1 =['gs1',328.5,331,234,254,'E1'];   //329.6
var freq_gs2 =['gs2',245,247.5,173,193,'A2'];   //246.9
var freq_gs3 =['gs3',195.5,197.5,135,155,'D3']; //196
var freq_gs4 =['gs4',145.5,148,99,119,'G4'];    //146.8
var freq_gs5 =['gs5',109.5,111,71,91,'B5'];     //110
var freq_gs6 =['gs6',81.41,83.41,51,71,'E6'];   //82.41

var selected = [0,0,0,0,0,0];
var correct;

gs1.addEventListener("click",selectstring);
gs2.addEventListener("click",selectstring);
gs3.addEventListener("click",selectstring);
gs4.addEventListener("click",selectstring);
gs5.addEventListener("click",selectstring);
gs6.addEventListener("click",selectstring);

gs1.addEventListener("click", check);
gs2.addEventListener("click", check);
gs3.addEventListener("click", check);
gs4.addEventListener("click", check);
gs5.addEventListener("click", check);
gs6.addEventListener("click", check);

// pitch frequency
function checkchord(){
  if(getLoudestFrequency(selected[3],selected[4])<selected[2] && getLoudestFrequency(selected[3],selected[4])>selected[1]){
    correct = true;
    return selected[5];
  }else if (selected[5]!== 0 ) {
    correct = false;
    return selected[5];
  }else{
    return "Select a string";
  }
}

//Check user is clicking Guitar string or Ukulele string.
function check(){
  if(this.className === 'gs'){
    if(this.id === freq_gs1[0]){
      selected = freq_gs1;
    }
    else if (this.id === freq_gs2[0]){
      selected = freq_gs2;
    }
    else if (this.id === freq_gs3[0]){
      selected = freq_gs3;
    }
    else if (this.id === freq_gs4[0]){
      selected = freq_gs4;
    }
    else if (this.id === freq_gs5[0]){
      selected = freq_gs5;
    }
    else if (this.id === freq_gs6[0]){
      selected = freq_gs6;
    }
  }else if (this.className ==='ukulele') {

  }
}
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
