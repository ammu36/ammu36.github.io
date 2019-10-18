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

//Get upload elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

//Listen for file selection
fileButton.addEventListener('change', function(e){
	//Get file
	var file = e.target.files[0];

	//Create a storage ref
	var storageRef = firebase.storage().ref('slideshowPictures/' + file.name);

	//upload
	var uploadTask = storageRef.put(file);

	//Update progress bar
	uploadTask.on('state_changed',function (snapshot){
			var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			uploader.value = percentage;
			console.log(percentage);
			if (percentage==100) refreshAfterInsert();
		},
		function error(err){
		},
		function () {0
			addToast();
		}

	);
});

//Download images to diaplay
var storageRef2 = firebase.storage().ref('slideshowPictures/');
$('#imageList').find('tbody').html('');
var i = 0;
storageRef2.listAll().then(function(result){
	result.items.forEach(function(imageRef){
		i++;
		displayImage(i, imageRef);
	});
});

function displayImage(row, images){
	images.getDownloadURL().then(function(url){
		console.log("covered"+url);
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var div3 = document.createElement('div');
		var im = document.createElement('img');
		var deleteButton = document.createElement('button');
		var hr1 = document.createElement('hr');
		div1.className = 'col-md-6';
		div2.className = 'post post-thumb';
		div3.className = 'post-body';
		im.src = url;
		im.style.height = '500px';
		im.style.width = '500px';
		deleteButton.id = images;
		deleteButton.innerHTML = 'Delete';
		div2.style.padding = '10px';
		deleteButton.className = 'btn btn-danger btn-lg btn-block';
		deleteButton.type = 'button';
		div3.appendChild(im);
		div3.appendChild(hr1);
		div3.appendChild(deleteButton);
		div2.appendChild(div3);
		div1.appendChild(div2);

		$('#imageList').append(div1);
		document.getElementById(images).addEventListener("click", function(){
  			deleteImage(images);
});
	});
}


function deleteImage(img){
	var desertRef = firebase.storage().refFromURL(img.toString());
	console.log(desertRef);
	desertRef.delete().then(function() {
  		refreshAfterDelete();
	}).catch(function(error) {
  		console.log("Error");
});
}

function refreshAfterDelete() {
  var txt;
  if (confirm("File is deleted successfully!Click ok to refresh")) {
    txt = "You pressed OK!";
    location.reload();
  } else {
    txt = "You pressed Cancel!";
  }
}

function refreshAfterInsert() {
  var txt;
  if (confirm("Image is successfully inserted!Click ok to refresh")) {
    txt = "You pressed OK!";
    location.reload();
  } else {
    txt = "You pressed Cancel!";
  }
}