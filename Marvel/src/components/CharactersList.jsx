import React, { useEffect, useState } from 'react'
import '../index.css';

function CharactersList() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/characters')
      .then(res => res.json())
      .then(data => setCharacters(data))
  }, [])

  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Marvel Characters</h1>
        <p className='mb-4'>"Nées pour Combattre"</p>
        <ul className='list-disc pl-5'>
          {characters.map(character => (
            <li key={character.id} className='mb-2'>
              <span className='font-semibold'>{character.name}</span> - {character.description}
            </li>
          ))}
        </ul>
        {characters.length === 0 && <p className='text-gray-500'>No characters found.</p>}
    </div>
    
  )
}

export default CharactersList;