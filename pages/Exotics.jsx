import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Exotic from '../components/Exotic'
import Search from '../components/Search'
import NavLink from '../components/NavLink'
import { retrieveExotics, filterExotics } from '../utils/exotics'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [exoticsList, setExoticsList] = useState([])
  const [filteredExoticsList, setFilteredExoticsList] = useState([])

  useEffect(() => {
    async function pullData() {
      const exotics = await retrieveExotics()

      setExoticsList(exotics)
      setFilteredExoticsList(exotics)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterExotics(exoticsList, searchTerm)

    setFilteredExoticsList(filtered)
    localStorage.setItem('searchTerm', searchTerm)
    console.log(searchTerm)
  }, [searchTerm])

  return (

    <Page>
      <div className="title">Find an Exotic for your hunter!</div>
      <div className="subtitle">A searchable list of Hunter class exotics.</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredExoticsList.map(exotic => (<Exotic key={exotic.name} name={exotic.name} />))
      }
      <NavLink />
    </Page>

  )
}
