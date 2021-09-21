import React, { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export const PhotoSharingContext = createContext({});

export const PhotoSharingProvider = ({ children }) => {
	const [test, setTest] = useState('HELLOWORLD');

	return (
		<PhotoSharingContext.Provider
			value={{
				test,
			}}
		>
			{children}
		</PhotoSharingContext.Provider>
	);
};
