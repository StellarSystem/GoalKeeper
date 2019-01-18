import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import NewCategoryScreen from '../screens/NewCategory';
import CategoryDetailsScreen from '../screens/CategoryDetails';
/*
export default class AppNavigator extends React.Component{
  render(){
    return(
      <AppStackNav />
    );
  }

}*/

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Home:  createStackNavigator({screen: HomeScreen}),
  NewCategory: createStackNavigator({screen: NewCategoryScreen}),
  CategoryDetails: createStackNavigator({screen: CategoryDetailsScreen}),
});
