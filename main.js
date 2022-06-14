song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function setup() {
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotposes);
}
function modelLoaded() {
    console.log("Pose is intiliazed");
}
function draw() {
    image(video, 0, 0, 600, 500);
} 

function preload() { 
    song = loadSound("music.mp3");
    fill('#F0000');
    stroke('#F0000');
    if(scoreleftWrist > 0.2) {
      circle(leftWristX , leftWristY , 20);
      InNumberleftWrist = Number(leftWristY);
      remove_decimal = floor(InNumberleftWrist);
      volume = remove_decimal/500;
      document.getElementById("volume").innerHTML = "Volume is : " + volume;
      song.setVolume(volume);
    }
}
function play() {
song.play();
song.setVolume(1);
song.range(1);
}

function gotposes(results) {
    if(results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
      console.log("ScoreleftWrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
       console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.x;
        console.log("rightWristX" + rightWristX + "rightWristY" + rightWristY);
    }
}