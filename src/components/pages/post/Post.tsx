import MarkdownIt from 'markdown-it';
import { useState } from "react";
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import "./Post.css";

type PostProps = {
  view?: { menu: boolean; md: boolean; html: boolean; } | undefined;
};

const Post: React.FC<PostProps> = ({ view = { menu: true, md: true, html: false } }) => {
  const [postHtml, setPostHtml] = useState("");
  const [postText, setPostText] = useState("");

  const mdParser = new MarkdownIt({
    html: false,
    xhtmlOut: false,
    breaks: false,
    linkify: false,
    typographer: false,
    quotes: '“”‘’',
    highlight: (code, lang) => {
      return `<pre><code class="language-${lang}">${code}</code></pre>`;
    },
  });

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    if (html !== "") {
      setPostHtml(html);
    }
    if (text !== "") {
      setPostText(text);
    }
    console.log(postText, postHtml);
  }

  return (
    <div className='postWrapper'>
      <div className='postContents'>
        <MdEditor
          style={{ height: "300px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          view={view}
        />
      </div>
    </div>
  );
};

export default Post;
