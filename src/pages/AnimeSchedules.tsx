import AnimeSchedule from "../component/AnimeSchedule";

const AnimeSchedules = () => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
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
