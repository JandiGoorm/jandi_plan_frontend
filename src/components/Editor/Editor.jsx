import Quill from "quill";
import { useEffect, useMemo, useRef } from "react";
import BlotFormatter from "@enzedonline/quill-blot-formatter2";
import hljs from "highlight.js";
import "quill/dist/quill.core.css";
import "highlight.js/styles/github.css";
import { uploadCommunityImage } from "@/apis/image";
import { useToast } from "@/contexts";

const Uploader = Quill.import("modules/uploader");

class CustomUploader extends Uploader {
  upload() {}
}

Quill.register("modules/uploader", CustomUploader, true);
Quill.register("modules/blotFormmater", BlotFormatter);

const Editor = ({ defaultValue, onLoaded, tempPostId, category }) => {
  const { createToast } = useToast();
  const tempPostIdRef = useRef(tempPostId);
  tempPostIdRef.current = tempPostId;

  const toolbarOptions = useMemo(() => {
    return {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote", "code-block"],
        ["image", "link"],
        ["clean"],
      ],

      handlers: {
        image: function () {
          const quill = this.quill;
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async function () {
            const file = input.files[0];
            if (!file) return;

            const range = quill.getSelection();
            const insertIndex = range?.index ?? 0;

            const loadingImageUrl = "/Loading_icon.gif";
            quill.insertEmbed(insertIndex, "image", loadingImageUrl, "user");

            try {
              const res = await uploadCommunityImage(
                file,
                tempPostIdRef.current,
                category
              );

              const imageUrl = res.data.imageUrl;

              createToast({
                type: "success",
                text: "이미지가 성공적으로 업로드되었습니다.",
              });

              quill.deleteText(insertIndex, 1, "user");
              quill.insertEmbed(insertIndex, "image", imageUrl, "user");
              quill.setSelection(insertIndex + 1);

              // eslint-disable-next-line no-unused-vars
            } catch (error) {
              createToast({
                type: "error",
                text: "이미지 업로드에 실패했습니다.",
              });

              quill.deleteText(insertIndex, 1, "user");
            }
          };
        },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, tempPostId]);

  const modules = useMemo(() => {
    return {
      syntax: { hljs },
      toolbar: toolbarOptions,
      blotFormmater: {
        image: {
          allowAltTitleEdit: false,
        },
      },
      clipboard: true,
    };
  }, [toolbarOptions]);

  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) return;

    const quill = new Quill(quillRef.current, {
      theme: "snow",
      modules,
    });

    if (defaultValue) {
      quill.setContents(defaultValue);
    }

    onLoaded(quill);

    return () => {
      quillRef.current = null;
    };
  }, [defaultValue, modules, onLoaded]);

  return (
    <div
      ref={quillRef}
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    />
  );
};

export default Editor;
