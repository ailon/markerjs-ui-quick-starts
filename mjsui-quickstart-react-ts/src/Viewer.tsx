import { AnnotationState } from "@markerjs/markerjs3";
import { AnnotationViewer } from "@markerjs/markerjs-ui";
import { useEffect, useRef } from "react";

type Props = {
  targetImage: string;
  annotation: AnnotationState | null;
};

const Viewer = ({ targetImage, annotation }: Props) => {
  const viewerContainer = useRef<HTMLDivElement | null>(null);
  const viewer = useRef<AnnotationViewer | null>(null);

  useEffect(() => {
    if (!viewer.current && viewerContainer.current) {
      const targetImg = document.createElement("img");
      targetImg.src = targetImage;

      viewer.current = new AnnotationViewer();
      viewer.current.targetImage = targetImg;

      viewerContainer.current.appendChild(viewer.current);
    }
  }, [targetImage]);

  useEffect(() => {
    if (annotation) {
      viewer.current?.show(annotation);
    }
  }, [annotation]);

  return <div ref={viewerContainer}></div>;
};

export default Viewer;
