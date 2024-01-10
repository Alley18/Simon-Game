
var buttoncolors = ["red", "blue", "green", "yellow"];

var gamepattern = [];

var userclickedpattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if(!started){
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").click(function(){
    
    var userchosencolour = $(this).attr("id");
    
    userclickedpattern.push(userchosencolour);

    playSound2(userchosencolour);
    animepressed(userchosencolour);

    checkAnswer(userclickedpattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userclickedpattern[currentLevel]) {

      console.log("success");
    console.log("Current Level:", currentLevel);
    console.log("Game Pattern:", gamepattern);
    console.log("User Clicked Pattern:", userclickedpattern);

      if (userclickedpattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound2("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function nextSequence(){

        userclickedpattern = [];

        level++;

        $("#level-title").text("Your level is " + level);

        var randomnumber = Math.floor(Math.random() *4);

        var radnomchosencolor = buttoncolors[randomnumber];

        gamepattern.push(radnomchosencolor);

        $("#" + radnomchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound2(radnomchosencolor);
        
        

}

function playSound2(name){

     var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();

}

function animepressed(currentcolor){

        $("#" + currentcolor).addClass("pressed");

        setTimeout( function(){
            $("#" + currentcolor).removeClass("pressed");

        }, 100);
}


function startOver(){

    level = 0;
    gamepattern = [];
    started = false;
}


// nextSequence();