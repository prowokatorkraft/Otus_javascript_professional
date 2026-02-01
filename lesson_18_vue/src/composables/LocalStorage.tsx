import { ref, onMounted, type Ref } from 'vue';

type StoredValue<T> = T | null;

function useLocalStorage<T>(key: string, initialValue: T): {
  value: Ref<StoredValue<T>>;
  setValue: (value: T) => void;
  loading: Ref<boolean>;
} {
  const value = ref<StoredValue<T>>(null) as Ref<StoredValue<T>>;
  const loading = ref<boolean>(true);

  onMounted(() => {
    try {
      const item = window.localStorage.getItem(key);
      value.value = item ? JSON.parse(item) as T : initialValue;
    } catch (e) {
      console.warn(e);
      value.value = initialValue;
    }
    finally {
      loading.value = false;
    }
  });

  const setValue = (newValue: T): void => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      value.value = newValue;
    } catch (e) {
      console.warn(e);
    }
  };

  return {
    value,
    setValue,
    loading
  };
}

export default useLocalStorage;
