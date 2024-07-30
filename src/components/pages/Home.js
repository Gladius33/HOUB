import React from "react";
import './Home.css';

const Home = () => (
  <div className="home-container">
    <h1>Welcome on HOUB - the best freelance plateform</h1>
    <p>Your first choice plateform to get in touch freelances and employers.</p>
    <button className="cta-button"><a href='/register' > Join us now! </a></button>
  </div>
);

export default Home;