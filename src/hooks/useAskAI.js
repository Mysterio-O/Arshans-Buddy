// hooks/useAskAI.js
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export const useAskAI = () => {
  const axiosPublic = useAxiosPublic();

  return useMutation({
    mutationFn: async (text) => {
      const response = await axiosPublic.post("/api/ask", { text });
      return response.data.response?.trim();
    },
  });
};