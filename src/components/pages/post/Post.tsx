import MarkdownIt from "markdown-it";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./Post.css";

type PostProps = {
  view?: { menu: boolean; md: boolean; html: boolean } | undefined;
};

type PostData = {
  img: string;
  title: string;
  html: string;
  text: string;
};

//States
const Post: React.FC<PostProps> = ({
  view = { menu: true, md: true, html: false },
}) => {
  const [post, setPost] = useState<PostData>({
    img: "",
    title: "",
    html: "",
    text: "",
    
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

  //useEffect
  useEffect(() => {
    setUserPost(post);
  },[post]);

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
          <div className="postContent2">
            <button className="postPublish-btn" type="submit">
              Publish
            </button>
          </div>
        </form>
        <div className="postContent2">
          <div className="postContent3">
            <h2 className="postContent3-title">Preview</h2>
            <p className="postContent3-content">No content yet!</p>
          </div>
          <div className="postContent4">
            <div>{userPost.title}</div>
            <div dangerouslySetInnerHTML={{ __html: userPost.html }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
