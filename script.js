//Runs once at the beginning
//Runs once at the beginning
function setup() {
  var googleSheetLink = "https://docs.google.com/spreadsheets/d/1qQv2QPGrn_Z7h5LdJK6miDMPgboOXcXs_BsW7h6hbag/edit?usp=sharing";
  trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome); 
}

//Loops continously for background effects and animations. (p5.js)
function draw() {
  if (trivia.state == "welcome") background("#85E3FF");
  else if (trivia.state == "question") background("#AFCBFF");
  else if (trivia.state == "correct") background("#BFFCC6");
  else if (trivia.state == "incorrect") background("#FFABAB");
  else if (trivia.state == "thankyou") background("#E8B08D");
}

function displayWelcome() {
  $(".screen").hide();
  $("#welcome-screen").show();
  $('#welcome-image').html(`<img src='pictures/0.jpeg'</img>`);
}

function displayQuestion() {
  $(".screen").hide();
  $("#question-screen").show();
  trivia.insertQuestionInfo();
  if (trivia.currentQuestion.image)
    $('#image-holder').html(`<img src='${trivia.currentQuestion.image}'</img>`);
  else 
    $('#image-holder').html(``);
  trivia.shuffleAnswers();
  $("#correctAnswer").removeClass("highlight");
  $("#incorrectAnswer1").removeClass("highlightWrong"); //unhighlight incorrect answers 1/3
  $("#incorrectAnswer2").removeClass("highlightWrong"); // 2/3
  $("#incorrectAnswer3").removeClass("highlightWrong"); // 3/3
  $("#feedback").hide();
}

function displayThankyou() {
  $(".screen").hide();
  $("#thankyou-screen").show();
  $("#game-results").html(`You got ${trivia.totalCorrect} of ${trivia.totalAnswered} correct.`);
}

function onClickedAnswer(isCorrect) {
  var soundCorrect = new Audio("sounds/sound_correct.mp3");
  var soundIncorrect = new Audio("sounds/sound_incorrect.mp3");
  if (isCorrect) {
    $("#feedback").html(`Way to go!`).show();
    soundCorrect.play();
  }
  else {
    $("#feedback").html(`Better luck next time.`).show();
    soundIncorrect.play();
    }
  $("#incorrectAnswer1").addClass("highlightWrong"); //highlight incorrect answers red 1/3
  $("#incorrectAnswer2").addClass("highlightWrong"); // 2/3
  $("#incorrectAnswer3").addClass("highlightWrong"); // 3/3
  $("#correctAnswer").addClass("highlight"); //highlight right answer
  setTimeout(trivia.gotoNextQuestion, 500); //wait 0.5 secs...next question
}

function onClickedStart() {
  displayQuestion();
}