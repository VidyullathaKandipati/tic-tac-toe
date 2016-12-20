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
  startNewGame();
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
