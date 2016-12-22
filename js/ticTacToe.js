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
  if(resume){
    resumeGame();
  }

  //On Click Event listeners
  $('#key1, #key2').on('click', displayBoard);
  $('.game-keys').on('click', updateGame);
  $('#new-game').on('click',refresh);
  $('#reset-scores').on('click',resetScores);

  //Event listener functions
  function displayBoard(){
    resume = true;
    //hide key selection
    miscButtonClick.play();
    $('.keys').fadeOut("slow");
    //this need to be faded out fast for smooth transition for another header
    $('#beforeClick').fadeOut(100).delay( 800 );
    //Display game board and new game buttons
    $('.game-board').fadeIn("slow");
    $('.new-or-quit').fadeIn("slow");
    //Display player scores on the sides of the game board
    updateScores();
    $('.player').fadeIn("slow");
    initGame($(this).val());

    saveGame();
    writeGameRT();
  }

  function updateGame() {
    if (!gameOver)
    {
      //if it is player1 update cell with player1 key
      if( numOfMoves%2 !== 0 ){
        buttonClick.play();
        updateBoard(this, player1);
      }
      //Update player2 with their key
      else {
        tinyButtonClick.play();
        updateBoard(this, player2);
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
    saveGame();
    writeGameRT();
  }

  function refresh() {
    miscButtonClick.play();
    //Hide game board and after choice heading
    $('.game-board').fadeOut("slow");
    $('.new-or-quit').fadeOut("slow");
    $('#afterClick').fadeOut(100);

    //Display before choice heading and buttons
    $('.keys').fadeIn("slow");
    $('#beforeClick').fadeIn("slow");

    startNewGame(); //Initializes the global game variables
    $('.game-keys').text(''); //Resets text from all the cells
    saveGame();
    writeGameRT();
  }

  //Does start a new game and resets scores
  function resetScores() {
    miscButtonClick.play();
    refresh();
    player1Scores = 0;
    player2Scores = 0;
    drawCount = 0;
    updateScores();
    saveGame();
    writeGameRT();
  }
});
