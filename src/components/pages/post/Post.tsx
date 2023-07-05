import MarkdownIt from "markdown-it";
import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./Post.css";
import { DbContext } from "../../context/dbContext/DbContext";
import { collection, addDoc } from "firebase/firestore";
import { PostData } from "../pagesDataType/PagesDataType";
type PostProps = {
  view?: { menu: boolean; md: boolean; html: boolean } | undefined;
};

const Post: React.FC<PostProps> = ({
  view = { menu: true, md: true, html: false },
}) => {
  //useContext
  const db = useContext(DbContext);

  //States
  const [preview, setPreview] = useState(false); //preview state
  const [img, setImg] = useState({
    img: "",
  }); //img state
  const [post, setPost] = useState<PostData>({
    img: "",
    title: "",
    html: "",
    text: "",
    love: 0,
    comment: 0,
    views: 0,
    date: new Date().toLocaleDateString()
  });
  const [userPost, setUserPost] = useState<PostData>({ ...post });

  //Editor' functions
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

  //Handle image upload
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
    }
  };
  
  
 function handleEditorChange({ html, text }: { html: string; text: string }) {
  const sanitizedHtml = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  setPost((prevPost) => ({
    ...prevPost,
    html: sanitizedHtml,
    text: text,
    img: img.img,
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
      post.title !== ""
    ) {
      const dbRef = collection(db, "posts"); //db ref
      const addData = async () => {
        await addDoc(dbRef, post);
      };
      addData();
    }
    console.log(post);
  };
  

  //useEffect
  useEffect(() => {
    setUserPost(post);
  }, [post]);

  return (
    <div className="postWrapper">
      <div className="postContent">
        <form onSubmit={handleSubmit}>
          <div className="postContent1">
            <div className="postPost-div1">
              <p className="postUpload">Add cover image</p>
              <input
  type="file"
  alt="img"
  className="postPlus-icon"
  onChange={handleFileChange}
  name="img"
/>

            </div>
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
                  boxShadow: "0.5px 0.3px 10px 0.5px #ccc",
                }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                view={view}
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
                  {userPost.html !== "" &&
                  img.img !== "" &&
                  userPost.text !== "" &&
                  userPost.title !== "" ? (
                    
                    <button
                        onClick={handlePublish}
                        className="postContent4-btn"
                      >
                        Publish
                      </button>
                  ) : (
                    
                    <div className="postContent4-btn_div">
                    <button
                        className="postPreview-btn"
                        onClick={handlePreview}
                      >
                        Preview
                      </button>
                    <button className="postContent-btn" disabled>
                      Publish
                    </button>
                      </div>
                  )}

                  <div style={{ display: preview ? "block" : "none" }}>
                    <img src={img.img} alt="img" className="postContent4-img" />
                    <h6 className="postContent4-title">{userPost.title}</h6>
                    <p className="postContent4-content">{userPost.html}</p>
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
