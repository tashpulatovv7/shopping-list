// import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
// import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Breadcrumb, Button, Input, Layout, Menu, message, Modal, Popover, theme } from 'antd';
// import React, { useState } from 'react';
// import { useAuthContext } from '../../hooks/useAuthContext';
// import { useGroups, useJoinGroup, useMyGroups } from '../../hooks/useGroups';
// import { useStore } from '../../useStore';

// import { useNavigate } from 'react-router-dom';
// import './profile.css';

// const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, children) {
// 	return {
// 		key,
// 		icon,
// 		children,
// 		label,
// 	};
// }

// const Profile = () => {
// 	const { user } = useAuthContext();
// 	const [collapsed, setCollapsed] = useState(false);
// 	const [group, setGroup] = useState('');
// 	const { refetch, myGroups, isLoadingMyGroups } = useMyGroups();
// 	const [password, setPassword] = useState('');
// 	const { mutate: joinGroup, isLoading, isError, error } = useJoinGroup();
// 	const { groups, isLoadingGroups, isErrorGroups } = useGroups(group);
// 	const users = useStore(state => state.user);
// 	const [isModalOpen, setIsModalOpen] = useState(false);

// 	const navigate = useNavigate();
// 	const handleNavigation = path => {
// 		navigate(path);
// 	};

// 	const handleCopyUsername = () => {
// 		if (users?.username) {
// 			navigator.clipboard.writeText(users.username);
// 			message.success('Username copied to clipboard!');
// 		}
// 	};

// 	const showDeleteConfirm = () => {
// 		setIsModalOpen(true);
// 	};

// 	const handleDeleteAccount = () => {
// 		console.log('Account deleted');
// 		setIsModalOpen(false);
// 		message.success('Account deleted successfully!');
// 	};

// 	const groupItems =
// 		Array.isArray(groups) && Array.isArray(myGroups)
// 			? [...groups, ...myGroups].map((group, index) =>
// 					getItem(
// 						group?.name || 'No Name',
// 						group._id || `group-${index}`,
// 						null, // Icon qo'shmoqchi bo'lsangiz, bu yerga qo'shing
// 						undefined // Bu yerda `undefined` bo'lishi kerak, funksiya emas
// 					)
// 			  )
// 			: [];

// 	const items = [
// 		getItem('Profile', '1', <PieChartOutlined />),
// 		getItem('Groups', 'sub1', <UserOutlined />, groupItems),
// 	];

// 	const handleMenuClick = ({ key }) => {
// 		if (key.startsWith('group-') || key.match(/^[0-9a-fA-F]{24}$/)) {
// 			navigate(`/groups/${key}`);
// 		}
// 	};

// 	const {
// 		token: { colorBgContainer, borderRadiusLG },
// 	} = theme.useToken();

// 	const filteredGroups = groups?.filter(g => !myGroups?.some(myGroup => myGroup._id === g._id));

// 	const handleJoin = group => {
// 		if (!group._id) {
// 			message.error('Group ID is missing!');
// 			return;
// 		}
// 		if (!password) {
// 			message.warning('Please enter a password.');
// 			return;
// 		}
// 		joinGroup(
// 			{ groupId: group._id, password },
// 			{
// 				onSuccess: () => {
// 					message.success('Successfully joined the group!');
// 					setPassword('');
// 					setGroup('');
// 					refetch();
// 				},
// 				onError: err => {
// 					message.error(
// 						err.response?.data?.error || 'Failed to join the group.'
// 					);
// 				},
// 			}
// 		);
// 	};

// 	const joinPopoverContent = group => (
// 		<div>
// 			<Input
// 				type='password'
// 				value={password}
// 				onChange={e => setPassword(e.target.value)}
// 				style={{
// 					width: '100%',
// 					padding: '8px',
// 					borderRadius: '5px',
// 					border: '1px solid #ccc',
// 				}}
// 				placeholder='Enter group password'
// 			/>
// 			<Button
// 				type='primary'
// 				style={{
// 					backgroundColor: 'green',
// 					color: 'white',
// 					width: '100%',
// 					marginTop: '10px',
// 				}}
// 				onClick={() => handleJoin(group)}
// 				disabled={isLoading}
// 			>
// 				{isLoading ? 'Joining...' : 'Join'}
// 			</Button>
// 			{isError && message.error(error?.message || 'Failed to join')}
// 		</div>
// 	);

// 	return (
// 		<Layout style={{ minHeight: '100vh' }}>
// 			<Sider
// 				collapsible
// 				collapsed={collapsed}
// 				onCollapse={value => setCollapsed(value)}
// 			>
// 				<div className='demo-logo-vertical' />
// 				<Menu
// 					theme='dark'
// 					defaultSelectedKeys={['1']}
// 					mode='inline'
// 					items={items}
// 					onClick={handleMenuClick}
// 				/>
// 			</Sider>
// 			<Layout>
// 				<Header
// 					style={{
// 						padding: 0,
// 						background: colorBgContainer,
// 					}}
// 				>
// 					<div>
// 						<div className='profile'>
// 							<div className='header-search'>
// 								<input
// 									type='text'
// 									value={group}
// 									placeholder='Search...'
// 									onChange={e => setGroup(e.target.value)}
// 								/>

