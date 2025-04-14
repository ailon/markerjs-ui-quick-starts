<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type AnnotationState } from '@markerjs/markerjs3'
import { AnnotationEditor } from  '@markerjs/markerjs-ui'

// Define component props
const props = defineProps<{
  targetImage: string
}>()

// Define emitted events
const emit = defineEmits<{
  (e: 'save', annotation: AnnotationState, dataUrl?: string): void
}>()

// References to DOM and MarkerArea
const editorContainer = ref<HTMLDivElement | null>(null)
const editor = ref<AnnotationEditor | null>(null)

// Initialize AnnotationEditor on component mount
onMounted(() => {
  if (editorContainer.value) {
    const targetImg = document.createElement('img')
    targetImg.src = props.targetImage

    editor.value = new AnnotationEditor()
    editor.value.targetImage = targetImg

    editor.value.addEventListener('editorsave', (event) => {
      const annotation = event.detail.state
      const dataUrl = event.detail.dataUrl
      emit('save', annotation, dataUrl)
    })

    editorContainer.value.appendChild(editor.value)
  }
})
</script>

<template>
  <div ref="editorContainer"></div>
</template>