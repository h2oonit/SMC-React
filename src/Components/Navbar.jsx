import React from "react";
import logo from './assets/SMC.png'


const Navbar = () => {
	return (
		<>
			<nav className="nav">
				<div className="container nav__container">
					<div className="row nav__row">
						<div className="logo">
							<figure className="logo__wrapper">
								<img src={logo} alt="" className="logo__img" />
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
		</>
	);
};

export default Navbar;
