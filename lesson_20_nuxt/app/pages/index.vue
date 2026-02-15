<template>
  <div class="content">
    <Image v-for="(image, index) in imageStore.images" :src="index" :index="index" />
  </div>
</template>

<script setup lang="ts">
  import Image from "~/components/Image.vue";
  import type {DataOfImage} from "~/types/DataOfImage";

  const imageStore = useImageStore();
  if (imageStore.images.length === 0) {
    const { data, pending, error, refresh } = useAsyncData<DataOfImage[]>(
        'images',
        async () => {
          const res = await fetch('https://fakerapi.it/api/v2/images?_quantity=9&_type=any&_height=300&_width=300');

          if (!res.ok) {
            throw new Error(`Ошибка API: HTTP ${res.status}`);
          }

          const result = await res.json();
          return result.data || result;
        },
        {
          server: false,
          lazy: false,
          default: () => [],
          transform: (data) => data.slice(0, 9)
        }
    );
    imageStore.setImages(data.value);
  }
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.content > Image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content > Image:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) and (max-width: 1500px) {
  .content {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>