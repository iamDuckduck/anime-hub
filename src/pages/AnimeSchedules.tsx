import { useEffect, useState } from "react";
import AnimeSchedule from "../component/AnimeSchedule";

const AnimeSchedules = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // to render animeSchedule and send api query one by one, avoid overloading error
  const [renderIndex, setRenderIndex] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderIndex((prevIndex) => prevIndex + 1);
    }, 620);

    return () => clearTimeout(timer);
  }, [renderIndex < 7 ? renderIndex : null]);

  return (
    <>
      {days.slice(0, renderIndex).map((d) => (
        <AnimeSchedule day={d} key={d}></AnimeSchedule>
      ))}
    </>
  );
};

export default AnimeSchedules;
