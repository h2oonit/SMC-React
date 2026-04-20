import React, { useState } from "react";
import logo from '../assets/SMC.png'
import { useNavigate } from "react-router-dom";
import Home from "../pages/Home";


const Navbar = ({setSearchValue}) => {
	const navigate = useNavigate();
	const [term, setTerm] = useState('')

	
	return (
		<>
			
			<nav className="nav">
				<div className="container nav__container">
					<div className="row nav__row">
						<div className="logo">
							<figure className="logo__wrapper">
								<img src={logo} alt="" className="logo__img" 
								onClick={() => navigate('/')}
								/>
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
									value={term}
									onChange={(event) => setTerm(event.target.value)}
									onKeyDown={(event) => event.key === "Enter" && setSearchValue(term) && navigate('/')} 
										
									
									required
								/>
								<div className="mag__glass">
									<i
										className="fas fa-magnifying-glass"
										
									></i>
								</div>
								<div className="search__spinner">
									<i className="fas fa-spinner"></i>
								</div>
							</div>

							<ul className="nav__link--list">
								<li className="nav__link">
									<a onClick={() => navigate('/')} href="#best">Featured</a>
								</li>
								<li className="nav__link">
									<a onClick={() => navigate('/')} href="#movies">Movies</a>
								</li>
								<li className="nav__link">
									<a onClick={() => navigate('/')} href="#footer">More</a>
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
