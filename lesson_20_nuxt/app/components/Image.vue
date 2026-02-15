<script setup lang="ts">
import { ref, defineProps } from 'vue';
import type { DataOfImage } from "~/types/DataOfImage";

const props = defineProps<{
  index: number;
}>();

const imageStore = useImageStore();
const loaded = ref(false);
const error = ref(false);

const image = imageStore.images[props.index];

const onImageLoad = () => {
  loaded.value = true;
  error.value = false;
};

const onImageError = () => {
  if (image?.final_url !== '') {
    loaded.value = false;
    error.value = true;
  }
};

onMounted(async () => {
  if (image) {
    if (image.final_url == undefined || image.final_url == '') {
      try {
        const response = await fetch(image?.url);
        if (!response.ok) {
          error.value = true;
        }
        image.final_url = response.url;
        loaded.value = true;
      } catch (err) {
        error.value = true;
      }
    }
  }
  else {
    loaded.value = false;
    error.value = true;
  }
})
</script>

<template>
  <div class="image-loader">
    <p v-if="error && !loaded && image?.final_url !== ''" class="error-message">Ошибка загрузки</p>
    <p v-else-if="!error && !loaded">Загрузка ...</p>
    <img
        v-if="!error"
        :src="image!.final_url"
        :alt="image!.title"
        @load="onImageLoad"
        @error="onImageError"
        v-show="loaded"
    />
  </div>
</template>

<style scoped>
.image-loader {
  text-align: center;
  min-width: 300px;
  min-height: 300px;
  align-content: center;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
}

img {
  max-width: 100%;
  height: 100%;
  border-radius: 20px;
}

.loading-message,
.error-message {
  color: #666;
  font-style: italic;
  margin-top: 10px;
}

.error-message {
  color: #d9534f;
}
</style>