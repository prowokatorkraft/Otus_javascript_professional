<script setup lang="ts">
  import { type User } from '../types/User';
  import { type PropType } from 'vue'; 

  defineProps({
    user: {
      type: Object as PropType<User>,
      required: true
    }
  });
</script>

<template>
  <div class="user-card">
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
    <p>{{user.phone}}</p>
  </div>
</template>

<style scoped>
  .user-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    max-width: 320px;
    margin: 16px auto;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

    .user-card p {
      margin: 8px 0;
      color: #444;
      line-height: 1.5;
    }

      .user-card p:first-child {
        font-size: 18px;
        font-weight: 600;
        color: #222;
        margin-bottom: 12px;
      }
</style>
