import { View,StyleSheet,Alert } from "react-native"
import OutlinedButton from "../../UI/OutlinedButton"
import { Colors } from "../../constants/colors"
import { getCurrentPositionAsync,useForegroundPermissions,PermissionStatus } from "expo-location"
import { useNavigation } from "@react-navigation/native"

const LocationPicker = () => {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    const navigation=useNavigation()

    async function verifyPermissions(){
        if(locationPermissionInformation.status===PermissionStatus.UNDETERMINED){

            const permissioResponse=await requestPermission()
      
            return permissioResponse.granted
          }
      
          if(locationPermissionInformation.status===PermissionStatus.DENIED){
            Alert.alert('Insufficient Permission!','You need to grant location permission to use this app.')
            return false;
          }
          return true
    }

    async function getLocationHandler(){
        const hasPermission = await verifyPermissions()

        if(!hasPermission){
            return;
        }

       const location= await getCurrentPositionAsync()
       console.log(location)
    }

    function pickOnMapHandler(){
        navigation.navigate('Map')
    }

  return (
    <View>
        <View style={styles.mapPreview}>

        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
        </View>
    </View>
  )
}

export default LocationPicker

const styles=StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    }
})