import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../common/api";

function useSignOut() {
	const queryClient = useQueryClient();
	const { isPending, mutate } = useMutation({
		mutationFn: signOut,
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ["authUser"] }),
	});

	return { isPending, mutateSignOut: mutate };
}

export default useSignOut;
