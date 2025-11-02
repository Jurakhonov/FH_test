import { useState, useEffect } from "react";
import axios from "axios";

const cache = new Map();
const CACHE_TIME = 5 * 60 * 1000; // 5 минут

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { disableCache, dependencies = [] } = options;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Проверяем кэш
      if (!disableCache) {
        const cached = cache.get(url);
        if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
          setData(cached.data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get(url);
        setData(response.data);

        // Сохраняем в кэш
        if (!disableCache) {
          cache.set(url, {
            data: response.data,
            timestamp: Date.now(),
          });
        }

        setError(null);
      } catch (err) {
        setError(err);
        console.error(`Error fetching ${url}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, disableCache, ...dependencies]);

  // Функция для принудительного обновления данных
  const refresh = async () => {
    cache.delete(url);
    setLoading(true);

    try {
      const response = await axios.get(url);
      setData(response.data);

      if (!disableCache) {
        cache.set(url, {
          data: response.data,
          timestamp: Date.now(),
        });
      }

      setError(null);
    } catch (err) {
      setError(err);
      console.error(`Error refreshing ${url}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refresh };
};

// Хук для POST-запросов
export const useApiMutation = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (err) {
      setError(err);
      console.error(`Error posting to ${url}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};
