var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var simonArr = []; //compare simon's array with player's array
var playerArr = []; //compare simon's array with player's array
var arrayLength;
var playerTurn = false;
var startButtonPressed = false;
var playerArrLength;

//function section ===================================
function addToColorsArr() {
  switch (Math.ceil(Math.random() * 4)) {
    case 1:
      simonArr.push("green");
      break;
    case 2:
      simonArr.push("red");
      break;
    case 3:
      simonArr.push("yellow");
      break;
    case 4:
      simonArr.push("blue");
      break;
  }
  arrayLength = simonArr.length;
  console.log("simonArr is: " + simonArr);
  console.log("simonArr[0] is: " + simonArr[0]);
  console.log("Array length is: " + arrayLength);
}

function startPressed() {
  //startbutton press code
  if ($("#power").is(":checked")) {
    //play simon function
    console.log("power is checked!")
    startButtonPressed = true;
    addToColorsArr();
    playSimon();

  } else {
    console.log("start pressed, power is NOT checked")
  }
}

function runThruColors(index) {
  if (index < simonArr.length) {
    //console.log("inside index < simonArr.length")
    if (simonArr[index] === "green") {
      greenSound.play();
      console.log("play green");
      $(".upperLeft").css("background", "#bdf5bd"); // turn color light
      setTimeout(function() {
        $(".upperLeft").css("background", "radial-gradient(lightgreen, green)");

        console.log("inside green setTimeout")
      }, 500); //turn color back to normal after 0.5 secs
    } else if (simonArr[index] === "red") {
      redSound.play();
      console.log("play red");
      $(".upperRight").css("background", "#ffb3b3"); // turn color light
      setTimeout(function() {
        $(".upperRight").css("background", "radial-gradient(red, firebrick)");
      }, 500); //turn color back to normal after 0.5 secs
    } else if (simonArr[index] === "yellow") {
      yellowSound.play();
      console.log("play yellow");
      $(".bottomLeft").css("background", "LightGoldenRodYellow"); // turn color light
      setTimeout(function() {
        $(".bottomLeft").css("background", "radial-gradient(yellow, darkgoldenrod");
      }, 500); //turn color back to normal after 0.5 secs
    } else if (simonArr[index] === "blue") {
      blueSound.play();
      console.log("play blue");
      $(".bottomRight").css("background", "#91a8ee"); // turn color light
      setTimeout(function() {
        $(".bottomRight").css("background", "radial-gradient(royalblue, midnightblue)");
      }, 500); //turn color back to normal after 0.5 secs
    }
    console.log("Just before calling the recursive part of the function!!!")
    $(".number").html(arrayLength);
    setTimeout(function() {
      runThruColors(index + 1);
    }, 800);
  }
  playerTurn = true;
}

function playSimon() {
  //write function to play the simonArr
  if (playerTurn) {
    console.log("playerTurn: " + playerTurn)
  } else {
    //I don't think a for loop will work, needs recursive function
    runThruColors(0);
  }
}

//function used after clicking the color and player's turn
function testMatchArrays() {
  //not actual length, but need number for index
  playerArrLength = playerArr.length - 1;
  //move matches and isn't last move yet
  if (playerArr[playerArrLength] === simonArr[playerArrLength] && playerArr.length < simonArr.length) {
    //do nothing, wait for next user click
    console.log("testMatchArrays: do nothing, just wait for next user click.");

  } else if (playerArr[playerArrLength] === simonArr[playerArrLength] && playerArr.length >= simonArr.length && playerArr.length <= 19) { //arrays same length and match
    //player turn is finised because playerArr and simonArr are equal length... add to simonArr and play simon
    playerTurn = false;
    playerArr = [];

    if ($("#power").is(":checked")) {
      //wait a little bit to start next simon sequence.
      setTimeout(addToColorsArr, 800);
      setTimeout(playSimon, 1200);
      //addToColorsArr();
      //playSimon();
    }
  } else if (playerArr[playerArrLength] !== simonArr[playerArrLength]) {
    //player messed up, pressed wrong color

    if ($("#strict-toggle2").is(":checked")) {
      console.log("messed up, strict on");
      playerArr = [];
      simonArr = [];
      playerTurn = false;
      $(".number").html("- -");

      //add in something to blink all colors at once and then start over
      setTimeout(addToColorsArr, 800);
      setTimeout(playSimon, 1200);
      //addToColorsArr();
      //playSimon();

    } else {
      //strict off, run through colors again
      playerArr = [];
      //simonArr = []; don't use strict off!!!
      playerTurn = false;
      console.log("messed up, strict off!!!");
      //addToColorsArr();  don't use strict off!!

      //add in setTimeout and blink all colors at once
      $(".number").html("- -");
      setTimeout(function() {
        $(".number").html(simonArr.length);
      }, 900);
      setTimeout(playSimon, 1000);
      //playSimon();
    }
  } else if (playerArr[playerArrLength] === simonArr[playerArrLength] && playerArr.length >= 20) { //won 20 moves!!!
    //winning move!!!
    console.log("You won!!!");
    $('#myModal').modal('show');
    playerArr = [];
    simonArr = [];
    startButtonPressed = false;
    playerTurn = false;
    $(".number").html("- -");

  }

}

$(document).ready(function() {

  //power button pressed
  $("#power").change(function() {
    if ($("#power").is(":checked")) {
      console.log("Power checked");
      $(".colors").toggleClass("active");
      $(".number").html("- -");
    } else {
      console.log("Power unchecked");
      $(".colors").toggleClass("active");
      simonArr = [];
      playerArr = [];
      playerTurn = false;
      startButtonPressed = false;
      $(".number").html("");
    }
  });

  //run game if start button is pressed
  $("#startButton").click(function() {
    if (!startButtonPressed) {
      startPressed();
    } else {
      console.log("Start button already pressed.")
    }
  });

  //clicked a color
  $(".colors").click(function() {
    //if player's turn then check move
    if (playerTurn) {
      if (this.id === "red") {
        redSound.play();
        playerArr.push(this.id);
        console.log("red!!")

      } else if (this.id === "blue") {
        blueSound.play();
        playerArr.push(this.id);
        console.log("blue!")
      } else if (this.id === "green") {
        greenSound.play();
        playerArr.push(this.id);
        console.log("green!!!");
      } else if (this.id === "yellow") {
        yellowSound.play();
        playerArr.push(this.id);
        console.log("yellow");
      }
      console.log(playerArr);

      //check if playerArr === simonArr after adding color to playerArr
      testMatchArrays();
    }
  });

}); //document ready function