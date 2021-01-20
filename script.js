//DOM Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Global variables
let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
const imgCount = 5;
const apiKey = 'v_fkFG7oX8rZSsD9gx4h2knZjfmnHC29o8C-5yN5mBE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;

// setAtrribute helper function
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

//Load images
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		imgCount = 30;
		apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;
	}
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photoArray.length;
	photoArray.forEach(photo => {
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank'
		});

		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description
		});

		img.addEventListener('load', imageLoaded);

		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}


// Get photos from unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photoArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log(error);
	}
}

// scroll event
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		getPhotos();
		ready = false;
	}
});

//On Loading the application
getPhotos();