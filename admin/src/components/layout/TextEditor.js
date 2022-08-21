import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default function TextEditor() {
  //   const handleEditorChange = content => {
  //     setDesc(content);
  //   };

  const [desc, setDesc] = useState('');
  console.log(desc);
  return (
    <div className="App">
      <SunEditor
        // setContents="My contents"
        showToolbar={true}
        onChange={Desc => {
          setDesc(Desc);
        }}
        setDefaultStyle="height: auto"
        setOptions={{
          buttonList: [
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'list',
              'align',
              'fontSize',
              'formatBlock',
              'table',
              'image',
            ],
          ],
        }}
      />
    </div>
  );
}
