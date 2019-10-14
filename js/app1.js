var config = {
	    apiKey: "AIzaSyCJCEWCaGO8SjZYyQyl8I_N-COPcJvMr4o",
	    authDomain: "myapplication-e0554.firebaseapp.com",
	    databaseURL: "https://myapplication-e0554.firebaseio.com",
	    projectId: "myapplication-e0554",
	    storageBucket: "myapplication-e0554.appspot.com",
	    messagingSenderId: "847456890810"
	  };
firebase.initializeApp(config);

const name = document.getElementById("name");
const where = document.getElementById("where");
const per = document.getElementById("per");
const hour = document.getElementById("hour");
const min = document.getElementById("min");
const date = document.getElementById("date");
const NewsList = document.querySelector('#news-bottom');
const NewsTop = document.querySelector('#news-top');
const NewsDetail = document.querySelector('#news-detail');
	
var dbRefObj = firebase.database().ref().child('faculty').child('Manoj').child('current_place');
var dbRefObj1 = firebase.database().ref().child('faculty').child('Manoj').child('time_of_return');
var dbRefObj2 = firebase.database().ref().child('news');


var delayInMilliseconds = 2000;

var storage = firebase.storage();
var storageRef = storage.ref();

var tangRef2 = storageRef.child('slideshowPictures/');

name.innerHTML="Manoj T. Joy";
	
dbRefObj.on('value', function(datasnap1){

	where.textContent = datasnap1.val();
	var placename = datasnap1.val();

	if (placename == "HOD's Office")
		document.body.style.backgroundImage = "url('images/instagram image-7.1.jpg')";
	else if (placename == "RS Staff Room")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_114917013494636_20190516_185553386.jpeg')";
	else if (placename == "Canteen")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_115094647104049_20190516_190042142.jpeg')";
	else if (placename == "Academic Council")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_115021229493247_20190516_185737602.jpeg')";
	else if (placename == 'St. Alphonsa Hall')
		document.body.style.backgroundImage = "url('images/alphonsa.jpg')";
	else if (placename == 'Automobile')
		document.body.style.backgroundImage = "url('images/auto.jpg')";
	else if (placename == "Central Auditorium")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_114947480435275_20190516_185623853.jpeg')";
	else if (placename == "College Office")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_115079680147662_20190516_190027175.jpeg')";
	else if (placename == "Manager's Office")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_114992595550342_20190516_185708968.jpeg')";
	else if (placename == "Principal's Office")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_114869986100993_20190516_185506359.jpeg')";
	else if (placename == "Basketball Court")
		document.body.style.backgroundImage = "url('images/Basketball.jpg')";
	else if (placename == "CCF")
		document.body.style.backgroundImage = "url('images/ccf.jpg')";
	else if (placename == "Admission cell" || placename == "Admission Cell")
		document.body.style.backgroundImage = "url('images/LRM_EXPORT_114896999751444_20190516_185533373.jpeg')";
	else if (placename == 'Unavailable')
		document.body.style.backgroundImage = "url('images/Instagram Image-0.jpg')";
	else
		document.body.style.backgroundImage = "url('images/instagram image-7.1.jpg')";

})
	

var count = 0;
var count2 = 0;
var dbHour = dbRefObj1.child('hour');
var dbMin = dbRefObj1.child('minute');
var dbPer = dbRefObj1.child('period');
var dbDate = dbRefObj1.child('date');

dbHour.on('value', function(snapHour){
		
	if(snapHour.val() != ""){
	
		document.getElementById('time').style.display="Block";
		document.getElementById('timeD').style.display="Block";
		eta();

	}
	else{
	
		document.getElementById('timeD').style.display="none";
		document.getElementById('time').style.display="Block";
		
		dbDate.on('value', function(snapDate){

		if (snapDate.val()!="")
			date.textContent = snapDate.val();
		else
			document.getElementById('time').style.display="none";

		})
	}
		
})

function eta(){

	dbHour.on('value', function(snap1){

		var hourval = snap1.val();
		var hourInt = parseInt(hourval, 10);
		if (hourInt <=9 && hourInt >=0) 
			hourval = '0'.concat(hourval);
		hour.textContent = hourval; 

	})
	dbMin.on('value', function(snap2){

		var minVal = snap2.val(); 
		var intMin = parseInt(minVal, 10); 
		if (intMin <= 9 && intMin>=0)
			minVal = '0'.concat(minVal);
		min.textContent = minVal;

	})
	dbPer.on('value', function(snap3){

		var perVal = snap3.val(); 
		per.textContent = perVal;

	})
	dbDate.on('value', function(snap4){

		if (snap4.val()!='null')
			date.textContent = snap4.val();

	})

};	

var array1 = ["",""];
var array2 = ["",""];
var newscount = dbRefObj2;
newscount.on('value', function(snapNewCount){

	var newsCount = Object.keys(snapNewCount.val());

	NewsList.innerHTML = "";
	NewsTop.innerHTML = "";
	for(count = 1; count<=Object.keys(snapNewCount.val()).length; count ++){

		var dbRefObj3 = dbRefObj2.child(count);

		var newsDetail = dbRefObj3.child('news');
		var newsTitle = dbRefObj3.child('title');
		
		let li = document.createElement('li');
		let b = document.createElement('br');

		li.setAttribute('data-id',count);
		newsTitle.on('value', function(snapNewsTitle){

			array1[count] = snapNewsTitle.val();
			li.textContent = array1[count];
			li.appendChild(b);
		});
		newsDetail.on('value', function(snapNewsDetail){
			array2[count] = snapNewsDetail.val();
		});

		NewsList.appendChild(li);
		NewsList.appendChild(b);
		//loop();

	}
});

	function loop() {
    NewsTop.innerHTML = array1[count2];
    NewsDetail.innerHTML = array2[count2];
    if (count2 == array2.length) {
        count2=0;
        loop();
    }else if (count2<=array2.length){
        setTimeout(loop, 3000);
    	}
    	//if(count2>Object.keys(snapNewCount.val()).length)
		count2+=1;
	}


	loop();
	
  /*tangRef.getDownloadURL().then(function(url){
    // Once we have the download URL, we set it to our img element
    document.querySelector('img').src = url;
    console.log(url);
  }).catch(function(error) {
    // If anything goes wrong while getting the download URL, log the error
    console.error(error);
  });*/

  var imageCount=0;
    	var iImg2 = 0;
    	var ListOfImages = ["",""];
  	var iImg = 0;
  
  tangRef2.listAll().then(function(result){
  	result.items.forEach(function(imageRef){
  		console.log(imageRef.toString());
  		imageCount++;
  		displayImage(imageCount, imageRef);
  		
  		 //document.querySelector('img').src = url;
  	});
  });
  function displayImage(count, images){
  	

  	console.log("count "+count);
  	images.getDownloadURL().then(function(url) {
  		ListOfImages[iImg] = url;
  		console.log("iimag = "+iImg);
  		iImg++;
  	});

  	changeImage();

  }

  function changeImage(){
  	document.querySelector('img').src = ListOfImages[iImg2];
  	console.log("imgimgimg "+iImg2);
  	if(iImg2 < (ListOfImages.length))
  		iImg2++;
  	else
  		iImg2=0;
  	
  	setTimeout(changeImage, 3000);
  }

   

