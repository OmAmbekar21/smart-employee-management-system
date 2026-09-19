import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Events from './components/Events'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <>
      <Navbar setActivePage={setActivePage} />

      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'events' && <Events />}
    </>
  )
}

export default App