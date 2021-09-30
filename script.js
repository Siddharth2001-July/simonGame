function rules() {
    $(".rules").addClass("showRules");
}
function remRules() {
    $(".rules").removeClass("showRules");
}
// Storing User Clicked Buttons
var userChosenPattern = [];

var level = 0;

// Storing Game Pattern
var gamePattern = [];

// Available Colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Generating Animation to randomChosenColor 
function buttonAnimation(key) {
    // Using CSS
    var pressedKey = $("#" + key);
    pressedKey.addClass("pressed");
    // Passing an anonymous function to remove pressed class and after that, delay time
    setTimeout(function () { pressedKey.removeClass("pressed"); }, 100);
}

// Generating Sequence
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    // Adding randomChosenColor to gamePattern Array
    gamePattern.push(randomChosenColor);

    // Adding Animation to randomChosenColor
    // Using CSS
    buttonAnimation(randomChosenColor);
    // Using jQuery
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    // Playing Audio
    var sound = new Audio('sounds/' + randomChosenColor + '.mp3');
    sound.play();

    // Display level
    $('h1').text("Level " + (level + 1));
    level++;
}

//Starting game when user press a key (Key Press will be accepted only once)
var started = false;
$(document).keydown(function (e) {
    if (started === false) {
        nextSequence();
        started = true;
    }
    else {
        alert('Game has already been started!\r\nRefresh to start again.')
    }
});

// Code for array equality
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Win / Lose flash
function flash(status) {
    var flash = setInterval(() => {
        document.querySelector("body").classList.toggle(status);
    }, 100);
    setTimeout(() => {
        flash;
        clearInterval(flash);
        document.querySelector("body").classList.remove(status);
    }, 1000);
}

// User Click Event 
$('.btn').click(function (e) {
    if (started === true) {
        var userChosenColor = e.target.id;
        // Adding userChosenColor to userChosenPattern Array
        userChosenPattern.push(userChosenColor);

        // Playing Audio
        var sound = new Audio('sounds/' + userChosenColor + '.mp3');
        sound.play();

        // Adding Animation to UserChosenColor
        // Using CSS
        buttonAnimation(userChosenColor);
        // Using jQuery
        $("#" + userChosenColor).fadeOut(100).fadeIn(100);
        // Checking Answer
        if (checkAnswer(userChosenPattern.length - 1)) {
            console.log("Complete the pattern!");
        }
        else if (!checkAnswer(userChosenPattern.length - 1)) {
            console.log("Wrong Answer!");
        }
        if (gamePattern.length === userChosenPattern.length) {
            console.log(gamePattern + " " + userChosenPattern);
            if (arraysEqual(gamePattern, userChosenPattern)) {
                console.log("Right pattern!");
                // Flash for Winning
                flash("green");
                // Timer for nextSequence
                setTimeout(() => {
                    nextSequence();
                }, 1500);
                // Emptying userChosenPattern
                userChosenPattern.length = 0;
            }
            else {
                flash("red");
                console.log("Wrong Pattern!");
                // Playing wrong sound
                var sound = new Audio('sounds/wrong.mp3');
                sound.play();
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        }
    }
    else {
        alert('Game is not started yet!\r\nPlease press a key to Start.')
    }
});

// Function to check correct input
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
        return true;
    }
    return false;
}