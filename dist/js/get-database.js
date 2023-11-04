const firebaseConfig = {
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

const commentForm = document.getElementById("comment-form");
const commentSection = document.getElementById("comment-section");

commentForm.addEventListener("submit", function (e) {
	e.preventDefault();

	const name = document.getElementById("name").value;
	const message = document.getElementById("message").value;

	// Simpan komentar ke Firebase Database
	const commentRef = firebase.database().ref("comments").push();
	commentRef.set({
		name: name,
		message: message,
		timestamp: firebase.database.ServerValue.TIMESTAMP,
	});

	// Clear form fields
	document.getElementById("name").value = "";
	document.getElementById("message").value = "";
});

// Mengambil referensi komentar dari Firebase Database
const commentsRef = firebase.database().ref("comments");

// Mendengarkan perubahan data
commentsRef.on("child_added", function (snapshot) {
	const comment = snapshot.val();
	const commentElement = document.createElement("div");
	commentElement.classList.add("comment");
	commentElement.innerHTML = `
		<i class="comment-icon fas fa-user-circle"></i>
		<div>
			<strong>${comment.name}</strong>
			<p>${comment.message}</p>
		</div>
	`;
	commentSection.appendChild(commentElement);
});