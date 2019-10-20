//Initialize Firebase
var config = {
	    apiKey: "AIzaSyCJCEWCaGO8SjZYyQyl8I_N-COPcJvMr4o",
	    authDomain: "myapplication-e0554.firebaseapp.com",
	    databaseURL: "https://myapplication-e0554.firebaseio.com",
	    projectId: "myapplication-e0554",
	    storageBucket: "myapplication-e0554.appspot.com",
	    messagingSenderId: "847456890810"
	  };
firebase.initializeApp(config);

document.getElementById('loginForm').addEventListener('submit', loginAction);
var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in.
	window.location.replace("addNews.html");
} 	else {
  // No user is signed in.
  	console.log("No user");
}
});

function loginAction(e){
	e.preventDefault();
	id = document.loginForm.loginId.value;
	pass = document.loginForm.loginPass.value;
	firebase.auth().signInWithEmailAndPassword(id,pass).catch(function(error) {
		document.getElementById('errorLoginMsg').style.visibility = 'visible';
  	console.log(error.code);
  	console.log(error.message);
});
}

function logout(){
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}