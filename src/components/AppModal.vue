<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['close']);

const dialogRef = ref<HTMLDialogElement | null>(null);

function handleBackdropClick(e: MouseEvent) {
  if (e.target === dialogRef.value) emit('close');
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close');
}

function emitClose() {
  emit('close');
}

onMounted(() => {
  if (dialogRef.value) {
    dialogRef.value.showModal();
    dialogRef.value.addEventListener('close', emitClose);
  }
});

onUnmounted(() => {
  if (dialogRef.value) {
    dialogRef.value.removeEventListener('close', emitClose);
  }
});
</script>

<template>
  <dialog
    ref="dialogRef"
    class="modal"
    @click="handleBackdropClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </dialog>
</template>

<style scoped>
.modal {
  position: fixed;
  background-color: rgba(108, 117, 125, 0.47);
  min-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
