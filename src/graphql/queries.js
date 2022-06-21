import {gql} from '@apollo/client';

export const GET_LIST = gql`
  query getCards {
    cards {
      id
      name
    }
  }
`;
