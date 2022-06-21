import React from 'react';
import {Image, Pressable, StyleSheet, Text} from "react-native";
import {colors} from "../colors";

export const AddListItemBtn = (props) => {
  const {createCard} = props;

  const createListItemData = {
    name: 'My Food Style',
    minPrice: null,
    maxPrice: null,
    locationTypeIds: [],
    locationCuisineTypeIds: [],
    dishTypeIds: [],
    courseTypeIds: [],
    dietIds: [],
    excludedIngredientIds: [],
  };

  return (
    <Pressable
      style={styles.addItemContainer}
      onPress={() => createCard(createListItemData)}>
      <Image source={require('../assets/images/add.png')} />
      <Text style={styles.addItemText}>New Food Style</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  addItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 6,
    paddingTop: 8,
    paddingBottom: 8,
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
    marginLeft: 18,
    marginRight: 18,
  },
  addItemText: {
    fontFamily: 'ProximaNovaA-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: colors.GREYISH_BROWN,
  },
});
