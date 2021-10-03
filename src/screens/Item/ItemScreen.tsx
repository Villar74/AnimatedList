import * as React from 'react';

import {Image, View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import ItemRow from './ItemRow';
import {useTheme} from 'react-native-paper';

/**
 * Item Screen
 * @param route
 * @constructor
 */
const ItemScreen = ({route}) => {
  const {item} = route.params;
  const {colors} = useTheme();

  return (
    <View
      testId={'itemScreen'}
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headContainer}>
        <Title>{item?.title}</Title>
        <Image source={item.picture} style={styles.image} />
      </View>
      <ItemRow title={'Role'} desc={item.subtitle} />
      <ItemRow title={'About me'} desc={item.description} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  image: {height: 64, width: 64},
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ItemScreen;
