import { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import { useDispatch } from "react-redux";
const useFetch = (url) => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading("loading");
    setData(null);
    setError(null);
    dispatch(fetchDataFromApi(url))
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [url, dispatch]);

  return { loading, data, error };
};

export default useFetch;
