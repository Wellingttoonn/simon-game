let gameColors = ['red', 'green', 'blue', 'yellow'];
let gameSequence = []; // Colors randomly selected by computer
let playerSequence = []; // Colors selected by user
let started = false;
let level = 0;

// Event listener for keypress
$(document).keypress(()=> {
  if(!started) {
    computerChoice();
    started = true;
  }
}) 

// Computer select a color
function computerChoice(){
  // Random choice a color from the array
  const color = gameColors[Math.floor(Math.random() * 4)];
  // Insert a color to the gameSequence array
  gameSequence.push(color);
  // Display an UI animation for the selected button
  $(`.${color}`).fadeOut(100).fadeIn(100);
  // Play the sound of the selected button
  playSound(color);
  // Show the current level in the title text
  $('h1').text(`level ${level}`);
  // Add 1 to the current level
  level++;
  // Cleans out the player choices' array
  playerSequence = [];
}

// Add event listener for clicks
$('.btn').click(playerChoice);


function playerChoice(e) {
  // Return the button's id, that is equal to its color
  let color = e.target.id;
  // Add the clicked button color to the array
  playerSequence.push(color);
  // Displays button animation
  animate(color);
  // Play button sound
  playSound(color);
  // Compare arrays
  compare();
}

// Compare the arrays, gameSequence and ´playerSequence
function compare() {
  // Index of the last selected color by player 
  let compfactor = playerSequence.length - 1;
  // Check if the last item selected by player is equal to the item in gameSequence array
  if(playerSequence[compfactor] === gameSequence[compfactor]) {
    if(playerSequence.length === gameSequence.length){
      setTimeout(computerChoice, 300);
    }
  } else {
    gameOver();
  }
}

// Game over, restat all values
function gameOver() {
  gameSequence = [];
  playerSequence = [];
  started = false;
  level = 0;
  $('h1').text('Game Over, Press Any Key to Restart');
  // Red animation to the background
  $('body').addClass('game-over');

  setTimeout(()=> {
    $('body').removeClass('game-over');
  }, 200);
  // Play audio from wrong choice
  var wrong = new Audio('sounds/wrong.mp3');
  wrong.play();
}

// Function to Animate the pressed button
function animate(color) {
  // Select button by id
  $(`#${color}`).addClass('pressed');

  setTimeout(()=>{
    $(`#${color}`).removeClass('pressed')
  }, 100);
}

// Play buttons sounds
function playSound(color) {
  switch (color) {
    case 'blue':
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;

    case 'red':
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;

    case 'green':
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;

    case 'yellow':
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    default:
      break;
  }
}
