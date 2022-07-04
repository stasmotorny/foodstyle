import React, { useState } from 'react';
import { Text, View, Alert, Modal, Image, StyleSheet, Pressable } from 'react-native';
import { colors } from '@src/colors';
import { ActionsApollo } from '@src/screens/actions/actionsApollo';

interface Props {
  text: string;
  id: string;
}

export const ListItem: React.FC<Props> = ({ text, id }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <Modal
        style={styles.modal}
        presentationStyle="overFullScreen"
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.cardContainer}>
            <Text style={styles.textStyle} numberOfLines={2}>
              {text}
            </Text>
            <Pressable onPress={() => setIsVisible(false)}>
              <Image source={require('../assets/images/close.png')} />
            </Pressable>
          </View>
          <ActionsApollo callback={(state: boolean) => setIsVisible(state)} id={id} />
        </View>
      </Modal>
      <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
        {text}
      </Text>
      <Pressable onPress={() => setIsVisible(true)}>
        <Image source={require('../assets/images/options.png')} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    paddingTop: 14,
    paddingBottom: 16,
    paddingLeft: 18,
    paddingRight: 15,
    backgroundColor: colors.WHITE,
    marginBottom: 6,
    shadowColor: colors.GREYISH_40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
  },
  textStyle: {
    width: '85%',
    fontFamily: 'ProximaNovaA-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    color: colors.GREYISH_BROWN,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.MODAL_BACKGROUND,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  modal: {
    flex: 1,
  },
});
