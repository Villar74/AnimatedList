import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Contacts from './Contacts';
import ItemScreen from './Item/ItemScreen';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

export type RootStackParamList = {
  Contacts: undefined;
  ItemScreen: {
    item: {title: string; subtitle: string; picture: any; description: string};
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Основной навигатор с путями
 * @returns {JSX.Element}
 * @constructor
 */
export const ScreensStack: React.FC = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Contacts">
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{title: 'Contacts'}}
        />
        <Stack.Screen
          name="ItemScreen"
          component={ItemScreen}
          options={({route}) => ({title: route.params.item.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
