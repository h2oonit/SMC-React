import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Contact.css";
import logo from "../assets/SMC.png";
import pfp from "../assets/MyPfp.jpeg";

const Contact = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const contactSection = document.getElementById("contact");
		if (contactSection) {
			contactSection.scrollIntoView({ behavior: "instant" });
		}
	});

	return (
		<>
			<section id="contact">
				<div className="contact__container">
					<div className="contact__row">
						<div className="contact__buttons">
							<button
								className="button contact__home--button"
								onClick={() => navigate("/")}
							>
								Home
							</button>
							<button
								className="button contact__back--button"
								onClick={() => navigate(-1)}
							>
								Back
							</button>
						</div>
						<div className="contact__display">
							<div className="contact__imgs">
								<figure className="contact__logo--wrapper">
									<img src={logo} alt="" className="contact__logo--img" />
								</figure>
								<figure className="contact__personal--wrapper">
									<img src={pfp} alt="" className="contact__personal--img" />
								</figure>
							</div>
							<div className="contact__desc">
								<p className="contact__desc--para">
									This website was made to test my skills, as part of the
									project i was assigned by my mentors at FrontEnd Simplified
									Institute for the React Javascript section of the Course. I
									had to make a website with API integration and functionality, while also making the users experience enjoyable and aesthetic
								</p>
                                <p className="contact__desc--intro">
                                    My Name is Hannel Hiraldo, and I am a Frontend software Developer with lots of creativity and a knack for learning quickly
                                </p>
                                <p className="contact__desc--email">
                                    My email is superbsparo@gmail.com
                                </p>

							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
