// hooks/useSTT.js
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export const useSTT = () => {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationFn: async (audioBlob) => {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await axiosPublic.post("/api/stt", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.text?.trim();
    },
  });
};