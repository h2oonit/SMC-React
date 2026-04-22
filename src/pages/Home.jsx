import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFetcher, useNavigate } from "react-router-dom";
import NotFound from "../Components/NotFound";

const Home = ({ searchValue }) => {
	const [movieCurrentLink, setMovieCurrentLink] = useState([]);
	const [bestMovies, setBestMovies] = useState([]);
	const [topTenBkgd, setTopTenBkgd] = useState([]);
	const [chosenMovie, setChosenMovie] = useState([]);
	const [movieGallery, setMovieGallery] = useState([]);
	const [loadIndex, setLoadIndex] = useState(3);
	const [activeSearch, setActiveSearch] = useState("movie");
	const [brokenImages, setBrokenImages] = useState([]);
	const [loading, setLoading] = useState();
	const navigate = useNavigate();

	useEffect(() => {
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

		async function topTenMovies() {
			const { data } = await axios.get(
				"https://www.omdbapi.com/?apikey=6e82b9d2&s=last",
			);
			const moviesDataSearch = data.Search;

			setBestMovies(moviesDataSearch);
			setTopTenBkgd(moviesDataSearch[0].Poster);
		}

		setLoading(true);
		main();
		topTenMovies();
		moviesGallery();
		setLoading(false);
	}, []);

	useEffect(() => {
		if (searchValue) {
			console.log("worked: " + searchValue);
			searchMovies(searchValue);
		}
	}, [searchValue]);

	function movieChosen(movie) {
		const chosenMovieId = movie.imdbID;
		setChosenMovie(chosenMovieId);
	}

	// MOVIES GALLERY //

	async function moviesGallery() {
		console.log(searchValue);
		setLoading(true);
		const moviesPg1 = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&s=${searchValue || "movie"}&page=1`,
		);
		const moviesPg2 = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&s=${searchValue || "movie"}&page=2`,
		);
		const moviesData1 = moviesPg1.data;
		const moviesData2 = moviesPg2.data;
		const moviesDataSearch = [].concat(moviesData1.Search, moviesData2.Search);

		console.log(moviesDataSearch);
		setMovieGallery(moviesDataSearch);

		setLoading(false);
	}

	// // SEARCH MOVIES

	function searchMovies(searchValue) {
		const movieSection = document.getElementById("movies");
		setActiveSearch(searchValue);
		setLoadIndex(3);
		moviesGallery();

		if (movieSection) {
			movieSection.scrollIntoView({ behavior: "instant" });
		}
	}

	// // LOADING MORE MOVIES

	async function loadMoreMovies() {
		const moviesPg = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&s=${activeSearch || "movie"}&page=${loadIndex}`,
		);
		const moviesData = moviesPg.data.Search;

		if (loadIndex > 2 && loadIndex !== 1 && moviesData) {
			setMovieGallery((movieGallery) => [...movieGallery, ...moviesData]);
			setLoadIndex((index) => index + 1);
		} else if (loadIndex >= 15) {
			alert("No more movies to load!");
			setLoadIndex(15);
		} else {
			alert("Nothing to load");
		}
	}

	console.log(movieGallery);
	console.log(brokenImages);

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
									alt=""
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
						<div
							className={
								searchValue
									? "movies__dividor movies__dividor--small"
									: "movies__dividor"
							}
						></div>
						<div className="movies__search--result">
							<p
								className={
									searchValue
										? "search__result search__result--visible"
										: "search__result"
								}
							>
								Results found for "{activeSearch}"
							</p>
						</div>
						<div className="movies__gallery">
							{movieGallery
								?.filter(
									(movie) =>
										movie &&
										movie.Poster &&
										movie.Poster !== "N/A" &&
										!brokenImages.includes(movie.imdbID),
								)
								.map((movie) => (
									<div className="gallery__movie" key={movie.imdbID}>
										<figure className="gallery__movie--wrapper">
											<img
												src={movie.Poster}
												className={
													!loading
														? "gallery__movie--img"
														: "gallery__movie--img movie__img--loading"
												}
												onError={() => 
													setBrokenImages(prev => [
													...prev, movie.imdbID])
												}
												alt=""
												onClick={() => {
													movieChosen(movie);
													navigate(`/movie/${movie.imdbID}`);
												}}
											/>
										</figure>
									</div>
								))}
						</div>
						{/* <div className="load__spinner">
              <i className="fas fa-spinner"></i>
            </div> */}
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
