import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Linking, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import PasswordDialog from './PasswordDialog';

const buttons = [
  { title: 'Testimonios', image: require('../assets/icons/testimonios.png') },
  { title: 'Lecciones', image: require('../assets/icons/lecciones.png') },
  { title: 'Herramientas simples', image: require('../assets/icons/herramientas simples.png') },
  { title: 'Mapa Generacional', image: require('../assets/icons/mapa.png') },
  { title: 'Herramientas intensivas', image: require('../assets/icons/herramientas intensivas1.png') },
  { title: 'Recursos de\nentrenamiento', image: require('../assets/icons/recursos de entrenamiento.png') },
  { title: 'Información y Contactos', image: require('../assets/icons/informacion.png') },
];

export default function MainScreen() {
  const navigation = useNavigation();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handlePress = (buttonName) => {
    if (buttonName === 'Herramientas simples') {
      navigation.navigate('HerramientasSimples');
    } else if (buttonName === 'Lecciones') {
      navigation.navigate('Lecciones');
    } else if (buttonName === 'Mapa Generacional') {
      Linking.openURL('https://npl.genmapper.com/tools');
    } else if (buttonName === 'Información y Contactos') {
      navigation.navigate('Information');
    } else if (buttonName === 'Testimonios') {
      navigation.navigate('Testimonios');
    } else if (buttonName === 'Herramientas intensivas') {
      setShowPasswordDialog(true);
    }
  };

  const handlePasswordSubmit = (password) => {
    if (password === '12025') {
      setShowPasswordDialog(false);
      navigation.navigate('HerramientasIntensivas');
    }
  };

  const renderButton = (title, image) => (
    <TouchableOpacity key={title} onPress={() => handlePress(title)} style={styles.button}>
      <View style={{ alignItems: 'center' }}>
        <Image source={image} style={styles.image} />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {buttons.map((button) => renderButton(button.title, button.image))}
        </View>
      </View>
      <PasswordDialog
        isVisible={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onSubmit={handlePasswordSubmit}
      />
    </ImageBackground>
  );
}

