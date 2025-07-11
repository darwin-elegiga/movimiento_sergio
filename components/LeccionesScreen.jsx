import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const lecciones = [
  'Leccion 1: Bosquejo del Entrenamiento',
  'Leccion 2: Gran Visión Global',
  'Leccion 3: Gran Visión Local',
  'Leccion 3A: Método Espada',
  'Leccion 4: Panorama 4 Campos',
];

export default function LeccionesScreen() {
  const navigation = useNavigation();

  const handlePress = (leccion) => {
    const lessonNumber = lecciones.indexOf(leccion) + 1;
    const lessonScreens = {
      1: 'Leccion1',
      2: 'Leccion2',
      3: 'Leccion3',
      4: 'Leccion3A',
      5: 'Leccion4'
    };
    navigation.navigate(lessonScreens[lessonNumber], { showOnlyNewContent: true });
  };

  return (
    <ImageBackground 
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
      <View>
        <View style={styles.buttonContainer}>
          {lecciones.map((leccion, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.button} 
              onPress={() => handlePress(leccion)}
            >
              <Image source={require('../assets/icons/lecciones.png')} style={styles.buttonImage} />
              <Text style={styles.buttonText}>{leccion}</Text>
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