// 								{group.length > 0 && (
// 									<div className='search-results'>
// 										{groups.length > 0 &&
// 											!isLoadingGroups && (
// 												<h3>Groups</h3>
// 											)}
// 										<ul>
// 											{isLoadingGroups ? (
// 												<p className='loading'>
// 													Loading groups...
// 												</p>
// 											) : filteredGroups.length > 0 ? (
// 												filteredGroups.map(
// 													(group, index) => (
// 														<li
// 															key={
// 																group.id ||
// 																index +
// 																	1
// 															}
// 														>
// 															<div className='user'>
// 																<div className='user-info'>
// 																	<h4>
// 																		{
// 																			group.name
// 																		}
// 																	</h4>
// 																	<span>
// 																		{new Date(
// 																			group.createdAt
// 																		)
// 																			.toISOString()
// 																			.slice(
// 																				0,
// 																				19
// 																			)
// 																			.replace(
// 																				'T',
// 																				' '
// 																			)}
// 																	</span>
// 																</div>
// 																<p>
// 																	Created
// 																	By:{' '}
// 																	<span>
// 																		{
// 																			group
// 																				.owner
// 																				.name
// 																		}
// 																	</span>
// 																</p>
// 															</div>
// 															<Popover
// 																content={() =>
// 																	joinPopoverContent(
// 																		group
// 																	)
// 																}
// 																title='Group password'
// 																trigger='click'
// 															>
// 																<button className='join-btn'>
// 																	Join
// 																</button>
// 															</Popover>
// 														</li>
// 													)
// 												)
// 											) : (
// 												<p className='no-results'>
// 													No groups found
// 												</p>
// 											)}
// 										</ul>
// 									</div>
// 								)}
// 							</div>
// 							{isErrorGroups &&
// 								console.log(
// 									'Error fetching groups: ',
// 									isErrorGroups
// 								)}
// 						</div>
// 					</div>
// 				</Header>

// 				<Content style={{ margin: '0 16px' }}>
// 					<Breadcrumb
// 						style={{ margin: '16px 0' }}
// 						items={[
// 							{ title: 'User' },
// 							{ title: users ? users.username : 'No User' },
// 						]}
// 					/>

// 					<div
// 						style={{
// 							padding: 24,
// 							minHeight: 360,
// 							background: colorBgContainer,
// 							borderRadius: borderRadiusLG,
// 						}}
// 					>
// 						<div className='home'>
// 							<div className='home__user'>
// 								<div className='profile__content'>
// 									<div className='content__btn'>
// 										<button
// 											className='username__copy'
// 											onClick={handleCopyUsername}
// 										>
// 											<FontAwesomeIcon icon={faCopy} />{' '}
// 											Copy Username
// 										</button>
// 										<button
// 											className='username__delete'
// 											onClick={showDeleteConfirm}
// 										>
// 											<FontAwesomeIcon icon={faTrash} />{' '}
// 											Delete Account
// 										</button>
// 									</div>
// 								</div>
// 								<div className='profile__info'>
// 									<div className='info__image'>
// 										<h3>
// 											{users
// 												? users.username
// 														.charAt(0)
// 														.toUpperCase()
// 												: 'No username'}
// 										</h3>
// 									</div>
// 									<div className='info__text'>
// 										<div className='user__active'>
// 											<p>
// 												{users
// 													? users.username
// 													: 'No username'}
// 											</p>
// 											<span>Active</span>
// 										</div>
// 										<h4>{users ? users.name : 'Guest'}</h4>
// 									</div>
// 								</div>
// 							</div>

// 							<Modal
// 								title='Confirm Account Deletion'
// 								open={isModalOpen}
// 								onOk={handleDeleteAccount}
// 								onCancel={() => setIsModalOpen(false)}
// 								okText='Yes, Delete'
// 								cancelText='Cancel'
// 							>
// 								<p>
// 									Are you sure you want to delete your account?
// 									This action cannot be undone.
// 								</p>
// 							</Modal>
// 						</div>
// 					</div>
// 				</Content>
// 				<Footer style={{ textAlign: 'center' }}></Footer>
// 			</Layout>
// 		</Layout>
// 	);
// };

// export default Profile;

import { PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb, Button, Form, Input, Layout, Menu, message, Modal, theme } from 'antd';
import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useGroups, useJoinGroup, useMyGroups } from '../../hooks/useGroups'; // Assuming a custom hook for group creation
import { useStore } from '../../useStore';

