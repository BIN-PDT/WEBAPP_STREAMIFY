import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../common/api";

function useAuthUser() {
	const { isLoading, data: authData } = useQuery({
		queryKey: ["authUser"],
		queryFn: getAuthUser,
		retry: false,
	});

	return { isLoading, authUser: authData?.data.user };
}

export default useAuthUser;
