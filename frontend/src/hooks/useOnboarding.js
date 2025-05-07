import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../common/api";

function useOnboarding() {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationFn: completeOnboarding,
		onSuccess: () => {
			toast.success("Profile onboarded successfully.");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

	return { isPending, mutateOnboarding: mutate };
}

export default useOnboarding;
