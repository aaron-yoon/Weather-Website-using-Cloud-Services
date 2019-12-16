const db = firebase.firestore();

const emailfld = document.getElementById("EMAIL");
const passwordfld = document.getElementById("PASSWORD");
const loginbtn = document.getElementById("LOGINBTN");
const errortxtfld = document.getElementById("ERRORTXT");

// Sign in for the users
loginbtn.addEventListener("click", e => {
    const email = emailfld.value;
    const pass = passwordfld.value;
    const auth = firebase.auth();
    
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => {
        errortxtfld.innerHTML = e.message;
    });
});
firebase.auth().onAuthStateChanged(user => {
    if(user) {
        window.location.href = "/home.html";
    }
    else {
        //Do Nothing
    }
});

const newemailfld = document.getElementById("newEMAIL");
const newpasswordfld = document.getElementById("newPASSWORD");
const namefld = document.getElementById("NAME");
const cityfld = document.getElementById("CITY");
const submitbtn = document.getElementById("SUBMITBTN");


// Signing up new users
submitbtn.addEventListener("click", e => {
    const email = newemailfld.value;
    const city = cityfld.value;
    const name = namefld.value;
    const pass = newpasswordfld.value;

    db.collection("User").doc(email).set({
        name: name,
        email: email,
        city: city
    });

    //const auth = firebase.auth();
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => {
        errortxtfld.innerHTML = e.message;
    })
    .then(function() {
        console.log("Document successfully written!");
        alert("Thank you for signing up!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
});