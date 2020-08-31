import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'


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
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

