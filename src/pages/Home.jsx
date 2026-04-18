import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
	const [movieCurrentLink, setMovieCurrentLink] = useState([]);
	const [bestMovies, setBestMovies] = useState([]);
	const [movieGallery, setMovieGallery] = useState([]);
	const movieListEl = document.querySelector(".showcase__movies--list");
	const bestMovieListEl = document.querySelector(".best__movies--slider");
	const bestMovieBkgdEl = document.querySelector("#best");
	const movieGalleryEl = document.querySelector(".movies__gallery");
	const movieSection = document.querySelector("#movies");
	const searchInput = document.getElementById("search--bar");
	const searchLoad = document.querySelector(".search__spinner");
	const loading = document.querySelector(".load__spinner");
	const magGlass = document.querySelector(".mag__glass");
	const searchResult = document.querySelector(".search__result");
	let loadIndex = 0;
	let lastSearchTerm = null;

	// MAIN

	useEffect(() => {
		main();
		topTenMovies();
	}, []);

	async function main() {
		let i = 0;
		const { data } = await axios.get(
			"https://www.omdbapi.com/?apikey=6e82b9d2&s=movie",
		);

		const moviesDataSearch = data.Search;

		if (!movieCurrentLink === false) {
			setMovieCurrentLink(moviesDataSearch[0].Poster);
		}
		
		setInterval(() => {
			if (i < 9) {
				i = i + 1;
			} else {
				i = 0;
			}
			
			let movieCurrent = moviesDataSearch[i];
			let movieCurrentOutput = Object.values(movieCurrent);
			let movieCurrentLink = movieCurrentOutput[4];

			setMovieCurrentLink(movieCurrentLink);
		}, 10000);
	}

	// TOP 10

	async function topTenMovies() {
		let i = 0;

		const { data } = await axios.get(
			"https://www.omdbapi.com/?apikey=6e82b9d2&s=last",
		);
		const moviesDataSearch = data.Search;
		let movieCurrent = moviesDataSearch;
		console.log(movieCurrent);
		let movieCurrentOutput = Object.values(movieCurrent);
		let movieCurrentLink = movieCurrentOutput[4];
		setBestMovies(data.Search);

	// 	// Create background element
		const backgroundDiv = document.createElement("div");
		backgroundDiv.className = "best__movie--bkgd";
		bestMovieBkgdEl.insertBefore(backgroundDiv, bestMovieBkgdEl.firstChild);

	// 	// Set initial background to first movie
		updateBackground(moviesDataSearch[0].Poster);

	// 	// Add hover listeners to each movie
		const movieElements = document.querySelectorAll(".best__movie");
		movieElements.forEach((movieEl, index) => {
			movieEl.addEventListener("mouseenter", () => {
				updateBackground(moviesDataSearch[index].Poster);
			});
		});

		function updateBackground(posterUrl) {
			const backgroundDiv = document.querySelector(".best__movie--bkgd");
			if (backgroundDiv) {
				backgroundDiv.innerHTML = `<img src="${posterUrl}" alt=""/>`;
			}
		}
	}

	// function bestMoviesHTML(movie) {
	// 	return `
    //     <div class="best__movie">
    //         <figure class="best__movie--wrapper">
    //             <img src="${movie.Poster}" class="best__movie--img" alt="">
    //         </figure>
    //     </div>`;
	// }

	// // MOVIE GALLERY

	// async function moviesGallery() {
	// 	const moviesPg1 = await axios.get(
	// 		"https://www.omdbapi.com/?apikey=6e82b9d2&s=movie&page=1",
	// 	);
	// 	const moviesPg2 = await axios.get(
	// 		"https://www.omdbapi.com/?apikey=6e82b9d2&s=movie&page=2",
	// 	);
	// 	const moviesData1 = moviesPg1.data;
	// 	const moviesData2 = moviesPg2.data;
	// 	const moviesDataSearch = [].concat(moviesData1.Search, moviesData2.Search);
	// 	// console.log(moviesDataSearch);

	// 	setMovieGallery(moviesDataSearch);
	// }

	// // SEARCH MOVIES

	// function searchMovies(event) {
	// 	lastSearchTerm = searchInput.value;
	// 	const lastSearchTermU =
	// 		lastSearchTerm.charAt(0).toUpperCase() + lastSearchTerm.slice(1);
	// 	console.log("you searched: " + lastSearchTermU);
	// 	if (lastSearchTerm.length !== 0 && lastSearchTerm !== "") {
	// 		magGlass.classList += " mag__glass--hidden";
	// 		searchLoad.classList += " search__spinner--visible";
	// 		setTimeout(() => {
	// 			magGlass.classList.remove("mag__glass--hidden");
	// 			searchLoad.classList.remove("search__spinner--visible");
	// 			movieSection.scrollIntoView({ behavior: "smooth", block: "start" });
	// 		}, 1500);
	// 		loadIndex = -1;
	// 		loadMoreMovies(lastSearchTerm);
	// 		searchResult.innerHTML = "Your Search: " + lastSearchTermU;
	// 		searchResult.classList += " search__result--visible";
	// 	} else {
	// 		alert("Type in the name of a movie");
	// 	}
	// }

	// // LOADING MORE MOVIES

	// async function loadMoreMovies(input) {
	// 	loadIndex = loadIndex + 1;

	// 	const query = input || lastSearchTerm || "movie";

	// 	if (loadIndex <= 8) {
	// 		loading.classList += " spinner__visible";
	// 	}
	// 	const moviesPg1 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=1`,
	// 	);
	// 	const moviesPg2 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=2`,
	// 	);
	// 	const moviesPg3 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=3`,
	// 	);
	// 	const moviesPg4 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=4`,
	// 	);
	// 	const moviesPg5 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=5`,
	// 	);
	// 	const moviesPg6 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=6`,
	// 	);
	// 	const moviesPg7 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=7`,
	// 	);
	// 	const moviesPg8 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=8`,
	// 	);
	// 	const moviesPg9 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=9`,
	// 	);
	// 	const moviesPg10 = await axios.get(
	// 		`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=10`,
	// 	);
	// 	const moviesData1 = moviesPg1.data;
	// 	const moviesData2 = moviesPg2.data;
	// 	const moviesData3 = moviesPg3.data;
	// 	const moviesData4 = moviesPg4.data;
	// 	const moviesData5 = moviesPg5.data;
	// 	const moviesData6 = moviesPg6.data;
	// 	const moviesData7 = moviesPg7.data;
	// 	const moviesData8 = moviesPg8.data;
	// 	const moviesData9 = moviesPg9.data;
	// 	const moviesData10 = moviesPg10.data;
	// 	let moviesDataSearch = [].concat(moviesData1.Search, moviesData2.Search);

	// 	if (loadIndex === 0) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(moviesDataSearch);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 1) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(moviesDataSearch, moviesData3.Search);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 2) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(
	// 			moviesDataSearch,
	// 			moviesData3.Search,
	// 			moviesData4.Search,
	// 		);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 3) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(
	// 			moviesDataSearch,
	// 			moviesData3.Search,
	// 			moviesData4.Search,
	// 			moviesData5.Search,
	// 		);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 4) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(
	// 			moviesDataSearch,
	// 			moviesData3.Search,
	// 			moviesData4.Search,
	// 			moviesData5.Search,
	// 			moviesData6.Search,
	// 		);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 5) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(
	// 			moviesDataSearch,
	// 			moviesData3.Search,
	// 			moviesData4.Search,
	// 			moviesData5.Search,
	// 			moviesData6.Search,
	// 			moviesData7.Search,
	// 		);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 6) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(
	// 			moviesDataSearch,
	// 			moviesData3.Search,
	// 			moviesData4.Search,
	// 			moviesData5.Search,
	// 			moviesData6.Search,
	// 			moviesData7.Search,
	// 			moviesData8.Search,
	// 		);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 7) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(
	// 			moviesDataSearch,
	// 			moviesData3.Search,
	// 			moviesData4.Search,
	// 			moviesData5.Search,
	// 			moviesData6.Search,
	// 			moviesData7.Search,
	// 			moviesData8.Search,
	// 			moviesData9.Search,
	// 		);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex === 8) {
	// 		loading.classList.remove("spinner__visible");
	// 		moviesDataSearch = [].concat(
	// 			moviesDataSearch,
	// 			moviesData3.Search,
	// 			moviesData4.Search,
	// 			moviesData5.Search,
	// 			moviesData6.Search,
	// 			moviesData7.Search,
	// 			moviesData8.Search,
	// 			moviesData9.Search,
	// 			moviesData10.Search,
	// 		);
	// 		console.log(moviesDataSearch);
	// 		movieGalleryEl.innerHTML = moviesDataSearch
	// 			.map((movie) => movieGalleryHTML(movie))
	// 			.join("");
	// 	} else if (loadIndex > 8) {
	// 		alert("No more movies to load!");
	// 		loadIndex = 8;
	// 	}
	// }

	// CALLING FUNCTIONS

	// topTenMovies();
	// moviesGallery();

	return (
		<>
			{/* Landing Section */}
			<section id="landing">
				<nav className="nav">
					<div className="container nav__container">
						<div className="row nav__row">
							<div className="logo">
								<figure className="logo__wrapper">
									<img src="./assets/SMC.png" alt="" className="logo__img" />
								</figure>
							</div>
							<div className="nav__contents">
								<div className="nav__search--bar">
									<input
										type="text"
										id="search--bar"
										className="search--bar"
										maxLength="30"
										placeholder="Search"
										// onKeyDown={(event) =>
										// 	event.key === "Enter" && searchMovies(event)
										// }
										required
									/>
									<div className="mag__glass">
										<i
											className="fas fa-magnifying-glass"
											// onclick={searchMovies}
										></i>
									</div>
									<div className="search__spinner">
										<i className="fas fa-spinner"></i>
									</div>
								</div>

								<ul className="nav__link--list">
									<li className="nav__link">
										<a href="#best">Featured</a>
									</li>
									<li className="nav__link">
										<a href="#movies">Movies</a>
									</li>
									<li className="nav__link">
										<a href="#footer">More</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>

				<div className="container landing__container">
					<div className="row landing__row">
						<div className="desc">
							<h1 className="title">
								Welcome to <br />
								<b className="purple">SMC Movies</b>
							</h1>
							<h2 className="sub-title">
								The <span className="purple">Best</span> place to find your
								favorites!!!
							</h2>
							<p className="desc__para">
								From <span className="purple">Action</span> to{" "}
								<span className="purple">Romance</span>,{" "}
								<span className="purple">Fantasy</span> to{" "}
								<span className="purple">Sci-Fi</span>,{" "}
								<span className="purple">Historical</span> to{" "}
								<span className="purple">Futuristic</span>, <br />{" "}
								<b className="purple">SMC</b> has it all! <br />
								Thousands of movies, all at the click of a button.
							</p>
							<a href="#movies" className="desc__button--link">
								<button className="button desc__button">Go to Movies</button>
							</a>
						</div>
						<div className="showcase__movies--list">
							<div className="showcase__movie">
								<img
									src={movieCurrentLink}
									className="movie__img--background"
								/>
								<figure className="movie__img--wrapper">
									<img src={movieCurrentLink} className="movie__img" alt="" />
								</figure>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Top Ten Section */}
			<section id="best">
				<div className="container best__container">
					<div className="row best__row">
						<div className="best__movies--desc">
							<h1 className="best__movies--title">Top 10 - SMC</h1>
							<h2 className="best__movies--sub-title">Choose from the Best!</h2>
						</div>
						<div className="best__movies--dividor"></div>
						<div className="best__movies--slider">
							{bestMovies.map((movie) => (
								<div className="best__movie" key={movie.imdbID}>
									<figure className="best__movie--wrapper">
										<img src={bestMovies} className="best__movie--img" alt="" />
									</figure>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Movies Section */}
			<section id="movies">
				<div className="container movies__container">
					<div className="row movies__row">
						<div className="movies__desc">
							<h1 className="movies__title">All Movies</h1>
							<h2 className="movies__sub-title">Find your next favorite movie!</h2>
						</div>
						<div className="movies__dividor"></div>
						<div className="movies__search--result">
							<p className="search__result"></p>
						</div>
						<div className="movies__gallery">
							{movieGallery.map((movie) => (
								<div className="gallery__movie">
									<figure className="gallery__movie--wrapper">
										<img
											src="${movie.Poster}"
											className="gallery__movie--img"
											alt=""
										/>
									</figure>
								</div>
							)).join("")}
						</div>
						<div className="load__spinner">
							<i className="fas fa-spinner"></i>
						</div>
						{/* <button className="button movies__button" onClick="loadMoreMovies()">
							Load More
						</button> */}
					</div>
				</div>
			</section>

			{/* Footer Section */}
			<footer id="footer">
				<div className="container footer__container">
					<div className="row footer__row">
						<figure className="footer__logo">
							<a href="#landing">
								<img
									src="./assets/SMC.png"
									href="#"
									alt=""
									className="footer__logo--img"
								/>
							</a>
						</figure>
						<div className="footer__links">
							<ul className="footer__link--list">
								<li className="footer__link">
									<a href="#">Home</a>
								</li>
								<li className="footer__link">
									<a href="#best">Featured</a>
								</li>
								<li className="footer__link">
									<a href="#movies">Movies</a>
								</li>
								<li className="footer__link">
									<a href="#">Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Home;
