var config = {
    apiKey: "AIzaSyANAasRAcMaE9dC4VFqIOAPnvWAWLk65Vg",
    authDomain: "tic-tac-toe-e7c22.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-e7c22.firebaseio.com",
    storageBucket: "tic-tac-toe-e7c22.appspot.com",
    messagingSenderId: "35961278127"
  };
firebase.initializeApp(config);
console.log(firebase.app().name);  // "[DEFAULT]"
//Authenticating the user login
firebase.auth().signInWithEmailAndPassword('latha522@gmail.com', 'chicken').catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode, errorMessage);
});

// Use the shorthand notation to retrieve the default app's services
var storage = firebase.storage();
var database = firebase.database();
var gameRef = database.ref('game');

// database.ref('game').once('value').then(function(data) {

// function readGameRT(){
  gameRef.on('value',function(data) {
    player1 = data.val().player1;
    player2 = data.val().player2;
    numOfMoves = data.val().numOfMoves;
    player1Scores = data.val().player1Scores;
    player2Scores = data.val().player2Scores;
    drawCount = data.val().drawCount;
    gameOver = data.val().gameOver;
    board = data.val().board;
    console.log(player1);
    console.log(player2);
    console.log(numOfMoves);
    console.log(player1Scores);
    console.log(player2Scores);
    console.log(drawCount);
    console.log(gameOver);
    console.log(board);
});
// }

function writeGameRT(){
    var up = {
      player1: player1,
      player2: player2,
      numOfMoves: numOfMoves,
      player1Scores: player1Scores,
      player2Scores: player2Scores,
      drawCount: drawCount,
      gameOver: gameOver,
      board: board
    };

    gameRef.set(up);

    console.log('updated');
}
