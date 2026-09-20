import { useEffect, useState } from 'react'
import './Performance.css'

function Performance() {
    const [performances, setPerformances] = useState([])
    const [suggestions, setSuggestions] = useState({})
    const [trends, setTrends] = useState({})

    const fetchSuggestion = (performanceId) => {
      fetch(`http://localhost:8080/performances/${performanceId}/suggestion`)
        .then(response => response.text())
        .then(data => {
          setSuggestions(previousSuggestions => ({
            ...previousSuggestions,
            [performanceId]: data
          }))
        })
    }

    const fetchTrend = (employeeId) => {
      fetch(`http://localhost:8080/performances/employee/${employeeId}/trend`)
        .then(response => response.text())
        .then(data => {
          setTrends(previousTrends => ({
            ...previousTrends,
            [employeeId]: data
          }))
        })
    }

    useEffect(() => {
      fetch('http://localhost:8080/performances')
        .then(response => response.json())
        .then(data => {
          setPerformances(data)

          data.forEach(performance => {
            fetchSuggestion(performance.id)
          })

          const employeeIds = [...new Set(data.map(performance => performance.employee.id))]

          employeeIds.forEach(employeeId => {
            fetchTrend(employeeId)
          })
        })
    }, [])

  return (
    <main>
      <h1>Performance</h1>
      <p>View employee performance and improvement areas.</p>
      <div className="performance-list">
       {performances.map(performance => {
         const employeePerformances = performances.filter(
           item => item.employee.id === performance.employee.id
         )

         const latestPerformance = employeePerformances.reduce(
           (latest, item) => {
             return new Date(item.reviewDate) > new Date(latest.reviewDate)
               ? item
               : latest
           }
         )

         const isLatest = performance.id === latestPerformance.id

         return (
           <div className="performance-card" key={performance.id}>
            <h3>
              {performance.employee.firstName} {performance.employee.lastName}
            </h3>

            <p>Score: {performance.score}</p>
            <p>Workload: {performance.workload}</p>
            <p>Review Date: {performance.reviewDate}</p>
            <p>Comments: {performance.comments}</p>
            <p>Suggestion: {suggestions[performance.id]}</p>
            {isLatest && (
              <p>Trend: {trends[performance.employee.id]}</p>
            )}
          </div>
          )
        })}
      </div>
    </main>
  )
}

export default Performance