var login = document.getElementById('login');

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
            }

        })
})
       
     





// //initialixe login function
// (function(){
//       var config = {
//     apiKey: "AIzaSyA3-v85rBZXODtmUzkHcwYVRYg6Khw_IAg",
//     authDomain: "quizapp-2105e.firebaseapp.com",
//     databaseURL: "https://quizapp-2105e.firebaseio.com",
//     storageBucket: "quizapp-2105e.appspot.com",
//     messagingSenderId: "80293514890"
//   };
//   firebase.initializeApp(config);

    
    
//     //add login event
    
// login.addEventListener('click', e => {
//     // get email and pass
//     const email = $('#email').val();
//     const pass = $('#password').val();
//     const login = $('#login').val();
//     const auth = firebase.auth();
    
//     //sign in
//     const promise= auth.signInWithEmailAndPassword(email, pass);
//     promise.catch(e => console.log(e.message));
// })

// // add signUp event
//     // signUp.addEventListener('click', e => {
//     // // get email and pass
//     // const email = $('#email').val();
//     // const pass = $('#password').val();
//     // const signUp = $('#signUp').val();
//     // const auth = firebase.auth();
    
//     // //sign up
//     // const promise= auth.createUserWithEmailAndPassword(email, pass);
//     // promise.catch(e => console.log(e.message));
//     // })
    
// //log out
// logout.addEventListener('click', e => {
//     // get email and pass
//    firebase.auth().signOut();
// })

// // add reatime listener
// firebase.auth().onAuthStateChanged (firebaseUser => {    
//     if (firebaseUser){
//         console.log(firebaseUser);
//         logout.classList.remove('hide');
        
//     }else{
//         console.log('not logged in');
//         logout.classList.add('hide');
//     }


// });

// }());