$(document).ready(function(){
  //Assigning all the music variables;
  var buttonClick = new Audio("audio/button_20.wav");
  var tinyButtonClick = new Audio("audio/Tiny_Button.wav");
  var applause = new Audio("audio/applause2_x.wav");
  var miscButtonClick = new Audio("audio/button_19.wav");
  var drawMusic = new Audio("audio/button_14.wav");
  //Display game board upon selection of the key
  var player1;
  var player2;
  var numOfMoves = 0;
  var player1Scores = 0;
  var player2Scores = 0;
  var drawCount = 0;
  var gameOver = false;
  //Because we dont want to append to the scores, we keep track of scores and append to the original text
  var p1ScoreText = $('#p1').text();
  var p2ScoreText = $('#p2').text();
  var drawText = $('#draw').text();
  var board = [ [0,0,0],
                [0,0,0],
                [0,0,0]];
  $('#key1, #key2').on('click', displayBoard);
  $('.game-keys').on('click', updateGame);
  $('#new-game').on('click',refresh);
  $('#reset-scores').on('click',resetScores);

  function displayBoard(){
    //hide key selection
    miscButtonClick.play();
    $('.keys').fadeOut("slow");
    //this need to be faded out fast for smooth transition for another header
    $('#beforeClick').fadeOut(100);
    //Display game board and new game buttons
    $('.game-board').fadeIn("slow");
    $('.new-or-quit').fadeIn("slow");
    //Display player scores on the sides of the game board
    updateScores();
    $('.player').fadeIn("slow");
    initGame($(this).val());
  }
  function updateScores(){
    //Display and Update scores of each players on side of game board
    var p1Text = p1ScoreText + player1Scores;
    $('#p1').text(p1Text);
    var p2Text = p2ScoreText + player2Scores;
    $('#p2').text(p2Text);
    var dText = drawText + drawCount;
    $('#draw').text(dText);
  }
  function initGame(playKey) {
    //Initial player keys
    startNewGame();
    player1 = playKey;
    player2 = (playKey === 'X') ? 'O': 'X';
    $('#afterClick').text("Player 1 has chosen "+player1+" Player 2 gets  "+player2);
    $('#afterClick').fadeIn("slow")
  }
  function startNewGame(){
    //Initial global variables and game board;
    //First we are checking for occupancy of the cell before incrementing,
    //So we start from 1 to ensure the odd moves are player1s
    numOfMoves = 1;
    gameOver = false;
    board = [ [0,0,0],
              [0,0,0],
              [0,0,0]];
  }
  function updateGame() {
    if (!gameOver)
    {
      //Update board on HTML
      if( numOfMoves%2 !== 0 ){
        buttonClick.play();
        updateBoard(this, player1);
      }
      else {
        tinyButtonClick.play();
        updateBoard(this, player2);
      }
      //Check for player 1 win
      if (isGameOver(player1) === "win"){
        player1Scores++;
        gameOver = true;
        updateScores();
        applause.play();
      }
      //check for player 2 win
      else if (isGameOver(player2) === "win"){
        player2Scores++;
        gameOver = true;
        updateScores();
        applause.play();
      }
      //check for 10 moves cause, we are counting it from it from 1
      else if (numOfMoves >= 10){
        drawMusic.play();
        drawCount++;
        updateScores();
        gameOver = true;
      }
    }
  }
  function updateBoard(key, p) {
    //Getting index from key ids from html
    var i = +($(key).attr('id').charAt(0));
    var j = +($(key).attr('id').charAt(1));
    //Check and update if that cell is not already occupied
    if (board[i][j] === 0)
    {
      numOfMoves++;
      $(key).text(p);
      board[i][j] = p;
    }
  }
  function isGameOver(p) {
    //Checks for the win in the 3 Rows
    //Can do board[0][0]+board[0][1]+board[0][2] === p+p+p ......
    if ( (board[0][0] === p && board[0][1] === p && board[0][2] === p) ||
         (board[1][0] === p && board[1][1] === p && board[1][2] === p) ||
         (board[2][0] === p && board[2][1] === p && board[2][2] === p) )
    {
      return "win";
    }
    //Check for win in 3 Columns
    if( (board[0][0] === p && board[1][0] === p && board[2][0] === p) ||
        (board[0][1] === p && board[1][1] === p && board[2][1] === p) ||
        (board[0][3] === p && board[1][3] === p && board[2][3] === p) )
    {
      return "win";
    }
    //Check for win Diagonally
    if ( (board[0][0] === p && board[1][1] === p && board[2][2] === p) ||
         (board[0][2] === p && board[1][1] === p && board[2][0] === p) )
    {
      return "win";
    }
    return;
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
  }
  //Does start a new game and resets scores
  function resetScores() {
    miscButtonClick.play();
    refresh();
    player1Scores = 0;
    player2Scores = 0;
    drawCount = 0;
    updateScores();
  }

});
