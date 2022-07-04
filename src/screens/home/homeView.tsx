import { Header } from '@components/header';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ListItem } from '@components/listItem';
import { AddListItemBtn } from '@components/addListItemBtn';
import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { itemsArray } from '@src/graphql/reactiveVariables';

interface Props {
  handleCreateCard: Function;
}

export const HomeView: React.FC<Props> = ({ handleCreateCard }) => {
  const cardsReactiveVariable = useReactiveVar(itemsArray);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollViewStyle}>
        {cardsReactiveVariable?.map((item) => (
          <ListItem text={item.name} id={item.id} key={item.id} />
        ))}
      </ScrollView>
      <AddListItemBtn createCard={handleCreateCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewStyle: {
    paddingHorizontal: 18,
    marginTop: -70,
  },
});
