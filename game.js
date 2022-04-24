var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameReset = true;
var level = 0;
var patternCantity = 0;


//Detect when start
  $(document).keydown(function(){
  gameStart();
  })

//Control for start only 1 time
  function gameStart(){
    if(gameReset == true) {
    gameReset = false;
    nextSequence();
    }
  }
//Add new pattern and call other effects
  function nextSequence(){
    userClickedPattern.length = 0;
    const randomNumber = Math.round(Math.random()*3);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    setInterval(function() {
      if ( patternCantity < gamePattern.length) {
          $("#"+ gamePattern[patternCantity]).fadeOut(300).fadeIn(300);
          playSound(randomChosenColour);
          patternCantity++
      }
    },1500);
    level++;
    $("h1").text("Level "+ level);
    patternCantity = 0;
  }

  //Detect choosen colour
  $(".btn").on("click", function(){
    const userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    playAnimate(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

  function playSound(currentColour){
    const sound =  new Audio("sounds/"+ currentColour +".mp3");
    sound.play();
  }

//Flash effect on selected colour
  function playAnimate(currentColour){
    $("."+ currentColour).addClass("pressed");
    setTimeout(function(){
      $("."+ currentColour).removeClass("pressed");
    }, 100);
  }

//Check colour answer and length
  function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
      }, 1000);
    }
  }
    else{
    gameOver();
    }
}
//Finish game and reset values
  function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Reset");
    gameReset = true;
    level = 0;
    patternCantity = 0;
    gamePattern.length = 0;
  }
