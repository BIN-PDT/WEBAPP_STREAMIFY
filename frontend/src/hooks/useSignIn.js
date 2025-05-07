import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../common/api";

function useSignIn() {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationFn: signIn,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
	});

	return { isPending, mutateSignIn: mutate };
}

export default useSignIn;
