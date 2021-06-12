import React from 'react'
import "./Card.css"

export default function Card({ title, img_src, rating }) {
  return (
    <div className="card">
      <div className="card_image_container">
        <img src={img_src} alt="" />
      </div>
      <p className="card_title">
        {title}
      </p>
      <div className="card_rating">
        {rating}
      </div>
    </div>
  )
}
