import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Anime from "../entities/Anime";
import { AnimeList } from "../entities/AnimeList";
import { useIsLoggedInStore } from "../store";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAnimeListPost from "../hooks/useAnimeListPost";
import useAnimeListPut from "../hooks/useAnimeListPut";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  anime: Anime;
  matchedAnimeList: AnimeList | undefined;
}
const AnimeListAddModal = ({
  onClose,
  isOpen,
  anime,
  matchedAnimeList,
}: Props) => {
  const userData = useIsLoggedInStore((s) => s.userData); // get user data
  const [episodeProgress, setEpisodeProgress] = useState<number>(0);
  const [status, setStatus] = useState("Watching");
  const [finishDate, setFinishDate] = useState<Date | null>(null); // Use state for DatePicker
  const queryClient = useQueryClient(); // Get the query client to invalid query
  const navigate = useNavigate(); // Initialize navigate

  const { mutate: animeListPost } = useAnimeListPost(queryClient, navigate); //created new animeList for user
  const { mutate: animeListPut } = useAnimeListPut(
    queryClient,
    matchedAnimeList?._id || "",
    navigate
  ); //patch the user animeList data
  const newAnimeList: AnimeList = {
    userId: userData._id,
    watchListIds: [],
    anime: {
      animeId: anime.mal_id.toString(),
      format: anime.type,
      title: anime.title,
      imageUrl: anime.images.jpg.image_url,
      genre: anime.genres.length == 0 ? "" : anime.genres[0].name,
      totalEpisodes: anime.episodes || 0,
      score: anime.score,
      year: anime.year || 0,
      status: anime.status,
    },
    currentEpisode: episodeProgress,
    status: status,
    favorite: false,
  };
  const handleAddButton = () => {
    console.log(status);
    if (matchedAnimeList)
      animeListPut({
        status: status,
        expectedFinishDate: finishDate,
        currentEpisode: episodeProgress,
        updated_at: new Date(),
      });
    else {
      animeListPost(newAnimeList);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add to List</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              defaultValue="Watching"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Watching</option>
              <option>Rewatching</option>
              <option>Completed</option>
              <option>Paused</option>
              <option>Dropped</option>
              <option>Planning</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Episode Progress</FormLabel>
            <NumberInput
              max={anime.episodes}
              min={0}
              defaultValue={0}
              onChange={(valueString) =>
                setEpisodeProgress(parseInt(valueString) || 0)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Finish Date</FormLabel>

            <DatePicker
              selected={finishDate}
              onChange={(date: Date | null) => setFinishDate(date)}
              placeholderText="Select a finish date"
              customInput={<Input />}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddButton}>
            Add
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AnimeListAddModal;
