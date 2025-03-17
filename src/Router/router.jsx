import { Route, Routes } from 'react-router-dom';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import Register from '../pages/register/register';
import ProupPage from '../pages/groupPage/GroupPage';
import PrivateRoute from './PrivateRoute';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<PrivateRoute />}>
				<Route path='/' element={<Profile />} />
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='*' element={<ProupPage />} />
		</Routes>
	);
};

export default Router;
