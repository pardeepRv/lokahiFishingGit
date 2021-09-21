import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, Modal, Pressable, Dimensions, TouchableOpacity } from 'react-native'
import Logo from '../../../../media/images/LokahiLogo.png'
import RightArrow from 'react-native-vector-icons/MaterialIcons'
import { useState } from 'react'
import Pdf from 'react-native-pdf'
import { format } from 'date-fns'

const TournamentItem = props => {
	const [modalVisible, setModalVisible] = useState(false)
	const { item } = props

	return (
		<SafeAreaView style={styles.TournamentItem}>
			<TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.pressableContent}>
				<View style={styles.icontext}>
					<Image source={Logo} style={styles.logo} />
					<View style={styles.titleDateView}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.date}>{format(new Date(item.postedDate.toDate()), 'MMMM dd, yyyy')}</Text>
					</View>
				</View>
				<RightArrow name='keyboard-arrow-right' size={30} color='#BEBEBE' />
			</TouchableOpacity>
			<Modal animationType='slide' visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)} presentationStyle='pageSheet'>
				<SafeAreaView style={styles.modal}>
					<View>
						<View style={styles.backBtnView}>
							<TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.backBtn}>
								<RightArrow name='keyboard-arrow-left' size={46} color='#147fff' />
								<Text style={styles.backBtnText}>Tournaments</Text>
							</TouchableOpacity>
						</View>
						<Text style={styles.modalTitle}>{item.title}</Text>
					</View>
					<Pdf source={{ uri: item.pdf }} style={styles.pdf} loading='Loading PDF...' />
				</SafeAreaView>
			</Modal>
		</SafeAreaView>
	)
}

export default TournamentItem

const styles = StyleSheet.create({
	TournamentItem: {
		marginBottom: 10,
	},
	pressableContent: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	icontext: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	logo: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	titleDateView: {
		maxWidth: '70%',
		marginLeft: 10,
	},
	title: {
		fontSize: 18,
	},
	date: {
		fontSize: 14,
		fontWeight: '200',
	},
	modal: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width * 0.9,
	},
	backBtnView: {
		width: Dimensions.get('window').width,
	},
	backBtn: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		marginLeft: -5,
		width: '40%',
	},
	backBtnText: {
		fontSize: 17,
		marginLeft: -10,
		color: '#147fff',
	},
	modalTitle: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 15,
	},
})
