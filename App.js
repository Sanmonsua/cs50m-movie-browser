import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen' 
import MovieScreen from './screens/MovieScreen'


const Stack = createStackNavigator()

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SearchScreen">
          <Stack.Screen 
            name="SearchScreen" 
            component={SearchScreen} 
            options={{headerShown:false}}
          />
          <Stack.Screen 
            name="ResultsScreen" 
            component={ResultsScreen} 
            options={({route}) => ({
              headerTitle : route.params.results + " results for '" + route.params.search + "'" 
            })}
          />
          <Stack.Screen  options={({route}) => ({headerTitle:'', headerStyle:{backgroundColor:route.params.colors[0], elevation: 0,
shadowOpacity: 0}})} name="MovieScreen" component={MovieScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

