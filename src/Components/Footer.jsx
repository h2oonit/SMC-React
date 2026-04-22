import React from "react";
import logo from '../assets/SMC.png'
import { useNavigate } from "react-router-dom";


const Footer = () => {
    const navigate = useNavigate();
	return (
		<>
			<footer id="footer">
				<div className="container footer__container">
					<div className="row footer__row">
						<figure className="footer__logo">
							<a href="#landing">
								<img
									src={logo}
									onClick={() => navigate('/')}
									alt=""
									className="footer__logo--img"
								/>
							</a>
						</figure>
						<div className="footer__links">
							<ul className="footer__link--list">
								<li className="footer__link footer__link--hover-effect">
									<a href="#landing" onClick={() => navigate('/')}>Home</a>
								</li>
								<li className="footer__link footer__link--hover-effect">
									<a onClick={() => navigate('/#best')} href="#best">Featured</a>
								</li>
								<li className="footer__link footer__link--hover-effect">
									<a onClick={() => navigate('/#movies')} href='#movies'>Movies</a>
								</li>
								<li className="footer__link footer__link--hover-effect">
									<a href="/help" >Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
