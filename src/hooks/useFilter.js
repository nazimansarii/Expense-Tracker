import { useState } from "react";

export function useFilter(dataList, callback) {
  const [query, setQuery] = useState("");

  const filteredData = dataList && dataList.length> 0? (dataList.filter((el) => {
      return callback(el).toLowerCase().includes(query)
    })) : '';

  return [filteredData, setQuery];
}
