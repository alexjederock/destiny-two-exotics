import React from 'react'

export default ({ name, perk }) => (
  <div key={name}>{`${name}: ${perk}`}</div>
)
