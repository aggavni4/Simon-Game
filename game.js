gamePattern=[];

userClickedPattern=[];

buttonColours=["red","blue","green","yellow"];

var level=0;

$(document).keypress(function(){
    if (gamePattern.length===0)
    {
        nextSequence();
    }
});

function nextSequence()
{
    userClickedPattern.length=0;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level "+level);
    level=level+1;
}

$(".btn").on("click",handler);
function handler()
{
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(this.id);
    checkAnswer(userClickedPattern.length-1);
}

function playSound(name)
{
    var audio=new Audio('sounds/'+name+".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    // use this
    // $("#"+currentColor).addClass("pressed").dequeue().delay(100).queue(function(){$(this).removeClass("pressed");});
    // or
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }
    else
    {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        level=0;
        gamePattern.length=0;
        userClickedPattern.length=0;

        $("h1").text("Game Over, Press Any Key to Restart");
    }
}

