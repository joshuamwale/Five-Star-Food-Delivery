import React, {useState} from 'react'
import {FaStar} from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"

};

function Reviews() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviews, setReview] = useState("")
  const stars = Array(5).fill(0)

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/menus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({reviews})
    }).then((r) => {
      if (r.ok) {
        r.json().then((reviews) => setReview(reviews));
      }
    });
  }

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }


  return (
    <div style={
      styles.container
    }>
      <h2>Ratings
      </h2>
      <div style={
        styles.stars
      }>
        {
        stars.map((_, index) => {
          return (
            <FaStar key={index}
              size={24}
              onClick={
                () => handleClick(index + 1)
              }
              onMouseOver={
                () => handleMouseOver(index + 1)
              }
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index ? colors.orange : colors.grey
              }
              style={
                {
                  marginRight: 10,
                  cursor: "pointer"
                }
              }/>
          )
        })
      } </div>
      <form style={
          styles.form
        }
        onSubmit={handleSubmit}>
        <h2>Add Review</h2>
        <textarea style={
          styles.textarea
        }/>

        <button style={
          styles.button
        }>
          Submit
        </button>
      </form>

    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10
  }

};


export default Reviews
