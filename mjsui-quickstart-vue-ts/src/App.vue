<script setup lang="ts">
import { ref } from 'vue'
import type { AnnotationState } from '@markerjs/markerjs3'
import Editor from './components/Editor.vue'
import Viewer from './components/Viewer.vue'

// Path to our sample image
const sampleImage = '/sample-image.png'

// State to store the current annotation
const annotation = ref<AnnotationState | null>(null)

// Handler for when editor saves an annotation
const handleSave = (newAnnotation: AnnotationState, dataUrl?: string) => {
  annotation.value = newAnnotation
  if (dataUrl) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "annotation.png";
    link.click();
  }  
}
</script>

<template>
  <Editor :targetImage="sampleImage" @save="handleSave" />
  <Viewer :targetImage="sampleImage" :annotation="annotation" />
</template>