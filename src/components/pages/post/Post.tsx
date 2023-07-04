import MarkdownIt from "markdown-it";
import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./Post.css";
import { DbContext } from "../../context/dbContext/DbContext";
import { collection, addDoc, getDocs } from "firebase/firestore";

type PostProps = {
  view?: { menu: boolean; md: boolean; html: boolean } | undefined;
};

type PostData = {
  img: string;
  title: string;
  html: string;
  text: string;
  love: number;
  comment: number;
  views: number;
};

const Post: React.FC<PostProps> = ({
  view = { menu: true, md: true, html: false },
}) => {
  //useContext
  const db = useContext(DbContext);

  //States
  const [allPosts, setAllPosts] = useState<PostData[]>([]);
  const [preview, setPreview] = useState(false); //preview state
  const [post, setPost] = useState<PostData>({
    img: "",
    title: "",
    html: "",
    text: "",
    love: 0,
    comment: 0,
    views: 0,
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

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    const sanitizedHtml = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    setPost((prevPost) => ({
      ...prevPost,
      html: sanitizedHtml,
      text: text,
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
    setPreview(true);
    if (
      userPost.html !== "" &&
      userPost.img !== "" &&
      userPost.text !== "" &&
      userPost.title !== ""
    ) {
      const dbRef = collection(db, "posts"); //db ref
      const addData = async () => {
        await addDoc(dbRef, userPost);
      };
      addData();
    }
  
    //GetPosts
    async function getAllPosts() {
      const dbRef = collection(db, "posts");
      const posts = await getDocs(dbRef);
      if (!dbRef) {
        setAllPosts([]);
      }
      setAllPosts(
        posts.docs.map((doc) => ({
          ...(doc.data() as PostData),
          id: doc.id,
        }))
      );
    }
    getAllPosts();
    console.log(allPosts);
  };
  

  //useEffect
  useEffect(() => {
    setUserPost(post);
  }, [post]);

  useEffect(() => {
    console.log(allPosts); // Log the updated allPosts state whenever it changes
  }, [allPosts]);

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
                onChange={handleChange}
                name="img"
                value={post.img}
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
          <div className="postContent2">
            {userPost.html !== "" &&
            userPost.img !== "" &&
            userPost.text !== "" &&
            userPost.title !== "" &&
            preview ? (
              <button className="postPublish-btn" type="submit">
                Publish
              </button>
            ) : (
              <button className="postPublish" type="submit" disabled>
                Publish
              </button>
            )}
          </div>
          <div className="postPublish-contents">
            {post.html !== "" || post.img !== "" || post.text !== "" || post.title !== "" ? (
              <div className="postContent4">
                <div className="postContent4-div1">
                  <button onClick={handlePreview} style={{ display: preview ? "none" : "" }}>
                    Preview
                  </button>
                  <div style={{ display: preview ? "block" : "none" }}>
                    <img src={userPost.img} alt="img" className="postImg" />
                    <div>{userPost.title}</div>
                    <div dangerouslySetInnerHTML={{ __html: userPost.html }} />
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
