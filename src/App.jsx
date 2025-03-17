// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Toaster } from 'sonner';
// import Router from './Router/router';

// function App() {
// 	const queryClient = new QueryClient();
// 	return (
// 		<QueryClientProvider client={queryClient}>
// 			<Router />
// 			<Toaster position='top-right' richColors />
// 		</QueryClientProvider>
// 	);
// }

// export default App;

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'sonner';
import Router from './Router/router';
import { AuthProvider } from './hooks/useAuthContext';

function App() {
	const queryClient = new QueryClient();
	return (
		<AuthProvider>
			{' '}
			<QueryClientProvider client={queryClient}>
				<Router />
				<Toaster position='top-right' richColors />
			</QueryClientProvider>
		</AuthProvider>
	);
}

export default App;
