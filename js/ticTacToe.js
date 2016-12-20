$(document).ready(function(){
  //Display game board upon selection of the key
  var player1;
  var player2;
  var numOfMoves = 0;
  var board = [ [0,0,0],
                [0,0,0],
                [0,0,0]];
  $('#key1, #key2').on('click', displayBoard);
  $('.game-keys').on('click', updateGame);

  function displayBoard(){
    //hide key selection
    $('.keys').addClass("hide");
    $('#beforeClick').addClass("hide");
    //Dsiplay game board and new game buttons
    $('.game-board').addClass('visible');
    $('.new-or-quit').addClass('visible');
    initGame($(this).val());
  }
  function initGame(playKey) {
    //Initial player keys
    startNewGame();
    player1 = playKey;
    player2 = (playKey === 'X') ? 'O': 'X';
    $('#afterClick').text("Player 1 has chosen "+player1+" Player 2 gets  "+player2);
  }
  function startNewGame(){
    //Initial global variables and game board;
    numOfMoves = 0;
    board = [ [0,0,0],
              [0,0,0],
              [0,0,0]];
  }
  function updateGame() {
    numOfMoves++;
    if( numOfMoves%2 !== 0 ){
      $(this).text(player1);
    }
    else {
      $(this).text(player2);
    }
    // console.log($(this).text());
    updateBoard();
    if (isGameOver(player1) === "win"){
      console.log("Congratulations!!! Player1 has won.");
    }
    else if (isGameOver(player2) === "win"){
      console.log("Congratulations!!! Player2 has won.");
    }
    else if (numOfMoves >= 9){
      console.log("This game is draw.");
    }
  }
  function updateBoard() {
     for (var i = 1; i <= 3; i++) {
       var key = 'k'+i;
       board[0][i-1] = $('#'+key).text();
     }
     for (var i = 4; i <= 6; i++) {
      var key = 'k'+i;
      board[1][i-4] = $('#'+key).text();
    }
    for (var i = 7; i <= 9; i++) {
      var key = 'k'+i;
      board[2][i-7] = $('#'+key).text();
    }
  }
  function isGameOver(p) {
    //Checks for the win in the 3 Rows
    if ( (board[0][0] === p && board[0][1] === p && board[0][2] === p) ||
         (board[1][0] === p && board[1][1] === p && board[1][2] === p) ||
         (board[2][0] === p && board[2][1] === p && board[2][2] === p) )
    {
      return "win";
    }
    // for(var i=0; i<3; i++){
    //   var matches = 0;
    //   for(var j=0; j<3; j++){
    //     if (board[i][j] !== p){
    //       break;
    //     }
    //     else {
    //       matches++;
    //       if (matches === 3){
    //         return "win";
    //       }
    //     }
    //   }
    // }
    //Check for win in 3 Columns
    if( (board[0][0] === p && board[1][0] === p && board[2][0] === p) ||
        (board[0][1] === p && board[1][1] === p && board[2][1] === p) ||
        (board[0][3] === p && board[1][3] === p && board[2][3] === p) )
    {
      return "win";
    }

    // for(var i=0; i<3; i++){
    //   var matches = 0;
    //   for(var j=0; j<3; j++){
    //     if (board[j][i] !== p){
    //       break;
    //     }
    //     else {
    //       matches++;
    //       if (matches === 3){
    //         return "win";
    //       }
    //     }
    //   }
    // }
    //Check for win Diagonally
    if ( (board[0][0] === p && board[1][1] === p && board[2][2] === p) ||
         (board[0][2] === p && board[1][1] === p && board[2][0] === p) )
    {
      return "win";
    }
    // var matches = 0;
    // for (var i=0; i<3; i++){
    //     if (board[i][i] !== p){
    //       break;
    //     }
    //     else {
    //       matches++;
    //       if (matches === 3){
    //         return "win";
    //       }
    //     }
    // }

    return;
  }

});
