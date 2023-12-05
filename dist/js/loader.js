document.addEventListener("DOMContentLoaded", function() {
	// URL to text content
	const urlParams = new URLSearchParams(window.location.search);
	const nama = urlParams.get('n') || '';
	const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';
	const namaContainer = document.querySelector('#cover h3');
	namaContainer.innerText = `${pronoun}, ${nama}`.replace(/ ,$/, ',');

	document.querySelector('#nama').value = nama;
	// End URL to text content

	// Show the loader
	var loader = document.querySelector('.preloader');
	loader.style.height = '100vh';

	// Hide the loader once the page is fully loaded
	window.addEventListener('load', function() {
		// loader.style.height = '0';
		// Optionally, you can add a delay before hiding the loader
		setTimeout(function() {
			loader.style.height = '0';
		}, 500);
	});
});
