<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import useApi from '@/composables/Api';
  import UserCart from '@/components/UserCart.vue';
  import useLocalStorage from '@/composables/LocalStorage';
  import { type User } from '@/types/User';

  const { value: users, setValue: setUsers, loading: storageLoading } = useLocalStorage<User[]>("users", []);
  const { data: usersData, loading: apiLoading, error, refresh } = useApi<User[]>("https://jsonplaceholder.typicode.com/users");

  const emit = defineEmits<{
    (e: 'user-count', count: number | null, error: string | null): void;
    (e: 'user-refresh', refresh: () => void): void;
    (e: 'user-loading', storageLoading: boolean, apiLoading: boolean): void;
  }>();
  emit('user-refresh', () => refresh());

  watch(
    () => storageLoading.value,
    (loading) => {
      emit('user-loading', storageLoading.value, apiLoading.value);
      if (!loading && (users.value == null || users.value?.length == 0)) {
        refresh();
      }
    }
  );
  watch(
    () => apiLoading.value,
    () => {
      emit('user-loading', storageLoading.value, apiLoading.value);
    }
  );
  watch(
    usersData,
    (newUsers) => {
      if (newUsers && !apiLoading.value) {
        setUsers(newUsers);
      }
    }
  );
  watch(
    users,
    (newUsers) => {
      if (newUsers && !storageLoading.value && !apiLoading.value) {
        emit('user-count', newUsers.length, error.value);
      }
    }
  );
  watch(
    () => error.value,
    (newUsers) => {
      if (newUsers && !storageLoading.value && !apiLoading.value) {
        emit('user-count', newUsers.length, error.value);
      }
    }
  );
</script>

<template>
  <content>
    <UserCart v-for="user in users" :key="user.id" :user="user" />
  </content>
</template>

<style scoped>
  content {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 равные колонки */
    gap: 16px; /* отступы между элементами */
    padding: 16px;
  }
</style>
