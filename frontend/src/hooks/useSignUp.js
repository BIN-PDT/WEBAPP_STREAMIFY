import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../common/api";

function useSignUp() {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationFn: signUp,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
	});

	return { isPending, mutateSignUp: mutate };
}

export default useSignUp;
