import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground 
    source={require('../assets/icons/fondo1.jpg')} 
    style={styles.container}
  >
    <ImageBackground 
      source={require('../assets/icons/background.png')} 
      style={styles.fondo}
    >
      <View style={styles.content}>
       <Image  source={require('../assets/icons/logoBlanco.png')} style={styles.image}/>
      
        <Text style={styles.welcomeText}>Movimiento de Alcance Mundial</Text>
      </View>
    </ImageBackground>
    <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fondo:{
    width:'100%',
    height:'110%',
  },
  image:{
    top:70,
    width: 250,
    height:250,
  },
  content: {
    alignItems: 'center',
    marginBottom: 450,
  },
  welcomeText: {
    fontFamily: 'Lora-Bold',
    textTransform: 'capitalize', 
    top:70,
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#228BE6',
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop:10,
    borderRadius: 10,
    width: '33%',
    alignItems: 'center',
    position: 'absolute',
    bottom: '25%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  buttonText: {
    fontFamily: 'Lora-Bold',
    color: 'white',
    fontSize: 24,
  },
});