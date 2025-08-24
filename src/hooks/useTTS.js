// hooks/useTTS.js
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export const useTTS = () => {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationFn: async (text) => {
      const response = await axiosPublic.post("/api/tts", { text });
      return response.data.audioUrl; // e.g., "/audio/123.wav"
    },
  });
};