// Loading sounds for strings
var e3= new Audio();
var a3= new Audio();
var d4= new Audio();
var g4= new Audio();
var b4= new Audio();
var e5= new Audio();

var ug4= new Audio();
var uc4= new Audio();
var ue4= new Audio();
var ua4= new Audio();

e3.src="https://www.gtdb.org/sounds/guitarmaps/E3.mp3";
a3.src="https://www.gtdb.org/sounds/guitarmaps/A3.mp3";
d4.src="https://www.gtdb.org/sounds/guitarmaps/D4.mp3";
g4.src="https://www.gtdb.org/sounds/guitarmaps/G4.mp3";
b4.src="https://www.gtdb.org/sounds/guitarmaps/B4.mp3";
e5.src="https://www.gtdb.org/sounds/guitarmaps/E5.mp3";

ug4.src="https://ukutuner.com/sounds/ukulele/G4.mp3";
uc4.src="https://ukutuner.com/sounds/ukulele/C4.mp3";
ue4.src="https://ukutuner.com/sounds/ukulele/E4.mp3";
ua4.src="https://ukutuner.com/sounds/ukulele/A4.mp3";

// Guitar string
var gs1=document.getElementById("gs1");
var gs2=document.getElementById("gs2");
var gs3=document.getElementById("gs3");
var gs4=document.getElementById("gs4");
var gs5=document.getElementById("gs5");
var gs6=document.getElementById("gs6");
var gs=document.getElementsByClassName("gs");

//Ukulele string
var us1=document.getElementById("us1");
var us2=document.getElementById("us2");
var us3=document.getElementById("us3");
var us4=document.getElementById("us4");
var us=document.getElementsByClassName("us");

var allchord=document.getElementById("allchord");
var filterchord=document.getElementById("filterchord");

// each bin equal to 22050/16384 = 1.346 Hz
//array information['str string name',
//                  'the lowest correct frequency'
//                  'the highest correct frequency'
//                  'the lowest bin location in a range for analyzing'
//                  'the highest bin location in a range for analyzing'
//                  'music note of the string'
//                  ]

var freq_gs1 =['gs1',328.5,331,234,254,'E1'];   //329.6
var freq_gs2 =['gs2',245,247.5,173,193,'B2'];   //246.9
var freq_gs3 =['gs3',195.5,197.5,135,155,'G3']; //196
var freq_gs4 =['gs4',145.5,148,99,119,'D4'];    //146.8
var freq_gs5 =['gs5',109.5,111,71,91,'A5'];     //110
var freq_gs6 =['gs6',81.41,83.41,51,71,'E6'];   //82.41

var freq_us1 =['us1',439.5,440.5,316,336,'A1'];   //440
var freq_us2 =['us2',328.5,331,234,254,'E2'];   //329.6
var freq_us3 =['us3',261,262.2,184,204,'C3']; //261.63
var freq_us4 =['us4',391.5,392.5,281,301,'G4'];  //392


var selected = [0,0,0,0,0,0];
var loudestFreq;

if (gs.length!==0) { //check in guitar page or in ukulele page
  gs1.addEventListener("click",selectstring);
  gs2.addEventListener("click",selectstring);
  gs3.addEventListener("click",selectstring);
  gs4.addEventListener("click",selectstring);
  gs5.addEventListener("click",selectstring);
  gs6.addEventListener("click",selectstring);

  gs1.addEventListener("click", readstringinfo);
  gs2.addEventListener("click", readstringinfo);
  gs3.addEventListener("click", readstringinfo);
  gs4.addEventListener("click", readstringinfo);
  gs5.addEventListener("click", readstringinfo);
  gs6.addEventListener("click", readstringinfo);


}else {
  us1.addEventListener("click",selectstring);
  us2.addEventListener("click",selectstring);
  us3.addEventListener("click",selectstring);
  us4.addEventListener("click",selectstring);

  us1.addEventListener("click", readstringinfo);
  us2.addEventListener("click", readstringinfo);
  us3.addEventListener("click", readstringinfo);
  us4.addEventListener("click", readstringinfo);

}



// Indicator

