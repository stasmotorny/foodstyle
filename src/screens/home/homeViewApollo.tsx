import React, { useEffect } from 'react';
import { HomeViewContainer } from '@src/screens/home/homeViewContainer';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { CREATE_CARD } from '@src/graphql/mutations';
import { GET_LIST } from '@src/graphql/queries';
import { itemsArray, token } from '@src/graphql/reactiveVariables';

interface Data {
  name: string;
  minPrice: null;
  maxPrice: null;
  locationTypeIds: [];
  locationCuisineTypeIds: [];
  dishTypeIds: [];
  courseTypeIds: [];
  dietIds: [];
  excludedIngredientIds: [];
}

export const HomeViewApollo: React.FC = () => {
  const tokenReactiveVariable = useReactiveVar(token);

  const [createCard, { error: createCardError, data: createCardData }] = useMutation(CREATE_CARD);

  const [getCards, { data: cardsData, error: cardsError }] = useLazyQuery(GET_LIST, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (tokenReactiveVariable) {
      try {
        getCards();
      } catch (e) {
        console.log('GET_CARDS_ERROR', cardsError);
      }
    }
  }, [tokenReactiveVariable]);

  useEffect(() => {
    itemsArray(cardsData?.cards);
  }, [cardsData]);

  useEffect(() => {
    if (createCardData) {
      try {
        getCards();
      } catch (e) {
        console.log('GET_CARDS_AFTER_CARD_CREATED_ERROR', cardsError);
      }
    }
  }, [createCardData]);

  const handleCreateCard = async (data: Data) => {
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
  };

  return <HomeViewContainer createCard={handleCreateCard} />;
};
