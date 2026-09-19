import './Dashboard.css'

function Dashboard() {
  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <p>Here's an overview of your organization.</p>

      <div>
        <div>
          <h3>Total Employees</h3>
          <p>5</p>
        </div>

        <div>
          <h3>Departments</h3>
          <p>5</p>
        </div>

        <div>
          <h3>Average Performance</h3>
          <p>82%</p>
        </div>

        <div>
          <h3>Upcoming Events</h3>
          <p>2</p>
        </div>
      </div>
    </main>
  )
}

export default Dashboard