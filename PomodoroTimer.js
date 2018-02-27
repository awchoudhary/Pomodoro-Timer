//Timer object to perform countdown
var pomodoroTimer = false;

//Keeps track of the current Pomodoro round
var currentRound = 1;

//Indicates if timer is paused
var paused = false;

$("document").ready(function(){
    $("#timerButton").click(function(){
        if($("#timerButton").html() === "Pause"){
            paused = true;
            $("#timerButton").html("Resume");
            $("#timerButton").removeClass("timerButtonPause").addClass("timerButtonStart");
        }
        else{
            if(!pomodoroTimer){
                startPomodoroTimer();
            }
            else{
                paused = false;
            }
            $("#timerButton").html("Pause");
            $("#timerButton").removeClass("timerButtonStart").addClass("timerButtonPause");
        }
    });
});

function startPomodoroTimer(){
    // Set the date we're counting down to
    var countdown = getCountdownTime(currentRound);
                    
    // Update the count down every 1 second
    pomodoroTimer = setInterval(function() {
        
        if(!paused){
            countdown = countdown - 1;
        }                

        // Update Timer UI
        $("#timer").removeClass("timerTimeUp");
        $("#timer").html(getCountdownString(countdown));
                            
        // If the count down is over, clear the timer
        if (countdown < 0) {
            clearInterval(pomodoroTimer);
            pomodoroTimer = false;

            //update the current round
            currentRound++;

            //set "time up" text and add red text styling
            $("#timer").html("TIME UP");
            $("#timer").addClass("timerTimeUp");

            //update button UI
            $("#timerButton").html(getButtonLabel(currentRound, getCountdownTime(currentRound)));
            $("#timerButton").removeClass("timerButtonPause").addClass("timerButtonStart");
        }
    }, 1000);
}

function getButtonLabel(currentRound, countdown){
    //every even numbered round is a short break.
    if(currentRound % 2 == 0){
        return "Start Break <br> (" + countdown/60 + " Minutes)";
    }
    //every odd numbered round is a normal round.
    else{
        return "Start Round <br> (" + countdown/60 + " Minutes)";
    }
}

//get countdown time based on the round number
function getCountdownTime(currentRound){
    //every 8 rounds is a long break.
    if(currentRound % 8 == 0){ 
        return 90;
    }
    //every even numbered round is a short break.
    else if(currentRound % 2 == 0){
        return 30;
    }
    //every odd numbered round is a normal round.
    else{
        return 60;
    }
}

//Convert seconds to "MM:ss" formated string
function getCountdownString(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - (minutes * 60);

    var timeString = ((minutes < 10) ? "0" : "") + minutes.toString() + ":" + ((seconds < 10) ? "0" : "") + seconds.toString();

    return timeString;
}