import { useNavigate } from 'react-router-dom';
import './profile.css';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const Profile = () => {
	const { user } = useAuthContext();
	const [collapsed, setCollapsed] = useState(false);
	const [group, setGroup] = useState('');
	const [password, setPassword] = useState('');
	const [newGroupName, setNewGroupName] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false); // Modal state for group creation
	const { refetch, myGroups, isLoadingMyGroups } = useMyGroups();
	const { mutate: joinGroup, isLoading, isError, error } = useJoinGroup();
	const { groups, isLoadingGroups, isErrorGroups, mutate: createGroup } = useGroups(group);
	const users = useStore(state => state.user);

	const navigate = useNavigate();
	const handleNavigation = path => {
		navigate(path);
	};

	const handleCopyUsername = () => {
		if (users?.username) {
			navigator.clipboard.writeText(users.username);
			message.success('Username copied to clipboard!');
		}
	};

	const showDeleteConfirm = () => {
		setIsModalOpen(true);
	};

	const handleDeleteAccount = () => {
		console.log('Account deleted');
		setIsModalOpen(false);
		message.success('Account deleted successfully!');
	};

	const handleCreateGroup = () => {
		if (!newGroupName) {
			message.warning('Please provide a group name.');
			return;
		}

		createGroup(
			{ name: newGroupName },
			{
				onSuccess: () => {
					message.success('Group created successfully!');
					setNewGroupName('');
					setIsCreateGroupModalVisible(false);
				},
				onError: err => {
					message.error(err.response?.data?.error || 'Failed to create group.');
				},
			}
		);
	};

	const groupItems =
		Array.isArray(groups) && Array.isArray(myGroups)
			? [...groups, ...myGroups].map((group, index) =>
					getItem(
						group?.name || 'No Name',
						group._id || `group-${index}`,
						null,
						undefined
					)
			  )
			: [];

	const items = [
		getItem('Profile', '1', <PieChartOutlined />),
		getItem('Groups', 'sub1', <UserOutlined />, groupItems),
	];

	const handleMenuClick = ({ key }) => {
		if (key.startsWith('group-') || key.match(/^[0-9a-fA-F]{24}$/)) {
			navigate(`/groups/${key}`);
		}
	};

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const filteredGroups = groups?.filter(g => !myGroups?.some(myGroup => myGroup._id === g._id));

	const joinPopoverContent = group => (
		<div>
			<Input
				type='password'
				value={password}
				onChange={e => setPassword(e.target.value)}
				style={{
					width: '100%',
					padding: '8px',
					borderRadius: '5px',
					border: '1px solid #ccc',
				}}
				placeholder='Enter group password'
			/>
			<Button
				type='primary'
				style={{
					backgroundColor: 'green',
					color: 'white',
					width: '100%',
					marginTop: '10px',
				}}
				onClick={() => handleJoin(group)}
				disabled={isLoading}
			>
				{isLoading ? 'Joining...' : 'Join'}
			</Button>
			{isError && message.error(error?.message || 'Failed to join')}
		</div>
	);

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={value => setCollapsed(value)}
			>
				<div className='demo-logo-vertical' />
				<Menu
					theme='dark'
					defaultSelectedKeys={['1']}
					mode='inline'
					items={items}
					onClick={handleMenuClick}
				>
					<Menu.Item
						key='create-group'
						icon={<UserOutlined />}
						onClick={() => setIsCreateGroupModalVisible(true)}
					>
						Create Group
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				>
					<div className='profile'>
						<div className='header-search'>
							<input
								type='text'
								value={group}
								placeholder='Search...'
								onChange={e => setGroup(e.target.value)}
							/>
						</div>
					</div>
				</Header>

				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb
						style={{ margin: '16px 0' }}
						items={[
							{ title: 'User' },
							{ title: users ? users.username : 'No User' },
						]}
					/>

					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						<div className='home'>
							<div className='home__user'>
								<div className='profile__content'>
									<div className='content__btn'>
										<button
											className='username__copy'
											onClick={handleCopyUsername}
										>
											<FontAwesomeIcon icon={faCopy} />{' '}
											Copy Username
										</button>
										<button
											className='username__delete'
											onClick={showDeleteConfirm}
										>
											<FontAwesomeIcon icon={faTrash} />{' '}
											Delete Account
										</button>
									</div>
								</div>
								<div className='profile__info'>
									<div className='info__image'>
										<h3>
											{users
												? users.username
														.charAt(0)
														.toUpperCase()
												: 'No username'}
										</h3>
									</div>
									<div className='info__text'>
										<div className='user__active'>
											<p>
												{users
													? users.username
													: 'No username'}
											</p>
											<span>Active</span>
										</div>
										<h4>{users ? users.name : 'Guest'}</h4>
									</div>
								</div>
							</div>

							<Modal
								title='Confirm Account Deletion'
								open={isModalOpen}
								onOk={handleDeleteAccount}
								onCancel={() => setIsModalOpen(false)}
								okText='Yes, Delete'
								cancelText='Cancel'
							>
								<p>
									Are you sure you want to delete your account?
									This action cannot be undone.
								</p>
							</Modal>

							<Modal
								title='Create New Group'
								visible={isCreateGroupModalVisible}
								onOk={handleCreateGroup}
								onCancel={() => setIsCreateGroupModalVisible(false)}
								okText='Create'
								cancelText='Cancel'
							>
								<Form>
									<Form.Item label='Group Name'>
										<Input
											value={newGroupName}
											onChange={e =>
												setNewGroupName(
													e.target.value
												)
											}
											placeholder='Enter group name'
										/>
									</Form.Item>
								</Form>
							</Modal>
						</div>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}></Footer>
			</Layout>
		</Layout>
	);
};

export default Profile;
