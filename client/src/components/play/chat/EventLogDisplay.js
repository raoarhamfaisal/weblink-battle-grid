const EventLogDisplay = ({ log, title }) => {
    if (log.length === 0) {
      // If you prefer not to display anything when there are no logs, you can return null or a subtle message instead.
      return null; // or return <div>No events to display.</div>;
    }
  
    return (
      <div className="event-log">
        <h3>{title}</h3>
        <ul style={{textAlign:'left'}}>
          {log.map((entry, index) => (
            <li key={index} style={{ listStyle: 'none' }}>
              <strong>{entry.eventName}</strong>: {JSON.stringify(entry.details)} at {entry.timestamp.toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default EventLogDisplay;
  