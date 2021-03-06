// var user1 = true;
var initUsers = function (user) {

  console.log('callback fired current userCount: ', user.email, userCount);

  firebase.database().ref('game/userCount').once('value').then(function(data) {

    console.log("local userCount",userCount,data.val());
    userCount = data.val();

    if( userCount >= 2 ){
      // error, too many players
      alert('too many players: ' + userCount);
      userCount++;
      return;
    } else if(userCount < 0 ){
      // nonsense value, reset to 0
      userCount = 0;   // this will be updated to 1, below
    }

    if (userCount === 0) {
      console.log('%cRESET board for first user', 'font-weight: bold');
      player1 = 'nothing';
      player2 = 'nothing';
      startNewGame();  // resets all game vars
      $('.game-keys').text(''); //Resets text from all the cells
    }

    userCount++;
    console.log("users increased on page load: ",userCount);
    writeGameRT();
  });

};


var config = {
    apiKey: "AIzaSyANAasRAcMaE9dC4VFqIOAPnvWAWLk65Vg",
    authDomain: "tic-tac-toe-e7c22.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-e7c22.firebaseio.com",
    storageBucket: "tic-tac-toe-e7c22.appspot.com",
    messagingSenderId: "35961278127"
  };
firebase.initializeApp(config);
// console.log(firebase.app().name);  // "[DEFAULT]"
//Authenticating the user login
// if (user1){
  firebase.auth().signInWithEmailAndPassword('latha522@gmail.com', 'chicken').then(function(user){
    if(user){
      initUsers(user);
    }

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });

// Use the shorthand notation to retrieve the default app's services
var storage = firebase.storage();
var database = firebase.database();
var gameRef = database.ref('game');

//Initialize game when there is any relevant change
database.ref('game/player1').on('value',function(data){
  console.log('CHANGE FOR player1', player1, data.val());
  if( data.val() !== "nothing" ){
    // a player has chosen which symbol they want to use, so game can now begin
    initGame(data.val());
    // // the person who didn't click to choose a key is always player2
    console.log('about to set other player');
    if(thisPlayer === ''){
      console.log('thisPlayer', thisPlayer);
      console.log('player1, player2', player1, player2);
      thisPlayer = player2;
    }

    // //hide key selection
    $('.keys').fadeOut("slow");
    // //this need to be faded out fast for smooth transition for another header
    $('#beforeClick').fadeOut(100).delay( 800 );
  }
});

// function readGameRT(){
  gameRef.on('value',function(data) {
    console.log('%cCHANGE', 'font-size: 14pt; color: red');
    player1 = data.val().player1;
    player2 = data.val().player2;
    userCount = data.val().userCount;
    turn = data.val().turn;
    numOfMoves = data.val().numOfMoves;
    player1Scores = data.val().player1Scores;
    player2Scores = data.val().player2Scores;
    drawCount = data.val().drawCount;
    gameOver = data.val().gameOver;
    board = data.val().board;
    newGame = data.val().newGame;
    //Updates game board when there is any change
    updateBoardForAll();
    updateScores();
    console.log('userCount:',userCount);

    if (userCount === 1){
      if (player1 !== 'nothing' || player2 !== 'nothing'){
        player1 = 'nothing';
        player2 = 'nothing';
      }
      if (turn === null){
        turn = ''
      }
    }

    console.log(data.val());
    console.log("Num Of Moves: ",numOfMoves);
    if (newGame){
      // updateBoardForAll();
      newGame = false;
      $('#afterClick').fadeOut(100);

      //Display before choice heading and buttons
      $('.keys').fadeIn("slow");
      $('#beforeClick').fadeIn("slow");
      $('.game-keys').text(''); //Resets text from all the cells
      startNewGame();
      console.log(board);
      console.log("Updated board");
    }
});

function writeGameRT(){
    var up =  {
      player1: player1,
      player2: player2,
      turn: turn,
      numOfMoves: numOfMoves,
      player1Scores: player1Scores,
      player2Scores: player2Scores,
      drawCount: drawCount,
      gameOver: gameOver,
      board: board,
      userCount: userCount,
      newGame: newGame
    };
    console.log('ready to Write to FB:', up);
    database.ref('game').set(up);
    // gameRef.update(up);
}
