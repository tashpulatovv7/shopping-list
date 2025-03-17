import { create } from 'zustand';

const getFromLocalStorage = (key, defaultValue) => {
	try {
		const storedValue = localStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : defaultValue;
	} catch (error) {
		console.error(`Error reading from localStorage for key: ${key}`, error);
		return defaultValue;
	}
};

const saveToLocalStorage = (key, value) => {
	try {
		if (value !== null) {
			localStorage.setItem(key, JSON.stringify(value));
		} else {
			localStorage.removeItem(key);
		}
	} catch (error) {
		console.error(`Error writing to localStorage for key: ${key}`, error);
	}
};

export const useStore = create(set => ({
	user: getFromLocalStorage('user', null),

	setUser: user =>
		set(() => {
			saveToLocalStorage('user', user);
			return { user };
		}),

	groups: getFromLocalStorage('groups', []),

	addGroup: newGroup =>
		set(state => {
			const updatedGroups = [...state.groups, newGroup];
			saveToLocalStorage('groups', updatedGroups);
			return { groups: updatedGroups };
		}),

	logout: () =>
		set(() => {
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			return { user: null };
		}),
}));
