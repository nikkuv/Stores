import React, { useState, useEffect } from "react";
import styles from "./StoreTimingDropdown.module.css";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const StoreTimingsDropdown = ({ timings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getCurrentDayTiming = () => {
    const currentDate = new Date();
    const currentDay = days[currentDate.getDay()];
    const currentTime = currentDate.getHours() + currentDate.getMinutes() / 60;

    const todayTiming = timings[currentDay];
    if (todayTiming.closed) {
      for (let i = 1; i <= 7; i++) {
        const nextDay = days[(currentDate.getDay() + i) % 7];
        if (!timings[nextDay].closed) {
          return `Opens ${nextDay.charAt(0).toUpperCase() + nextDay.slice(1)} ${
            timings[nextDay].open
          } AM`;
        }
      }
    } else {
      const openTime =
        parseInt(todayTiming.open.split(":")[0]) +
        parseInt(todayTiming.open.split(":")[1]) / 60;
      const closeTime =
        parseInt(todayTiming.close.split(":")[0]) +
        parseInt(todayTiming.close.split(":")[1]) / 60;

      if (currentTime < openTime) {
        return `Opens ${todayTiming.open} AM`;
      } else if (currentTime > openTime && currentTime < closeTime) {
        return `Closes ${todayTiming.close} PM`;
      } else {
        return `Opens ${todayTiming.open} AM`;
      }
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [currentTiming, setCurrentTiming] = useState(getCurrentDayTiming());

  useEffect(() => {
    const updateTimings = () => {
      setCurrentTiming(getCurrentDayTiming());
    };

    const intervalId = setInterval(updateTimings, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.storeTimingsDropdown}>
      <button className={styles.dropDownBtn} onClick={toggleDropdown}>
        {currentTiming}
        <span className={styles.iconStyle}>
          {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
        </span>
      </button>

      {isOpen && (
        <ul className={styles.timingsList}>
          {days.map((day) => {
            if (
              !timings[day].open ||
              !timings[day].close ||
              timings[day].closed
            ) {
              return null;
            }
            return (
              <li key={day}>
                <span>{capitalizeFirstLetter(day)}</span>
                <span>
                  {timings[day].open} AM - {timings[day].close} PM
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StoreTimingsDropdown;
