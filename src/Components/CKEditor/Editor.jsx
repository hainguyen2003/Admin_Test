// App.jsx / App.tsx

import React, { Component, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Font } from "@ckeditor/ckeditor5-font";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { List } from "@ckeditor/ckeditor5-list";
 import { Link } from "@ckeditor/ckeditor5-link";
import {
  Table,
  TableToolbar,
  TableCellProperties,
  TableProperties,
  TableColumnResize,
} from "@ckeditor/ckeditor5-table";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageInsert,
} from "@ckeditor/ckeditor5-image";
import { notification } from "antd";
import Cookies from "js-cookie";

function Editor({ onChange, initialValues }) {
  const UPLOAD_SERVICE = "https://service.edustar.com.vn/file/upload";
  //const UPLOAD_SERVICE = "https://service.edustar.com.vn/file/upload";


  const token = Cookies.get("token");
  const headers = new Headers();
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(async (file) => {
            body.append("file", file);
            try {
              const response = await fetch(UPLOAD_SERVICE, {
                method: "post",
                body: body,
                headers: headers,
              });
              console.log("response", response);
              if (!response.ok) {
                throw new Error("Lỗi khi tải ảnh lên.");
              }

              const data = await response.json();
              if (data.success) {
                resolve({ default: data?.data?.downloadUrl });
              } else {
                notification.error({
                  message:
                    data?.error?.message || "Tải ảnh lên không thành công",
                });
                reject();
              }
            } catch (error) {
              reject(error);
            }
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={initialValues || ""}
        config={{
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
            TableProperties,
            TableCellProperties,
            TableColumnResize,
            Alignment,
            ImageInsert,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            Link,
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
            // "imageStyle:side",
            "imageStyle:alignLeft",
            "imageStyle:alignRight",
            "imageStyle:inline ",
            "imageStyle:margin-left",
            "toggleImageCaption",
            "imageTextAlternative",
            "link",
            "|",
          ],
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
            ],
          },
          link: {
            addTargetToExternalLinks: true, // Mở liên kết bên ngoài trong tab mới (optional)
          },

          extraPlugins: [uploadPlugin],
        }}
        onChange={onChange}
      />
    </div>
  );
}

export default Editor;
