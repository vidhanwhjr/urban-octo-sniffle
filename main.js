function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
}

function preload(){
  classifier = ml5.imageClassifier('MobileNet', modelloaded);
}
function modelloaded(){
  console.log('MODEL LOADEEEEEEEEEEEEEEEEEEEEED');
}
function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotresults);
}
var detected_name = '';
function gotresults(error, results){
 if(error){
   console.error(error);
 }
 else{
   if((results[0].confidence > 0.5) && (detected_name != results[0].label)){
     console.log(results);
     detected_name = results[0].label;
     var synth = window.speechSynthesis;
     data_to_be_spoken = "object detected is - "+ results[0].label;
     utterthis = new SpeechSynthesisUtterance(data_to_be_spoken);
     synth.speak(utterthis)

     document.getElementById("cow").innerHTML = results[0].label;
     document.getElementById("cat").innerHTML = results[0].confidence.toFixed(3);
   }
 }
}



