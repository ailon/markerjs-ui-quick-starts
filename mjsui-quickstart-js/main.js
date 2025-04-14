// Use global markerjsUI object
const { AnnotationEditor, AnnotationViewer } = markerjsUI;

// create the target image element
const targetImg = document.createElement("img");
targetImg.src = "./img/sample-image.png";

// app div
const app = document.querySelector("#app");

// create the annotation editor, assign the target image and append it to the app div
const editor = new AnnotationEditor();
editor.targetImage = targetImg;
app.appendChild(editor);

// add annotation viewer
const viewer = new AnnotationViewer();
viewer.targetImage = targetImg;
app.appendChild(viewer);

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
