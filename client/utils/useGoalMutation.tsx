import { setError, setSuccess } from "@/store/notificationSlice";
import { useAppDispatch } from "@/store/store";
import { Goal } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { addGoal, updateGoal } from "./goalActions";
import { queryClient } from "./QueryClient";

export const useGoalMutation = () => {
  const dispatch = useAppDispatch();

  const addGoalMutation = useMutation(
    async (values: Goal) => {
      return addGoal(values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["goals"]);
        dispatch(setSuccess());
      },
      onError: () => {
        dispatch(setError());
      },
    }
  );

  const updateGoalMutation = useMutation(
    async ([oldGoal, values]: [Goal, Goal]) => {
      return updateGoal(oldGoal, values);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["goals"]);
        dispatch(setSuccess());
      },
      onError: () => {
        dispatch(setError());
      },
    }
  );

  return {
    addGoalMutation,
    updateGoalMutation,
  };
};
