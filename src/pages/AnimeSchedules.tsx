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

  return (
    <>
      {days.map((d) => (
        <AnimeSchedule day={d} key={d}></AnimeSchedule>
      ))}
    </>
  );
};

export default AnimeSchedules;
