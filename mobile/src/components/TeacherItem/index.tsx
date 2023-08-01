import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, Image, Linking, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';
import { Teacher } from '../../types/teacher';
import styles from './styles';

interface TeacherItemProps {
  teacher: Teacher;
  favorite: boolean;
}

const TeacherItem = ({ teacher, favorite }: TeacherItemProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);

  const handleCreateConnections: () => Promise<void> = async () => {
    await api.post('connections', {
      user_id: teacher.id
    }).catch(error => console.log(error));
  }

  const handleLinkToWhatsapp: () => Promise<void> = async () => {
    const url = `whatsapp://send?phone=${teacher.whatsapp}`;

    await Linking.canOpenURL(url).then(supported => {
      if (supported) {
        handleCreateConnections();

        Linking.openURL(url);
      } else {
        Alert.alert(
          'Alert',
          'WhatsApp is not installed',
        )
      }
    });
  }

  const handleToggleFavorite: () => Promise<void> = async () => {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorite) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorite(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorite(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Price/Hour {'   '}
          <Text style={styles.priceValue}>{teacher.cost} €</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton,
              isFavorite ? styles.favorite : {}
            ]}
          >
            {isFavorite
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>
          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Get in touch</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;