document.addEventListener("DOMContentLoaded", function() {
	// URL to text content
	const urlParams = new URLSearchParams(window.location.search);
	const nama = urlParams.get('to') || 'Tamu Undangan';
	const pronoun = urlParams.get('p') || '';
	const namaContainer = document.querySelector('#cover h3');
	namaContainer.innerText = `${pronoun}${nama}`.replace(/ ,$/, ',');

	document.querySelector('#nama').value = nama;
	// End URL to text content

	// Menonaktifkan klik kanan
	document.addEventListener('contextmenu', function(e) {
		e.preventDefault();
	});

	if (window.location.hostname !== "arrumsurya-wedding.github.io") {
		// Menghapus atribut href dari semua elemen <link>
		document.querySelectorAll('link').forEach(function(link) {
			link.remove();
		});
	
		// Menghapus semua elemen <script>
		document.querySelectorAll('script').forEach(function(script) {
			script.remove();
		});
	} else {
		// alert('Oke!');
	}

	// Mencegah kombinasi tombol Ctrl
	document.addEventListener('keydown', function(e) {
		if (e.ctrlKey) {
			e.preventDefault();
		}
	});
	
	// Show the loader
	var loader = document.querySelector('.preloader');
	loader.style.height = '100vh';

	// Hide the loader once the page is fully loaded
	window.addEventListener('load', function() {
		// loader.style.height = '0';
		// Optionally, you can add a delay before hiding the loader
		setTimeout(function() {
			loader.style.height = '0';
		}, 1000);
	});
});
