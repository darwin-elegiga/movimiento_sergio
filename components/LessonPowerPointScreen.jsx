import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const lessonImages = {
  'Leccion1: Bosquejo del Entrenamiento': [
    require('../assets/powerpoint/leccion1/Imagen1.png'),
    require('../assets/powerpoint/leccion1/Imagen2.png'),
    require('../assets/powerpoint/leccion1/Imagen3.png'),
    require('../assets/powerpoint/leccion1/Imagen4.png'),
    require('../assets/powerpoint/leccion1/Imagen5.png'),
    require('../assets/powerpoint/leccion1/Imagen6.png'),
    require('../assets/powerpoint/leccion1/Imagen7.png'),
    require('../assets/powerpoint/leccion1/Imagen8.png'),
    require('../assets/powerpoint/leccion1/Imagen9.png'),
    require('../assets/powerpoint/leccion1/Imagen10.png'),
  ],
  'Leccion2: Gran Visión Global': [
    require('../assets/powerpoint/leccion2/Imagen1.png'),
    require('../assets/powerpoint/leccion2/Imagen2.png'),
    require('../assets/powerpoint/leccion2/Imagen3.png'),
    require('../assets/powerpoint/leccion2/Imagen4.png'),
    require('../assets/powerpoint/leccion2/Imagen5.png'),
    require('../assets/powerpoint/leccion2/Imagen6.png'),
    require('../assets/powerpoint/leccion2/Imagen7.png'),
    require('../assets/powerpoint/leccion2/Imagen8.png'),
    require('../assets/powerpoint/leccion2/Imagen9.png'),
    require('../assets/powerpoint/leccion2/Imagen10.png'),
    require('../assets/powerpoint/leccion2/Imagen11.png'),
    require('../assets/powerpoint/leccion2/Imagen12.png'),
    require('../assets/powerpoint/leccion2/Imagen13.png'),
    require('../assets/powerpoint/leccion2/Imagen14.png'),
    require('../assets/powerpoint/leccion2/Imagen15.png'),
    require('../assets/powerpoint/leccion2/Imagen16.png'),
    require('../assets/powerpoint/leccion2/Imagen17.png'),
    require('../assets/powerpoint/leccion2/Imagen18.png'),
    require('../assets/powerpoint/leccion2/Imagen19.png'),
    require('../assets/powerpoint/leccion2/Imagen20.png'),
    require('../assets/powerpoint/leccion2/Imagen21.png'),
    require('../assets/powerpoint/leccion2/Imagen22.png'),
    require('../assets/powerpoint/leccion2/Imagen23.png'),
    require('../assets/powerpoint/leccion2/Imagen24.png'),
    require('../assets/powerpoint/leccion2/Imagen25.png'),
    require('../assets/powerpoint/leccion2/Imagen26.png'),
    require('../assets/powerpoint/leccion2/Imagen27.png'),
    require('../assets/powerpoint/leccion2/Imagen28.png'),
    require('../assets/powerpoint/leccion2/Imagen29.png'),
    require('../assets/powerpoint/leccion2/Imagen30.png'),
    require('../assets/powerpoint/leccion2/Imagen31.png'),
    require('../assets/powerpoint/leccion2/Imagen32.png'),
    require('../assets/powerpoint/leccion2/Imagen33.png'),
    require('../assets/powerpoint/leccion2/Imagen34.png'),
    require('../assets/powerpoint/leccion2/Imagen35.png'),
    require('../assets/powerpoint/leccion2/Imagen36.png'),
    require('../assets/powerpoint/leccion2/Imagen37.png'),
    require('../assets/powerpoint/leccion2/Imagen38.png'),
    require('../assets/powerpoint/leccion2/Imagen39.png'),
    require('../assets/powerpoint/leccion2/Imagen40.png'),
    require('../assets/powerpoint/leccion2/Imagen41.png'),
    require('../assets/powerpoint/leccion2/Imagen42.png'),
    require('../assets/powerpoint/leccion2/Imagen43.png'),
  ],
  'Leccion3: Gran Visión Local': [
    require('../assets/powerpoint/leccion3/Imagen1.png'),
    require('../assets/powerpoint/leccion3/Imagen2.png'),
    require('../assets/powerpoint/leccion3/Imagen3.png'),
    require('../assets/powerpoint/leccion3/Imagen4.png'),
    require('../assets/powerpoint/leccion3/Imagen5.png'),
    require('../assets/powerpoint/leccion3/Imagen6.png'),
    require('../assets/powerpoint/leccion3/Imagen7.png'),
    require('../assets/powerpoint/leccion3/Imagen8.png'),
    require('../assets/powerpoint/leccion3/Imagen9.png'),
    require('../assets/powerpoint/leccion3/Imagen10.png'),
    require('../assets/powerpoint/leccion3/Imagen11.png'),
    require('../assets/powerpoint/leccion3/Imagen12.png'),
    require('../assets/powerpoint/leccion3/Imagen13.png'),
    require('../assets/powerpoint/leccion3/Imagen14.png'),
    require('../assets/powerpoint/leccion3/Imagen15.png'),
    require('../assets/powerpoint/leccion3/Imagen16.png'),
    require('../assets/powerpoint/leccion3/Imagen17.png'),
    require('../assets/powerpoint/leccion3/Imagen18.png'),
  ],
 'Leccion3A: Método Espada': [
    require('../assets/powerpoint/leccion3a/Imagen1.png'),
    require('../assets/powerpoint/leccion3a/Imagen2.png'),
    require('../assets/powerpoint/leccion3a/Imagen3.png'),
    require('../assets/powerpoint/leccion3a/Imagen4.png'),
    require('../assets/powerpoint/leccion3a/Imagen5.png'),
    require('../assets/powerpoint/leccion3a/Imagen6.png'),
    require('../assets/powerpoint/leccion3a/Imagen7.png'),
    require('../assets/powerpoint/leccion3a/Imagen8.png'),
    require('../assets/powerpoint/leccion3a/Imagen9.png'),
    require('../assets/powerpoint/leccion3a/Imagen10.png'),
    require('../assets/powerpoint/leccion3a/Imagen11.png'),
    require('../assets/powerpoint/leccion3a/Imagen12.png'),
    require('../assets/powerpoint/leccion3a/Imagen13.png'),
    require('../assets/powerpoint/leccion3a/Imagen14.png'),
    require('../assets/powerpoint/leccion3a/Imagen15.png'),
    require('../assets/powerpoint/leccion3a/Imagen16.png'),
    require('../assets/powerpoint/leccion3a/Imagen17.png'),
    require('../assets/powerpoint/leccion3a/Imagen18.png'),
    require('../assets/powerpoint/leccion3a/Imagen19.png'),
    require('../assets/powerpoint/leccion3a/Imagen20.png'),
    require('../assets/powerpoint/leccion3a/Imagen21.png'),
    require('../assets/powerpoint/leccion3a/Imagen22.png'),
    require('../assets/powerpoint/leccion3a/Imagen23.png'),
    require('../assets/powerpoint/leccion3a/Imagen24.png'),
    require('../assets/powerpoint/leccion3a/Imagen25.png'),
    require('../assets/powerpoint/leccion3a/Imagen26.png'),
    require('../assets/powerpoint/leccion3a/Imagen27.png'),
    require('../assets/powerpoint/leccion3a/Imagen28.png'),
    require('../assets/powerpoint/leccion3a/Imagen29.png'),
    require('../assets/powerpoint/leccion3a/Imagen30.png'),
    require('../assets/powerpoint/leccion3a/Imagen31.png'),
    require('../assets/powerpoint/leccion3a/Imagen32.png'),
    require('../assets/powerpoint/leccion3a/Imagen33.png'),
    require('../assets/powerpoint/leccion3a/Imagen34.png'),
    require('../assets/powerpoint/leccion3a/Imagen35.png'),
    require('../assets/powerpoint/leccion3a/Imagen36.png'),
  ],
  'Leccion4: Panorama 4 Campos': [
    require('../assets/powerpoint/leccion4/Imagen1.png'),
    require('../assets/powerpoint/leccion4/Imagen2.png'),
    require('../assets/powerpoint/leccion4/Imagen3.png'),
    require('../assets/powerpoint/leccion4/Imagen4.png'),
    require('../assets/powerpoint/leccion4/Imagen5.png'),
    require('../assets/powerpoint/leccion4/Imagen6.png'),
    require('../assets/powerpoint/leccion4/Imagen7.png'),
    require('../assets/powerpoint/leccion4/Imagen8.png'),
    require('../assets/powerpoint/leccion4/Imagen9.png'),
    require('../assets/powerpoint/leccion4/Imagen10.png'),
    require('../assets/powerpoint/leccion4/Imagen11.png'),
    require('../assets/powerpoint/leccion4/Imagen12.png'),
    require('../assets/powerpoint/leccion4/Imagen13.png'),
    require('../assets/powerpoint/leccion4/Imagen14.png'),
    require('../assets/powerpoint/leccion4/Imagen15.png'),
  ],
};

export default function LessonPowerPointScreen({ route }) {
  const { lessonName } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);

  const images = lessonImages[lessonName] || [];

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
              resizeMode="contain"
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
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