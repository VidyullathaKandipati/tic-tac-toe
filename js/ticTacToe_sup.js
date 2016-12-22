//Display and Update scores of each players on the sides of game board
function updateScores(){
  var p1Text = p1ScoreText + player1Scores;
  $('#p1 h2').text(p1Text);
  var p2Text = p2ScoreText + player2Scores;
  $('#p2 h2').text(p2Text);
  var dText = drawText + drawCount;
  $('#draw h2').text(dText);
}

//Initialise player keys and display on html
function initGame(playKey) {
  player1 = playKey;
  player2 = (playKey === 'X') ? 'O': 'X';
  $('#afterClick').text("Player 1 has chosen "+player1+" Player 2 gets  "+player2);
  $('#afterClick').fadeIn("slow")
}

//Update the cell on the HTML board if not occupied already
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

//Check for win
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

//Updates for player1 or player2 win.
function winUpdate(){
  gameOver = true;
  updateScores();
  applause.play();
}

//Initial global variables and game board;
function startNewGame(){
  //First we are checking for occupancy of the cell before incrementing, in updateGame
  //So we start from 1 to ensure the odd moves are player1s
  numOfMoves = 1;
  gameOver = false;
  board = [ [0,0,0],
            [0,0,0],
            [0,0,0]];
}

//For localStorage
function saveGame(){
  localStorage["resume"] = resume;
  localStorage["numOfMoves"] = numOfMoves;
  for (var i=0; i<3; i++){
    for (var j=0; j<3; j++){
        localStorage["k"+i+j] = board[i][j];
    }
  }
  localStorage["gameOver"] = gameOver;
  localStorage["player1"] = player1;
  localStorage["player2"] = player2;
  localStorage["player1Scores"] = player1Scores;
  localStorage["player2Scores"] = player2Scores;
  localStorage["drawCount"] = drawCount;
  saveAnimation();
}
//Saves the html elements state
function saveAnimation(){
  localStorage["keys"] = $('.keys').is(":visible");
  localStorage["beforeClick"] = $('#beforeClick').is(":visible");
  localStorage["afterClick"] = $('#afterClick').is(":visible");
  localStorage["game-board"] = $('.game-board').is(":visible");
  localStorage["new-or-quit"] = $('.new-or-quit').is(":visible");
  localStorage["player"] = $('.player').is(":visible");
}

//For resuming where we left
function resumeGame(){
  numOfMoves = +(localStorage["numOfMoves"]);
  gameOver = localStorage["gameOver"] === "true" ? true : false;
  player1 = localStorage["player1"];
  player2 = localStorage["player2"];
  player1Scores = +(localStorage["player1Scores"]);
  player2Scores = +(localStorage["player2Scores"]);
  drawCount = +(localStorage["drawCount"]);
  if(gameOver || numOfMoves === 10){
    startNewGame();
    //These need to go here cause the startNewGame would reset the gameOver values.
    $('#beforeClick').fadeIn("slow");
  }
  else{
    if (player1 !== undefined){
      $('#beforeClick').fadeOut(100).delay(1000);
      $('.keys').fadeOut("fast");
      initGame(player1);
    }
    for (var i=0; i<3; i++){
      for (var j=0; j<3; j++){
        if(localStorage["k"+i+j] !== '0'){
          board[i][j] = localStorage["k"+i+j];
          $(('#'+i)+j).text(localStorage["k"+i+j]);
        }
      }
    }
  }
  resumeAnimation();
  writeGameRT();
}

//Resume html elements animation as in prevous state
function resumeAnimation() {
  localStorage["game-board"] ? $('.game-board').fadeIn("slow") : $('.game-board').fadeOut("slow");
  localStorage["new-or-quit"] ? $('.new-or-quit').fadeIn("slow") : $('.new-or-quit').fadeOut("slow");
  localStorage["player"] ? $('.player').fadeIn("slow") : $('.player').fadeOut("slow");
  updateScores();
}
