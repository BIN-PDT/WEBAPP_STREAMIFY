import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../common/api";
import { toastErrorMessage } from "../common/utils";

function useSignUp() {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationFn: signUp,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
		onError: (error) => toastErrorMessage(error.response.data),
	});

	return { isPending, mutateSignUp: mutate };
}

export default useSignUp;
