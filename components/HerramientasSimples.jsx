import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/icons/campo 1.png'),
  require('../assets/icons/campo 2.png'), 
  require('../assets/icons/campo 4.png'),
  require('../assets/icons/campo 3.png'),
  require('../assets/icons/campo 5.png'), 
];

const buttonNames = [
  'Campo Vacio',
  'Evangelismo',
  'Formación de Iglesias',
  'Discipulado',
];

const additionalTexts = [
  'Preparar la tierra',
  'Siembra',
  'Cosecha',
  'Crecimiento',
  'Liderazgo\nDesarrollo\nMultiplicar',
];

const toolSets = {
  1: ['Herramienta 1 \n Mapa Relacional', 'Herramienta 2 \n  Persona/Casa de Paz'],
  2: ['Herramienta\n 3 \n Testimonio 15s', 'Herramienta \n4 \n Los 3 Circulos', 'Herramienta\n 5 \n El Semáforo'],
  3: ['Herramienta 8 \n El Círculo saludable', 'Herramienta 9 \n Gia de la Mano Izquierda'],
  4: ['Herramienta 6 \n EL 4.1.1', 'Herramienta 7 \n Los 3 Tercios'],
  5: ['Herramienta 10 \n los 5 Niveles del Liderazgo', 'Herramienta 11 \n Hierro Sobre Hierro', 'Herramienta 12 \n MAOI', 'Herramienta 13\n Dinámica de la multiplicación'],
};

export default function HerramientasSimples() {
  const navigation = useNavigation();

  const handlePress = (buttonNumber) => {
    const tools = toolSets[buttonNumber];
    navigation.navigate('Tools', { tools, toolNumber: buttonNumber });
  };

  return (
    <ImageBackground 
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
    <View>
      <View style={styles.buttonContainer}>
        {images.map((image, index) => (
          <TouchableOpacity 
            key={index} 
            style={index === 4 ? styles.centerButton : styles.button} 
            onPress={() => handlePress(index + 1)}>
            {index === 4 ? (
              <View style={styles.centerContent}>
                <Image source={image} style={styles.centerImage} />
                <Text style={styles.overlayText}>{additionalTexts[index]}</Text>
                <Text style={styles.buttonText}>{buttonNames[index]}</Text>
              </View>
            ) : (
              <View style={styles.content}>
                <Text style={styles.buttonText}>{additionalTexts[index]}</Text>
                <Image source={image} style={styles.buttonImage} />
                <Text style={styles.buttonText}>{buttonNames[index]}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    top: -60,
    width: width * 0.9,
    height: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    width: width * 0.42,
    height: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  centerButton: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    transform: [{ translateX: -width * 0.15 }, { translateY: -width * 0.15 }],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  content: {
    alignItems: 'center',
  },
  centerContent: {
    alignItems: 'center',
    position: 'relative',
  },
  buttonImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  centerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    top:10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Lora-SemiBold',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#333',
  },
  overlayText: {
    position: 'absolute',
    top: '64%', // Ajustar según sea necesario
    left: '56%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    textAlign: 'center',
    color: '#000', // Cambiar color según necesidad
    fontSize: 14,
    fontFamily: 'Lora-SemiBold',
    textTransform: 'capitalize',
  },
});