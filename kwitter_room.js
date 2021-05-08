//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
    apiKey: "AIzaSyCK9qmTAaEwt0CpNc5OwWlkZcB2VbmIUe4",
    authDomain: "kwitter-ba887.firebaseapp.com",
    databaseURL: "https://kwitter-ba887-default-rtdb.firebaseio.com",
    projectId: "kwitter-ba887",
    storageBucket: "kwitter-ba887.appspot.com",
    messagingSenderId: "993649274768",
    appId: "1:993649274768:web:2f1b74e9ed951294f0cd15"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var username=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="welcome "+username+"!";

function addroom(){
    roomName=document.getElementById("room_name").value;
    firebase.database().ref("/").child(roomName).update({
        purpose:"addingRoomName"
    });
    localStorage.setItem("room_name",roomName);
    window.location="kwitter_page.html";
    
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code //End code
            row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>"
            document.getElementById("output").innerHTML+=row
        });
    });
}
getData();

function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name",name);
    window.location="kwitter_page.html";
}

function logout(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location="kwitter.html"
}

