import React from "react";
import {IonRippleEffect} from "@ionic/react";
import "./EventCard.scss";

type Props = {
  events: any;
};

const EventCard: React.FC<Props> = ({ events }) => {
  return (
    <div
      className="event-card background-img"
      style={{ backgroundImage: `url('${events.image_url}')` }}
    >
      <div className="card-inside flex al-center jc-center">
        <div className="card-title  ">
          <div className="btn flex al-center jc-center">
            {events.title}
            <IonRippleEffect className="ripple-parent"></IonRippleEffect>
          </div>
        </div>
        <div className="bottom-holder">
          <div className="caption-title">{events.caption}</div>
          <div className="caption-time">passion</div>
        </div>
      </div>
    </div>
  );
};

EventCard.defaultProps = {};

export default EventCard;
