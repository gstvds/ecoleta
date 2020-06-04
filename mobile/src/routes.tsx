import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();

const Routes = () => (
  <NavigationContainer>
    <AppStack.Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: '#F0F0F5' } }} >
      <AppStack.Screen component={Home} name="Home" />
      <AppStack.Screen component={Points} name="Points" />
      <AppStack.Screen component={Detail} name="Detail" />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default Routes;
