import React from "react";
import { Link } from "react-router-dom";
import "./ChatterWelcome.css";
import { Animator, FadeIn } from "react-scroll-motion";

const ChatterWelcome = () => {
  return (
    <div className="chatterWelcome-wrapper">
      <div className="chatterWelcome-contents">
        <h2 className="chatterWelcome-intro">
            Welcome to Chatter: A Haven for Text-Based Content
        </h2>
        <div className="chatterWelcome-details-wrapper">
          <span className="chatterWelcome-details">
            <p>
              Welcome to Chatter: A Haven for Text-Based Content. Unleash the
              Power of Words, Connect with Like-minded Readers and Writers. Get
              started
            </p>
          </span>
          <span className="chatterWelcome-btn-wrapper">
            <Animator animation={FadeIn()}>
              <Link to="/sign-up" className="chatterWelcome-btn">
                Get started
              </Link>
            </Animator>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatterWelcome;
