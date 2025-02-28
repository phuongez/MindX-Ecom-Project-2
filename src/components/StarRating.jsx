import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const StarRating = ({ rating }) => {
  const maxStars = 5; 
  const fullStars = Math.floor(rating); 
  const hasHalfStar = rating % 1 !== 0; 
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); 

  return (
    <div>
      {/* Hiển thị số sao vàng đầy đủ */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FontAwesomeIcon key={index} icon={solidStar} style={{ color: "#ffb100", fontSize: "1em", marginRight: "2px" }} />
        ))}

      {/* Hiển thị nửa sao nếu có */}
      {hasHalfStar && (
        <FontAwesomeIcon icon={faStarHalfAlt} style={{ color: "#ffb100", fontSize: "1em", marginRight: "2px" }} />
      )}

      {/* Hiển thị số sao rỗng */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FontAwesomeIcon key={index + fullStars} icon={regularStar} style={{ color: "lightgray", fontSize: "1em", marginRight: "2px" }} />
        ))}
    </div>
  );
};

export default StarRating;
