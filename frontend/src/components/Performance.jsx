import { useEffect, useState } from 'react'
import './Performance.css'

function Performance() {
    const [performances, setPerformances] = useState([])

    useEffect(() => {
      fetch('http://localhost:8080/performances')
        .then(response => response.json())
        .then(data => {
          setPerformances(data)
        })
    }, [])

  return (
    <main>
      <h1>Performance</h1>
      <p>View employee performance and improvement areas.</p>
      <div className="performance-list">
        {performances.map(performance => (
          <div className="performance-card" key={performance.id}>
            <h3>
              {performance.employee.firstName} {performance.employee.lastName}
            </h3>

            <p>Score: {performance.score}</p>
            <p>Workload: {performance.workload}</p>
            <p>Review Date: {performance.reviewDate}</p>
            <p>Comments: {performance.comments}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Performance