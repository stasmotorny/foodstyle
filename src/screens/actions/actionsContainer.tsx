import React, { useEffect } from 'react';
import { Alert, Share } from 'react-native';
import { Item, itemsArray } from '@src/graphql/reactiveVariables';
import { ActionsView } from './actionsView';

interface Props {
  type: string;
  mutation: Function;
  id: string;
  // eslint-disable-next-line react/require-default-props
  shareResult?: string;
  callback: Function;
}

export const ActionsContainer: React.FC<Props> = ({
  type,
  mutation,
  id,
  shareResult = undefined,
  callback,
}) => {
  useEffect(() => {
    if (shareResult) {
      shareMessage(shareResult);
    }
  }, [shareResult]);

  const shareMessage = async (url: string) => {
    const options = {
      title: 'Share',
      url: `https://cards.foodstyles.com/${url}`,
    };
    await Share.share(options);
  };

  const handleSharePress = async () => {
    await mutation();
  };

  const handleDuplicatePress = async () => {
    const items = itemsArray();
    const duplicateItem = items.find((item: { id: string }) => item.id === id);
    const newItem = { ...duplicateItem };
    const lastItemIndex = parseInt(items[items.length - 1].id, 10) + 1;
    newItem.name = `Duplicate of ${newItem.name}`;
    newItem.id = lastItemIndex.toString();
    itemsArray([...itemsArray(), newItem as Item]);
    callback(false);
    await mutation();
  };

  const onDeleteCard = async () => {
    const cardsAfterDelete = itemsArray().filter((item: { id: string }) => item.id !== id);
    itemsArray(cardsAfterDelete);
    callback(false);
    await mutation();
  };

  const handleDeletePress = () => {
    Alert.alert('Confirm delete', 'This will delete the Food Style and all its settings.', [
      {
        text: 'Delete',
        onPress: () => onDeleteCard(),
        style: 'destructive',
      },
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
    ]);
  };

  const action = (typeArgument: string) => {
    if (typeArgument === 'Share') {
      return handleSharePress;
    }
    if (typeArgument === 'Duplicate') {
      return handleDuplicatePress;
    }
    return handleDeletePress;
  };

  const icon = (typeArgument: string) => {
    if (typeArgument === 'Share') {
      return require('../../assets/images/share.png');
    }
    if (typeArgument === 'Duplicate') {
      return require('../../assets/images/duplicate.png');
    }
    return require('../../assets/images/delete.png');
  };

  return <ActionsView callback={action(type)} icon={icon(type)} type={type} />;
};
