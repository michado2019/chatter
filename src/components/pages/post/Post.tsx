import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const Post = () => {
  const mdParser = new MarkdownIt({
    html: false,
    xhtmlOut: false,
    breaks: false,
    linkify: false,
    typographer: false,
    quotes: '“”‘’',
    highlight: (code, lang) => {
      // Syntax highlighting function
      // Implement your own syntax highlighting logic here
      return `<pre><code class="language-${lang}">${code}</code></pre>`;
    },
  });

  function handleEditorChange({ html, text }: {html: string, text: string}) {
    console.log('handleEditorChange', html, text);
  }

  return (
    <div className='postWrapper'>
      <div className='postContents'>
        <MdEditor
          style={{ height: '300px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default Post;
