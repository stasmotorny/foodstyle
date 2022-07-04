import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActionsContainer } from '@src/screens/actions/actionsContainer';
import { useMutation } from '@apollo/client';
import { DELETE_CARD, DUPLICATE_CARD, SHARE_CARD } from '@src/graphql/mutations';

interface Props {
  id: string;
  callback: Function;
}

export const ActionsApollo: React.FC<Props> = ({ id, callback }) => {
  const [shareCard, { error: shareCardError, data: shareCardData }] = useMutation(SHARE_CARD, {
    variables: {
      id,
    },
  });

  const [duplicateCard, { error: duplicateCardError }] = useMutation(DUPLICATE_CARD, {
    variables: {
      id,
    },
  });

  const [deleteCard, { error: deleteCardError }] = useMutation(DELETE_CARD, {
    variables: {
      id,
    },
  });

  const handleShareCard = async () => {
    try {
      await shareCard();
    } catch (e) {
      console.log('SHARE_CARD_ERROR', shareCardError);
    }
  };

  const handleDuplicateCard = async () => {
    try {
      await duplicateCard();
    } catch (e) {
      console.log('DUPLICATE_CARD_ERROR', duplicateCardError);
    }
  };

  const handleDeleteCard = async () => {
    try {
      await deleteCard();
    } catch (e) {
      console.log('DELETE_CARD_ERROR', deleteCardError);
    }
  };

  return (
    <View style={styles.actionsContainer}>
      <ActionsContainer
        type="Delete"
        mutation={() => handleDeleteCard()}
        id={id}
        callback={(state: boolean) => callback(state)}
      />
      <ActionsContainer
        type="Duplicate"
        mutation={() => handleDuplicateCard()}
        id={id}
        callback={(state: boolean) => callback(state)}
      />
      <ActionsContainer
        type="Share"
        mutation={() => handleShareCard()}
        id={id}
        shareResult={shareCardData?.shareCard}
        callback={(state: boolean) => callback(state)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
