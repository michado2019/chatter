import "./ForYou.css";
import commentImg from "./assets/ant-design_comment-outlinedcommentImg.png";
import loveImg from "./assets/material-symbols_favorite-outlineloveImg.png";
import viewsImg from "./assets/ant-design_read-outlinedtimingImg.png";
import timingImg from "./assets/ant-design_read-outlinedtimingImg.png";
const ForYou = () => {
  //feeds
  const feed = [
    {
      id: 1,
      userImg:
        "data:image/jpeg;base64,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",
      name: "Adeshina Michael",
      job: "Frontend Engineer",
      date: "22/7/2023",
      title: "How to install react-router-dom",
      timing: 10,
      postImg:
        "https://www.english-trainer.net/images/topic-thumbs/at-the-library.jpg",
      post: "Embarking on a journey as a product designer can be an exhilarating and fulfilling experience. As a profession that bridges the realms of art, technology, and problem-solving, product design offers an opportunity to shape the way people interact with the world around them.",
    },
    {
      id: 2,
      userImg:
        "data:image/png;base64,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",
      name: "Rebecca Adeshina",
      job: "Teaching",
      date: "May 7th, 2023",
      title: "How to install react-router-dom",
      timing: 20,
      postImg:
        "https://www.english-trainer.net/images/topic-thumbs/college-life.jpg",
      post: "2Lorem lorem lorem lorem lorem",
    },
  ];
  return (
    <div className="forYou-wrapper">
      <div className="forYou-contents">
        {feed.map((each) => {
          return (
            <div className="forYou-content" key={each.id}>
              <div className="forYou-content_flex1">
                <img src={each.userImg} alt="img" className="forYou-userImg" />
                <div className="forYou-content_flex2">
                  <h2 className="forYou-userName">{each.name}</h2>
                  <p className="forYou-job">
                    {each.job}, {each.date}
                  </p>
                </div>
              </div>
              <div className="forYou-content_flex3">
                <h2 className="forYou-post_title">{each.title}</h2>
                <p className="forYou-post_timing">
                  <img src={timingImg} alt="img" className="forYou-timingImg" />{" "}
                  {each.timing} mins read
                </p>
                <p className="forYou-post_content">{each.post}</p>
                <img src={each.postImg} alt="img" className="forYou-post_img" />
              </div>
              <div className="forYou-post_reactions">
                <div className="forYou-post_comment">
                  <img
                    src={commentImg}
                    alt="img"
                    className="forYou-reactionsImg"
                  />
                  200
                </div>
                <div className="forYou-post_love">
                  <img
                    src={loveImg}
                    alt="img"
                    className="forYou-reactionsImg"
                  />
                  120
                </div>
                <div className="forYou-post_views">
                  <img
                    src={viewsImg}
                    alt="img"
                    className="forYou-reactionsImg"
                  />
                  2000 views
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ForYou;
