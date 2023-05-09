import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './UI/IconButton';

const Stack=createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
         <Stack.Screen name='AllPlaces' component={AllPlaces} options={({navigation})=>({
          title:"Your Favorite Places",
          headerRight:({tintColor})=> (<IconButton icon="add" size={24} color={tintColor} onPress={()=>navigation.navigate('AddPlace')} />)
         })}/>
         <Stack.Screen name='AddPlace' component={AddPlace} options={{
          title:"Your Favorite Places",
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </> 
  );
}

const styles = StyleSheet.create({
  
});
