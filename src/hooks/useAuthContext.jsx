import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = username => {
		setUser({ username });
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
	);
};
