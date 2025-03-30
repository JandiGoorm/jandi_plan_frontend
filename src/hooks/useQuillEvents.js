import { uploadCommunityImage } from "@/apis/image";
import { useToast } from "@/contexts";
import { useEffect } from "react";

const useQuillEvents = (quill, setValue, targetId, category) => {
  const { createToast } = useToast();

  useEffect(() => {
    if (!quill || !targetId) return;

    const editorElement = quill.root;

    const handleTextChange = () => {
      setValue("content", quill.getContents());
    };
    quill.on("text-change", handleTextChange);

    const handleImage = async (file) => {
      const range = quill.getSelection();
      const insertIndex = range?.index ?? 0;

      const loadingImageUrl = "/Loading_icon.gif";
      quill.insertEmbed(insertIndex, "image", loadingImageUrl, "user");

      try {
        const res = await uploadCommunityImage(file, targetId, category);
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

    const handlePaste = (e) => {
      const clipboardData = e.clipboardData;
      if (clipboardData && clipboardData.items) {
        for (let i = 0; i < clipboardData.items.length; i++) {
          const item = clipboardData.items[i];
          if (item.type.indexOf("image") !== -1) {
            e.preventDefault();
            e.stopImmediatePropagation();
            const file = item.getAsFile();
            handleImage(file);
            break;
          }
        }
      }
    };

    const handleDrop = (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length) {
        for (let i = 0; i < dt.files.length; i++) {
          const file = dt.files[i];
          if (file.type.indexOf("image") !== -1) {
            handleImage(file);
            return;
          }
        }
      }
    };

    editorElement.addEventListener("paste", handlePaste);
    editorElement.addEventListener("drop", handleDrop);

    return () => {
      editorElement.removeEventListener("paste", handlePaste);
      editorElement.removeEventListener("drop", handleDrop);
      quill.off("text-change", handleTextChange);
    };
  }, [targetId, quill, setValue, category, createToast]);
};

export default useQuillEvents;
