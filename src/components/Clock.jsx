import * as React from 'react';
import "./clock.css";

export default function Clock({ timezone = "UTC", city = "City" }) {
  const [time, setTime] = React.useState({ hours: 0, minutes: 0, seconds: 0 });

  const getTimeFromTimeZone = () => {
    const now = new Date();

    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: timezone,
    };

    const formatter = new Intl.DateTimeFormat("en-GB", options);
    const parts = formatter.formatToParts(now);

    const getPart = (type) => parts.find(p => p.type === type)?.value || "00";

    return {
      hours: parseInt(getPart("hour")),
      minutes: parseInt(getPart("minute")),
      seconds: parseInt(getPart("second")),
    };
  };

  React.useEffect(() => {
    const updateTime = () => {
      const current = getTimeFromTimeZone();
      setTime(current);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  return (
    <div className="clock-wrapper">
      <div className="clock-title">{city}</div>
      <div className="clock">
        <div
          className="hours"
          style={{
            transform: `rotate(${time.hours * 30 - 90}deg) translateX(-10px)`,
          }}
        ></div>
        <div
          className="minutes"
          style={{
            transform: `rotate(${time.minutes * 6 - 90}deg) translateX(-15px)`,
          }}
        ></div>
        <div
          className="seconds"
          style={{
            transform: `rotate(${time.seconds * 6 - 90}deg) translateX(-15px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
