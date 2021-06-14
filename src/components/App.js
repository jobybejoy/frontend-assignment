import React, { useState, useEffect } from "react"
import Header from "./Header"
import Card from "./Card"
import Modal from "./Modal"

import "./App.css"

function App() {
	const [movies, setMovies] = useState([])
	const [query, setSearchQuery] = useState("")

	const [selectedMovie, setSelectedMovie] = useState({})
	const [isModalOpen, setModalOpen] = useState(false)

	useEffect(() => {
		fetchMovies();
		return () => { setMovies([]) }
	}, [query === ""]);

	useEffect(() => { searchMovies(query) }, [query])

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

	async function searchMovies(query) {
		if (query === "") { return }
		const config = {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		};
		return await fetch(`${process.env.REACT_APP_API_DOMAIN}/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&query=${query}`, config)
			.then(response => (response.json()))
			.then(response => (response.results))
			.then(movies => setMovies(movies))
	}

	const searchInpuHandler = (e) => {
		setSearchQuery(e.target.value);
	}

	const onCardClickHandler = (id) => {
		const current_movie = movies.find((movie) => movie.id === id)
		setSelectedMovie(current_movie)
		setModalOpen(true)
	}

	const onModalClose = () => {
		setModalOpen(false)
		setSelectedMovie({})
	}

	if (!movies) {
		return "Loading"
	}

	return (
		<div className="page_container">
			<Header query={query} onChangeHander={searchInpuHandler} />
			<main>
				<h3 className="section_title">{query ? `Searching for ${query}` : "Most Recent Movies"}</h3>
				<section className="movies_container">
					{
						movies.map((movie) => {
							return (
								<Card title={movie.original_title}
									key={movie.id}
									rating={movie.vote_average}
									img_src={process.env.REACT_APP_API_BASE_IMAGE_URL + movie.poster_path}
									img_alt={movie.overview}
									onClick={() => onCardClickHandler(movie.id)}
								/>
							)
						})
					}
				</section>
			</main>
			<Modal movie={selectedMovie} isModalOpen={isModalOpen} onModalClose={onModalClose} />
		</div>
	)

}

export default App;
