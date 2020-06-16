import fetchExotics from '../actions/exotics'

export const filterExotics = (list, term) => list.filter((exotic) => {
  const lowercaseTerm = term.toLowerCase()

  return exotic.type.toLowerCase().includes(lowercaseTerm) || exotic.name.toLowerCase().includes(lowercaseTerm)
})

export const retrieveExotics = async () => {
  const exotics = await fetchExotics()

  return exotics
}
