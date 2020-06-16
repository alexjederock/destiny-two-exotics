import React, { useEffect, useState } from 'react'
import ResultExotic from '../components/ResultExotic'
import { retrieveExotics, filterExotics } from '../utils/exotics'

export default () => {
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
    const search = localStorage.getItem('searchTerm')
    const filtered = filterExotics(exoticsList, search)

    setFilteredExoticsList(filtered)
  }, [filteredExoticsList])

  return (
    <div className="page">
      <div className="title">Results</div>
      <div className="subtitle">Your Exotic</div>
      {
        filteredExoticsList.map(exotic => (
          <ResultExotic
            key={exotic.name}
            name={exotic.name}
            perk={exotic.perk}
          />
        ))
      }
    </div>
  )
}
