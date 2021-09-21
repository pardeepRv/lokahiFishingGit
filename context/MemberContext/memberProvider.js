import React, { createContext, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

export const MemberContext = createContext({})

export const MemberProvider = ({ children }) => {
	const [selectedMember, setSelectedMember] = useState({})
	const [membersList, setMembersList] = useState([])
	const [boatImg, setBoatImg] = useState('BOAT IMG')
	const [selectedPhoto, setSelectedPhoto] = useState({})
	const [isFilterVisible, setIsFilterVisible] = useState(false)

	const userRef = firestore().collection('Users')

	useEffect(() => {
		userRef.get().then(querySnapshot => {
			const membersArr = []
			querySnapshot.forEach(doc => {
				const { User_Id, User_Image, User_JoinDT, User_Name, fullname, User_Email, User_CellPhone, CML, city, island, image, tokens } = doc.data()

				membersArr.push({
					id: User_Id,
					image: User_Image,
					joinDate: User_JoinDT,
					username: User_Name,
					fullname: fullname,
					uid: doc.id,
					email: User_Email,
					phone: User_CellPhone,
					CML: CML,
					city: city,
					island: island,
					tokens: tokens,
				})
				setMembersList(membersArr)
			})
		})
	}, [])

	return (
		<MemberContext.Provider
			value={{
				selectedMember,
				setSelectedMember,
				membersList,
				setMembersList,
				selectedPhoto,
				setSelectedPhoto,
				isFilterVisible,
				setIsFilterVisible,
			}}
		>
			{children}
		</MemberContext.Provider>
	)
}
