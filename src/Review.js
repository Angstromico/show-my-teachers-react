import React, { useState, useEffect } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(false);
  const { name, job, image, text } = people[index];
  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };
  function prevPerson() {
    setIndex(index - 1);
    if (index <= 0) {
      setIndex(people.length - 1);
      setTransition(true);
    }
  }
  function nextPerson() {
    setIndex(index + 1);
    if (index >= people.length - 1) {
      setIndex(0);
      setTransition(true);
    }
  }
  useEffect(() => {
    const change = setInterval(() => {
      randomPerson();
    }, 6000);
    return () => clearInterval(change);
  });
  useEffect(() => {
    const endTransition = setTimeout(() => {
      setTransition(false);
    }, 2000);
    return () => clearTimeout(endTransition);
  }, [transition]);
  function randomPerson() {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
    setTransition(true);
  }
  return (
    <article className={`review ${transition ? 'fade' : ''}`}>
      <div className="section-center">
        <div className="img-container">
          <img src={image} alt={name} className="person-img" />
          <span className="quote-icon">
            <FaQuoteRight />
          </span>
        </div>
        <h4 className="author">{name}</h4>
        <p className="job">{job}</p>
        <p className="info">{text}</p>
        <div className="button-container">
          <button className="prev-btn" onClick={prevPerson}>
            <FaChevronLeft />
          </button>
          <button className="next-btn" onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
        <button className="random-btn" onClick={randomPerson}>
          Surprice Me
        </button>
      </div>
    </article>
  );
};

export default Review;
