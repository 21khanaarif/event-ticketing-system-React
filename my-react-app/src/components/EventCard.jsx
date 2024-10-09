import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="col-md-4" key={event.id}>
      <div className="card">
        {event.attributes.Display_Picture && (
          <img
            src={`http://localhost:1337${event.attributes.Display_Picture.data.attributes.url}`}
            className="card-img-top"
            alt={event.attributes.Event_Name}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{event.attributes.Event_Name}</h5>
          <p className="card-text">
            <strong>Event_Id:</strong> {event.attributes.Event_Id}
            <br />
            <strong>Date:</strong> {event.attributes.Date_and_Time}
            <br />
            <strong>Location:</strong> {event.attributes.Venue}
            <br />
            {event.attributes.Description && (
              <>
                <strong>Description:</strong> {event.attributes.Description}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
