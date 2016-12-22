$(document).ready(function(){
  //Support functions in the file <ticTacToe_sup.js> except for the one below.

  //This below support function initializes player score elements
  //This should be here as it has DOM related stuff
  function updateScoreElements(){
    //Because we dont want to append to the scores, we keep track of scores and append to the original text
    p1ScoreText = $('#p1').text();
    p2ScoreText = $('#p2').text();
    drawText = $('#draw').text();
  }
  updateScoreElements();  //Called outside as this need to be called only once.

  //Resume game where we left;
  resume = localStorage["resume"] === "true" ? true : false;
  // if(resume){
  //   resumeGame();
  // }

  //On Click Event listeners
  $('#key1, #key2').on('click', displayBoard);
  $('.game-keys').on('click', updateGame);
  $('#new-game').on('click',refresh);
  $('#reset-scores').on('click',resetScores);

  //Event listener functions
  function displayBoard(){
    miscButtonClick.play();
    if (userCount !== 2){
      alert("Two users should be logged in");
      return;
    }
    resume = true;

    // whoever clicked first is player1, and we set thisPlayer so we know
    // whose turn it is

    //hide key selection
    $('.keys').fadeOut("slow");
    //this need to be faded out fast for smooth transition for another header
    $('#beforeClick').fadeOut(100).delay( 800 );
    //Display game board and new game buttons
    // $('.game-board').fadeIn("slow");
    // $('.new-or-reset').fadeIn("slow");
    //Display player scores on the sides of the game board
    updateScores();
    // $('.player').fadeIn("slow");
    initGame($(this).val());

    console.log('clicked button:', player1);
    thisPlayer = player1;

    // saveGame();
    writeGameRT();
  }

  function updateGame() {
    if (userCount !== 2){
      alert("Two users should be logged in");
      return;
    }
    if (!gameOver)
    {
      //if it is player1 update cell with player1 key
      if( turn === player1 ){
        if (turn !== thisPlayer){ return; }
        buttonClick.play();
        if (updateBoard(this, player1)){
          turn = player2;
        }
        // updateBoard(this, player1);
        // turn = player2;
      }
      //Update player2 with their key
      else {
        if (turn !== thisPlayer){ return; }
        tinyButtonClick.play();
        if (updateBoard(this, player2)) {
          turn = player1;
        }
        // updateBoard(this, player2);
        // turn = player1;
      }
      //Check for player 1 win
      if (isGameOver(player1) === "win"){
        player1Scores++;
        winUpdate();
      }
      //check for player 2 win
      else if (isGameOver(player2) === "win"){
        player2Scores++;
        winUpdate();
      }
      //check for 10 moves cause, we are counting it from it from 1
      else if (numOfMoves >= 10){
        drawMusic.play();
        drawCount++;
        updateScores();
        gameOver = true;
      }
    }
    // saveGame();
    writeGameRT();
  }

  function refresh() {
    miscButtonClick.play();
    if (userCount !== 2){
      alert("Two users should be logged in");
      return;
    }
    newGame = true;
    //Hide game board and after choice heading
    // $('.game-board').fadeOut("slow");
    // $('.new-or-reset').fadeOut("slow");
    $('#afterClick').fadeOut(100);

    //Display before choice heading and buttons
    $('.keys').fadeIn("slow");
    $('#beforeClick').fadeIn("slow");

    startNewGame(); //Initializes the global game variables
    $('.game-keys').text(''); //Resets text from all the cells
    // saveGame();
    writeGameRT();
  }

  //Does start a new game and resets scores
  function resetScores() {
    miscButtonClick.play();
    if (userCount !== 2){
      alert("Two users should be logged in");
      return;
    }
    refresh();
    player1Scores = 0;
    player2Scores = 0;
    drawCount = 0;
    updateScores();
    // saveGame();
    writeGameRT();
  }


  window.onunload = function(){

    // decrement userCount when page is closed, and reset game board if no users remain
    userCount--;
    writeGameRT();
    console.log('userCount after decrement on window unload', userCount);

    //
    // if(userCount === 0){
    //   resetScores();
    // } //else {
    // }

  };

});
