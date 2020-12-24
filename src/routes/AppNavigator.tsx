import React, {useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Users, Tasks, SaveTask} from '../scenes';
import {AppContext, appReducers, initializers} from '../hooks/';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Users" component={Users} />
      <MainStack.Screen name="Tasks" component={Tasks} />
    </MainStack.Navigator>
  );
};

const AppNavigator = () => {
  const _reducers = useReducer(appReducers, initializers);

  return (
    <AppContext.Provider value={_reducers}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackNavigator}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="SaveTask"
            component={SaveTask}
            options={{
              cardOverlayEnabled: true,
              cardStyle: {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
              },
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default AppNavigator;
