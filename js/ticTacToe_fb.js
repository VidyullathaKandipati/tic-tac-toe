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
var defaultStorage = firebase.storage();
var defaultDatabase = firebase.database();

//firebase reference
var myFirebaseRef = new Firebase("https://tic-tac-toe-e7c22.firebaseio.com/");

var gameObj = { player1: player1,
                player2: player2,
                numOfMoves: numOfMoves,
                player1Scores: player1Scores,
                player2Scores: player2Scores,
                drawCount: drawCount,
                gameOver: gameOver,
                board: board
              };

myFirebaseRef.set(gameObj);

/* ============================================
Sample write and ready
======================================*/
// myFirebaseRef.set({
//   title: "Hello World!",
//   author: "Firebase",
//   location: {
//     city: "San Francisco",
//     state: "California",
//     zip: 94103
//   }
// });
// myFirebaseRef.child("location/city").on("value", function(snapshot) {
//   console.log(snapshot.val());  // Alerts "San Francisco"
// });
