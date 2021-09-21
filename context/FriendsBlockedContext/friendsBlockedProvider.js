import React, { createContext, useEffect, useState, useContext } from 'react'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../authProvider'
import { MemberContext } from '../MemberContext/memberProvider'
import {useRoute} from '@react-navigation/native';
export const FriendsBlockedContext = createContext({})

export const FriendsBlockedProvider = ({ children }) => {
	const { user } = useContext(AuthContext)
	const { membersList } = useContext(MemberContext)
	const [friendsList, setFriendsList] = useState([])
	// const [friendsReqList, setFriendsReqList] = useState([])
	const [blockedList, setBlockedList] = useState([])
	const userId = user ? user.user.uid : null


	// const friendsReqRef = firestore().collection('Users').doc(userId).collection('Received_Friend_Requests').get()
	const friendsRef = firestore().collection('Users').doc(userId).collection('Friends').get()
	const blockedRef = firestore().collection('Users').doc(userId).collection('Blocked_Users').get()

	// useEffect(() => {
	// 	friendsReqRef.then(res => {
	// 		let friendsReqList = []

	// 		res.forEach(doc => {
	// 			friendsReqList.push(doc)
	// 		})
	// 		setFriendsReqList(friendsReqList)
	// 	})
	// }, [user, friendsReqList])

	useEffect(() => {
		friendsRef.then(res => {
			let friends = []

			membersList.map(member => {
				res.forEach(doc => {
					if (member.id === doc.data().User_Id) {
						friends.push(member)
					}
				})
			})

			setFriendsList(friends)
		})
	}, [user, friendsList])

	useEffect(() => {
		blockedRef.then(res => {
			let blockedUsers = []

			membersList.map(member => {
				res.forEach(doc => {
					if (member.id === doc.data().User_Id) {
						blockedUsers.push(member)
					}
				})
			})
			setBlockedList(blockedUsers)
		})
	}, [user, blockedList])

	return (
		<FriendsBlockedContext.Provider
			value={{
				friendsList,
				blockedList,
				// friendsReqList,
			}}
		>
			{children}
		</FriendsBlockedContext.Provider>
	)
}