function indicator(){
  //if the pitch is correct, it shows green color.
  if(getLoudestFrequency(selected[3],selected[4])<selected[2] && getLoudestFrequency(selected[3],selected[4])>selected[1]){
    fill(3, 255, 1);
    text('<',235,50);
    text(selected[5],150,50);
    text('>',65,50);
  }else if (selected[5]!== 0 ) { //if the pitch is not correct, and the tuner do not detect any sound.
    fill(255);
    text(selected[5],150,50);
    text('<',235,50);
    text('>',65,50);
    if(getLoudestFrequency(selected[3],selected[4])>selected[2]){ //change color of the arrows if the pitch is too high.
      fill(220,53,69);
      text('<',235,50);
      fill(255);
      text('>',65,50);
    }else if (getLoudestFrequency(selected[3],selected[4])<selected[1]) { //change color of the arrows if the pitch is too low.
      fill(255);
      text('<',235,50);
      fill(220,53,69);
      text('>',65,50);
    }
  }else{   // if user has not choosen any string.
    fill(255);
    text("Select a string",150,50);
  }
}

//Check user is clicking Guitar string or Ukulele string.

function readstringinfo(){
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
  }else if (this.className ==='us') {
    if(this.id === freq_us1[0]){
      selected = freq_us1;
    }
    else if (this.id === freq_us2[0]){
      selected = freq_us2;
    }
    else if (this.id === freq_us3[0]){
      selected = freq_us3;
    }
    else if (this.id === freq_us4[0]){
      selected = freq_us4;
    }
  }
}

//Find the loudest Frequency

function getLoudestFrequency(low,high) {
    var halfsampleRate = sampleRate() / 2; // 22050
    var spectrum = fft.analyze();               // array of amplitudes in bins
    var bins = spectrum.length;                 // 16384 bins
    var maxAmp = 0;
    var largestBin;
  // each bin equal to 22050/16384 = 1.346 Hz
    for (var i = low; i < high; i++) {          //for loop to find the largest amplitude of bin
        var thisAmp = spectrum[i];              // amplitude of current bin
        if (thisAmp > maxAmp) {
            maxAmp = thisAmp;
            if(maxAmp>150){                     //ignore the background sound effect
              largestBin = i;                   //store the location of largestbin
            }
        }
    }
    loudestFreq = largestBin * (halfsampleRate / bins);
    return loudestFreq;
}

// Change color when select the string
function selectstring(){
  var counter = 0;
  if (this.className === 'gs') {
    for (var i = 0; i < gs.length; i++) { //check any string is selected or not.
      if(gs[i].style.background === "blue"){
        counter = counter +1;
      }
    }
    if (counter == 6 ) {   // no strings have been selected
      this.style.background = "red";
      this.style.boxShadow = "0px 0px 20px 3px red";
    }else{   // one string have been selected
      for (var i = 0; i < gs.length; i++) {
        gs[i].style.background = "blue" //change all back to blue
        gs[i].style.boxShadow = "none";
      }
      this.style.background = "red";  //change the select one to red
      this.style.boxShadow = "0px 0px 20px 3px red";
    }
  }else if (this.className === 'us') {
    for (var i = 0; i < us.length; i++) { //check any string is selected or not.
      if(us[i].style.background === "blue"){
        counter = counter +1;
      }
    }
    if (counter == 4 ) {   // no strings have been selected
      this.style.background = "red";
      this.style.boxShadow = "0px 0px 20px 3px red";

    }else{   // one string have been selected
      for (var i = 0; i < us.length; i++) {
        us[i].style.background = "blue" //change all back to blue
        us[i].style.boxShadow = "none";

      }
      this.style.background = "red";  //change the select one to red
      this.style.boxShadow = "0px 0px 20px 3px red";

    }
  }

}

//Filter for showing chords
function filter(note){
  var chord = document.getElementsByClassName(note);
  var dropdownMenuButton = document.getElementById("dropdownMenuButton");
  var strings = '';
  if (note !== 'All') {
    allchord.style.display ="none";
    filterchord.style.display ="block";
    for (var i = 0; i < chord.length; i++) {
      strings += chord[i].outerHTML; // put the outerhtml into one string.
    };
    filterchord.innerHTML = strings;
    dropdownMenuButton.innerHTML = note; //change the dropdownbutton label
  }else{
    allchord.style.display ="block";
    filterchord.style.display ="none";
    dropdownMenuButton.innerHTML = 'Show ALL'; //change the dropdownbutton label
  }
}

function playsound(note){
  note.play();
}
