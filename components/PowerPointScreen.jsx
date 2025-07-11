import React, { useState } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Importamos todas las imágenes estáticamente
const lessonImages = {
 'Her 1: Mapa Relacional': [
    require('../assets/powerpoint/herramienta1/Imagen1.png'),
    require('../assets/powerpoint/herramienta1/Imagen2.png'),
    require('../assets/powerpoint/herramienta1/Imagen3.png'),
    require('../assets/powerpoint/herramienta1/Imagen4.png'),
    require('../assets/powerpoint/herramienta1/Imagen5.png'),
    require('../assets/powerpoint/herramienta1/Imagen6.png'),
    require('../assets/powerpoint/herramienta1/Imagen7.png'),
    require('../assets/powerpoint/herramienta1/Imagen8.png'),
    require('../assets/powerpoint/herramienta1/Imagen9.png'),
    require('../assets/powerpoint/herramienta1/Imagen10.png'),
    require('../assets/powerpoint/herramienta1/Imagen11.png'),
    require('../assets/powerpoint/herramienta1/Imagen12.png'),
    require('../assets/powerpoint/herramienta1/Imagen13.png'),
    require('../assets/powerpoint/herramienta1/Imagen14.png'),
  ],
  'Her 2: Casa de Paz': [
    require('../assets/powerpoint/herramienta2/Imagen1.png'),
    require('../assets/powerpoint/herramienta2/Imagen2.png'),
    require('../assets/powerpoint/herramienta2/Imagen3.png'),
    require('../assets/powerpoint/herramienta2/Imagen4.png'),
    require('../assets/powerpoint/herramienta2/Imagen5.png'),
    require('../assets/powerpoint/herramienta2/Imagen6.png'),
    require('../assets/powerpoint/herramienta2/Imagen7.png'),
    require('../assets/powerpoint/herramienta2/Imagen8.png'),
    require('../assets/powerpoint/herramienta2/Imagen9.png'),
    require('../assets/powerpoint/herramienta2/Imagen10.png'),
    require('../assets/powerpoint/herramienta2/Imagen11.png'),
    require('../assets/powerpoint/herramienta2/Imagen12.png'),
    require('../assets/powerpoint/herramienta2/Imagen13.png'),
    require('../assets/powerpoint/herramienta2/Imagen14.png'),
    require('../assets/powerpoint/herramienta2/Imagen15.png'),
    require('../assets/powerpoint/herramienta2/Imagen16.png'),
    require('../assets/powerpoint/herramienta2/Imagen17.png'),
    require('../assets/powerpoint/herramienta2/Imagen18.png'),
    require('../assets/powerpoint/herramienta2/Imagen19.png'),
    require('../assets/powerpoint/herramienta2/Imagen20.png'),
    require('../assets/powerpoint/herramienta2/Imagen21.png'),
    require('../assets/powerpoint/herramienta2/Imagen22.png'),
    require('../assets/powerpoint/herramienta2/Imagen23.png'),
  ],
  'Her 3: Testimonio 15s': [
    require('../assets/powerpoint/herramienta3/Imagen1.png'),
    require('../assets/powerpoint/herramienta3/Imagen2.png'),
    require('../assets/powerpoint/herramienta3/Imagen3.png'),
    require('../assets/powerpoint/herramienta3/Imagen4.png'),
    require('../assets/powerpoint/herramienta3/Imagen5.png'),
    require('../assets/powerpoint/herramienta3/Imagen6.png'),
    require('../assets/powerpoint/herramienta3/Imagen7.png'),
    require('../assets/powerpoint/herramienta3/Imagen8.png'),
    require('../assets/powerpoint/herramienta3/Imagen9.png'),
    require('../assets/powerpoint/herramienta3/Imagen10.png'),
    require('../assets/powerpoint/herramienta3/Imagen11.png'),
    require('../assets/powerpoint/herramienta3/Imagen12.png'),
    require('../assets/powerpoint/herramienta3/Imagen13.png'),
    require('../assets/powerpoint/herramienta3/Imagen14.png'),
    require('../assets/powerpoint/herramienta3/Imagen15.png'),
    require('../assets/powerpoint/herramienta3/Imagen16.png'),
  ],
  'Her 4: Los 3 Círculos': [
    require('../assets/powerpoint/herramienta4/Imagen1.png'),
    require('../assets/powerpoint/herramienta4/Imagen2.png'),
    require('../assets/powerpoint/herramienta4/Imagen3.png'),
    require('../assets/powerpoint/herramienta4/Imagen4.png'),
    require('../assets/powerpoint/herramienta4/Imagen5.png'),
    require('../assets/powerpoint/herramienta4/Imagen6.png'),
    require('../assets/powerpoint/herramienta4/Imagen7.png'),
    require('../assets/powerpoint/herramienta4/Imagen8.png'),
    require('../assets/powerpoint/herramienta4/Imagen9.png'),
    require('../assets/powerpoint/herramienta4/Imagen10.png'),
    require('../assets/powerpoint/herramienta4/Imagen11.png'),
    require('../assets/powerpoint/herramienta4/Imagen12.png'),
    require('../assets/powerpoint/herramienta4/Imagen13.png'),
    require('../assets/powerpoint/herramienta4/Imagen14.png'),
    require('../assets/powerpoint/herramienta4/Imagen15.png'),
    require('../assets/powerpoint/herramienta4/Imagen16.png'),
    require('../assets/powerpoint/herramienta4/Imagen17.png'),
    require('../assets/powerpoint/herramienta4/Imagen18.png'),
    require('../assets/powerpoint/herramienta4/Imagen19.png'),
    require('../assets/powerpoint/herramienta4/Imagen20.png'),
  ],
  'Her 5: El Semáforo': [
    require('../assets/powerpoint/herramienta5/Imagen1.png'),
    require('../assets/powerpoint/herramienta5/Imagen2.png'),
    require('../assets/powerpoint/herramienta5/Imagen3.png'),
    require('../assets/powerpoint/herramienta5/Imagen4.png'),
    require('../assets/powerpoint/herramienta5/Imagen5.png'),
    require('../assets/powerpoint/herramienta5/Imagen6.png'),
    require('../assets/powerpoint/herramienta5/Imagen7.png'),
    require('../assets/powerpoint/herramienta5/Imagen8.png'),
    require('../assets/powerpoint/herramienta5/Imagen9.png'),
    require('../assets/powerpoint/herramienta5/Imagen10.png'),
    require('../assets/powerpoint/herramienta5/Imagen11.png'),
    require('../assets/powerpoint/herramienta5/Imagen12.png'),
    require('../assets/powerpoint/herramienta5/Imagen13.png'),
    require('../assets/powerpoint/herramienta5/Imagen14.png'),
  ],
  'Her 6: El 4.1.1': [
    require('../assets/powerpoint/herramienta6/Imagen1.png'),
    require('../assets/powerpoint/herramienta6/Imagen2.png'),
    require('../assets/powerpoint/herramienta6/Imagen3.png'),
    require('../assets/powerpoint/herramienta6/Imagen4.png'),
    require('../assets/powerpoint/herramienta6/Imagen5.png'),
    require('../assets/powerpoint/herramienta6/Imagen6.png'),
    require('../assets/powerpoint/herramienta6/Imagen7.png'),
    require('../assets/powerpoint/herramienta6/Imagen8.png'),
    require('../assets/powerpoint/herramienta6/Imagen9.png'),
    require('../assets/powerpoint/herramienta6/Imagen10.png'),
    require('../assets/powerpoint/herramienta6/Imagen11.png'),
    require('../assets/powerpoint/herramienta6/Imagen12.png'),
    require('../assets/powerpoint/herramienta6/Imagen13.png'),
    require('../assets/powerpoint/herramienta6/Imagen14.png'),
    require('../assets/powerpoint/herramienta6/Imagen15.png'),
    require('../assets/powerpoint/herramienta6/Imagen16.png'),
    require('../assets/powerpoint/herramienta6/Imagen17.png'),
    require('../assets/powerpoint/herramienta6/Imagen18.png'),
    require('../assets/powerpoint/herramienta6/Imagen19.png'),
    require('../assets/powerpoint/herramienta6/Imagen20.png'),
    require('../assets/powerpoint/herramienta6/Imagen21.png'),
    require('../assets/powerpoint/herramienta6/Imagen22.png'),
    require('../assets/powerpoint/herramienta6/Imagen23.png'),
    require('../assets/powerpoint/herramienta6/Imagen24.png'),
    require('../assets/powerpoint/herramienta6/Imagen25.png'),
    require('../assets/powerpoint/herramienta6/Imagen26.png'),
  ],
  'Her 7: Los 3 Tercios': [
    require('../assets/powerpoint/herramienta7/Imagen1.png'),
    require('../assets/powerpoint/herramienta7/Imagen2.png'),
    require('../assets/powerpoint/herramienta7/Imagen3.png'),
    require('../assets/powerpoint/herramienta7/Imagen4.png'),
    require('../assets/powerpoint/herramienta7/Imagen5.png'),
    require('../assets/powerpoint/herramienta7/Imagen6.png'),
    require('../assets/powerpoint/herramienta7/Imagen7.png'),
    require('../assets/powerpoint/herramienta7/Imagen8.png'),
    require('../assets/powerpoint/herramienta7/Imagen9.png'),
    require('../assets/powerpoint/herramienta7/Imagen10.png'),
    require('../assets/powerpoint/herramienta7/Imagen11.png'),
    require('../assets/powerpoint/herramienta7/Imagen12.png'),
    require('../assets/powerpoint/herramienta7/Imagen13.png'),
    require('../assets/powerpoint/herramienta7/Imagen14.png'),
    require('../assets/powerpoint/herramienta7/Imagen15.png'),
    require('../assets/powerpoint/herramienta7/Imagen16.png'),
    require('../assets/powerpoint/herramienta7/Imagen17.png'),
    require('../assets/powerpoint/herramienta7/Imagen18.png'),
    require('../assets/powerpoint/herramienta7/Imagen19.png'),
    require('../assets/powerpoint/herramienta7/Imagen20.png'),
  ],
  'Her 8: El Círculo Saludable': [
    require('../assets/powerpoint/herramienta8/Imagen1.png'),
    require('../assets/powerpoint/herramienta8/Imagen2.png'),
    require('../assets/powerpoint/herramienta8/Imagen3.png'),
    require('../assets/powerpoint/herramienta8/Imagen4.png'),
    require('../assets/powerpoint/herramienta8/Imagen5.png'),
    require('../assets/powerpoint/herramienta8/Imagen6.png'),
    require('../assets/powerpoint/herramienta8/Imagen7.png'),
    require('../assets/powerpoint/herramienta8/Imagen8.png'),
    require('../assets/powerpoint/herramienta8/Imagen9.png'),
    require('../assets/powerpoint/herramienta8/Imagen10.png'),
    require('../assets/powerpoint/herramienta8/Imagen11.png'),
    require('../assets/powerpoint/herramienta8/Imagen12.png'),
    require('../assets/powerpoint/herramienta8/Imagen13.png'),
    require('../assets/powerpoint/herramienta8/Imagen14.png'),
    require('../assets/powerpoint/herramienta8/Imagen15.png'),
  ],
  'Her 9: Guía de la Mano Izquierda': [
    require('../assets/powerpoint/herramienta9/Imagen1.png'),
    require('../assets/powerpoint/herramienta9/Imagen2.png'),
    require('../assets/powerpoint/herramienta9/Imagen3.png'),
    require('../assets/powerpoint/herramienta9/Imagen4.png'),
    require('../assets/powerpoint/herramienta9/Imagen5.png'),
    require('../assets/powerpoint/herramienta9/Imagen6.png'),
    require('../assets/powerpoint/herramienta9/Imagen7.png'),
    require('../assets/powerpoint/herramienta9/Imagen8.png'),
    require('../assets/powerpoint/herramienta9/Imagen9.png'),
    require('../assets/powerpoint/herramienta9/Imagen10.png'),
    require('../assets/powerpoint/herramienta9/Imagen11.png'),
  ],
  'Her 10: 5 Niveles del Liderazgo': [
    require('../assets/powerpoint/herramienta10/Imagen1.png'),
    require('../assets/powerpoint/herramienta10/Imagen2.png'),
    require('../assets/powerpoint/herramienta10/Imagen3.png'),
    require('../assets/powerpoint/herramienta10/Imagen4.png'),
    require('../assets/powerpoint/herramienta10/Imagen5.png'),
    require('../assets/powerpoint/herramienta10/Imagen6.png'),
    require('../assets/powerpoint/herramienta10/Imagen7.png'),
    require('../assets/powerpoint/herramienta10/Imagen8.png'),
    require('../assets/powerpoint/herramienta10/Imagen9.png'),
    require('../assets/powerpoint/herramienta10/Imagen10.png'),
    require('../assets/powerpoint/herramienta10/Imagen11.png'),
    require('../assets/powerpoint/herramienta10/Imagen12.png'),
    require('../assets/powerpoint/herramienta10/Imagen13.png'),
    require('../assets/powerpoint/herramienta10/Imagen14.png'),
    require('../assets/powerpoint/herramienta10/Imagen15.png'),
  ],
  'Her 11: Hierro Sobre Hierro': [
    require('../assets/powerpoint/herramienta11/Imagen1.png'),
    require('../assets/powerpoint/herramienta11/Imagen2.png'),
    require('../assets/powerpoint/herramienta11/Imagen3.png'),
    require('../assets/powerpoint/herramienta11/Imagen4.png'),
    require('../assets/powerpoint/herramienta11/Imagen5.png'),
    require('../assets/powerpoint/herramienta11/Imagen6.png'),
    require('../assets/powerpoint/herramienta11/Imagen7.png'),
    require('../assets/powerpoint/herramienta11/Imagen8.png'),
    require('../assets/powerpoint/herramienta11/Imagen9.png'),
    require('../assets/powerpoint/herramienta11/Imagen10.png'),
    require('../assets/powerpoint/herramienta11/Imagen11.png'),
    require('../assets/powerpoint/herramienta11/Imagen12.png'),
    require('../assets/powerpoint/herramienta11/Imagen13.png'),
    require('../assets/powerpoint/herramienta11/Imagen14.png'),
    require('../assets/powerpoint/herramienta11/Imagen15.png'),
    require('../assets/powerpoint/herramienta11/Imagen16.png'),
    require('../assets/powerpoint/herramienta11/Imagen17.png'),
    require('../assets/powerpoint/herramienta11/Imagen18.png'),
    require('../assets/powerpoint/herramienta11/Imagen19.png'),
    require('../assets/powerpoint/herramienta11/Imagen20.png'),
    require('../assets/powerpoint/herramienta11/Imagen21.png'),
    require('../assets/powerpoint/herramienta11/Imagen22.png'),
    require('../assets/powerpoint/herramienta11/Imagen23.png'),
  ],
  'Her 12: MAOI': [
    require('../assets/powerpoint/herramienta12/Imagen1.png'),
    require('../assets/powerpoint/herramienta12/Imagen2.png'),
    require('../assets/powerpoint/herramienta12/Imagen3.png'),
    require('../assets/powerpoint/herramienta12/Imagen4.png'),
    require('../assets/powerpoint/herramienta12/Imagen5.png'),
    require('../assets/powerpoint/herramienta12/Imagen6.png'),
    require('../assets/powerpoint/herramienta12/Imagen7.png'),
    require('../assets/powerpoint/herramienta12/Imagen8.png'),
    require('../assets/powerpoint/herramienta12/Imagen9.png'),
    require('../assets/powerpoint/herramienta12/Imagen10.png'),
    require('../assets/powerpoint/herramienta12/Imagen11.png'),
    require('../assets/powerpoint/herramienta12/Imagen12.png'),
    require('../assets/powerpoint/herramienta12/Imagen13.png'),
    require('../assets/powerpoint/herramienta12/Imagen14.png'),
    require('../assets/powerpoint/herramienta12/Imagen15.png'),
  ],
  'Her 13: Descripción General': [
    require('../assets/powerpoint/herramienta13/Imagen1.png'),
    require('../assets/powerpoint/herramienta13/Imagen2.png'),
    require('../assets/powerpoint/herramienta13/Imagen3.png'),
    require('../assets/powerpoint/herramienta13/Imagen4.png'),
    require('../assets/powerpoint/herramienta13/Imagen5.png'),
    require('../assets/powerpoint/herramienta13/Imagen6.png'),
    require('../assets/powerpoint/herramienta13/Imagen7.png'),
    require('../assets/powerpoint/herramienta13/Imagen8.png'),
    require('../assets/powerpoint/herramienta13/Imagen9.png'),
    require('../assets/powerpoint/herramienta13/Imagen10.png'),
    require('../assets/powerpoint/herramienta13/Imagen11.png'),
    require('../assets/powerpoint/herramienta13/Imagen12.png'),
    require('../assets/powerpoint/herramienta13/Imagen13.png'),
    require('../assets/powerpoint/herramienta13/Imagen14.png'),
    require('../assets/powerpoint/herramienta13/Imagen15.png'),
    require('../assets/powerpoint/herramienta13/Imagen16.png'),
    require('../assets/powerpoint/herramienta13/Imagen17.png'),
    require('../assets/powerpoint/herramienta13/Imagen18.png'),
    require('../assets/powerpoint/herramienta13/Imagen19.png'),
    require('../assets/powerpoint/herramienta13/Imagen20.png'),
    require('../assets/powerpoint/herramienta13/Imagen21.png'),
    require('../assets/powerpoint/herramienta13/Imagen22.png'),
    require('../assets/powerpoint/herramienta13/Imagen23.png'),
    require('../assets/powerpoint/herramienta13/Imagen24.png'),
    require('../assets/powerpoint/herramienta13/Imagen25.png'),
    require('../assets/powerpoint/herramienta13/Imagen26.png'),
    require('../assets/powerpoint/herramienta13/Imagen27.png'),
    require('../assets/powerpoint/herramienta13/Imagen28.png'),
    require('../assets/powerpoint/herramienta13/Imagen29.png'),
    require('../assets/powerpoint/herramienta13/Imagen30.png'),
    require('../assets/powerpoint/herramienta13/Imagen31.png'),
    require('../assets/powerpoint/herramienta13/Imagen32.png'),
    require('../assets/powerpoint/herramienta13/Imagen33.png'),
    require('../assets/powerpoint/herramienta13/Imagen34.png'),
    require('../assets/powerpoint/herramienta13/Imagen35.png'),
  ],
};

