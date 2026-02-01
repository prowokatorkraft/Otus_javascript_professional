<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import UserHeader from '@/components/UserHeader.vue';
  import UserContent from '@/components/UserContent.vue';
  import useApi from './composables/Api';
  import useLocalStorage from './composables/LocalStorage';
  import { type User } from './types/User';

  const currentCount = ref<number | null>(null);
  const currentError = ref<string | null>(null);
  const refreshFromApi = ref<() => void>(() => {});
  const loadingStorage = ref<boolean>(false);
  const loadingApi = ref<boolean>(false);

  const handleUserCount = (count: number | null, error: string | null) => {
    currentCount.value = count;
    currentError.value = error;
  };
  const handleUserRefresh = (refresh: () => () => void) => {
    console.info(refresh)
    refreshFromApi.value = refresh;
  };
  const handleUserLoading = (storageLoading: boolean, apiLoading: boolean) => {
    loadingStorage.value = storageLoading;
    loadingApi.value = apiLoading;
  };
  const handleClickUpdate = async () => {
    console.info(refreshFromApi.value)
    await refreshFromApi.value();
  };
</script>

<template>
  <main>
    <UserHeader :count="currentCount" :error="currentError" :storageLoading="loadingStorage" :apiLoading="loadingApi" @click-update="handleClickUpdate" />
    <UserContent @user-count="handleUserCount" @user-refresh="handleUserRefresh" @user-loading="handleUserLoading" />
  </main>
</template>

<style scoped>

</style>
