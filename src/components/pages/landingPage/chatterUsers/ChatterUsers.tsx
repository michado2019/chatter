import { Link } from "react-router-dom";
import "./ChatterUser.css";
import chatterUserImg from "./assets/unsplash_ZHvM3XIOHoEchatterUserImg.png"
import user1 from "./assets/unsplash_jzz_3jWMzHAuser1.png"
import user2 from "./assets/unsplash_iEEBWgY_6lAuser2.png"
import user3 from "./assets/unsplash_fHXpgMd_XhEuser3.png"
const ChatterUsers = () => {
  return (
    <div className="chatterUser-wrapper">
      <div className="chatterUser-content">
      <div className="chatterUser-contents">
        <img src={chatterUserImg} alt="img" className="chatterUser-Img" />
        <div className="chatterUser-content2">
          <p className="chatterUser-comment">
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <p className="chatterUser"><span className="chatterUser-name">Adebobola Muhydeen,</span> Software developer at Apple </p>
          <Link to="/sign-up" className="chatterUser-link">Join chatter</Link>
        </div>
      </div>
      </div>
      <div className="chatterUser-contents">
        <div className="chatterUser-imgDiv1">
          <div className="chatterUser-imgDiv2">
        <img src={user1} alt="img" className="chatterUser-Img2" />
        <img src={user2} alt="img" className="chatterUser-Img2" />
          </div>
        <img src={user3} alt="img" className="chatterUser-Img2" />
        </div>
        <div className="chatterUser-content2">
          <p className="chatterUser-comment">
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <p className="chatterUser"><span className="chatterUser-name">Adebobola Muhydeen,</span> Software developer at Apple </p>
          <Link to="/sign-up" className="chatterUser-link">Get started</Link>
        </div>
      </div>
    </div>
  );
};

export default ChatterUsers;
