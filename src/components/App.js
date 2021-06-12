import React, { useState, useEffect } from "react"
import Header from "./Header"
import Card from "./Card"

import "./App.css"

function App() {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		fetchMovies();
	}, []);

	async function fetchMovies() {
		const config = {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		};
		return await fetch(`${process.env.REACT_APP_API_DOMAIN}/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`, config)
			.then(response => (response.json()))
			.then(response => (response.results))
			.then(movies => setMovies(movies))
	}

	if (!movies) {
		return "Loading"
	}

	return (
		<div className="page_container">
			<Header />
			<main>
				<h3 className="section_title">Most Recent Movies</h3>
				<section className="movies_container">
					{
						movies.map((movie) => {
							return (<Card title={movie.original_title} rating={movie.vote_average}
								img_src={process.env.REACT_APP_API_BASE_IMAGE_URL + movie.poster_path} img_alt="" />
							)
						})
					}
				</section>
			</main>
		</div>
	)

}

export default App;
