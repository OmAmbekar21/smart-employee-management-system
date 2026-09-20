import './Navbar.css'

function Navbar({ setActivePage }) {
  return (
    <nav>
      <h2>Smart Employee Management System</h2>

      <div>
        <span onClick={() => setActivePage('dashboard')}>
          Dashboard
        </span>

        <span onClick={() => setActivePage('events')}>
          Events
        </span>

        <span onClick={() => setActivePage('employees')}>
          Employees
        </span>

        <span>Performance</span>
      </div>
    </nav>
  )
}

export default Navbar