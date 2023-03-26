import { useState } from "react";

export const usePromiseLoading = () => {
  const [promise, _setPromise] = useState<Promise<unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPromise = (promise: Promise<unknown>) => {
    setLoading(true);
    _setPromise(promise);
    promise.catch((e) => {
      setError(e.message);
    });
    promise.finally(() => {
      setLoading(false);
    });
  };

  return { promise, loading, setPromise, error };
};
