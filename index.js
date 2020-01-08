// arrays
var noteblockSounds = [ //sounds
  "harp", "bassdrum", "banjo", "chime", "bell", "bit"
];
var gameOverTextArr = [ // game over text
  "Game over!", "Try again!", "Oh no!", "Almost!", "Continue?", "You died.",
  "Play again?", "Keep trying!", "Aww man.", "Don't give up!"
];

var randomNotePattern = []; // game notes
var playerNotePattern = []; // player's notes

// initialize level
var started = false;
var level = 0;

// ***********************************************************************
//   EVENTS
// ***********************************************************************

// ********************************
// NOTE BUTTON CLICKS
$(".noteblock").click(function() {

  // store the note button that was clicked on in playerNotePattern array
  var playerClickedNote = $(this).attr("id");
  playerNotePattern.push(playerClickedNote);

  // ornaments
  playSound(playerClickedNote);
  animatePress(playerClickedNote);

  // check if the player was right
  checkAnswer(playerNotePattern.length - 1);

});

// ********************************
// START BUTTON CLICKS/TAPS
$(".start-button").on("click touch", function() {

  // hide instructions and start button
  $(".instructions-lg").addClass("hidden");
  $(".instructions-md").addClass("hidden");
  $(".start-button").addClass("hidden");

  // edit title
  $(".level-title").text("Level " + level);
  $(".level-title").addClass("game-started-title-lg game-started-title-md");

  nextLevel();
  started = true;

});

// ***********************************************************************
//   FUNCTIONS
// ***********************************************************************

// MOVE TO NEXT LEVEL
function nextLevel() {

  playerNotePattern = [];

  // generate and play random note
  var randomNumber = Math.floor(Math.random() * 6);
  var randomNote = noteblockSounds[randomNumber];
  randomNotePattern.push(randomNote);
  animatePress(randomNote);
  playSound(randomNote);

  level++;
  $(".level-title").text("Level " + level);

}

// CHECK ANSWER
function checkAnswer(currentLevel) {

  if (started) {

    // if the player is correct...
    if (randomNotePattern[currentLevel] === playerNotePattern[currentLevel]) {

      if (randomNotePattern.length === playerNotePattern.length) {

        setTimeout(function() {
          nextLevel();
        }, 550);

      }

    } else {
      // if player is incorrect...

      // game over text
      var randomNumberGameOver = Math.floor(Math.random() * gameOverTextArr.length);
      $(".level-title").text(gameOverTextArr[randomNumberGameOver]);

      // game over sound
      playSound("bassattack");

      // game over animation
      $(".level-title").addClass("game-over-title");
      setTimeout(function() {
        $(".level-title").removeClass("game-over-title");
      }, 150);

      startOver();

    }
  }
}

// RESET GAME
function startOver() {

  randomNotePattern = [];

  started = false;
  level = 0;

  $(".start-button").text("PLAY AGAIN");
  $(".start-button").removeClass("hidden");

}


// ********************************
// ORNAMENTS:

// SOUND
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".ogg");
  audio.play();

  // Animate sound effect
  $(".note-img").removeClass("hidden");
  setTimeout(function() {
    $(".note-img").addClass("hidden");
  }, 60);

}

// ANIMATION
function animatePress(noteblock) {

  $("#" + noteblock).addClass("pressed");

  setTimeout(function() {
    $("#" + noteblock).removeClass("pressed");
  }, 60);

}
