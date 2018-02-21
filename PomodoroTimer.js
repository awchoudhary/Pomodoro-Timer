var pomodoroTimer = false;
var pomodoroCycles = [25, 5, 25, 5, 25, 5, 25, 15];
var cycleLabels = ["First Round", "Break", "Second Round", "Break", "Third Round", "Break", "Fourth Round", "Break"];
var cycleIndex = 0;
var paused = false;

$("document").ready(function(){
    $("#start_button").click(function(){
        if($("#start_button").html() === "Pause"){
            paused = true;
            $("#start_button").html("Resume");
            $("#start_button").removeClass("timerButtonPause").addClass("timerButtonStart");
        }
        else{
            if(!pomodoroTimer){
                startPomodoroTimer();
            }
            else{
                paused = false;
            }
            $("#start_button").html("Pause");
            $("#start_button").removeClass("timerButtonStart").addClass("timerButtonPause");
        }
    });
});

function startPomodoroTimer(){
    // Set the date we're counting down to
    var countDownTime = pomodoroCycles[cycleIndex];
                    
    // Update the count down every 1 second
    pomodoroTimer = setInterval(function() {
        
        if(!paused){
            countDownTime = countDownTime - 1;
        }                

        // Update Timer UI
        $("#timer").removeClass("timerTimeUp");
        $("#timer").html(getCountdownString(countDownTime));
                            
        // If the count down is over, write some text 
        if (countDownTime < 0) {
            clearInterval(pomodoroTimer);
            pomodoroTimer = false;

            if(cycleIndex == pomodoroCycles.length - 1){
                cycleIndex = 0;
            }
            else{
                cycleIndex = cycleIndex + 1;
            }

            $("#timer").html("TIME UP");
            $("#timer").addClass("timerTimeUp");

            $("#start_button").html("Start " + cycleLabels[cycleIndex] + "<br> (" + pomodoroCycles[cycleIndex] + " Minutes)");
            $("#start_button").removeClass("timerButtonPause").addClass("timerButtonStart");
        }
    }, 1000);
}

//Convert seconds to "MM:ss" format string
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
