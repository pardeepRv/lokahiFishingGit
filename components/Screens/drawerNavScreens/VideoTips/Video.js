import React, { useState, useRef } from 'react'

import { View, Alert, StyleSheet, Text } from 'react-native'

import YoutubePlayer from 'react-native-youtube-iframe'

import { Icon } from 'react-native-elements'

export default VideoCard = props => {
	const [playing, setPlaying] = useState(false)

	const [isMute, setMute] = useState(false)

	const controlRef = useRef()

	const onStateChange = state => {
		if (state === 'ended') {
			setPlaying(false)

			Alert.alert('video has finished playing!')
		}

		if (state !== 'playing') {
			setPlaying(false)
		}
	}

	const togglePlaying = () => {
		setPlaying(prev => !prev)
	}

	const seekBackAndForth = control => {
		

		controlRef.current?.getCurrentTime().then(currentTime => {
			control === 'forward' ? controlRef.current?.seekTo(currentTime + 15, true) : controlRef.current?.seekTo(currentTime - 15, true)
		})
	}

	const muteVideo = () => setMute(!isMute)

	const ControlIcon = ({ name, onPress }) => <Icon onPress={onPress} name={name} size={40} color='#fff' />

	return (
		<View style={styles.container}>
			<Text style={{ color: 'white', fontSize: 18, marginVertical: 10, fontWeight: '700' }}>{props.name}</Text>
			<YoutubePlayer height={300} ref={controlRef} play={playing} mute={isMute} videoId={props.video} onChangeState={onStateChange} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		backgroundColor: '#2c385e',
	},

	controlContainer: {
		flexDirection: 'row',

		justifyContent: 'space-around',
	},
})
