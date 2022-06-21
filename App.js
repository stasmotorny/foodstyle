import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useMutation, useLazyQuery, useReactiveVar} from '@apollo/client';
import {
  CREATE_CARD,
  LOG_IN,
} from './src/graphql/mutations';
import {token, itemsArray} from './src/graphql/reactiveVariables/index';
import {ListItem} from './src/components/listItem';
import {GET_LIST} from './src/graphql/queries';
import {colors} from './src/colors';
import {Header} from './src/components/header';
import {AddListItemBtn} from "./src/components/addListItemBtn";

const App = () => {
  const [login, {error: loginError, data: loginData}] = useMutation(
    LOG_IN,
    {
      variables: {
        email: 'dev225324@gmail.com',
        password: 'securePassword',
      },
    },
  );

  const [getCards, {data: cardsData, error: cardsError}] = useLazyQuery(
    GET_LIST,
    {fetchPolicy: 'no-cache'},
  );

  const [createCard, {error: createCardError, data: createCardData}] =
    useMutation(CREATE_CARD);

  const tokenReactiveVariable = useReactiveVar(token);
  const cardsReactiveVariable = useReactiveVar(itemsArray);

  useEffect(() => {
    try {
      login();
    } catch (e) {
      console.log('LOGIN_ERROR', loginError);
    }
  }, []);

  useEffect(() => {
    if (loginData) {
      token(loginData.loginWithEmail.accessToken);
    }
  }, [loginData]);

  useEffect(() => {
    if (tokenReactiveVariable) {
      try {
        getCards()
      } catch (e) {
        console.log('GET_CARDS_ERROR', cardsError);
      }
    }
  }, [tokenReactiveVariable]);

  useEffect(() => {
    itemsArray(cardsData?.cards);
  }, [cardsData]);

  const handleCreateCard = async data => {
    if (tokenReactiveVariable) {
      try {
        await createCard({
          variables: {
            name: data.name,
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            locationTypeIds: data.locationTypeIds,
            locationCuisineTypeIds: data.locationCuisineTypeIds,
            dishTypeIds: data.dishTypeIds,
            courseTypeIds: data.courseTypeIds,
            dietIds: data.dietIds,
            excludedIngredientIds: data.excludedIngredientIds,
          },
        });
      } catch (e) {
        console.log('CREATE_CARD_ERROR', createCardError);
      }
    }
  };

  useEffect(() => {
    if (createCardData) {
      try {
        getCards();
      } catch (e) {
        console.log('GET_CARDS_AFTER_CARD_CREATED_ERROR', cardsError);
      }
    }
  }, [createCardData]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollViewStyle}>
        {cardsReactiveVariable?.map(item => (
          <ListItem text={item.name} id={item.id} key={item.id}/>
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

export default App;
