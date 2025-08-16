import React, { useEffect, useState } from 'react'

function CharactersList() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/characters')
      .then(res => res.json())
      .then(data => setCharacters(data))
  }, [])

  return (
    <ul>
      {characters.map(char => (
        <li key={char.id}>{char.name} ({char.realName})</li>
      ))}
    </ul>
  )
}

export default CharactersList;