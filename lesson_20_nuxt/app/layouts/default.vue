<script setup lang="ts">
</script>
<template>
    <header class="header">
        <div>
            <NuxtLink to="/" class="logo">
                <span style="color: forestgreen">Imag</span>
                <span style="color: crimson">Es</span>
            </NuxtLink>
        </div>
        <nav class="nav">
            <NuxtLink to="/" class="nav-link">
              <button>Главная</button>
            </NuxtLink>
            <NuxtLink to="/about" class="nav-link">
              <button>Обо мне</button>
            </NuxtLink>
        </nav>
    </header>
    <main class="content">
      <slot />
    </main>
    <footer class="footer">
      © 2026 Images
    </footer>
</template>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: #f3f3f3;
        box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }

    .logo {
      text-decoration: none;
      font-family: cursive;
      font-size: x-large;
    }

    .nav {
        display: flex;
        gap: 1rem;
    }

    .nav-link {
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s, border-bottom 0.3s;
    }

        .nav-link:hover,
        .nav-link.active {
            color: #007bff;
        }

      .nav-link button {
        border-radius: 13px;
        border: none;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        transition: background-color 0.3s ease;
        cursor: pointer !important;
      }

      .nav-link button:hover {
        background-color: #0056b3;
        text-decoration: none;
      }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: #ffffff;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      margin-bottom: 10px;
      margin-top: 10px;
    }

    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem 1rem;
      background-color: #f3f3f3;
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      font-size: smaller;
      font-family: monospace;
    }

    @media (max-width: 768px) {
        .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
            padding: 1rem;
        }

        .nav {
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
            gap: 1rem;
          text-decoration: none;
        }

        .logo-img {
            height: 32px;
        }
    }
</style>