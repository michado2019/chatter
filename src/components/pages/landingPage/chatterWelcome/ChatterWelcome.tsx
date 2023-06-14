import { Link } from "react-router-dom";
import "./ChatterWelcome.css";
const ChatterWelcome = () => {
  return (
    <div className="chatterWelcome-wrapper">
      <div className="chatterWelcome-contents">
        <h2 className="chatterWelcome-intro">
          Welcome to Chatter: A Haven for Text-Based Content
        </h2>
        <p className="chatterWelcome-details">
          Welcome to Chatter: A Haven for Text-Based Content Unleash the Power
          of Words, Connect with Like-minded Readers and Writers Get started
        </p>
        <Link to="/sign-up" className="chatterWelcome-btn">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default ChatterWelcome;
