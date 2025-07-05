import { useState } from "react"

export const useSearch = (list: any, paramsList: string[]) => {

  const [searchedValue, setSearchedValue] = useState('');

  return {
    searchedValue,
    setSearchedValue,
    list: searchedValue ? list.filter(i => {
      return paramsList.some(p => i[p].toLowerCase().includes(searchedValue.toLowerCase()));
    }) : list
  }
}