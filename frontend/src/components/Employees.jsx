import { useEffect, useState } from 'react'
import './Employees.css'

function Employees() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/employees')
      .then(response => response.json())
      .then(data => {
        setEmployees(data)
      })
  }, [])

  return (
    <main>
      <h1>Employees</h1>
      <p>View all employees in the organization.</p>

      <div className="employee-list">
        {employees.map(employee => (
          <div className="employee-card" key={employee.id}>
            <h3>
              {employee.firstName} {employee.lastName}
            </h3>

            <p>Email: {employee.email}</p>
            <p>Job Title: {employee.jobTitle}</p>
            <p>Department: {employee.department.name}</p>
            <p>Status: {employee.status}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Employees