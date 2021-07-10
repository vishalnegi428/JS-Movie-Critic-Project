const addModal = document.getElementById("add-modal");
const backDrop = document.getElementById("backdrop");
const addMovieBtn = document.querySelector("header button");
const cancelBtn = document.getElementById("cancel-button");
const addBtn = document.getElementById("add-button");
const TITLE = document.getElementById("title");
const IMAGEURL = document.getElementById("image-url");
const RATING = document.getElementById("rating");
const movieList = document.getElementById("movie-list");
const entryText = document.getElementById("entry-text");
const deleteModal = document.getElementById("delete-modal");

const movieEntries = [];

const toggleBackdrop = () => {
	backDrop.classList.toggle("visible");
};

const hideModal = () => {
	addModal.classList.remove("visible");
};

const hideAreYouSureTab = () => {
	deleteModal.classList.remove("visible");
};

const clearInputs = () => {
	TITLE.value = "";
	IMAGEURL.value = "";
	RATING.value = "";
};

const showModalHandler = () => {
	addModal.classList.add("visible");
	toggleBackdrop();
};

const cancelModalHandler = () => {
	hideModal();
	toggleBackdrop();
	clearInputs();
};

const backdropHandler = () => {
	toggleBackdrop();
	hideModal();
	clearInputs();
	hideAreYouSureTab();
};

const noButtonHandler = () => {
	deleteModal.classList.remove("visible");
	toggleBackdrop();
};

const yesButtonHandler = (id) => {
	let movieIndex = 0;
	for (let entry of movieEntries) {
		if (entry.id === id) {
			break;
		}
		movieIndex++;
	}
	movieEntries.splice(movieIndex, 1);
	movieList.children[movieIndex].remove();
	console.log(movieEntries);
	noButtonHandler();
	updateUI();
};

const showAreYouSureTab = (modalId) => {
	deleteModal.classList.add("visible");
	toggleBackdrop();

	const noBtn = document.getElementById("no-button");
	let yesBtn = document.getElementById("yes-button");

	yesBtn.replaceWith(yesBtn.cloneNode(true));
	yesBtn = document.getElementById("yes-button");

	noBtn.removeEventListener("click", noButtonHandler);

	noBtn.addEventListener("click", noButtonHandler);
	yesBtn.addEventListener("click", yesButtonHandler.bind(null, modalId));
};

const displayMovieEntries = (id, title, imageUrl, rating) => {
	const movieTab = document.createElement("li");
	movieTab.className = "movie-element";
	movieTab.innerHTML = `
    <div class= "movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class= "movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 Stars</p>
    </div>`;

	movieList.appendChild(movieTab);
	movieTab.addEventListener("click", showAreYouSureTab.bind(null, id));

	//console.log(movieEntries);
};

const logEntry = (id, title, imageUrl, rating) => {
	const movieEntry = {
		id: id,
		title: title,
		imageUrl: imageUrl,
		rating: rating,
	};
	movieEntries.push(movieEntry);
	console.log(movieEntries);
	displayMovieEntries(id, title, imageUrl, rating);
};

const updateUI = () => {
	if (movieEntries.length === 0) {
		entryText.style.display = "block";
	} else {
		entryText.style.display = "none";
	}
};

const addMovieHandler = () => {
	const id = Math.random().toString();
	const T = TITLE.value.trim();
	const U = IMAGEURL.value.trim();
	const R = RATING.value.trim();
	if (T === "") {
		alert("Please enter TITLE");
		return;
	} else if (U === "") {
		alert("Please enter IMAGE URL");
		return;
	} else if (R === "" || R < 1 || R > 5) {
		alert("Please enter valid Rating between 1 and 5");
		return;
	}
	logEntry(id, T, U, R);
	cancelModalHandler();
	updateUI();
};

addMovieBtn.addEventListener("click", showModalHandler);
cancelBtn.addEventListener("click", cancelModalHandler);
backDrop.addEventListener("click", backdropHandler);
addBtn.addEventListener("click", addMovieHandler);
