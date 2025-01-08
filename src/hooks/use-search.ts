import { useState, useCallback } from 'react';

export const useSearch = <T extends Record<string, any>>(
  items: T[],
  searchFields: (keyof T)[]
) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((item) =>
    searchFields.some((field) =>
      String(item[field])
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    searchQuery,
    filteredItems,
    handleSearch,
  };
};