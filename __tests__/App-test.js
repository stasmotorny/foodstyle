/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { CREATE_CARD, DELETE_CARD, DUPLICATE_CARD, LOG_IN, SHARE_CARD } from '../src/graphql/mutations';
import { GET_LIST } from '../src/graphql/queries';
import App from '../src/App';
import { AddListItemBtn } from '../src/components/addListItemBtn.tsx';
import {render, fireEvent} from '@testing-library/react-native';
import { ActionsView } from '../src/screens/actions/actionsView';

const mocks = [
  {
    request: {
      query: LOG_IN,
      variables: {
        email: 'dev225324@gmail.com',
        password: 'securePassword',
      },
    },
    result: {
      user: {
        id: 1,
        email: 'dev225324@gmail.com',
        name: 'dev',
        facebookId: null,
        googleId: null,
        appleId: null,
      },
      accessToken: '1234567890qwerty',
      refreshToken: '1234567890qwerty',
    },
  },
  {
    request: {
      query: GET_LIST,
    },
    result: {
      cards: {
        id: 0,
        name: 'card',
      },
    },
  },
  {
    request: {
      query: CREATE_CARD,
      variables: {
        name: 'My Food Style',
        minPrice: null,
        maxPrice: null,
        locationTypeIds: [],
        locationCuisineTypeIds: [],
        dishTypeIds: [],
        courseTypeIds: [],
        dietIds: [],
        excludedIngredientIds: [],
      },
    },
    result: {
      cards: {
        id: 0,
        name: 'card',
      },
    },
  },
];

const actionsMocks = [
  {
    request: {
      query: SHARE_CARD,
      variables: {
        id: '1'
      },
    },
  },
  {
    request: {
      query: DUPLICATE_CARD,
      variables: {
        id: '1'
      },
    },
    result: {
      id: 0,
      name: 'card',
    },
  },
  {
    request: {
      query: DELETE_CARD,
      variables: {
        id: '1'
      },
    },
  },
];

// eslint-disable-next-line no-undef
jest.useFakeTimers();

// eslint-disable-next-line no-undef
it('App renders correctly', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );
});

// eslint-disable-next-line no-undef
it('Button renders correctly', () => {
  const tree = renderer.create(<AddListItemBtn createCard={() => console.log('Good')} />).toJSON();
  expect(tree).toMatchSnapshot();
});

configure({ adapter: new Adapter() });
it('Callback fires on duplicate press', () => {
  const mockOnPress = jest.fn();
  const component = render(
    <MockedProvider mocks={actionsMocks} addTypename={false}>
      <ActionsView id={'1'} type={'Duplicate'} callback={() => mockOnPress()} />
    </MockedProvider>
  );
  const pressable = component.getByTestId('pressable');
  fireEvent.press(pressable);
  expect(mockOnPress).toHaveBeenCalled();
});
