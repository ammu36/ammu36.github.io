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

var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in.
	
} 	else {
  // No user is signed in.
  	window.location.replace("login.html");
}
});
var dbRefObj = firebase.database().ref().child('news');

//Listen for form submit
document.getElementById('newsAddForm').addEventListener('submit',submitNewsClick);
	

function submitNewsClick(e){
	e.preventDefault();
	var newsTitle = document.getElementById("newsTitle").value;
	var newsDescription = document.getElementById("newsDescription").value;
	var newNewsRef = dbRefObj.push();
	newNewsRef.set({
		news: newsDescription,
		title: newsTitle});
	location.reload(true);
}



var array1 = ["",""];
var array2 = ["",""];
var newscount = dbRefObj;
newscount.on('value', function(snapNewCount){
	snapNewCount.forEach(function(childSnapshot) {
		//console.log(childSnapshot.key);
		var newsKey = childSnapshot.key;
		var childObject = childSnapshot.val();

		var newsDetail = childObject.news;
		//console.log(newsDetail);
		var newsTitle = childObject.title;

		
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var div3 = document.createElement('div');
		var hh = document.createElement('h3');
		var par = document.createElement('p');
		var btn = document.createElement('button');
		var btn2 = document.createElement('button');

		div1.className = 'col-lg-04';
		div2.className = 'card text-white bg-dark mb-3 d-inline-block';
		div3.className = 'card-body';

		btn.id = newsKey;
		btn.type = 'button';
		btn.className = "btn btn-danger";
		btn.innerHTML = 'Delete';

		btn2.id = newsTitle;
		btn2.type = 'button';
		btn2.className = "btn btn-warning";
		btn2.innerHTML = 'Edit';


		hh.textContent = newsTitle;
		par.textContent = newsDetail;


		div3.appendChild(hh);
		div3.appendChild(par);
		div3.appendChild(btn);
		//div3.appendChild(btn2);
		div2.appendChild(div3);
		div1.appendChild(div2);
		$('#newsList').append(div1);

		document.getElementById(newsKey).addEventListener("click", function(){
			//alert(images);
  			deleteNews(newsKey);
});
		/*document.getElementById(newsTitle).addEventListener("click", function(){
  			editNews(newsTitle , newsDetail);
});*/
	});
});

function deleteNews(news2){

	dbRefObj.child(news2).remove().then(function() {
    refreshAfterDelete();
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
}

function refreshAfterDelete() {
  var txt;
  if (confirm("News is deleted successfully!Click ok to refresh")) {
    location.reload();
  } else {
  }
}

function refreshAfterInsert() {
  var txt;
  if (confirm("News is successfully inserted!Click ok to refresh")) {
    location.reload();
  } else {
  }
}

function editNews(NewsTitle , newsDetail){
	console.log(newsDetail);
}

function logout(){
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}

