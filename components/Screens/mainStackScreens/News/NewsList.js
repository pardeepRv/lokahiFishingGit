import React, { useEffect, useContext, useState, useRef } from 'react';
import {View, StyleSheet,   Dimensions, Text, SafeAreaView, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'
import Modal from 'react-native-modal'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NewsList = (props) => {
  const [modalVisible, setModalVisible]= useState(false)
  const modal = i => {
    setModalVisible(true);
  };
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={modal}>
       <Card wrapperStyle={{flexDirection:'row', width: windowWidth * .8, flexWrap: 'wrap'}} containerStyle={{borderRadius:20, width: windowWidth * .9, justifyContent: 'center', alignItems: 'center',}}>
        <Card.Image source={require('../../../../media/images/loginLogo.png')} alt="image" style={{width: 50, height: 50,}} />
   <Text style={{ width:190, left:24,  fontSize:18, color:'black'}}>{props.name}</Text>
</Card>
      </TouchableOpacity>
<Modal
             animationInTiming={500}
             animationOutTiming={500}
      animationOut="slideOutLeft"
      transparent={true}
      isVisible={modalVisible}
      backdropColor = 'rgba(52, 52, 52, 0.2)'
      backdropOpacity= {0.9}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
     

      hasBackdrop = {true}
    >

      <View style={styles.centeredView}>
      <Pressable
            style={{backgroundColor: 'rgba(52, 52, 52, 0.7)'}}
            onPressOut={() => setModalVisible(!modalVisible)}
            hitSlop = {{ bottom: 1, left: 300, right: 300, top: 300 }}
          >
            <Text></Text>

          </Pressable>
        <View style={styles.modalView}>
        <View style={{
      justifyContent: 'flex-start',
      width: 39,
      marginTop:'10%', alignItems:'flex-start', alignSelf:'flex-start', alignContent:'flex-start', }}>
        <Pressable
            style={{position: 'absolute', left: 0}}
            onPressOut={() => setModalVisible(!modalVisible)}
            hitSlop = {{ bottom: 50, left: 55, right: 55, top: 55 }}
          >
          <Icon
  name='arrow-back-outline'
  type='ionicon'
  containerStyle={{marginTop: 4,}}
/>
          </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: "center",
      alignItems: "center",}}>
        <View style ={{marginBottom: 25, justifyContent:'center', alignItems:'center', marginTop:55}}>
        <Text style={{ 
      textAlign: "center",
      fontSize:24, marginBottom:20}}>{props.name}</Text>
          <Text style={styles.modalText}>{props.body}</Text>
        </View>
          </ScrollView>
        </View>
        <View>
      <Pressable
           style={{backgroundColor: 'rgba(52, 52, 52, 0.7)'}}
            onPressOut={() => setModalVisible(!modalVisible)}
           hitSlop = {{ bottom: 150, left: 300, right: 300, top: 1 }}
          >
            <Text style ={{color: 'white'}}></Text>
          </Pressable>
      </View>
      </View>
    </Modal> 
    </SafeAreaView>
  );
};
export default NewsList;
const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: '90%',
    marginLeft: 20,
  },
  cardStyle: {marginTop: 20, height: 100},
  peopleNeedStyle: {
    backgroundColor: '#274BDB',
    width: 80,
    color: 'white',
    marginTop: 20,
    marginBottom: -20,
    paddingLeft: 8,
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'rgba(52, 52, 52, 0.7)',
    height:windowHeight,
    // width: windowWidth,
   elevation:19
  },
  modalView: {
    marginTop:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    width: windowWidth ,
    height: windowHeight * 1.01,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 19
  },
  modalText: {
    marginTop: 8,
    width: windowWidth * 0.8,
    marginBottom:25,
    fontSize:14,
    textAlign: "left",
  },
});




