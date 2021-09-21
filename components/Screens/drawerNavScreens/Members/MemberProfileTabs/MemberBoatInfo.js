import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, ImageBackground } from 'react-native'
import LokahiLogo from '../../../../../media/images/LokahiLogo.png'
import firestore from '@react-native-firebase/firestore'
import { MemberContext } from '../../../../../context/MemberContext/memberProvider'

const MemberBoatInfo = () => {
	const [imgIsLoading, setImgIsLoading] = useState(false)
	const [boatName, setBoatName] = useState()
	const [boatImg, setBoatImg] = useState()

	const { selectedMember } = useContext(MemberContext)

	useEffect(() => {
		firestore()
			.collection('Users')
			.doc(selectedMember.uid)
			.collection('Boats')
			.limit(1)
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					// console.log(doc.id, '=>', doc.data());
					const { Image } = doc.data()
					setBoatImg(Image)
				})
			})
	}, [])

	return (
		<View style={styles.BoatInfo}>
			{!boatImg ? (
				<View style={styles.logoView}>
					<Text style={styles.boatName}>{boatName ? boatName : 'Boat name not given'}</Text>
					<Image source={LokahiLogo} style={styles.logo} />
				</View>
			) : (
				<ImageBackground
					style={imgIsLoading ? { display: 'none' } : styles.boatImg}
					source={{ uri: boatImg }}
					onLoadStart={() => setImgIsLoading(true)}
					onLoadEnd={() => setImgIsLoading(false)}
				>
					<View style={styles.nameView}>
						<Text style={styles.boatName}>{boatName}</Text>
					</View>
				</ImageBackground>
			)}
			<ActivityIndicator size='large' color='#ffffff' animating={imgIsLoading} style={imgIsLoading ? null : { display: 'none' }} />
		</View>
	)
}

export default MemberBoatInfo

const styles = StyleSheet.create({
	BoatInfo: {
		height: '100%',
		width: '100%',
		backgroundColor: '#2c385e',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoView: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	logo: {
		marginLeft: 5,
		height: '90%',
		width: '90%',
		resizeMode: 'contain',
	},
	boatImg: {
		height: '100%',
		width: '100%',
		borderRadius: 10,
		resizeMode: 'cover',
		display: 'flex',
		alignItems: 'center',
	},
	boatName: {
		color: '#fff',
		fontSize: 24,
		fontWeight: '600',
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 2,
		marginTop: 20,
		zIndex: 1000,
	},
})
