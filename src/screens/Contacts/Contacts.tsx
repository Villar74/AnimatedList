import * as React from 'react';

import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import Item, {MAX_HEIGHT as ITEM_MAX_HEIGHT, ICON_MAX_HEIGHT} from './Item';
import {items} from './Model';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../index';
import {useTheme} from 'react-native-paper';

const {width} = Dimensions.get('window');

/**
 * Contacts screen
 * @constructor
 */
const Contacts: React.FC = () => {
  const iconScroll = useAnimatedRef();
  const itemScroll = useAnimatedRef();
  const isScrollingIcon = useSharedValue(false);
  const isScrollingItem = useSharedValue(false);
  const cellIndex = useSharedValue(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {colors} = useTheme();

  const onScrollItem = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y: value}}) => {
      if (isScrollingItem.value) {
        scrollTo(
          iconScroll,
          value / (ITEM_MAX_HEIGHT / ICON_MAX_HEIGHT),
          0,
          true,
        );
      }
    },
    onBeginDrag: () => {
      isScrollingItem.value = true;
      isScrollingIcon.value = false;
    },
  });
  const onScrollIcon = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x: value}}) => {
      if (isScrollingIcon.value) {
        scrollTo(
          itemScroll,
          0,
          value * (ITEM_MAX_HEIGHT / ICON_MAX_HEIGHT),
          true,
        );
      }
      cellIndex.value = Math.round(value / ICON_MAX_HEIGHT);
    },
    onBeginDrag: () => {
      isScrollingIcon.value = true;
      isScrollingItem.value = false;
    },
  });

  const iconPressed = (index: number) => {
    if (cellIndex.value === index) {
      navigation.navigate('ItemScreen', {item: items[index]});
    } else {
      iconScroll.current.scrollTo({
        x: index * ICON_MAX_HEIGHT,
        y: 0,
        animated: true,
      });
      itemScroll.current.scrollTo({
        x: 0,
        y: index * ITEM_MAX_HEIGHT,
        animated: true,
      });
      cellIndex.value = index;
    }
  };

  return (
    <View testId={'contacts'} style={{backgroundColor: colors.background}}>
      <Animated.ScrollView
        contentContainerStyle={styles.iconScrollView}
        ref={iconScroll}
        onScroll={onScrollIcon}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        scrollEventThrottle={16}
        snapToInterval={ICON_MAX_HEIGHT}>
        <Animated.View style={styles.iconsContainer}>
          {items.map((item, index) => {
            const uas = useAnimatedStyle(() => {
              const style: {
                borderWidth?: number;
                borderColor?: string;
                borderRadius?: number;
              } = {};
              if (cellIndex.value === index) {
                style.borderWidth = 3;
                style.borderColor = 'white';
                style.borderRadius = ICON_MAX_HEIGHT / 2;
              } else {
                style.borderWidth = 0;
                style.borderColor = 'white';
                style.borderRadius = ICON_MAX_HEIGHT / 2;
              }
              return style;
            });
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => iconPressed(index)}>
                <Animated.View
                  testId={'icon_' + index}
                  style={[styles.iconContainer]}>
                  <Animated.Image
                    source={item.picture}
                    style={[styles.picture, uas]}
                  />
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </Animated.View>
      </Animated.ScrollView>
      <Animated.ScrollView
        ref={itemScroll}
        onScroll={onScrollItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_MAX_HEIGHT}>
        <Animated.View style={styles.container}>
          {items.map((item, index) => (
            <Item item={item} key={index} index={index} />
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: items.length * ITEM_MAX_HEIGHT,
  },
  iconScrollView: {
    paddingHorizontal: width / 2.5,
    paddingVertical: 16,
  },
  iconsContainer: {height: ICON_MAX_HEIGHT, flexDirection: 'row'},
  iconContainer: {
    width: ICON_MAX_HEIGHT,
    height: ICON_MAX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 58,
    height: 58,
  },
});

export default Contacts;
