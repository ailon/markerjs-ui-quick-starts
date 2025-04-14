import { AnnotationEditor } from "@markerjs/markerjs-ui";
import { AnnotationState } from "@markerjs/markerjs3";
import { useEffect, useRef } from "react";

type Props = {
  targetImage: string;
  onSave: (annotation: AnnotationState, dataUrl?: string) => void;
};

const Editor = ({ targetImage, onSave }: Props) => {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const editor = useRef<AnnotationEditor | null>(null);

  useEffect(() => {
    if (!editor.current && editorContainer.current) {
      const targetImg = document.createElement("img");
      targetImg.src = targetImage;

      editor.current = new AnnotationEditor();
      editor.current.targetImage = targetImg;

      editor.current.addEventListener("editorsave", (event) => {
        const annotation = event.detail.state;
        const dataUrl = event.detail.dataUrl;
        onSave(annotation, dataUrl);
      });

      editorContainer.current.appendChild(editor.current);
    }
  }, [targetImage, onSave]);

  return <div ref={editorContainer}></div>;
};

export default Editor;
