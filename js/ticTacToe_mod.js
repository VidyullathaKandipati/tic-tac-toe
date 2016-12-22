/* ============================================= */
/*  A more complicated win solution (C++ way)
      and only half of the webpage is done
      Win solution is full though     */
/* ===============================================*/

$(document).ready(function(){
  //Display game board upon selection of the key
  var player1;
  var player2;
  var numOfMoves = 0;
  var p1Moves = []; // Keeps track of the p1Moves
  var p2Moves = []; // Keeps track of the p2Moves
  var winCombinations = ["123","456","789","147","258","369","159","357"]; //There is no win if not in this combinations
  $('#key1, #key2').on('click', displayBoard);
  $('.game-keys').on('click', updateGame);
  $('')

  function displayBoard(){
    //hide key selection
    $('.keys').addClass("hide");

    //Dsiplay game board and new game buttons
    $('.game-board').addClass('visible');
    $('.new-or-reset').addClass('visible');
    initGame($(this).val());
  }
  function initGame(playKey) {
    //Initial player keys
    player1 = playKey;
    player2 = (playKey === 'X') ? 'O': 'X';
  }
  function updateGame() {
    //Update number of moves : To check for turn of the player
    numOfMoves++;
    if( numOfMoves%2 !== 0 ){
      $(this).text(player1);
      //Updates player 1 moves
      //Sure there is other way, I will do it later. This is C++ way :)
      p1Moves.push($(this).attr('id').substring(1));
    }
    else {
      $(this).text(player2);
      //Updates player 2 moves.
      p2Moves.push($(this).attr('id').substring(1));
    }
    //Check for winner or draw
    var gameRes = isGameOver();
    if (gameRes === 'p1'){
      console.log("Congratulations!!! Player 1 has won");
    }
    else if (gameRes === 'p2'){
      console.log("Congratulations!!! Player 2 has won");
    }
    else if (gameRes === 'draw'){
      console.log("The game is draw");
    }
  }
  function isGameOver() {
    //Check for win only if the length of any of the player is >3
    if(p1Moves.length >=  3 || p2Moves.length >= 3){
      for(var i=0; i<p1Moves.length; i++){
        for (var j=0; j<p1Moves.length; j++){
          var p1 = []; // To get the 3 key combination of player 1 moves
          p1.push(p1Moves[i]);
          p1.push(p1Moves[j]);
          p1.push(p1Moves[j+1]);
          var p = p1.sort().join(''); //Creates a sort 3 key combination
          //Checks if the combination is in winCombinations
          if (winCombinations.indexOf(p) !== -1){
            return "p1";
          }
        }
      }
      for(var i=0; i<p2Moves.length; i++){
        for (var j=0; j<p2Moves.length; j++){
          var p2 = []; // To get the 3 key combination of player 2 moves
          p2.push(p2Moves[i]);
          p2.push(p2Moves[j]);
          p2.push(p2Moves[j+1]);
          var p = p2.sort().join('');
          if (winCombinations.indexOf(p) !== -1){
            return "p2";
          }
        }
      }
    }
    //Checks if the match is draw
    if(numOfMoves >= 9){
      return "draw";
    }
    return;
  }

});
