import MarkdownIt from "markdown-it";
import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./Post.css";
import { DbContext } from "../../context/dbContext/DbContext";
import { collection, addDoc } from "firebase/firestore";
import { PostData } from "../pagesDataType/PagesDataType";
import { UserContext } from "../../context/userContext/UserContext";
import { Cancel, CancelOutlined, Image } from "@mui/icons-material";

type PostProps = {
  view?: { menu: boolean; md: boolean; html: boolean } | undefined;
};

const Post: React.FC<PostProps> = ({
  view = { menu: true, md: true, html: false },
}) => {
  // useContext
  const db = useContext(DbContext);
  const userContext = useContext(UserContext);

  // States
  const [preview, setPreview] = useState(false); // preview state
  const [coverImg, setCoverImg] = useState("Add a cover image");
  const [successMsg, setSuccessMsg] = useState("");
  const [postTimeout, setPostTimeout] = useState<NodeJS.Timeout | null>(null);
  const [postSent, setPostSent] = useState("");

  const [img, setImg] = useState({
    img: "",
  }); // img state
  const [post, setPost] = useState<PostData>({
    img: "",
    title: "",
    html: "",
    text: "",
    love: 0,
    comment: [],
    bookMark: [],
    views: 0,
    date: new Date().toLocaleDateString(),
    allPosts: [],
    id: 0,
    isLiked: false,
    userImg: userContext?.user?.photoURL || "",
    userName: userContext?.user?.displayName || "",
    uid: "",
  });
  const [userPost, setUserPost] = useState<PostData>({ ...post });
  const [sendCounter, setSendCounter] = useState<number | null>(null);
  // Editor's functions
  const mdParser = new MarkdownIt({
    html: false,
    xhtmlOut: false,
    breaks: true,
    linkify: false,
    typographer: false,
    quotes: "“”‘’",
    highlight: (code, lang) => {
      return `<pre><code class="language-${lang}">${code}</code></pre>`;
    },
  });

  // Handle image upload
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Null check for event.target.files

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target?.result;

        setImg((prevImg) => ({
          ...prevImg,
          img: fileContent as string,
        }));
      };
      reader.readAsDataURL(file as Blob);
      setCoverImg(" uploaded successfully!");
    }
  };

  const handleImgCancel = () => {
    setCoverImg("Add a cover image");
  };
  function handleEditorChange({ html, text }: { html: string; text: string }) {
    const sanitizedHtml = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    setPost((prevPost) => ({
      ...prevPost,
      html: sanitizedHtml,
      text: text,
      img: img.img,
      userName: userContext?.user?.displayName || "", // Empty string as a fallback
      userImg: userContext?.user?.photoURL || "", // Empty string as a fallback
    }));
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserPost(post);
    console.log(userPost);
  };

  const handlePreview = () => {
    setPreview(!preview);
  };

  const handlePublish = () => {
    if (
      post.html !== "" &&
      img.img !== "" &&
      post.text !== "" &&
      post.title !== "" &&
      post.userImg !== "" &&
      post.userName !== ""
    ) {
      const dbRef = collection(db, "posts"); // db ref
      const addData = async () => {
        await addDoc(dbRef, post);
      };
      if (postTimeout) {
        clearTimeout(postTimeout); // Clear the existing timeout if it exists
      }

      setSuccessMsg("Sending post....");
      const timeout = setTimeout(() => {
        addData();
        setPostTimeout(null);
        setSuccessMsg("");
        setPostSent("Post sent successfully");
      }, 10000);

      setPostTimeout(timeout);

      setPost({
        img: "",
        title: "",
        html: "",
        text: "",
        love: 0,
        comment: [],
        bookMark: [],
        views: 0,
        date: new Date().toLocaleDateString(),
        allPosts: [],
        id: 0,
        isLiked: false,
        userImg: userContext?.user?.photoURL || "",
        userName: userContext?.user?.displayName || "",
        uid: "",
      });
      setCoverImg("Add a cover image");
    }
  };

  //Handle post undo
  const handlePostUndo = () => {
    if (postTimeout) {
      clearTimeout(postTimeout); // Clear the existing timeout if it exists
      setPostTimeout(null);
      setSuccessMsg("");
    }
  };

  //Text stripping
  const convertToHTML = (textContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(textContent, "text/html");
    return doc.body.childNodes[0]?.nodeValue || "";
  };

  // useEffect
  useEffect(() => {
    setUserPost(post);
  }, [post]);

  // Effect to decrement the counter every second
  useEffect(() => {
    if (successMsg) {
      setSendCounter(10);

      const interval = setInterval(() => {
        setSendCounter((prevCounter) => {
          if (prevCounter === null) {
            // Handle the case where prevCounter is null
            setSuccessMsg("");
            return null;
          }
          return prevCounter - 1;
        });
      }, 1000);

      // Clear the interval when component unmounts or successMsg changes
      return () => clearInterval(interval);
    }
  }, [successMsg]);

  //Post sent useEffect
  useEffect(() => {
    if (postSent !== "") {
      const timeout = setTimeout(() => {
        setPostSent("");
        clearTimeout(timeout);
      }, 5000);
    }
  }, [postSent]);
  return (
    <div className="postWrapper">
      <h2
        className="postAlert"
        style={{ display: successMsg === "" ? "none" : "flex" }}
      >
        {successMsg}
        {sendCounter !== null && <span>{sendCounter}</span>}
        <Cancel
          onClick={handlePostUndo}
          style={{
            display: successMsg === "" ? "none" : "block",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        />
      </h2>
      <h2
        className="postAlert"
        style={{ display: postSent === "" ? "none" : "block" }}
      >
        {postSent}
      </h2>
      <div className="postPost-div1">
        <div
          className="postUpload"
          style={{
            color: coverImg === "Add a cover image" ? "" : "green",
          }}
        >
          <Image />
          {coverImg}
          <CancelOutlined
            className="postImg-cancel"
            style={{
              display: coverImg === "Add a cover image" ? "none" : "block",
            }}
            onClick={handleImgCancel}
          />
          <input
            type="file"
            alt="img"
            className="postPlus-icon"
            onChange={handleFileChange}
            name="img"
            style={{ display: coverImg === "Add a cover image" ? "" : "none" }}
          />
        </div>
      </div>
      <div className="postContent">
        <form onSubmit={handleSubmit}>
          <div className="postContent1">
            <div className="postPost-div2">
              <input
                type="text"
                className="postTitle"
                placeholder="Article title"
                onChange={handleChange}
                name="title"
                value={post.title}
              />
              <MdEditor
                style={{
                  height: "300px",
                  margin: "0 auto",
                  marginTop: "60px",
                }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                view={view}
              />
            </div>
            <div className="postPost-div3">
              <input
                type="text"
                className="postUserImg"
                placeholder="User Image"
                onChange={handleChange}
                name="userImg"
                value={post.userImg}
              />
              <input
                type="text"
                className="postUserName"
                placeholder="User Name"
                onChange={handleChange}
                name="userName"
                value={post.userName}
              />
            </div>
          </div>
        </form>
        <div className="postContent2">
          <div className="postPublish-contents">
            {post.html !== "" ||
            img.img !== "" ||
            post.text !== "" ||
            post.title !== "" ? (
              <div className="postContent4">
                <div className="postContent4-div1">
                  <div className="postContent4-btn_div">
                    <button className="postPreview-btn" onClick={handlePreview}>
                      Preview
                    </button>
                    {userPost.html !== "" &&
                    img.img !== "" &&
                    userPost.text !== "" &&
                    userPost.title !== "" &&
                    userPost.userImg !== "" &&
                    userPost.userName !== "" ? (
                      <button
                        onClick={handlePublish}
                        className="postContent4-btn"
                      >
                        Publish
                      </button>
                    ) : (
                      <button className="postContent-btn" disabled>
                        Publish
                      </button>
                    )}
                  </div>

                  <div style={{ display: preview ? "block" : "none" }}>
                    <img src={img.img} alt="img" className="postContent4-img" />
                    <h6 className="postContent4-title">{userPost.title}</h6>
                    <p
                      className="postContent4-content"
                      dangerouslySetInnerHTML={{
                        __html: convertToHTML(userPost.html),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="postContent3">
                <h2 className="postContent3-title">Preview</h2>
                <p className="postContent3-content">No content yet!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
