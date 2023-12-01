const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('n') || '';
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';
const namaContainer = document.querySelector('#cover h3');
namaContainer.innerText = `${pronoun}, ${nama}`.replace(/ ,$/, ',');

document.querySelector('#nama').value = nama;

AOS.init({
	// Global settings:
	disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	initClassName: 'aos-init', // class applied after initialization
	animatedClassName: 'aos-animate', // class applied on animation
	useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
	
  
	// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	offset: 120, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 1000, // values from 0 to 3000, with step 50ms. default 400
	easing: 'linear', // default easing for AOS animations
	once: false, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

const thumbnails = document.querySelectorAll('img.thumbnail');
const imageList = Array.from(thumbnails).map(img => img.src);
let currentImageIndex = 0;

const fadeInNextImage = () => {
	// Sembunyikan gambar yang terlihat
	thumbnails.forEach(thumbnail => thumbnail.style.display = 'none');

	// Tampilkan gambar berikutnya
	currentImageIndex = (currentImageIndex + 1) % imageList.length;
	thumbnails[currentImageIndex].style.display = 'block';
};

fadeInNextImage(); // Tampilkan gambar pertama saat halaman dimuat

// Setelah animasi selesai, panggil fungsi untuk menampilkan gambar berikutnya
thumbnails.forEach(thumbnail => thumbnail.addEventListener('animationiteration', fadeInNextImage));

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
		message: message,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	};

	var newCommentKey = firebase.database().ref().child('comments').push().key;
	var updates = {};
	updates['/comments/' + newCommentKey] = commentData;

	firebase.database().ref().update(updates);

	document.getElementById('name').value = '';
	document.getElementById('message').value = '';
});

var commentList = document.getElementById('commentList');

firebase.database().ref('comments').orderByChild('timestamp').on('value', function(snapshot) {
	commentList.innerHTML = ''; // Kosongkan elemen commentList sebelum menambahkan data baru

	snapshot.forEach(function(childSnapshot) {
		var commentData = childSnapshot.val();

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

		// Gunakan unshift agar elemen baru ditambahkan di awal
		commentList.insertBefore(newComment, commentList.firstChild);
	});
});
