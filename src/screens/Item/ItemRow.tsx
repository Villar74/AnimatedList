import * as React from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

/**
 * Row item
 * @param title
 * @param desc
 * @constructor
 */
const ItemRow = ({title, desc}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, {color: colors.primary}]}>
        {title + ': '}
      </Text>
      <Text style={[styles.sectionDescription]}>
        {desc || 'No ' + title + ' data'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: '400',
    width: 300,
  },
});

export default ItemRow;
