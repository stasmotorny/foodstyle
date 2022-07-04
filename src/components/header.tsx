import React from 'react';
import { Image, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '@src/colors';

const screenHeight = Dimensions.get('screen').height;

const statusBarHeight = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight;

export const Header: React.FC = () => {
  const horizontalGradient = [colors.COLOR_GRADIENT_FROM, colors.COLOR_GRADIENT_TO];

  const verticalGradient = [
    colors.OPACITY_GRADIENT_FROM,
    colors.OPACITY_GRADIENT_FIRST_POINT,
    colors.OPACITY_GRADIENT_SECOND_POINT,
    colors.OPACITY_GRADIENT_TO,
  ];

  return (
    <LinearGradient
      colors={horizontalGradient}
      style={styles.linearGradient}
      locations={[0, 0.9995]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <StatusBar barStyle="light-content" />
      <Image source={require('../assets/images/logo.png')} />
      <LinearGradient
        colors={verticalGradient}
        style={styles.linearGradientInner}
        locations={[0, 0.5, 0.89, 0.995]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradientInner: {
    flex: 1,
    marginHorizontal: -18,
  },
  linearGradient: {
    height: screenHeight / 4.56,
    marginHorizontal: -18,
    paddingLeft: 36,
    paddingRight: 36,
    paddingTop: statusBarHeight ? statusBarHeight + 9 : 30 + 9,
  },
});
