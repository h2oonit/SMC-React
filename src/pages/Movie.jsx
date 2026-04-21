import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "../Css/Movie.css";
import { Helmet } from "react-helmet-async";


const Movie = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { imdbID } = useParams();
	const [movieInfo, setMovieInfo] = useState(null);
	const [movieMins, setMovieMins] = useState(null);
	const [movieHours, setMovieHours] = useState(null);
	const [loading, setLoading] = useState(false);

	async function getMovieInfo(imdbID) {
		setLoading(true);
		const { data } = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&i=${imdbID}`,
		);
		setMovieInfo(data);
		let movieMins = parseInt(data?.Runtime) % 60;
		let movieHours = Math.floor(parseInt(data?.Runtime) / 60);
		setMovieMins(movieMins);
		setMovieHours(movieHours);
		setLoading(false);
	}

	useEffect(() => {
		getMovieInfo(imdbID);
	}, [imdbID]);

	useEffect(() => {
		const movieSection = document.getElementById("movie__info");
		if (movieSection) {
			movieSection.scrollIntoView({ behavior: "instant" });
		}
	})

	return (
		<>
			<Helmet>
				<title>{`SMC - ${movieInfo?.Title}`}</title>
			</Helmet>
			<section id="movie__info">
				<div className="movie__info--container">
					<img
						src={movieInfo?.Poster}
						alt={movieInfo?.Title}
						className="movie__info--bkgd"
					/>
					<div className="movie__info--row">
						<button
							className="button movie__back--button"
							onClick={() => (navigate("/"), navigate(-2))}
						>
							Back
						</button>
						<div className="movie__info">
							<div className="movie__poster">
								<img
									src={movieInfo?.Poster}
									alt={movieInfo?.Title}
									className="movie__poster--img"
								/>
							</div>
							<div className="movie__details">
								<h1 className="movie__title">
									{!loading ? (
										movieInfo?.Title
									) : (
										<div className="loading__bar--title" />
									)}
								</h1>
								<div className="movie__info--dividor"></div>
								<p className="movie__plot">
									{!loading ? (
										movieInfo?.Plot
									) : (
										<div className="loading__bar--plot" />
									)}
								</p>
								<p className="movie__genre">
									<span>Genre: &nbsp;</span>
									{!loading ? (
										movieInfo?.Genre
									) : (
										<div className="loading__bar" />
									)}
								</p>
								<p className="movie__rated">
									<span>Rated: &nbsp;</span>
									{!loading ? (
										movieInfo?.Rated
									) : (
										<div className="loading__bar" />
									)}
								</p>
								<p className="movie__year">
									Year Released:&nbsp;
									{!loading ? (
										movieInfo?.Year
									) : (
										<div className="loading__bar" />
									)}
								</p>
								<p className="movie__director">
									<span>Director: &nbsp;</span>
									{!loading ? (
										movieInfo?.Director
									) : (
										<div className="loading__bar" />
									)}
								</p>
								<p className="movie__actors">
									<span>Actors: &nbsp;</span>
									{!loading ? (
										movieInfo?.Actors
									) : (
										<div className="loading__bar" />
									)}
								</p>

								{!loading ? (
									movieInfo?.Type !== "series" ? (
										<p className="movie__runtime">
											<span>Runtime: &nbsp;</span>
											{movieHours} hr {movieMins} min
										</p>
									) : null
								) : (
									<div className="loading__bar" />
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Movie;
