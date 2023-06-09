import MapView, {Marker,PROVIDER_GOOGLE} from "react-native-maps"
import { StyleSheet,Alert } from "react-native"
import { useCallback, useLayoutEffect, useState } from "react"
import IconButton from "../UI/IconButton"


const Map = ({navigation}) => {

    const [selectLocation, setSelectLocation] = useState()

    const region={
        latitude:38.356869,
        longitude:38.309669,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    }

    function selectLocationHandler(event){
      const lat=event.nativeEvent.coordinate.latitude
      const lng = event.nativeEvent.coordinate.longitude

      setSelectLocation({lat:lat,lng:lng})
    }

    const savePickedLocationHandler= useCallback(()=>{
      if(!selectLocation){
        Alert.alert('No location picked!','You have to pick a location (by tapping on the map) first!')
        return;
      }
      navigation.navigate('AddPlace',{pickedLocation:selectLocation})
    },[navigation,selectLocation])

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerRight:({tintColor})=>(<IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler}/>)
      })
    },[navigation,savePickedLocationHandler])

    const MapScreen = () => {
      const disableDoubleClickZoom = (e) => {
        if (e.nativeEvent.action === 'doubleClick') {
          e.stopPropagation();
        }
      }}
      

  return (
    <MapView 
    provider={PROVIDER_GOOGLE}
    onPress={selectLocationHandler} style={styles.map} initialReagion={region}>
      {selectLocation && <Marker
      title="Picked Location"
      coordinate={{latitude:selectLocation.lat,longitude:selectLocation.lng}}/>}
    </MapView>
  )
}

export default Map

const styles=StyleSheet.create({
  map:{
    flex:1
  }
})