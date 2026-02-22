export type Response<T> = {
  success: true,
  value: T
} | {
  success: false,
  error: Error
};

export async function useFetchApi<T>(url: string): Promise<Response<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        success: false,
        error: new Error(`HTTP error! status: ${response.status}`)
      };
    }
    const data: T = await response.json();
    return { success: true, value: data };

  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error };
    } else {
      return { success: false, error: new Error(String(error)) };
    }
  }
}