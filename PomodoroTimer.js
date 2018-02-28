//Timer object to perform countdown
var pomodoroTimer = false;

//Keeps track of the current Pomodoro round, including breaks
var currentRound = 1;

//Indicates if timer is paused
var paused = false;

//Durations for round and breaks
var roundDuration = 1500;
var shortBreakDuration = 300;
var longBreakDuration = 900;

$("document").ready(function(){
    //update timer and buttin UIs
    $("#timer").html(getCountdownString(roundDuration));
    updateTimerButton(getStartButtonLabel(currentRound, getCountdownTime(currentRound)), true);

    //Assign click event handlers
    $("#timerButton").click(function(){
        //If button has the "pause" label, set paused flag to true and update UI
        if($("#timerButton").html() === "Pause"){
            paused = true;
            updateTimerButton("Resume", true);
        }
        else{
            //if the pomodoroTimer is false, create and start a new timer.
            if(!pomodoroTimer){
                startPomodoroTimer();
            }
            else{
                paused = false;
            }
            updateTimerButton("Pause", false);
        }
    });

    $("#settingsSaveButton").click(function(){
        //update changes
        updateDurations();

        //reset the pomodoro timer
        paused = false;
        clearInterval(pomodoroTimer);
        pomodoroTimer = false;
        currentRound = 1;

        //update button UI
        updateTimerButton(getStartButtonLabel(currentRound, getCountdownTime(currentRound)), true);

        //update timer ui
        $("#timer").html(getCountdownString(roundDuration));

        //hide modal
        $("#settingsModal").modal('hide');
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
            updateTimerButton(getStartButtonLabel(currentRound, getCountdownTime(currentRound)), true);
        }
    }, 1000);
}

function getStartButtonLabel(currentRound, countdown){
    //every even numbered round is a break.
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
        return longBreakDuration;
    }
    //every even numbered round is a short break.
    else if(currentRound % 2 == 0){
        return shortBreakDuration;
    }
    //every odd numbered round is a normal round.
    else{
        return roundDuration;
    }
}

//Convert seconds to "MM:ss" formated string
function getCountdownString(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - (minutes * 60);

    var timeString = ((minutes < 10) ? "0" : "") + minutes.toString() + ":" + ((seconds < 10) ? "0" : "") + seconds.toString();

    return timeString;
}

//retrive values from duration inputs and update variables
function updateDurations(){
    roundDuration = $("#roundDurationInput").val() * 60;
    shortBreakDuration = $("#shortBreakDurationInput").val() * 60;
    longBreakDuration = $("#longBreakDurationInput").val() * 60;
}

//update timer button UI with label and styling
function updateTimerButton(label, isPaused){
    $("#timerButton").html(label);

    //If the timer is paused, we want to add styling for the green start/resume button.
    if(isPaused){
        $("#timerButton").removeClass("timerButtonPause").addClass("timerButtonStart");
    }
    else{
        $("#timerButton").removeClass("timerButtonStart").addClass("timerButtonPause");
    }
}

