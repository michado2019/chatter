import React from "react";
import "./ChatterAbout.css";

import img from "./assets/unsplash_87gLIFoj79caboutChatterImg.png";
import img1 from "./assets/carbon_analyticsaboutBoxImg1.png";
import img2 from "./assets/fluent_people-community-32-filledaboutBoxImg2.png";
import img3 from "./assets/VectoraboutBoxImg3.png";

const ChatterAbout = () => {
  return (
    <div className="chatterAbout-wrapper">
      <div className="chatterAbout-contents">
        <h2 className="chatterAbout-title">Chatter About</h2>
        <div className="chatterAbout-section1">
          <div className="chatterAbout-section1_1">
            <p className="chatterAbout-details">
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm’s heaven and a blog to get access to more text-based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive.
            </p>
          </div>
          <div className="chatterAbout-section1_2">
            <img src={img} alt="img" className="chatterAbout-img" />
          </div>
        </div>
        <div className="chatterAbout-section2">
          <h2 className="chatterAbout-title2">Why you should join Chatter</h2>
          <p className="chatterAbout-details2">
            Our goal is to make writers and readers see our platform as their
            next heaven for blogging, ensuring ease in interactions, connecting
            with like-minded peers, having access to favorite content based on
            interests, and being able to communicate your great ideas with
            people.
          </p>
          <div className="chatterAbout-section2_boxDiv">
            <div className="chatterAbout-section2_box">
              <img
                src={img1}
                alt="img"
                className="chatterAbout-section2_boxImg"
              />
              <h2 className="chatterAbout-section2_boxTitle">Analytics</h2>
              <p className="chatterAbout-section2_boxDetails">
                Number of views, likes, comments, and the performance of your
                articles are tracked.
              </p>
            </div>
            <div className="chatterAbout-section2_box">
              <img
                src={img2}
                alt="img"
                className="chatterAbout-section2_boxImg"
              />
              <h2 className="chatterAbout-section2_boxTitle">
                Social Interactions
              </h2>
              <p className="chatterAbout-section2_boxDetails">
                Users on the platform can interact with posts they like,
                comment, and engage in discussions.
              </p>
            </div>
            <div className="chatterAbout-section2_box">
              <img
                src={img3}
                alt="img"
                className="chatterAbout-section2_boxImg"
              />
              <h2 className="chatterAbout-section2_boxTitle">
                Content Creation
              </h2>
              <p className="chatterAbout-section2_boxDetails">
                Write nicely and appealingly with our in-built Markdown, a rich
                text editor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatterAbout;
