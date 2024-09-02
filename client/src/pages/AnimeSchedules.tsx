import { useEffect, useState } from "react";
import AnimeSchedule from "../component/AnimeSchedule";
import { useSearchScheduleStore } from "../store";
import { Checkbox, HStack } from "@chakra-ui/react";

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

  const kidContent = useSearchScheduleStore((s) => s.kidContent);
  const setKidContent = useSearchScheduleStore((s) => s.setKidContent);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(renderIndex);
      setRenderIndex((prevIndex) => prevIndex + 1);
    }, 650);

    return () => clearTimeout(timer);
  }, [renderIndex < days.length ? renderIndex : null]);

  return (
    <>
      <HStack justifyContent="end" padding={5}>
        <Checkbox
          isChecked={!kidContent}
          onChange={() => setKidContent(kidContent ? false : true)}
        >
          Filter KidContent
        </Checkbox>
      </HStack>

      {days.slice(0, renderIndex).map((d) => (
        <AnimeSchedule day={d} key={d}></AnimeSchedule>
      ))}
    </>
  );
};

export default AnimeSchedules;
