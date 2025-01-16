import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../../Constants/images'
import { ThameFont } from '../../Constants/theme'


const dumyData = [
  {
    id:1,
    title: 'Name of the PDF or any other Document',
    image: images.data
  }
]

const renderItem = ({item})=>(
  <View style={{flexDirection:'row', height:80, width:'90%', justifyContent:'space-between', marginHorizontal:'5%', marginTop:'10%', padding:5, borderRadius:30, borderWidth:4, borderColor:'#001F3F'}}>
    <View style={{justifyContent:'center',width:'50%'}}>
      <Text style={{fontSize:15, fontFamily:ThameFont.PrimaryMeduim}}>{item.title}</Text>
    </View>
    <View style={{position:'absolute', right:0, paddingHorizontal:10}}>
      <Image source={item.image} style={{width:60, height:70, borderRadius:40,}}/>
    </View>
  </View>
)

const DownloadScreen = () => {
  return (
      <SafeAreaView style={{backgroundColor:'white', height:'100%', width:'100%'}}>
        <View style={{backgroundColor:'#B9E5E8', height:'95%', width:'95%', marginHorizontal:10, marginTop:10, borderRadius:30, borderWidth:4, borderColor:'#001F3F'}}>
          <FlatList 
          data={dumyData}
          renderItem={renderItem}
          keyExtractor={(item=> item.id)}
          />
        </View>
      </SafeAreaView>
  )
}

export default DownloadScreen

const styles = StyleSheet.create({})