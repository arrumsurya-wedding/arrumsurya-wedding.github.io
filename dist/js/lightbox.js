import lightGallery from "https://cdn.skypack.dev/lightgallery@2.1.2";
import lgZoom from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/zoom";
import lgThumbnail from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/thumbnail";
import lgShare from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/share";
import lgFullscreen from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/fullscreen";
// import lgRotate from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/rotate";
// import lgComment from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/comment";
// import lgAutoplay from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/autoplay";
// import lgPager from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/pager";
// import lgVideo from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/video";
// import lgHash from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/hash";

const selectedGallery = "[data-lightbox-thumbnail]";
const carousels = document.querySelectorAll("[data-lightbox-gallery]");

// Objek konfigurasi umum yang digunakan di semua galeri
const lightboxConfig = {
	showZoomInOutIcons: true, // Menampilkan ikon zoom in dan zoom out pada gambar
	actualSize: false, // Menampilkan gambar dalam ukuran sebenarnya (tanpa zoom)
	mousewheel: true, // Mengaktifkan atau menonaktifkan penggunaan mousewheel untuk navigasi galeri
	subHtmlSelectorRelative: true, // Gunakan selector relatif untuk menemukan elemen subHtml
	thumbWidth: 100, // Lebar thumbnail
	thumbContHeight: 84, // Tinggi kontainer thumbnail
	// flipHorizontal: false, // Memutar gambar secara horizontal
	// flipVertical: false, // Memutar gambar secara vertikal
	// rotateLeft: false, // Memutar gambar ke kiri
	// commentBox: true, // Menampilkan kotak komentar pada galeri
	// mode: "lg-fade",  // Tipe animasi galeri (lg-slide, lg-fade, lg-zoom-in, dll.)
	// autoplayFirstVideo: true, // Autoplay video pertama ketika membuka galeri
	// thumbHeight: 64, // Tinggi thumbnail
	plugins: [
		lgZoom,
		lgThumbnail,
		lgShare,
		lgFullscreen,
		// lgRotate, // Aktifkan flipHorizontal, flipVertical, rotateLeft
		// lgAutoplay,
		// lgComment, // Aktifkan commentBox
		// lgPager,
		// lgVideo,
		// lgHash
	],
	mobileSettings: {
		//controls: false,
		//showCloseIcon: false,
		//download: false, // Menyembunyikan atau menampilkan tombol unduh
		//rotate: false
	}
};

// Menggunakan konfigurasi untuk galeri terpilih (selectedGallery)
lightGallery(document.querySelector(selectedGallery), {
	galleryId: "thumbnail",  // ID unik untuk galeri, berguna jika Anda memiliki beberapa galeri pada halaman yang sama
	...lightboxConfig,
});

// Menggunakan konfigurasi untuk setiap carousel pada halaman
carousels.forEach((gallery, index) => {
	const galleryId = `gallery-${index + 1}`;

	lightGallery(gallery, {
		galleryId: "carousel",  // ID unik untuk galeri, berguna jika Anda memiliki beberapa galeri pada halaman yang sama
		selector: ".row a",
		...lightboxConfig
	});
});
