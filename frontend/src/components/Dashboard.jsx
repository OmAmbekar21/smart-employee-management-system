import { useEffect, useState } from 'react'
import './Dashboard.css'

function Dashboard() {
    const [employeeCount, setEmployeeCount] = useState(0)
    const [departmentCount, setDepartmentCount] = useState(0)
    const [averagePerformance, setAveragePerformance] = useState(0)
    const [eventCount, setEventCount] = useState(0)

   useEffect(() => {
     fetch('http://localhost:8080/employees')
       .then(response => response.json())
       .then(data => {
         setEmployeeCount(data.length)
       })
   }, [])
   useEffect(() => {
     fetch('http://localhost:8080/departments')
       .then(response => response.json())
       .then(data => {
         setDepartmentCount(data.length)
       })
   }, [])
   useEffect(() => {
     fetch('http://localhost:8080/performances')
       .then(response => response.json())
       .then(data => {
         if (data.length === 0) {
           setAveragePerformance(0)
           return
         }

         const total = data.reduce((sum, performance) => {
           return sum + Number(performance.score)
         }, 0)

         const average = total / data.length

         setAveragePerformance(average)
       })
   }, [])
   useEffect(() => {
     fetch('http://localhost:8080/events')
       .then(response => response.json())
       .then(data => {
         const today = new Date()

         const upcomingEvents = data.filter(event => {
           const eventDate = new Date(event.eventDate)
           return eventDate >= today
         })

         setEventCount(upcomingEvents.length)
       })
   }, [])

  return (
    <main>
      <h1>Welcome to the Dashboard</h1>
      <p>Here's an overview of your organization.</p>

      <div>
        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <p>{employeeCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Departments</h3>
          <p>{departmentCount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Average Performance</h3>
          <p>{averagePerformance.toFixed(0)}%</p>
        </div>

        <div className="dashboard-card">
          <h3>Upcoming Events</h3>
          <p>{eventCount}</p>
        </div>
      </div>
    </main>
  )
}

export default Dashboard