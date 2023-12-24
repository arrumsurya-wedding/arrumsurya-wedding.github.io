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

// Fungsi untuk mendapatkan inisial dari nama
function getInitials(name) {
	var words = name.trim().split(/\s+/);

	if (words.length === 1) {
		// Jika hanya satu kata, ambil satu huruf pertama dari kata tersebut
		return name.length > 0 ? name[0].toUpperCase() : "";
	} else {
		// Jika lebih dari satu kata, ambil huruf pertama dari kata pertama
		// dan huruf pertama dari kata terakhir
		var firstInitial = words[0][0];
		var lastInitial = words[words.length - 1][0];

		// Pastikan huruf pertama dari kata pertama tidak undefined
		if (firstInitial) {
			return (firstInitial + " " + lastInitial).toUpperCase();
		} else {
			// Jika undefined, kembalikan satu huruf pertama dari kata terakhir
			return lastInitial.toUpperCase() + " ";
		}
	}
}

// Fungsi untuk mendapatkan kelas warna secara acak yang belum digunakan
function getRandomUnusedColorClass(usedColors) {
	var colorClasses = [
		"bg-primary",
		"bg-secondary",
		"bg-success",
		"bg-danger",
		"bg-warning",
		"bg-info",
		"bg-dark",
		// "bg-light",
		// "bg-body",
		// "bg-white",
		// "bg-transparent"
	];

	// Filter warna yang belum digunakan
	var availableColors = colorClasses.filter(function(colorClass) {
		return !usedColors.includes(colorClass);
	});

	if (availableColors.length === 0) {
		// Jika semua warna sudah digunakan, reset daftar warna yang sudah digunakan
		usedColors = [];
		availableColors = colorClasses;
	}

	// Pilih warna secara acak dari warna yang tersedia
	var randomIndex = Math.floor(Math.random() * availableColors.length);
	var chosenColor = availableColors[randomIndex];

	// Tambahkan warna yang dipilih ke daftar warna yang sudah digunakan
	usedColors.push(chosenColor);

	return { chosenColor, usedColors };
}

firebase.database().ref('comments').orderByChild('timestamp').on('value', function(snapshot) {
	commentList.innerHTML = ''; // Kosongkan elemen commentList sebelum menambahkan data baru

	// Daftar warna yang sudah digunakan
	var usedColors = [];

	// Hitung total komentar
	var totalComments = 0;

	snapshot.forEach(function(childSnapshot) {
		var commentData = childSnapshot.val();

		var newComment = document.createElement('div');
		newComment.className = 'd-flex mb-2';

		// Mengambil inisial dari nama menggunakan fungsi getInitials
		var initials = getInitials(commentData.name);

		// Mendapatkan kelas warna secara acak yang belum digunakan
		var { chosenColor, usedColors: updatedUsedColors } = getRandomUnusedColorClass(usedColors);
		usedColors = updatedUsedColors;

		newComment.innerHTML = `
			<div class="p-2 comment-avatar">
				<div class="rounded-circle ${chosenColor} d-flex justify-content-center align-items-center" style="width: 3rem; height: 3rem;">${initials}</div>
			</div>
			<div class="flex-grow-1 p-2 border rounded me-2">
				<strong>${commentData.name}</strong><br>${commentData.message}
			</div>
		`;

		// Gunakan unshift agar elemen baru ditambahkan di awal
		commentList.insertBefore(newComment, commentList.firstChild);

		totalComments++;
	});

	// Perbarui nilai total komentar
	document.getElementById('totalComments').innerText = totalComments + ' Comments';
});
