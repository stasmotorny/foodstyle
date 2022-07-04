import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  GestureResponderEvent,
} from 'react-native';
import { colors } from '@src/colors';

interface Props {
  callback: (event: GestureResponderEvent) => void;
  icon: ImageSourcePropType;
  type: string;
}

export const ActionsView: React.FC<Props> = ({ callback, type, icon }) => (
  <Pressable style={styles.cardAction} onPress={callback} testID="pressable">
    <Text style={styles.actionText}>{type}</Text>
    <Image source={icon} />
  </Pressable>
);

const styles = StyleSheet.create({
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'ProximaNovaA-Regular',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.GREEN_TEAL,
  },
});
