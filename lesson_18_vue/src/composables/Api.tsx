import { ref, watch, type Ref } from 'vue';

type UseApiOptions = RequestInit;

type UseApiResult<T> = {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  refresh: () => void;
};

function useApi<T>(url: string, options: UseApiOptions = {}): UseApiResult<T> {
  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      //freeze 
      await new Promise(resolve => setTimeout(resolve, 300));

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const json = await res.json();
      data.value = json;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  watch(() => url, () => fetchData());
  watch(() => options, () => fetchData());

  return {
    data,
    loading,
    error,
    refresh: fetchData
  };
}

export default useApi;
