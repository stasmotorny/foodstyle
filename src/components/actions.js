import React, {useEffect} from 'react';
import {Text, Alert, Share, Image, StyleSheet, Pressable} from 'react-native';
import {useMutation} from '@apollo/client';
import {
  SHARE_CARD,
  DUPLICATE_CARD,
  DELETE_CARD,
} from '../graphql/mutations';
import {itemsArray} from '../graphql/reactiveVariables/index';
import {colors} from '../colors';

export const Actions = props => {
  const {callback, id, type} = props;

  const [shareCard, {error: shareCardError, data: shareCardData}] = useMutation(
    SHARE_CARD,
    {
      variables: {
        id,
      },
    },
  );

  const [duplicateCard, {error: duplicateCardError, data: duplicateCardData}] =
    useMutation(DUPLICATE_CARD, {
      variables: {
        id,
      },
    });

  const [deleteCard, {error: deleteCardError}] =
    useMutation(DELETE_CARD, {
      variables: {
        id,
      },
    });

  const shareMessage = async url => {
    const options = {
      title: 'Share',
      url: `https://cards.foodstyles.com/${url}`,
    };
    await Share.share(options);
  };

  const handleSharePress = async () => {
    try {
      await shareCard();
    } catch (e) {
      console.log('SHARE_ERROR', shareCardError);
    }
  };

  useEffect(() => {
    if (shareCardData) {
      shareMessage(shareCardData.shareCard);
    }
  }, [shareCardData]);

  const handleDuplicatePress = async () => {
    try {
      const items = itemsArray();
      const duplicateItem = items.find((item) => item.id === id);
      const newItem = {...duplicateItem};
      const lastItemIndex = parseInt(items[items.length - 1].id, 10) + 1;
      newItem.name = `Duplicate of ${newItem.name}`;
      newItem.id = lastItemIndex.toString();
      itemsArray([...itemsArray(), newItem]);
      await duplicateCard();
    } catch (e) {
      console.log('DUPLICATE_ERROR', e);
    }
  };

  const onDeleteCard = async () => {
    try {
      const cardsAfterDelete = itemsArray().filter(item => item.id !== id);
      itemsArray(cardsAfterDelete);
      await deleteCard();
    } catch (e) {
      console.log('DELETE_CARD_ERROR', deleteCardError);
    }

  };

  const handleDeletePress = () => {
    Alert.alert(
      'Confirm delete',
      'This will delete the Food Style and all its settings.',
      [
        {
          text: 'Delete',
          onPress: () => onDeleteCard(),
          style: 'destructive',
          color: 'red',
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ],
    );
  };

  const action = async () => {
    if (type === 'Share') {
      await handleSharePress();
    }
    if (type === 'Duplicate') {
      await handleDuplicatePress();
      callback();
    }
    if (type === 'Delete') {
      handleDeletePress();
      callback();
    }
  };

  const icon = () => {
    if (type === 'Share') {
      return <Image source={require('../assets/images/share.png')} />;
    }
    if (type === 'Duplicate') {
      return <Image source={require('../assets/images/duplicate.png')} />;
    }
    if (type === 'Delete') {
      return <Image source={require('../assets/images/delete.png')} />;
    }
  };

  return (
    <Pressable style={styles.cardAction} onPress={action}>
      <Text style={styles.actionText}>{type}</Text>
      {icon()}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'ProximaNovaA-Regular',
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: colors.GREEN_TEAL,
  },
});
