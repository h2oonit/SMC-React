import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = ({ searchValue }) => {
	const [movieCurrentLink, setMovieCurrentLink] = useState([]);
	const [bestMovies, setBestMovies] = useState([]);
	const [topTenBkgd, setTopTenBkgd] = useState([]);
	const [topTenImdbIDs, setTopTenImdbIDs] = useState([]);
	const [chosenMovie, setChosenMovie] = useState([]);
	const [movieGallery, setMovieGallery] = useState([]);
	const [loadIndex, setLoadIndex] = useState(3);
	const [loading, setLoading] = useState();
	const navigate = useNavigate();
	let lastSearchTerm = null;
	// MAIN

	useEffect(() => {
		setLoading(true);
		main();
		topTenMovies();
		moviesGallery();
		setLoading(false);
	}, []);

	useEffect(() => {
		if (searchValue) {
			console.log('worked')
			searchMovies(searchValue);
		}
	}, [searchValue]);

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
		console.log(moviesDataSearch);

		setBestMovies(moviesDataSearch);
		setTopTenBkgd(moviesDataSearch[0].Poster);
	}

	function movieChosen(movie) {
		const chosenMovieId = movie.imdbID;
		setChosenMovie(chosenMovieId);
		console.log(chosenMovieId);
	}

	// // MOVIE GALLERY

	async function moviesGallery(lastSearchTerm) {
		const moviesPg1 = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&s=${lastSearchTerm || "movie"}&page=1`,
		);
		const moviesPg2 = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&s=${lastSearchTerm || "movie"}&page=2`,
		);
		const moviesData1 = moviesPg1.data;
		const moviesData2 = moviesPg2.data;
		const moviesDataSearch = [].concat(moviesData1.Search, moviesData2.Search);

		setMovieGallery(moviesDataSearch);

		console.log(lastSearchTerm);
	}

	// // SEARCH MOVIES

	function searchMovies(searchValue) {
		lastSearchTerm = searchValue;
		const lastSearchTermU =
			lastSearchTerm.charAt(0).toUpperCase() + lastSearchTerm.slice(1);
		console.log("you searched: " + lastSearchTermU);
		moviesGallery(lastSearchTerm);
		loadMoreMovies(lastSearchTerm);
	}

	// // LOADING MORE MOVIES

	async function loadMoreMovies(searchValue) {
		setLoadIndex((index) => index + 1);
		const query = searchValue || lastSearchTerm || "movie";
		let moviesPg = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&s=${query}&page=${loadIndex}`,
		);

		const moviesData = moviesPg.data.Search;

		if (loadIndex > 2 && loadIndex !== 10) {
			setMovieGallery((movieGallery) => [...movieGallery, ...moviesData]);
		} else if (loadIndex >= 10) {
			alert("No more movies to load!");
			loadIndex = 10;
		}
		console.log(movieGallery, loadIndex);
	}

	return (
		<>
			{/* Landing Section */}
			<section id="landing">
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
				<img className="best__movie--bkgd" src={topTenBkgd} alt="Background" />
				<div className="container best__container">
					<div className="row best__row">
						<div className="best__movies--desc">
							<h1 className="best__movies--title">Top 10 - SMC</h1>
							<h2 className="best__movies--sub-title">Choose from the Best!</h2>
						</div>
						<div className="best__movies--dividor"></div>
						<div className="best__movies--slider">
							{bestMovies.map((movie) => (
								<div
									className={
										chosenMovie === movie.imdbID
											? "best__movie chosen"
											: "best__movie"
									}
									key={movie.imdbID}
									onMouseEnter={() => setTopTenBkgd(movie.Poster)}
									onClick={() => movieChosen(movie)}
								>
									<figure className="best__movie--wrapper">
										<img
											src={movie.Poster}
											className="best__movie--img"
											alt=""
										/>
									</figure>
								</div>
							))}
						</div>
						<a href="#movie__info">
							<button
								className="button best__movies--button"
								onClick={
									chosenMovie.length !== 0
										? () => navigate(`/movie/${chosenMovie}`)
										: undefined
								}
							>
								Select Movie
							</button>
						</a>
					</div>
				</div>
			</section>

			{/* Movies Section */}
			<section id="movies">
				<div className="container movies__container">
					<div className="row movies__row">
						<div className="movies__desc">
							<h1 className="movies__title">All Movies</h1>
							<h2 className="movies__sub-title">
								Find your next favorite movie!
							</h2>
						</div>
						<div className="movies__dividor"></div>
						<div className="movies__search--result">
							<p className="search__result"></p>
						</div>
						<div className="movies__gallery">
							{movieGallery.map((movie) => (
								<div className="gallery__movie" key={movie.imdbID}>
									<figure className="gallery__movie--wrapper">
										<a href="#movie__info">
											<img
												src={movie.Poster}
												className="gallery__movie--img"
												alt=""
												onClick={() => {
													movieChosen(movie);
													if (
														chosenMovie.length !== 0 &&
														chosenMovie === movie.imdbID
													) {
														navigate(`/movie/${chosenMovie}`);
													}
												}}
											/>
										</a>
									</figure>
								</div>
							))}
						</div>
						<div className="load__spinner">
							<i className="fas fa-spinner"></i>
						</div>
						<button
							className="button movies__button"
							onClick={() => loadMoreMovies()}
						>
							Load More
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
