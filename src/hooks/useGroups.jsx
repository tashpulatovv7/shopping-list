import { useMutation, useQuery } from '@tanstack/react-query';
import API from '../utils/API';

const searchGroup = async (searchText) => {
	if (!searchText || searchText.length < 2) return [];
	const { data } = await API.get(`/groups/search?q=${searchText}`);
	return data;
}


const useGroups = (searchText) => {
	const {
		data: groups = [],
		isLoading: isLoadingGroups,
		isError: isErrorGroups,
	} = useQuery({
		queryFn: () => searchGroup(searchText),
		queryKey: searchText.length > 1 ? ["searchGroup", searchText] : ["searchGroup"],
		enabled: searchText.length > 1,
	});
	return { groups, isLoadingGroups, isErrorGroups };
}

const fetchMyGroups = async () => {
	const { data } = await API.get("/groups");
	return data;
};

const useMyGroups = () => {
	const {
		data: myGroups = [],
		isLoading: isLoadingMyGroups,
		refetch
	} = useQuery({
		queryFn: fetchMyGroups,
		queryKey: ["myGroups"],
		staleTime: 0,
		cacheTime: 0,
	});

	return { myGroups, isLoadingMyGroups, refetch };
};


const joinGroup = async ({ groupId, password }) => {
	if (!groupId || !password) throw new Error("Group ID and password are required");
	const { data } = await API.post(`/groups/${groupId}/join`, { password });
	return data;
  };
  const useJoinGroup = () => {
	return useMutation({
	  mutationFn: joinGroup,
	});
  };

  const searchMember = async (searchText) => {
	if (!searchText || searchText.length < 2) return [];
	const { data } = await API.get(`/users/search?q=${searchText}`);
	return data;
  }  

  const useMember = (searchText) => {
	const {
	  data: members = [],
	  isLoading: isLoadingMember,
	  isError: isErrorMember,
	} = useQuery({
	  queryFn: () => searchMember(searchText),
	  queryKey: searchText.length > 1 ? ["searchMember", searchText] : ["searchMember"],
	  enabled: searchText.length > 1,
	});
	return { members, isLoadingMember, isErrorMember };
  }

  const addMember = async ({ groupId, memberId }) => {
	if (!groupId || !memberId) throw new Error("Group ID and Member ID are required"); 
	const { data } = await API.post(`/groups/${groupId}/members`, { memberId });
	return data;
  };

  const useAddMember = () => {
	const { refetch } = useMyGroups();
  
	return useMutation({
	  mutationFn: addMember,
	  onSuccess: async (data) => {
		message.success("Member successfully added to the group!");
		await refetch(); 
	  },
	  onError: (error) => {
		message.error(`Error adding member: ${error.response?.data?.message || error.message}`);
	  },
	});
  };
  
  
export { useGroups, useMyGroups, useJoinGroup, useMember, useAddMember };
