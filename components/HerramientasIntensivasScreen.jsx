import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const herramientasIntensivas = [
  'H.I 1: El Filtro',
  'H.I 2: Mapa Generacional',
  'H.I 3: Hierro con Hierro',
  'H.I 4: Manos Guías',
  'H.I 5: Los 3 Toques en 3 Días',
  'H.I 6: Proceso para Entrenar Iglesias',
  'H.I 7: Las 4 Etapas de un Movimiento',
  'H.I 8: Efesios 4:11',
  'H.I 9: Los 3 Viajes Misioneros de Pablo',
  'H.I 10: La Misión de Dios de Génesis a Apocalipsis',
  'H.I 11: Herramienta 1-3-9',
  'H.I 12: Para quien es este Entrenamiento',
  'H.I 13: Principios para Entrenar',
  'H.I 14: Entrenamiento y Enseñanzas',
];

export default function HerramientasIntensivasScreen() {
  const navigation = useNavigation();

  const handlePress = (herramienta) => {
    const herramientaNumber = herramienta.split(':')[0].replace('H.I ', '');
    navigation.navigate(`HerramientaIntensiva${herramientaNumber}`, { showOnlyNewContent: true });
  };

  return (
    <ImageBackground 
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.buttonContainer}>
          {herramientasIntensivas.map((herramienta, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.button} 
              onPress={() => handlePress(herramienta)}>
              <Image source={require('../assets/icons/herramientas intensivas1.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>{herramienta}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '45%',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: 'Lora-SemiBold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

