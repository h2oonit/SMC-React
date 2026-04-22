import React from "react";

const NotFound = ({ message = "No movies found" }) => (
	<div className="not-found">
		<div className="not-found__icon">
			<i className="fas fa-film"></i>
		</div>
		<h3 className="not-found__title">{message}</h3>
		<p className="not-found__desc">Try searching for something else</p>
	</div>
);

export default NotFound;
