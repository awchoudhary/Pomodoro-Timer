//Timer object to perform countdown
var pomodoroTimer = false;

//Keeps track of the current Pomodoro round, including breaks
var currentRound = 1;

//Indicates if timer is paused
var paused = false;

$("document").ready(function(){
    $("#timerButton").click(function(){
        //If button has the "pause" label, set paused flag to true and update UI
        if($("#timerButton").html() === "Pause"){
            paused = true;
            $("#timerButton").html("Resume");
            $("#timerButton").removeClass("timerButtonPause").addClass("timerButtonStart");
        }
        else{
            //if the pomodoroTimer is false, create and start a new timer.
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
    // Set the countdown
    var countdown = getCountdownTime(currentRound);
                    
    // Update the count down every 1 second
    pomodoroTimer = setInterval(function() {
        //only update countdown if not paused.
        if(!paused){
            countdown--;
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
            $("#timerButton").html(getStartButtonLabel(currentRound, getCountdownTime(currentRound)));
            $("#timerButton").removeClass("timerButtonPause").addClass("timerButtonStart");
        }
    }, 1000);
}

function getStartButtonLabel(currentRound, countdown){
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
