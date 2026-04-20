import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../Css/Movie.css";

const Movie = ({searchValue}) => {
	const navigate = useNavigate();
	const { imdbID } = useParams();
	const [movieInfo, setMovieInfo] = useState(null);
	const [movieMins, setMovieMins] = useState(null);
	const [movieHours, setMovieHours] = useState(null);

	async function getMovieInfo(imdbID) {
		const { data } = await axios.get(
			`https://www.omdbapi.com/?apikey=6e82b9d2&i=${imdbID}`,
		);
		console.log(data);
		setMovieInfo(data);
		let movieMins = parseInt(data?.Runtime) % 60;
		let movieHours = Math.floor(parseInt(data?.Runtime) / 60);
		console.log(movieHours, movieMins);
		setMovieMins(movieMins);
		setMovieHours(movieHours);
	}

	useEffect(() => {
		const movieSection = document.getElementById("movie__info");
		getMovieInfo(imdbID);
        if (movieSection) {
            movieSection.scrollIntoView({ behavior: "smooth" });
        }
	}, []);

	useEffect(() => {
		if (searchValue) {
			navigate('/')
		}
	},[searchValue])

	return (
		<>
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
							onClick={() => navigate(-2)}
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
								<h1 className="movie__title">{movieInfo?.Title}</h1>
								<div className="movie__info--dividor"></div>
								<p className="movie__plot">{movieInfo?.Plot}</p>
								<p className="movie__genre">
									<span>Genre: </span>
									{movieInfo?.Genre}
								</p>
								<p className="movie__rated">
									<span>Rated: </span>
									{movieInfo?.Rated}
								</p>
								<p className="movie__year">Year Released: {movieInfo?.Year}</p>
								<p className="movie__director">
									<span>Director: </span>
									{movieInfo?.Director}
								</p>
								<p className="movie__actors">
									<span>Actors: </span>
									{movieInfo?.Actors}
								</p>
								{movieInfo?.Type !== "series" ? (
									<p className="movie__runtime">
										<span>Runtime: </span>
										{movieHours} hr {movieMins} min
									</p>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Movie;
