import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../common/api";

function useOnboarding() {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationFn: completeOnboarding,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
	});

	return { isPending, mutateOnboarding: mutate };
}

export default useOnboarding;
