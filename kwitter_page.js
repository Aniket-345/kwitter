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

var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

function send() {
    msg1 = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        Username: user_name,
        msg: msg1,
        likes: 0
    })
}

function logout() {
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location = "kwitter.html"
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code 
                console.log(firebase_message_id);
                console.log(message_data);
                Name= message_data['Username'];
                message= message_data['msg'];
                Likes= message_data['likes'];

                name_tag="<h4> "+Name+"<img class='user_tick' src='tick.png'></h4>";
                message_tag="<h4 class='message_h4'> "+message+"</h4>";
                like_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+Likes+" onclick='updateLike(this.id)'>";
                span_tag="<span class='glyphicon glyphicon-thumbs-up' >like: "+Likes+"</span></button><hr>";

                row=name_tag+ message_tag+ like_tag+ span_tag;
                document.getElementById("output").innerHTML+=row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id){
    like=document.getElementById(message_id).value;
    update_like=Number(like)+1;
    firebase.database().ref(room_name).child(message_id).update({
        likes:update_like
    })

    
}