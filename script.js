const game_box = document.querySelector(".game-box");
const move = document.querySelector("#move");
const fixed = document.querySelector("#fixed");
const circle = document.querySelector(".circle");
const target_angle = document.querySelector(".target-angle");
const achieved_angle = document.querySelector(".achieved-angle");
const score = document.querySelector(".score");
const round = document.querySelector(".round");
const average = document.querySelector(".average");
const end_game = document.querySelector(".end_game");
const restart = document.querySelector(".restart");
const end_game_text = document.querySelector(".end_game_text");
const button_sound = new Audio("./button-click-sound.mp3");
const level = document.querySelector(".level");
const level_number = document.querySelector(".level_number");


// click sound on touching the circle

function button_press() {
    button_sound.play();
}


// playing background sound

const audioObj = new Audio("./background_song.mp3");
audioObj.volume = .1;
audioObj.play();

// initilizing the variables

//position of each bar in circle

let fixed_bar;
let moving_bar;

//timer for saving and clearing settimeout

let timer;

//start of toggling start and end position of bars

let start = false;

//random and achieved target

let random_target;
let achieved;

// used of storing values for next rounds

let score_value = 0;
let round_value = 0;
let average_value = 0;

// after 10 rounds i have to make circle unclickable
let circle_clickable = true;

//for selecting among 4 levels
let lvl = 1;


//after every round i have to increase round value and checking the ending condition of game

function update_round() {
    round_value++;
    round.innerHTML = round_value;
    if (round_value == 10) {
        circle.addEventListener("click", update_end_game);
        end_game_text.innerHTML = "End Game";
        console.log(restart);
    }
}

// for updating the score value according to difference between random and achieved angle

function update_score() {
    let difference = Math.abs(random_target - achieved);
    if (difference >= 0 && difference <= 5)
        score_value += 20;
    else if (difference >= 6 && difference <= 10)
        score_value += 10;
    else if (difference >= 11 && difference <= 15)
        score_value += 5;
    score.innerHTML = score_value;
}

//updating average value after each round

function update_average() {
    let avg = score_value / round_value;
    average.innerHTML = Math.floor(avg);

}

//updating achieved angle on the UI

function update_achieved_angle(angle) {
    achieved_angle.innerHTML = angle == 0 ? "" : `${angle % 360}&#xB0`;
}

//after completing 10 round ended the game

function update_end_game() {
    window.location.reload();
}

//seting the level on UI

function setlevel(e) {
    level_number.innerHTML = e.target.value;
    lvl = e.target.value;
    console.log(lvl)
}

 function rotation_start() {

    //on every circle click adding button click sound

    button_press();

    //if staring is true and it comes here means it is ending call so updating all the result

    if (start == true) {
        achieved = Math.abs(fixed_bar - moving_bar);
        update_achieved_angle(achieved);
        clearInterval(timer);
        update_score();
        update_round();
        update_average();
    }

     //toggling start and end

     start = (start == true) ? false : true;

     if (start == false)
         return;
 
     // resetting achieved value after every round
 
     update_achieved_angle(0);
 
     // for setting random target value  
 
     random_target = Math.floor(Math.random() * 90);
 
     //seting target value according to level
 
     random_target *= lvl;
     target_angle.innerHTML = `${random_target}&#xB0;`;
 
     //for setting random angle of bars staring position 
 
     let x = Math.floor((Math.random()) * 360);
 
     // make a copy for both the bar current positions
 
     fixed_bar = x;
     moving_bar = x;
 
     //direction can be clockwise or anticlockwise so taking a number which can be positive or negative
 
     let random_direction = 0.5 - Math.random();
     let direction = random_direction > 0 ? 1 : -1;
 
     //setting up position of fixed bar
 
     fixed.style.transform = `rotate(${moving_bar}deg)`;
 
     //starting movement of moving bar 
 
     timer = setInterval(() => {
         move.style.transform = `rotate(${moving_bar}deg)`;
         moving_bar = moving_bar + direction;
     }, 20);
 }
 
 
 
 
 // adding EventListeners (
 
 //for starting and ending the rotation of bars 
 
 circle.addEventListener("click", rotation_start);
 
 //for restarting the game after clicking on restart button
 
 restart.addEventListener("click", update_end_game);
 
 //for selecting the levels from 1 to 4
 
 level.addEventListener("change", setlevel);
 
 // )
 