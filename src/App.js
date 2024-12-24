// App.jsx / App.tsx

import React, { Component } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Font } from "@ckeditor/ckeditor5-font";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { List } from "@ckeditor/ckeditor5-list";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageInsert,
} from "@ckeditor/ckeditor5-image";

const editorConfiguration = {
  plugins: [
    Heading,
    Essentials,
    Bold,
    Italic,
    Paragraph,
    Font,
    List,
    Table,
    TableToolbar,
    Alignment,
    ImageInsert,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
  ],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "|",
    "fontSize",
    "fontFamily",
    "fontColor",
    "fontBackgroundColor",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "insertTable",
    "|",
    "alignment",
    "|",
    "insertImage",
    "imageStyle:block",
    "imageStyle:side",
    "|",
    "toggleImageCaption",
    "imageTextAlternative",
    "|",
  ],
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor&nbsp;5 from source in React</h2>
        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data="<p>Hello from CKEditor&nbsp;5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    );
  }
}

export default App;
