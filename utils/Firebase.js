import firebase from '@react-native-firebase/firestore'
import uuid from 'uuid'

const Firebase = {
	uploadPost: post => {
		const id = uuid.v4()
		const uploadData = {
			id: id,
			postPhoto: post.photo,
			postDescription: post.description,
			likes: [],
		}
		return firebase.firestore().collection('Posts').doc(id).set(uploadData)
	},
	getPosts: () => {
		return firebase
			.firestore()
			.collection('Posts')
			.get()
			.then(function (querySnapshot) {
				let posts = querySnapshot.docs.map(doc => doc.data())
				// console.log(posts)
				return posts
			})
			.catch(function (error) {
				console.log('Error getting documents: ', error)
			})
	},
}

export default Firebase
