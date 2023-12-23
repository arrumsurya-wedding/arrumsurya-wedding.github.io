import lightGallery from "https://cdn.skypack.dev/lightgallery@2.1.2";
import lgZoom from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/zoom";
import lgThumbnail from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/thumbnail";
import lgShare from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/share";
import lgRotate from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/rotate";
import lgFullscreen from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/fullscreen";
import lgComment from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/comment";
// import lgAutoplay from "https://cdn.skypack.dev/lightgallery@2.1.2/plugins/autoplay";

const selectedGallery = "[data-lightbox-thumbnail]";
const carousels = document.querySelectorAll("[data-lightbox-gallery]");

const lightboxConfig = {
	autoplayFirstVideo: true,
	galleryId: "nature",
	mousewheel: true,
	commentBox: true,
	showZoomInOutIcons: true,
	actualSize: false,
	flipHorizontal: false,
	flipVertical: false,
	rotateLeft: false,
	plugins: [
		lgZoom,
		lgComment,
		lgThumbnail,
		lgShare,
		lgRotate,
		lgFullscreen,
		// lgAutoplay
	]
};

lightGallery(document.querySelector(selectedGallery), {
	...lightboxConfig,

	mobileSettings: {
		//controls: false,
		//showCloseIcon: false,
		//download: false,
		//rotate: false
	}
});

carousels.forEach((gallery, index) => {
	const galleryId = `gallery-${index + 1}`;

	lightGallery(gallery, {
		selector: ".row a",
		...lightboxConfig
	});
});
