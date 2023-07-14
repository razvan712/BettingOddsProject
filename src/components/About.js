import React from 'react';
import './About.scss';

const About = () => {
  return (
    <div className="about-page bg-success-subtle">
      <h2>About</h2>
      <ul>
        <li>
         <p> Welcome to our betting odds app! We provide the latest and most accurate odds for various matches across different sports. Our goal is to help you make informed betting decisions and increase your chances of winning.</p>
        </li>
        <li>
         <p>Whether you're a seasoned bettor or just starting out, our app offers a user-friendly interface and a wide range of matches to choose from. You can explore different leagues and events and access detailed information about each match's odds.</p> 
        </li>
        <li>
          <p>We strive to continuously update our odds data to ensure you have access to the most up-to-date information. Additionally, we provide helpful resources, tips, and strategies to enhance your understanding of betting odds and improve your overall betting experience.</p>
        </li>
        <li>
          <p>If you have any questions, suggestions, or feedback, please don't hesitate to contact us. We value your input and are dedicated to providing the best possible service to our users.</p>
        </li>
      </ul>
    </div>
  );
};

export default About;
