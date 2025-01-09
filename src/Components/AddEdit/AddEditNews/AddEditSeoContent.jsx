import React, { useEffect } from "react";
import { Button, Space, Drawer, message, App } from "antd";
import Editor from "../../CKEditor/Editor"; // Import CKEditor component
import "../style.css";

function AddEditSeoContent({ visible, content, onBack, onUseContent }) {
  const editorRef = React.useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.setData && content) {
      // Format content to remove **, * and all HTML tags
      const formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove **bold** markers
        .replace(/\*(.*?)\*/g, "$1") // Remove *italic* markers
        .replace(/<[^>]*>/g, "") // Remove all HTML tags
        .replace(/\n+/g, "\n") // Ensure single line breaks for better readability
        .trim(); // Remove extra whitespace at the start and end

      editorRef.current.setData(formattedContent); // Set the cleaned and formatted content into the editor
    }
  }, [content]);

  const handleCopyContent = () => {
    if (editorRef.current && editorRef.current.getData) {
      const updatedContent = editorRef.current.getData(); // Get the updated content from the editor
      navigator.clipboard
        .writeText(updatedContent) // Copy content to clipboard
        .then(() => {
          message.success("Nội dung đã được sao chép vào clipboard.");
        })
        .catch(() => {
          message.error("Không thể sao chép nội dung.");
        });
    } else {
      message.warning("Trình chỉnh sửa chưa được khởi tạo.");
    }
  };

  return (
    <App>
      <Drawer
        title="Chuẩn SEO - Nội dung đã tối ưu hóa"
        placement="right"
        width={800}
        onClose={onBack}
        open={visible}
        bodyStyle={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div className="seo-content-wrapper">
          <Editor
            ref={editorRef}
            initialValues={content} // Nội dung được điền vào editor
            onReady={(editor) => {
              editorRef.current = editor; // Set editor instance when ready
            }}
          />
          <Space style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button type="primary" onClick={handleCopyContent}>
              Sao chép
            </Button>
            <Button onClick={onBack}>Huỷ</Button>
          </Space>
        </div>
      </Drawer>
    </App>
  );
}

export default AddEditSeoContent;
