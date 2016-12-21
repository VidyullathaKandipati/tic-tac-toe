// $(document).ready(function(){

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
var board = [ [0,0,0],
              [0,0,0],
              [0,0,0]];

//Because we dont want to append to the scores, we keep track of scores and append to the original text
var p1ScoreText;
var p2ScoreText;
var drawText;
var resume;

// });