export default function PowerPointScreen({ route }) {
  const { toolName } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);

  // Función para normalizar el nombre de la lección o herramienta
  const normalizeToolName = (name) => {
    // Elimina espacios y convierte a minúsculas
    return name.replace(/\s+/g, '').toLowerCase();
  };

  // Busca las imágenes correspondientes
  const images = Object.entries(lessonImages).find(([key]) => 
    normalizeToolName(key) === normalizeToolName(toolName)
  )?.[1] || [];

  const onPinchGestureEvent = ({ nativeEvent }) => {
    setScale(nativeEvent.scale);
  };

  const onPinchHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      setScale(1);
    }
  };

  const openFullScreenImage = (index) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  const closeFullScreenImage = () => {
    setModalVisible(false);
    setScale(1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <ImageBackground 
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
    <View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => openFullScreenImage(index)}>
            <Image
              source={image}
              style={styles.image}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeFullScreenImage}
      >
        <View style={styles.modalContainer}>
          <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={onPinchHandlerStateChange}
          >
            <Image
              source={images[currentImageIndex]}
              style={[styles.fullScreenImage, { transform: [{ scale }, { rotate: '90deg' }] }]}
              resizeMode="contain"
            />
          </PinchGestureHandler>
          <TouchableOpacity style={[styles.closeButton, { transform: [{ rotate: '90deg' }] }]} onPress={closeFullScreenImage}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.prevButton, { transform: [{ rotate: '90deg' }] }]} onPress={prevImage}>
            <Text style={styles.navButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.nextButton, { transform: [{ rotate: '90deg' }] }]} onPress={nextImage}>
            <Text style={styles.navButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    resizeMode:'cover',
  },
  scrollContent: {
    paddingVertical: 10,
  },
  image: {
    padding: 0,
    width: width - 20,
    height: (width - 20) * 0.56,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 6,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    backgroundColor: '#f0f0f0',
    width: height ,
    height: width ,
  },
  closeButton: {
    position: 'absolute',
    top: '91%',
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  prevButton: {
    position: 'absolute',
    left: '44%',
    top: '3%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    position: 'absolute',
    right: '44%',
    top: '91%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});