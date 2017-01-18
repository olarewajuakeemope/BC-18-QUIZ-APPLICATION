module.exports = (function(){

	// Set the configuration for QuizApp
var config = require('./config')
var path = require('path');

var admin = require("firebase-admin");

var serviceAccount = require("./quizapp-2105e-firebase-adminsdk-nzjji-1430e2c327.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://quizapp-2105e.firebaseio.com"
});




var firebase = require('firebase').initializeApp({
	serviceAccount,
	databaseURL : 'https://quizapp-2105e.firebaseio.com/'
})


var mathQuestions= [
			{'question':"An array is a set of numbers", "ans": "yes","choice": ["Ask Google", "No", "yes"]},
			{'question':"Divide 6 by 2?", "ans": '3',"choice": ['3', '12', '1']},
			{'question': 'Example of a decimal is', "ans": '0.3',"choice": ['0.3', '12', '2']},
			{'question': 'Example of numbers are?', "ans": '22/3',"choice": ['Andela', 'BFA', '22/3']},
			{'question': 'Is 22 a decimal?', "ans": 'no',"choice": ['yes', 'You didnt teach me', 'no']},
			{'question': 'Is 3 an integer', "ans": 'yes',"choice": ['yes', 'no', 'i cany tell']},
			{'question': 'Is 8 divisible by 2?', "ans": 'yes',"choice": ['yes', 'no', 'i dont know']},
			{'question': 'What is the sum of 12 and 3', "ans": '15',"choice": ['15', '22', '88']},
			{'question': 'What is the value of pi?', "ans": '22/7',"choice": ['12', '22/7', '3.33']},
			{'question': 'what is the product of 2 and 3?', "ans": '6',"choice": ['12', '15', '6']}
			]

var programmingQuestions= [
			{'question':"An example of styling language is JAVA", "ans": "no","choice": ["yes", "no", "yes and no"]},
			{'question':"C is a programmning language", "ans": 'yes',"choice": ['yes', 'no', 'i cant say']},
			{'question': 'Computers are design in Andela', "ans": 'no',"choice": ['yes', 'no', 'i cant say']},
			{'question': 'EC6 is an upgrade of ECMASCRIPT 5', "ans": 'yes',"choice": ['i dont know', 'yes', 'no']},
			{'question': 'English is an example of programming language', "ans": 'no',"choice": ['It was a programming language in 2016', 'yes', 'no']},
			{'question': 'HTML is a programming language', "ans": 'no',"choice": ['yes', 'no', 'i cany tell']},
			{'question': 'Javascript is an example of data type', "ans": 'no',"choice": ['yes', 'no', 'i dont know']},
			{'question': 'One of the method of authentication is via', "ans": 'Email and password',"choice": ['Email and password', 'singing', 'eating']},
			{'question': 'Software engineers repairs computers?', "ans": 'yes',"choice": ['yes', 'no', 'i cant say']},
			{'question': 'Web pages are a typical example of software engineering product?', "ans": 'yes',"choice": ['i cant say', 'yes', 'no']}
			]
			  

			
	for (var i=0; i < mathQuestions.length; i++){
		var quesIdMath = i;
		var quesMath = mathQuestions[i].question;
		var ansMath = mathQuestions[i].ans;
		var choiceMath = mathQuestions[i].choice;


		var mathQuestion = { question : quesMath, ans : ansMath, choice : choiceMath };
		var ref = firebase.database().ref().child('quiz');
		var logsRef = ref.child('math');
		var mathRef = ref.child('mathQuestion');
		var mathRef = mathRef.push(mathQuestion);

		// function writeUserData(quesId, ques, ans, choice) {
	 //  		firebase.database().ref('math/' + quesId).set({
		//     quesId: quesId,
		//     question: ques,
		//     ans : ans,
		//     choice: choice
	 // 	});
	}		


	for (var i=0; i < programmingQuestions.length; i++){
		var quesIdProg = i;
		var quesProg = programmingQuestions[i].question;
		var ansProg = programmingQuestions[i].ans;
		var choiceProg = programmingQuestions[i].choice;

		var progQuestion = { question : quesProg, ans : ansProg, choice : choiceProg };
		var ref = firebase.database().ref().child('progQuiz');
		var logsRef = ref.child('programming');
		var progRef = ref.child('progQuestion');
		var progRef = progRef.push(progQuestion);

		// function writeUserData(quesId, ques, ans, choice) {
	 //  		firebase.database().ref('programming/' + quesId).set({
		//     quesId: quesId,
		//     question: ques,
		//     ans : ans,
		//     choice: choice
	 // 	});
	
	}	

})();
	
	



