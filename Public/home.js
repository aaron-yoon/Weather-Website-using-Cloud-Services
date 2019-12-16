firebase.auth().onAuthStateChanged(user => {
    if(user) {
        getUserName();
    }
    else {
        window.location.href = "/login.html";
    }
});

const logoutbtn = document.getElementById("LOGOUTBTN");
const usernametxt = document.getElementById("USERNAME");

var firestore = firebase.firestore();
var userName = "";
var userDocRef = "";


function getUserName(){
    /*
    if (firebase.auth().currentUser !== null) {
        userDocRef = firestore.doc("User" + firebase.auth().currentUser);
    }
    if (userDocRef !== "") {
        userDocRef.onSnapshot(function (doc) {
            /*
            if (doc && doc.exists) {
                const docdata = doc.data();
                usernametxt.innerHTML = "Welcome back " + docdata.name + "!";
            }
        });
    }	
    */
}

realtimeUserUpdate = function() {
    getUserName();
};

logoutbtn.addEventListener("click", e => {
    firebase.auth().signOut();
    window.location.href = "/login.html";
});

// GET Function
const userInfo = async () => {
    const response = await fetch('https://t9mf1hc516.execute-api.us-east-2.amazonaws.com/dev/clout-iot-testing');
    const myjson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myjson);
    

    document.getElementById("temp").innerHTML = myjson.Temperature;
    /*
    const jsonStringify = myjson;
    const jsonobj = JSON.parse(jsonStringify);

    console.log(jsonobj);

    for (var i = 0; i < jsonobj.length; i++) {
        console.log(jsonobj[i]['DeviceName']);
    }
    */
};


var usersemail;
var email = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var email = user.email;
      usersemail = email;
      console.log(email);
    } else {
      // User is signed out.
      console.log("no one is signed on");
    }
  });

const docRef = firestore.collection("User").doc("aaronshii@icloud.com");
docRef.get().then(function(doc){
    if (doc.exists) {
        console.log("Document data:", doc.data());
        // Need to replace with city name on the top
        const data = doc.data();

        document.getElementById("city").innerHTML = doc.data().city;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

/* Post function

const userAction = async () => {
  const response = await fetch('http://example.com/movies.json', {
    method: 'POST',
    body: myBody, // string or object
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
}

*/