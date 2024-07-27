"use client";

export default function Rating({ rating, name }) {
  const additionalStyles = name === "combinedRating" ? "hover: text-lg" : "";
  return (
    <div className={`flex items-center text-blue-500  ${additionalStyles} `}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <div>
            <label key={index}>
              <input
                type="radio"
                name="rating"
                className="sr-only"
                value={ratingValue}
              />
              <span className="text-yellow-600 text-2xl">
                {ratingValue <= rating ? "★" : "☆"}
              </span>
            </label>
          </div>
        );
      })}
      <span
        className={` text-yellow-600 text-base relative ${additionalStyles}`}
        style={{ top: "1px" }}
      >
        &nbsp;
        {rating}
      </span>
    </div>
  );
}
