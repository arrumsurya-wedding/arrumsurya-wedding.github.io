var firebaseConfig = {
    apiKey: "AIzaSyAoDYDbN-L1arIC2za2hbW654dyFlnrTw0",
    authDomain: "wedding-invitation-bd4d6.firebaseapp.com",
    databaseURL: "https://wedding-invitation-bd4d6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wedding-invitation-bd4d6",
    storageBucket: "wedding-invitation-bd4d6.appspot.com",
    messagingSenderId: "967724620814",
    appId: "1:967724620814:web:18bbcaaae7afacf38ab05f",
    measurementId: "G-SCDYZ0Q3Q9"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    var commentData = {
        name: name,
        message: message
    };

    var newCommentKey = firebase.database().ref().child('comments').push().key;
    var updates = {};
    updates['/comments/' + newCommentKey] = commentData;

    firebase.database().ref().update(updates);

    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
});

var commentList = document.getElementById('commentList');

firebase.database().ref('comments').on('child_added', function(snapshot) {
    var commentData = snapshot.val();

    var newComment = document.createElement('div');
    newComment.className = 'd-flex mb-2';
    newComment.innerHTML = `
        <div class="p-2">
            <i class="bi bi-person-circle" style="font-size: 3rem;"></i>
        </div>
        <div class="flex-grow-1 p-2 border rounded me-2">
            <strong>${commentData.name}</strong><br>${commentData.message}
        </div>
    `;

    commentList.appendChild(newComment);
});