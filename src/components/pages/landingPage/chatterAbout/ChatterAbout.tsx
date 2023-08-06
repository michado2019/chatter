import React, { useState } from "react";
import "./ChatterAbout.css";

import img from "./assets/unsplash_87gLIFoj79caboutChatterImg.png";
import img1 from "./assets/carbon_analyticsaboutBoxImg1.png";
import img2 from "./assets/fluent_people-community-32-filledaboutBoxImg2.png";
import img3 from "./assets/VectoraboutBoxImg3.png";

const ChatterAbout = () => {
  const data = [
    {
      id: 1,
      content:
        "Number of views, likes, comments, and the performance of your articles are tracked.",
    },
    {
      id: 2,
      content:
        "Users on the platform can interact with posts they like, comment, and engage in discussions.",
    },
    {
      id: 3,
      content:
        "Write nicely and appealingly with our in-built Markdown, a rich text editor.",
    },
  ];

  const [hoveredId, setHoveredId] = useState("" || 0);

  const handleBoxOn = (id: number) => {
    setHoveredId(id);
  };

  const handleBoxOff = () => {
    setHoveredId("" || 0);
  };

  return (
    <div className="chatterAbout-wrapper">
      <div className="chatterAbout-contents">
        <h2 className="chatterAbout-title">Chatter About</h2>
        <div className="chatterAbout-section1">
            <div className="chatterAbout-details">
              Chatter is a multi-functional platform where authors and readers
              can have access to their own content. It aims to be a traditional
              bookworm’s heaven and a blog to get access to more text-based
              content. Our vision is to foster an inclusive and vibrant
              community where diversity is celebrated. We encourage
              open-mindedness and respect for all individuals, regardless of
              their backgrounds or beliefs. By promoting dialogue and
              understanding, we strive.
            </div>
            <div className="chatterAbout-section1_2">
              <img src={img} alt="img" className="chatterAbout-img" />
            </div>
        </div>
      </div>
      <div className="chatterAbout-section2">
        <h2 className="chatterAbout-title2">Why you should join Chatter</h2>
        <p className="chatterAbout-details2">
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, having access to favorite content based on
          interests, and being able to communicate your great ideas with people.
        </p>
        <div className="chatterAbout-section2_boxDiv">
          {data.map((item) => (
            <div
              key={item.id}
              className="chatterAbout-section2_box"
              onMouseOver={() => handleBoxOn(item.id)}
              onMouseLeave={handleBoxOff}
              style={{
                backgroundColor: hoveredId === item.id ? "#543ee0" : "",
                color: hoveredId === item.id ? "#fff" : "",
                marginTop: hoveredId === item.id ? "-10px" : "",
                boxShadow: hoveredId === item.id ? "0.1px 0.2px 1px #ccc" : "",
                transition: "all 0.3s",
              }}
            >
              <img
                src={item.id === 1 ? img1 : item.id === 2 ? img2 : img3}
                alt="img"
                className="chatterAbout-section2_boxImg"
              />
              <h2 className="chatterAbout-section2_boxTitle">
                {item.id === 1
                  ? "Analytics"
                  : item.id === 2
                  ? "Social Interactions"
                  : "Content Creation"}
              </h2>
              <p className="chatterAbout-section2_boxDetails">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatterAbout;
