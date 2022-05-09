function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(300,300);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modalLoaded );
}

function modalLoaded(){
console.log('Modal Loaded Congratulations!!');  
}

function draw(){
image(video, 0 , 0 , 300 , 300);
classifier.classify(video , gotResult);  
}

function gotResult(error, results){
if(error){
console.error(error);  
}else {console.log(results);
if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
  console.log(results);  
previous_result = results[0].label;
var synth = window.speechSynthesis;
speak_data = 'Object detected is - '+results[0].label;
var utterthis = new SpeechSynthesisUtterance(speak_data)
synth.speak(utterthis);

document.getElementById("object").innerHTML = results[0].label;
document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(3);

}  
}
}


