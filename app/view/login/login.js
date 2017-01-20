
var login = document.getElementById('login');
var start = document.getElementById('start');
var username;
 
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
            	username = firebaseUser.displayName;
              document.getElementById("welcome").innerHTML = "Welcome " + firebaseUser.displayName;
              getQuestion();
            }

        })


})


function getQuestion(){
		/////////////////////////////////////////////////////////////
		/// SET DOCUMENT VARIABLE AND COUNTERS ////////////////////

		var questionCounter = 0; //Tracks question number
  		var selections = []; //Array containing user choices
  		var quiz = $('#quiz'); //Quiz div object
  		var questionsMath =[];
  		var questionsProg = [];
  		var numCorrect = 0;
  		console.log(selections);

  		var numCorrect = 0;  //initiate score 


		// As an admin, the app has access to read and write all data, regardless of Security Rules
		//LOAD MATH QUESTIONS AND RETURN 5 RANDOM QUESTION TO THE USER
		// function getMathQuestion(){
			//SET AN EMPTY ARRAY TO SAVE THE QUESTION
		/////////GET PROGRAMMING QUESTIONS
			var db = firebase.database().ref().child('quiz/programmingQuestions');
			db.orderByKey().once("value", function(snap){
		        snap.forEach(function(childSnap){
		        	
		         var  arrVal = childSnap.val();
	         		questionsProg.push(arrVal);  	
		        })      	          
	        })
				/////GET MATH QUESTIONS FROM FIREBASE
			var db = firebase.database().ref().child('quiz/mathQuestions');
			db.orderByKey().once("value", function(snap){
		        snap.forEach(function(childSnap){	
		         var  arrVal = childSnap.val();
	         	questionsMath.push(arrVal);  	
		         })       	          
	        })


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
	    
	    var question = $('<p>').append(questionsProg[index].question);
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
	    for (var i = 0; i < questionsProg[index].choice.length; i++) {
	      item = $('<li>');
	      input = '<input type="radio" name="answer" value=' + i + ' />';
	      input += questionsProg[index].choice[i];
	      item.append(input);
	      radioList.append(item);
	    }
	    return radioList;
	  }
	 
	  // Displays next requested element
	    // Displays next requested element
	  function displayNext() {
	    quiz.fadeOut(function() {
	      $('#question').remove();
	      
	      if(questionCounter < questionsProg.length){
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

	    //function to get getSelected botton
		function choose(){
			selections[questionCounter] = +$('input[name="answer"]:checked').val();
			 score(questionCounter);

			 if(selections[questionCounter] === questionsProg.length){
			 	var userScore = (numCorrect  * 100)
				updateDB(numCorrect * 100);
				displayScore();

			 }
		}
		function score(questionCounter){
			var ref =firebase.database().ref().child("quiz/programmingQuestions/0/ans" );
			ref.once("value", function(snapshot) {
			var ans = snapshot.val();
			
			if (selections[questionCounter] === 1 || 0){
				numCorrect++

			}
		})
		}
	  
	  // Computes score and returns a paragraph element to be displayed
	  function displayScore() {
	    var score = $('<p>',{id: 'question'});
	    
	    score.append('You got ' + numCorrect + ' questions out of ' +
	                 questionsProg.length + ' right!!!');
	    return score;
	  }
	  //INITIATE DATABASE
	var database = firebase.database();
	////APPEND LEADER BOARD
		var path = firebase.database().ref('/users');
		 path.orderByChild("score").limitToLast(10).on("child_added", function(snapshot) {
	   var data = (snapshot.val());
	   console.log(data);

	   if (data.score) {
	    var test = elem("test");
	    // console.log(data.name + data.score);

	       test.innerHTML += "<h2> name:   " + data.username + "    scored: " + data.score + "</h2>"

	   }

	  });

	///UPDATE THE DATABASE ON COMPLETION OF TEST AND STORE THE USER RECORD
	function updateDB(score){
		let pathRef = firebase.database().ref('/users/' + username)
		pathRef.child(score).update({
			"score": score,
		});
		
	}




};
       
     



