/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ScreensStack} from './src/screens';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <ScreensStack />
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
