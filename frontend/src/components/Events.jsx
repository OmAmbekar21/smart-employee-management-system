import { useEffect, useState } from 'react'
import './Events.css'

function Events() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/events')
      .then(response => response.json())
      .then(data => {
        setEvents(data)
      })
  }, [])

 return (
   <main>
     <h1>Events</h1>
     <p>Upcoming employee and organization events.</p>

     <div className="event-list">
       {events.map(event => (
         <div className="event-card" key={event.id}>
           <h3>{event.title}</h3>
           <p>{event.description}</p>
           <p>Date: {event.eventDate}</p>
           <p>Location: {event.location}</p>
         </div>
       ))}
     </div>
   </main>
 )
}

export default Events