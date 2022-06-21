import {gql} from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUpWithEmail(
    $name: NonEmptyString!
    $email: EmailAddress!
    $password: Password!
  ) {
    signUpWithEmail(name: $name, email: $email, password: $password) {
      user {
        id
        email
        name
        facebookId
        googleId
        appleId
      }
      accessToken
      refreshToken
    }
  }
`;

export const LOG_IN = gql`
  mutation sendLogInWithEmail(
    $email: EmailAddress!
    $password: NonEmptyString!
  ) {
    loginWithEmail(email: $email, password: $password) {
      user {
        id
        email
        name
        facebookId
        googleId
        appleId
      }
      accessToken
      refreshToken
    }
  }
`;

export const CREATE_CARD = gql`
  mutation sendCreateCard(
    $name: NonEmptyString!
    $minPrice: Int
    $maxPrice: Int
    $locationTypeIds: [ID!]!
    $locationCuisineTypeIds: [ID!]!
    $dishTypeIds: [ID!]!
    $courseTypeIds: [ID!]!
    $dietIds: [ID!]!
    $excludedIngredientIds: [ID!]!
  ) {
    createCard(
      data: {
        name: $name
        minPrice: $minPrice
        maxPrice: $maxPrice
        locationTypeIds: $locationTypeIds
        locationCuisineTypeIds: $locationCuisineTypeIds
        dishTypeIds: $dishTypeIds
        courseTypeIds: $courseTypeIds
        dietIds: $dietIds
        excludedIngredientIds: $excludedIngredientIds
      }
    ) {
      id
      name
    }
  }
`;

export const SHARE_CARD = gql`
  mutation sendShareCard($id: ID!) {
    shareCard(id: $id)
  }
`;

export const DUPLICATE_CARD = gql`
  mutation sendDuplicateCard($id: ID!) {
    duplicateCard(id: $id) {
      id
      name
    }
  }
`;

export const DELETE_CARD = gql`
  mutation sendDeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;
