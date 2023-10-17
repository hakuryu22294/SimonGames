var gamePattern = [];
var btnColor = ["red", "blue", "green", "yellow"];
var useCickPattern = [];
var started = false;
var level = 0;
$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    useCickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animationPress(userChosenColour);
    checkAnswer(useCickPattern.length-1);
})
function nextSequence(){
    useCickPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);
    var randomNum = Math.floor(Math.random() * 3);
    var rdChosenColor = btnColor[randomNum];
    gamePattern.push(rdChosenColor);
    $("#" + rdChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(rdChosenColor);
}

function checkAnswer(currLevel){
    if(gamePattern[currLevel] === useCickPattern[currLevel]){
        if(useCickPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        useCickPattern = [];
        $('body').addClass("game-over");
        $('#level-title').text('Game Over, Press Any Key to Restart');
        setTimeout(() => $('body').removeClass("game-over"), 1000);
        startOver();
    }
}

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

$(document).keypress(() => {
    if(!started){
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        started = true;
    }
})

function animationPress(currColour){
    $(`#${currColour}`).addClass('pressed');
    setTimeout(() => $(`#${currColour}`).removeClass('pressed'), 100);
}

function startOver(){
    gamePattern =[];
    started = false;
    level =0;
}