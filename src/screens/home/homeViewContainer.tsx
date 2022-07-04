import React from 'react';
import { HomeView } from '@src/screens/home/homeView';

interface Props {
  createCard: Function;
}

export const HomeViewContainer: React.FC<Props> = ({ createCard }) => (
  <HomeView handleCreateCard={createCard} />
);
