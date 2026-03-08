var gamePattern = [];
var clickedPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var level = 0;
var  gameStart = false;

$(document).keypress(function(){
    if(!gameStart){
        nextSequence();
        gameStart = true;
    }
})

function nextSequence(){
    clickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("."+randomChoosenColor).fadeOut(100).fadeIn(100);

    soundplay(randomChoosenColor);

    $("h1").text("Level " + level);
    level++;
}

//sound generate
$(".btn").click(function(event){
    var userChosenColor = $(event.target).attr("id");
    clickedPattern.push(userChosenColor);

    soundplay(userChosenColor);
    animate(userChosenColor);

    checkAnswer(clickedPattern.length-1);
})

function soundplay(userChosenColor){
    var path = "./sounds/" + userChosenColor + ".mp3";
    var redAud = new Audio(path);
    redAud.play();
}
//fade animate
function animate(userChosenColor){
   $("."+userChosenColor).addClass("pressed");
   setTimeout(function(){
    $("."+userChosenColor).removeClass("pressed");
   }, 100)
}


function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === clickedPattern[currentLevel]){
      if(gamePattern.length === clickedPattern.length){
            
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
       }
       
   }
   else{
    var wrongAud = new Audio ("./sounds/wrong.mp3");
    wrongAud.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over. Press Any Key To Restart.");
    startOver();
   }
}

function startOver(){
    level = 0;
    gameStart = false;
    gamePattern = [];
}



