import * as React from 'react';
import {StyleSheet, Dimensions, Alert, View, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
export const ICON_MAX_HEIGHT = width / 5;

export const MAX_HEIGHT = height - ICON_MAX_HEIGHT - 60;

interface Item {
  title: string;
  subtitle: string;
  description: string;
}

interface ItemProps {
  index: number;
  item: Item;
}

const Item = ({item: {title, subtitle, description}}: ItemProps) => {
  const [surname, ...name] = title.split(' ');
  const {colors} = useTheme();

  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert('Pressed!')}>
      <Animated.View style={[styles.container]}>
        <View style={styles.titleContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={[styles.surname, {color: colors.text}]}>
              {surname}{' '}
            </Text>
            <Text style={[styles.name, {color: colors.text}]}>
              {name.join(' ')}
            </Text>
          </View>
          <Text style={[styles.subtitle, {color: colors.text}]}>
            {subtitle}
          </Text>
          <Text style={[styles.about, {color: colors.text}]}>About me</Text>
          <Text style={[styles.description, {color: colors.text}]}>
            {description}
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: MAX_HEIGHT,
  },
  surname: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  name: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  titleContainer: {
    paddingTop: MAX_HEIGHT * 0.03,
    justifyContent: 'flex-start',
    flex: 1,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  description: {
    paddingTop: 8,
    paddingHorizontal: 24,
    color: 'white',
    fontSize: 14,
  },
  about: {
    paddingTop: 24,
    paddingHorizontal: 24,
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Item;
