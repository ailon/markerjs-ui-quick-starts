import { useState } from "react";
import "./App.css";
import sampleImage from "/sample-image.png";
import { AnnotationState } from "@markerjs/markerjs3";
import Editor from "./Editor";
import Viewer from "./Viewer";

function App() {
  const [annotation, setAnnotation] = useState<AnnotationState | null>(null);
  const handleSave = (annotation: AnnotationState, dataUrl?: string) => {
    setAnnotation(annotation);
    if (dataUrl) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "annotation.png";
      link.click();
    }
  };

  return (
    <>
      <Editor targetImage={sampleImage} onSave={handleSave} />
      <Viewer targetImage={sampleImage} annotation={annotation} />
    </>
  );
}

export default App;
