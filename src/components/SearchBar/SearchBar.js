import React from 'react'
import { Search } from "./styles";

const SearchBar = props => {

  const handleChange = event => {
    const { value } = event.target
    props.searchUpdates(value)
  }

  return (
    <Search type="text" placeholder={props.placeholder} onChange={handleChange} />
  )
}

export default SearchBar
