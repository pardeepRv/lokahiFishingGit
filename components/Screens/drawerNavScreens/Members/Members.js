import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Dimensions, ImageBackground, FlatList, TextInput } from 'react-native'
import SingleMember from './SingleMember'
import { MemberContext } from '../../../../context/MemberContext/memberProvider'
import filter from 'lodash.filter'
import { SegmentedControls } from 'react-native-radio-buttons'
import { SearchBar } from 'react-native-elements';
const members = () => {
	const { membersList } = useContext(MemberContext)
	const [query, setQuery] = useState('')
	const [data, setData] = useState(membersList)
	const [fullData, setFullData] = useState(membersList)
	const [filterOption, setFilterOption] = useState('Date Joined')
	const [ascDescOption, setAscDescOption] = useState('desc')

	const filterOptions = ['Username', 'Date Joined', 'Full Name']
	const ascDescOptions = ['asc', 'desc']

	// useEffect(() => {
	// 	console.log('data.length', data.length)
	// 	console.log('query', query)
	// })

	useEffect(() => {
		if (filterOption === 'Username' && ascDescOption === 'asc') {
			data.sort((a, b) => (a.username < b.username ? 1 : -1))
		} else if (filterOption === 'Username' && ascDescOption === 'desc') {
			data.sort((a, b) => (a.username > b.username ? 1 : -1))
		} else if (filterOption === 'Date Joined' && ascDescOption === 'asc') {
			data.sort((a, b) => (a.joinDate > b.joinDate ? 1 : -1))
		} else if (filterOption === 'Date Joined' && ascDescOption === 'desc') {
			data.sort((a, b) => (a.joinDate < b.joinDate ? 1 : -1))
		} else if (filterOption === 'Full Name' && ascDescOption === 'asc') {
			data.sort((a, b) => (a.fullname < b.fullname ? 1 : -1))
		} else if (filterOption === 'Full Name' && ascDescOption === 'desc') {
			data.sort((a, b) => (a.fullname > b.fullname ? 1 : -1))
		} else {
			return null
		}
	}, [filterOption, ascDescOption])

	const handleSearch = text => {
		setQuery(text)
		const formattedQuery = text.toLowerCase()
		const data = filter(fullData, user => {
			return contains(user, formattedQuery)
		})
		// setQuery(text)
		setData(data)
	}

	const contains = ({ username, fullname }, query) => {
		if (username.toLowerCase().includes(query) || fullname.toLowerCase().includes(query)) {
			return true
		}
		return false
	}

	const SearchBar = () => {
		return (
			<View style={styles.searchView}>
				<View style={styles.searchBarView}>
					<TextInput
						style={styles.searchInput}
						onChangeText={text => handleSearch(text)}
						value={query}
						textStyle={{ color: '#000' }}
						placeholder='Search Members'
						clearButtonMode='always'
						textAlign='left'
					/>
		
				</View>
				<View style={styles.filterView}>
					<SegmentedControls
						options={filterOptions}
						onSelection={setFilterOption}
						selectedOption={filterOption}
						tint='#fafafa'
						backTint='#858585'
						allowFontScaling={ false }
						containerStyle={{ width: '70%', marginHorizontal: 5 }}
					/>
					<SegmentedControls
						options={ascDescOptions}
						allowFontScaling={ false }
						onSelection={setAscDescOption}
						selectedOption={ascDescOption}
						tint='#fafafa'
						backTint='#858585'
						containerStyle={{ width: '20%', marginHorizontal: 5 }}
					/>
				</View>
			</View>
		)
	}

	return (
		<View>
			<ImageBackground source={require('../../../../media/images/signup_bg.png')} style={styles.bgImg}>
				<View style={styles.content}>
					
					<View style={styles.scrollViewContainer}>
						<FlatList
						keyExtractor={item => item}
							data={data}
							keyExtractor={item => item.id}
							renderItem={({ item }) => <SingleMember member={item} filterOption={filterOption} />}
							ListHeaderComponent={<View style={styles.searchView}>
							<View style={styles.searchBarView}>
								<TextInput
									style={styles.searchInput}
									onChangeText={text => handleSearch(text)}
									value={query}
									textStyle={{ color: '#000' }}
									placeholder='Search Members'
									clearButtonMode='always'
									textAlign='left'
								/>
					
							</View>
							<View style={styles.filterView}>
								<SegmentedControls
									options={filterOptions}
									onSelection={setFilterOption}
									selectedOption={filterOption}
									tint='#fafafa'
									backTint='#858585'
									allowFontScaling={ false }
									containerStyle={{ width: '70%', marginHorizontal: 5 }}
								/>
								<SegmentedControls
									options={ascDescOptions}
									allowFontScaling={ false }
									onSelection={setAscDescOption}
									selectedOption={ascDescOption}
									tint='#fafafa'
									backTint='#858585'
									containerStyle={{ width: '20%', marginHorizontal: 5 }}
								/>
							</View>
						</View>}
						/>
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}

export default members

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	bgImg: {
		width: windowWidth,
		height: windowHeight,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		position: 'absolute',
		top: windowHeight * 0.11,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollViewContainer: {
		flex: 1,
		height: windowHeight * 0.89,
		marginBottom: 20,
	},
	searchView: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchBarView: {
		backgroundColor: '#fff',
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'snow',
		marginBottom: 10,
		width: windowWidth * 0.95,
		borderRadius: 7,
	},
	searchInput: {
		backgroundColor: '#fff',
		width: '100%',
		paddingHorizontal: 10,
	},
	filterView: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	sortText: {
		color: '#fafafa',
		fontSize: 18,
		fontWeight: '500',
	},
})
