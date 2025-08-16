import { useState } from 'react'
import './index.css'
import CharactersList from './components/CharactersList'

function App() {
  return (
    <div className='bg-red-100 min-h-screen p-4'>
     <CharactersList />
    </div>
  )
}

export default App
