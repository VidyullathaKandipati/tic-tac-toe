# Project: TiC Tac ToE - Multiplayer
---

To be exact, its DoublePlayer

App link: https://vidyullathakandipati.github.io/tic-tac-toe/

## Project overview:
***
I built this to accomplish my project 0 at GA.
I was expected to build any working version of Tic-tac-toe. I chose multiplayer to gain knowledge on the how a web app should be synchronised between multi windows.

## Features:
___
This is a basic 3X3 Tic tac toe game designed to have two and only two players.
Players / Users are being signed-in using the emailId and password.
These accounts should be already created on the firebase(in the project Authentication).
Player1 will be asked to choose his key from (X / O), and who ever choses will be the player1.
Player2(Or who ever has not chosen) will get the other key
and players can only play when its their turn.
The moves, scores and choice of the keys are displayed for all the users at the same time.

## Built With:
---
* HTML
* css
* JavaScript
* jQuery v1.12.4
* firebase 3.6.4

## Usage:
---
* Each user opens the link specified above.
* Game board would be same across.
* Any user can select the key first and he becomes the player1.
* He can start the game.
* And then the turn goes to player2 and this continues until there is a win condition or draw.
* Scores are updated across the players.
* Any one player can press 'New Game' to start a new game and this applies across.
* Any one player can press 'Reset scores' to reset all the scores and start a new game, this also applies across.

## Installation:
---
Just go the App link: https://vidyullathakandipati.github.io/tic-tac-toe/

## Future releases:
---
Yes, I plan on refactoring and fixing all the known issues and add more functionality if I can.
So watch the space for more :)

## Known Issues:
---
The system goes weird if both the players press 'New game' or 'Reset Scores' at a time.
It also goes weird if we first start with no data tree in firebase. (This is because of the order of the JS files being loaded)

## Contribute:
---
Yes you can all contribute, please email me what you have updated.

## Acknowledgements:
---
* I seriously can't thank Luke (@textchimp) enough for patiently going through my messed up code and help me fix nasty bugs. :)
* Thanks Joel for patiently teaching us. :)

## How to get it working with firebase
---
### Simple and exact steps for a simple application like this one:
---
* Create an account in firebase.google.com
* Click on 'Add firebase to your web App' link.
* Then we get some code: copy and paste it in our code. (A new file or where ever you want your FB code).
* Click on 'Authentication' link that we can find on left hand side
* Chose the 'SIGN_IN METHOD' as 'Email/Password' (You can chose anything, but I have tried only this way).
* In the 'USERS' tab give the email and password you want to connect with. (You can give one account for each player, but for my app, as I am asking for sign in details in my app, I used only one account for both players and managing the accounts with a global variable).
* Our prev firebase code, gives us our app configuration and initialisation using that.
* Now, we sign in to firebase (logging in to fb with email and password) using the following
```
```
firebase.auth().signInWithEmailAndPassword('email id given in Authentication', 'password given in Authentication').then(function(user){
  if(user){ // Ensures that the user is created, this is needed as JS is asynchronous and would not wait for the user to be created before we do next step. This check ensures that the user is created.
    // log message or your next code to do after the user is created.
  }
  }).catch(function(error) { // Handles exception which I guess is the unexpected error.
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
  
* Once you sign in to the firebase, we use firebase database, to synchronise between multiple users.
  We write to the firebase database when the state of our app changes ( if there are any updates in the app).
  We also listen (observe) for any changes that other user might have updated in firebase.
  (Is it fascinating / frustrating to play both roles in the same app? I found it fascinating at first)
* To write your data into firebase database
```
```
database.ref('Name for your data obj').set(<data in obj form>);
* To listen (observe) for any change in the firebase database, that other user might have made
```
```
database.ref('name of your data obj').on('value',function(data) {
  //Your code here
  //on('value') //means we are observing for value change on the data obj
  //function (data) // means function argument 'data' contains the updated value from firebase database
}

* The above code is called only if there is update on the 'data obj' in firebase database, if you want to
update a value from firebase, at once (immediately) even if there is no update, you could use the below function
```
```
firebase.database().ref('data obj').once('value').then(function(data) {
  //Your code here
}

* WOW, now you are ready for your own multi user app using firebase :D.
* P.S. I have a plan to get the user login when he open the app and use those details to sign in to firebase.
  I will update my progress and methods once I am done.

## Contact:
---
You can email me at: latha522@gmail.com
