<script setup lang="ts">
  import { computed } from 'vue';
  const props = defineProps<{
    count: number | null;
    error: string | null;
    storageLoading: boolean;
    apiLoading: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'click-update'): void;
  }>();

  const refreshData = () => {
    emit('click-update');
  };

  const counterText = computed(() => {
    return props.error != null && props.error != ''
      ? props.error
      : props.count != null && !props.storageLoading && !props.apiLoading
        ? 'count: ' + props.count
        : '';
  });
</script>

<template>
  <div class="controls">
    <p class="logo">UseRS</p>
    <div class="flex-container">
      <p>{{counterText}}</p>
      <button @click="refreshData" :disabled="storageLoading || apiLoading" class="refresh-btn">
        {{ storageLoading || apiLoading ? 'Loading...' : 'Load' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
  .controls {
    margin: 16px 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .controls .logo {
    font-size: xx-large;
    font-family: sans-serif;
    font-style: italic;
  }

  .flex-container {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .refresh-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
  }

    .refresh-btn:hover:not(:disabled) {
      background-color: #45a049;
    }

    .refresh-btn:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
</style>
