import { useQuery } from '@tanstack/react-query';
import API from '../utils/API';

const searchUser = async searchUsersText => {
	const { data } = await API.get(`/users/search?q=${searchUsersText}`);

	if (!searchUsersText || searchUsersText.length < 2) return [];
	return data;
};

const useUsers = searchUsersText => {
	const {
		data: users,
		isLoading: usersLoading,
		error: usersError,
	} = useQuery({
		queryFn: () => searchUser(searchUsersText),
		queryKey: ['search', searchUsersText],
		enabled: searchUsersText.length > 1,
	});

	return {
		users,
		usersLoading,
		usersError,
	};
};

export default useUsers;
