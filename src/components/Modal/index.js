import { createPortal } from 'react-dom';
import "./Modal.css"
import moment from "moment"

export default function Modal({ movie, isModalOpen, onModalClose }) {
  if (!isModalOpen) { return null }
  return createPortal(
    <div className={"modal_container"}>
      <div className="modal_card">
        <button className="close_button" onClick={onModalClose}>x</button>
        <h3 className="movie_title">{movie.original_title}</h3>
        <div className="card_details_container">
          <div className="movie_image_container">
            <img
              src={process.env.REACT_APP_API_BASE_IMAGE_URL + movie.poster_path}
              alt=""
              className="movie_image"
            />
          </div>
          <div className="movie_description_container">
            <p><strong>Release date: </strong>{moment(movie.release_date).format("LL")}</p>
            <p className="movie_description">{movie.overview}</p>
            <p><strong>{movie.vote_average}</strong> / 10 ({movie.vote_count} total votes)</p>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  )
}


