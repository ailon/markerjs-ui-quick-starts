import "./style.css";
import sampleImage from "/sample-image.png";
import { AnnotationEditor, AnnotationViewer } from "@markerjs/markerjs-ui";

// create an img element for the image to be annotated
const targetImg = document.createElement("img");
targetImg.src = sampleImage;

// app div reference
const app = document.querySelector<HTMLDivElement>("#app");

// create the annotation editor
const editor = new AnnotationEditor();
editor.targetImage = targetImg;
app?.appendChild(editor);

// create the annotation viewer
const viewer = new AnnotationViewer();
viewer.targetImage = targetImg;
app?.appendChild(viewer);

// handle the save button click
editor.addEventListener("editorsave", (event) => {
  // Show the annotation in the viewer
  viewer.show(event.detail.state);

  // Download the annotation as a PNG
  const dataUrl = event.detail.dataUrl;
  if (dataUrl) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "annotation.png";
    link.click();
  }
});
