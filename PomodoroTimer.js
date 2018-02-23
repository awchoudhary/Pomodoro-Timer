//Timer object to perform countdown
var pomodoroTimer = false;

//The length of each Pomodoro round in seconds
var roundDurations = [1500, 30, 1500, 30, 1500, 30, 1500, 900];

//THe name for each Pomodoro round
var roundLabels = ["First Round", "Break", "Second Round", "Break", "Third Round", "Break", "Fourth Round", "Break"];

//Keeps track of the current Pomodoro round
var currentRound = 0;

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
    var countDownTime = roundDurations[currentRound];
                    
    // Update the count down every 1 second
    pomodoroTimer = setInterval(function() {
        
        if(!paused){
            countDownTime = countDownTime - 1;
        }                

        // Update Timer UI
        $("#timer").removeClass("timerTimeUp");
        $("#timer").html(getCountdownString(countDownTime));
                            
        // If the count down is over, clear the timer
        if (countDownTime < 0) {
            clearInterval(pomodoroTimer);
            pomodoroTimer = false;

            //update the current round
            if(currentRound == roundDurations.length - 1){
                currentRound = 0;
            }
            else{
                currentRound = currentRound + 1;
            }

            //set "time up" text and add red text styling
            $("#timer").html("TIME UP");
            $("#timer").addClass("timerTimeUp");

            //update button UI
            $("#timerButton").html("Start " + roundLabels[currentRound] + "<br> (" + roundDurations[currentRound]/60 + " Minutes)");
            $("#timerButton").removeClass("timerButtonPause").addClass("timerButtonStart");
        }
    }, 1000);
}

//Convert seconds to "MM:ss" formated string
function getCountdownString(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - (minutes * 60);
    var minutesString = minutes.toString();
    var secondsString = seconds.toString();

    if(minutes < 10){
        minutesString = "0" + minutesString;
    }

    if(seconds < 10){
        secondsString = "0" + secondsString;
    }

    var timeString = minutesString + ":" + secondsString;

    return timeString;
}
