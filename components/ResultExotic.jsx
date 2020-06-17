import React from 'react'
import styled from 'styled-components'

const ResultExotic = styled.div`
margin-bottom: 5%;
font-size: 3em;
color:purple;
`

export default ({ name, perk }) => (
  <ResultExotic key={name}>{`${name}: ${perk}`}</ResultExotic>
)
