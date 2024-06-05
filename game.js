var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userpattern = [];
var started=false;
var level =0;
$(document).keydown(function (){
    if(!started)
        {
            $("#level-title").text("Level" + level);
            nextSequence();
            started=true;
        }
});

function animatePress(cur_color)
{
    $("#" + cur_color).addClass("pressed");

    setTimeout(function () {
        $("#" + cur_color).removeClass("pressed");
    },100);
}

function palysound(name)
{
    var audio = new Audio("sounds/"+ name+ ".mp3");
    audio.play();
}

$('.btn').click(function () {
    var userChosenColour= $(this).attr("id");
    palysound(userChosenColour);
    animatePress(userChosenColour);
    userpattern.push(userChosenColour);

    checkAnswer(userpattern.length-1);
});

function checkAnswer(curlevel)
{
    if(userpattern[curlevel]===gamePattern[curlevel])
        {
            console.log("success");
            if(userpattern.length===gamePattern.length)
                {
                    setTimeout(function (){
                        nextSequence();
                    },1000);
                }
        }
        else{
            console.log("wrong");
            palysound("wrong");

            $("body").addClass("game-over");
            setTimeout(function (){
                $("body").removeClass("game-over");
            },200);

            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }   
}


function nextSequence()
{
    level++;
    userpattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber =Math.random();
    randomNumber*=4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColours[randomNumber]; 

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    palysound(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }