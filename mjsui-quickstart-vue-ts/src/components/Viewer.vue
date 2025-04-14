<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { type AnnotationState } from '@markerjs/markerjs3'
import { AnnotationViewer } from '@markerjs/markerjs-ui'

const props = defineProps<{
  targetImage: string
  annotation: AnnotationState
}>()

const viewerContainer = ref<HTMLDivElement | null>(null)
const viewer = ref<AnnotationViewer | null>(null)

// Initialize AnnotationViewer on mount
onMounted(() => {
  if (viewerContainer.value) {
    const targetImg = document.createElement('img')
    targetImg.src = props.targetImage

    viewer.value = new AnnotationViewer()
    viewer.value.targetImage = targetImg

    viewerContainer.value.appendChild(viewer.value)

    if (props.annotation) {
      viewer.value.show(props.annotation)
    }
  }
})

// Update view when annotation changes
watch(() => props.annotation, (newAnnotation) => {
  viewer.value?.show(newAnnotation)
})
</script>

<template>
  <div ref="viewerContainer"></div>
</template>