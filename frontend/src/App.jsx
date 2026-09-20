import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Events from './components/Events'
import Employees from './components/Employees'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <>
      <Navbar setActivePage={setActivePage} />

      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'events' && <Events />}
      {activePage === 'employees' && <Employees />}
    </>
  )
}

export default App