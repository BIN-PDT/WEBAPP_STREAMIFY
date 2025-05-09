import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "../common/api";
import { toastErrorMessage } from "../common/utils";

function useSignIn() {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationFn: signIn,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
		onError: (error) => toastErrorMessage(error.response.data),
	});

	return { isPending, mutateSignIn: mutate };
}

export default useSignIn;
