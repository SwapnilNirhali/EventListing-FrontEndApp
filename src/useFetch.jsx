import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 useEffect(() => {
  const fetchData = () => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setError(null);
      })
      .catch((error) => {
        setError("An error occurred while fetching data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
