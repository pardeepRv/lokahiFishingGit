import { createStore, createHook } from 'react-sweet-state';

const Store = createStore({
	initialState: {
		user: null,
	},
	actions: {
		login:
			user =>
			({ setState }) => {
				setState({ user });
			},
		logout:
			() =>
			({ setState }) => {
				setState({ user: null });
			},
	},
	name: 'authStore',
});

export const useAuth = createHook(Store);
