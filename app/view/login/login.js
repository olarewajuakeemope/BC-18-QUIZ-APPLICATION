

var login = document.getElementById('login');
var start = document.getElementById('start');
var config = {
        apiKey: "AIzaSyA3-v85rBZXODtmUzkHcwYVRYg6Khw_IAg",
        authDomain: "quizapp-2105e.firebaseapp.com",
        databaseURL: "https://quizapp-2105e.firebaseio.com",
        storageBucket: "quizapp-2105e.appspot.com",
        messagingSenderId: "80293514890"
      };		

firebase.initializeApp(config);
 
login.addEventListener('click', function(){
       var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });

        // add reatime listener
        firebase.auth().onAuthStateChanged (firebaseUser => {    
            if (firebaseUser){
                console.log(firebaseUser.displayName);
              document.getElementById("welcome").innerHTML = "Welcome " + firebaseUser.displayName;
              getQuestion();
            }

        })


})


function getQuestion(){
		/////////////////////////////////////////////////////////////
		/// SET DOCUMENT VARIABLEA AND COUNTERS ////////////////////

		var questionCounter = 0; //Tracks question number
  		var selections = []; //Array containing user choices
  		var quiz = $('#quiz'); //Quiz div object
  		// var questions = [];
  		var questionsMath =[];
  		var questionsProg = [];



		// As an admin, the app has access to read and write all data, regardless of Security Rules
		//LOAD MATH QUESTIONS AND RETURN 5 RANDOM QUESTION TO THE USER
		// function getMathQuestion(){
			//SET AN EMPTY ARRAY TO SAVE THE QUESTION
			

		/////////GET PROGRAMMING QUESTIONS
			var db = firebase.database().ref().child('quiz/programmingQuestions');
			db.orderByKey().once("value", function(snap){
		        snap.forEach(function(childSnap){
		        	
		         var  arrVal = childSnap.val();
	         	// // console.log(arrVal)
	         	// var question = arrVal.question;
	         	// var ans = arrVal.ans;
	         	// var choice = arrVal.choice;
	         	// console.log(choice);
	         	questionsProg.push(arrVal);  	


		       
		         }) 
		          	          
	        })

			var db = firebase.database().ref().child('quiz/mathQuestions');
			db.orderByKey().once("value", function(snap){
		        snap.forEach(function(childSnap){
		        	
		         var  arrVal = childSnap.val();
	         	
	         	questionsMath.push(arrVal);  	


		       
		         }) 
		          	          
	        })
	




			var db = firebase.database().ref().child('quiz/programmingQuestions');
			db.orderByKey().once("value", function(snap){
		        snap.forEach(function(childSnap){
		        	
		         var  arrVal = childSnap.val();
	         	questionsProg.push(arrVal);  	


		       
		         }) 
		          	          
	        })


	var mergeQuestion=  Object.assign(questionsProg, questionsMath);
	
	

  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(mergeQuestion[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < mergeQuestion[index].choice.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += mergeQuestion[index].choice[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < mergeQuestion.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === mergeQuestion[i].ans) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 mergeQuestion.length + ' right!!!');
    return score;
  }
};
       
     



