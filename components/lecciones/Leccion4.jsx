import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { documentosStyles as styles } from "../DocumentosStyles";
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Leccion4({ route }) {
  const { showOnlyNewContent, showOnlyOriginalContent } = route.params || {};
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let timer;
    if (isPlaying && showControls) {
      timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, showControls]);

  const togglePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  };

  const skipForward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      await videoRef.current.setPositionAsync(Math.min(status.positionMillis + 10000, status.durationMillis));
      setShowControls(true);
    }
  };

  const skipBackward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      await videoRef.current.setPositionAsync(Math.max(status.positionMillis - 10000, 0));
      setShowControls(true);
    }
  };

  const toggleMute = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
      setShowControls(true);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setRotation(90);
    } else {
      setRotation(0);
    }
    setShowControls(true);
  };

  const handleVideoPress = () => {
    setShowControls(true);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
    }
  };

  const onSliderValueChange = (value) => {
    if (videoRef.current) {
      const newPosition = value * duration;
      videoRef.current.setPositionAsync(newPosition);
    }
  };

  const openPowerPoint = () => {
    navigation.navigate('LessonPowerPoint', { 
      lessonName: 'Leccion4: Panorama 4 Campos'
    });
  };

  const openWord = () => {
    navigation.navigate('Leccion4', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lección 4: Panorama 4 Campos</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Lección número 4: <Text style={styles.keyword}>Panorama general de los cuatro campos</Text>. En las últimas lecciones, estudiamos el bosquejo general del entrenamiento, la gran misión que <Text style={styles.keyword}>es global, es local</Text>, y luego veremos que también <Text style={styles.keyword}>es personal</Text>. Ahora entremos al panorama general de los cuatro campos.
        </Text>
        <Text style={styles.paragraph}>
        En este entrenamiento, todas las herramientas con las que están siendo equipados encontrarán dentro de los 4 campos. En esencias hay 4 campos: campo 1, número 2, número 3 y número 4; y en el centro está el liderazgo. Jesús, en sus enseñanzas, utilizó varios principios e ilustraciones sobre la agricultura. Nosotros queremos ser buenos agricultores para Jesús. Un buen agricultor encontrará un campo vacío; este es el primer campo al que llamamos campo vacío.
        </Text>
        <Text style={styles.paragraph}>
        Enfatizar la necesidad de liderazgo y se establece un paralelismo entre el cultivo agrícola y el discipulado cristiano. El "campo vacío" representa el primer paso del proceso, donde se reconoce la necesidad de encontrar áreas donde se pueda comenzar el trabajo espiritual.
        </Text>
        <Text style={styles.paragraph}>
        Es el plan inicial. A través de este entrenamiento, aprenderemos a entrar en campos vacíos. Luego, lo que hace un agricultor es sembrar la semilla, y la siembra en abundancia. Este campo lo llamaremos la siembra. En términos espirituales, el evangelismo. Entonces, ese granjero ayuda a que las plantas nacientes crezcan; a esto le llamamos el campo del crecimiento. Aquellos agricultores se asegurarán de que haya luz y agua. En términos espirituales, el discipulado este etapa es esencial, donde llevamos a los recién nacidos y los ayudamos a crecer en Jesús y a comprender su llamado a evangelizar el mundo. Allí se hará uso de algunas herramientas.
        </Text>
        <Text style={styles.paragraph}>
        Luego lo que hace un buen agricultor es recoger la cosecha; el arroje a este se le llama el campo de la cosecha. En términos espirituales, es la iglesia, donde reunimos a los grupos en la comunidad de una manera saludable. Entonces, lo que hace un buen agricultor es llevar parte de la cosecha hacia el centro, hacia liderazgo, y luego comenzar de nuevo el proceso.
        </Text>
        <Text style={styles.paragraph}>
        En el centro está el liderazgo, desarrollo y multiplicación. En tu entrenamiento, les dirás a tus participantes que en el primer campo aprenderán cómo entrar a un campo vacío. Aquí recibirán dos herramientas. En el campo número dos, serán entrenados en cómo poder sembrar el evangelio con tres herramientas: sencillez, esto es, simple, bíblico y reproducible. Luego tenemos en el campo del crecimiento, allí serán entrenados con dos herramientas sobre cómo hacer discípulos que hagan discípulos.
        </Text>
        <Text style={styles.paragraph}>
        Lo menos cuatro es el campo de la cosecha, donde serán entrenados con dos herramientas sobre cómo reunir grupos en la comunidad que se multipliquen y que sean saludables. En el centro, donde está liderazgo, desarrollo y multiplicación, serán entrenados con tres herramientas sobre por qué la iglesia necesita líderes que guíen y entren en cómo entrar en campos vacíos.
        </Text>
        <Text style={styles.paragraph}>
        Los cuatro campos son: el campo vacío, el campo de la siembra, el campo del crecimiento y el campo de la cosecha; y en el centro, el liderazgo, desarrollo y multiplicación. Evangelio, discipulado, iglesia, liderazgo. En tu entrenamiento, pide a tus participantes que tomen una hoja y un marcador y que vayan haciendo el dibujo contigo. Esto es porque necesitan entender en qué campo van a usar las diferentes herramientas, porque a medida que los equipamos, vamos a poner herramientas en nuestra caja de herramientas. A medida que nos adentramos en un campo vacío y sembramos la semilla, a medida que seamos discípulos, vamos a saber qué herramientas sacar y compartir.
        </Text>
        <Text style={styles.keyword}>
        Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros mientras nos preparamos para comenzar con las herramientas simples. La próxima herramienta 1  Mapa Relaciona.
        </Text>
      </View>
    </>
  );

  const newContent = (
    <>
      <View style={[styles.videoContainer, isFullscreen && styles.fullscreenVideoContainer]}>
        <TouchableOpacity activeOpacity={1} onPress={handleVideoPress} style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={require('../../assets/videos/Leccion4.mp4')}
            rate={1.0}
            volume={1.0}
            isMuted={isMuted}
            resizeMode={isFullscreen ? "contain" : "cover"}
            shouldPlay={isPlaying}
            isLooping
            style={[
              styles.video,
              isFullscreen && styles.fullscreenVideo,
              { transform: [{ rotate: `${rotation}deg` }] }
            ]}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
          {showControls && (
            <View style={[
              styles.controls,
              isFullscreen && styles.fullscreenControls,
            ]}>
              <Slider
                style={styles.progressBar}
                minimumValue={0}
                maximumValue={1}
                value={position / duration || 0}
                onValueChange={onSliderValueChange}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={skipBackward}>
                  <Ionicons name="play-back" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause}>
                  <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipForward}>
                  <Ionicons name="play-forward" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMute}>
                  <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <Ionicons name={isFullscreen ? "contract" : "expand"} size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {!isFullscreen && (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={openPowerPoint}>
              <Text style={styles.buttonText}>PowerPoint</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openWord}>
              <Text style={styles.buttonText}>Word</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.title}>descripción general de las 5 partes en los 4 campos</Text>
            <Text style={styles.subtitle}>13 herramientas simples:</Text>
            <View style={estilosIndividual.tableContainer}>
              <View style={estilosIndividual.tableRow}>
                <View style={estilosIndividual.tableCell}>
                  <Text style={estilosIndividual.keyword}>1. Campo vacío</Text>
                  <Text style={estilosIndividual.cellText}>• Mapa relacional</Text>
                  <Text style={estilosIndividual.cellText}>• Persona/casa de paz</Text>
                </View>
                <View style={estilosIndividual.tableCell}>
                  <Text style={estilosIndividual.keyword}>2. Campo siembra</Text>
                  <Text style={estilosIndividual.cellText}>• Testimonio 15seg</Text>
                  <Text style={estilosIndividual.cellText}>• Tres círculos</Text>
                  <Text style={estilosIndividual.cellText}>• El semáforo</Text>
                </View>
              </View>
              <View style={estilosIndividual.tableRow}>
                <View style={estilosIndividual.tableCell2}>
                  <Text style={estilosIndividual.keyword}>4. Campo cosecha</Text>
                  <Text style={estilosIndividual.cellText}>• Círculo saludable de la iglesia</Text>
                  <Text style={estilosIndividual.cellText}>• Guía de la mano izquierda</Text>
                </View>
                <View style={estilosIndividual.tableCell2}>
                <Text style={estilosIndividual.keyword}>3. Campo crecimiento</Text>
                  <Text style={estilosIndividual.cellText}>• El 4.1.1</Text>
                  <Text style={estilosIndividual.cellText}>• Los tres tercios (3/3)</Text>
                </View>
              </View>
              <View style={estilosIndividual.centerCircle}>
              <Text style={estilosIndividual.keyword}>Liderazgo</Text>
                <Text style={estilosIndividual.cellText}>• 5 niveles liderazgo</Text>
                <Text style={estilosIndividual.cellText}>• Hierro sobre hierro</Text>
                <Text style={estilosIndividual.cellText}>• Principio MAOI</Text>
                <Text style={estilosIndividual.cellText}>• Dinámica de la multiplicación</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );

  return (
    <ImageBackground 
      source={require('../../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
      <ScrollView>
        {showOnlyOriginalContent ? originalContent : (showOnlyNewContent ? newContent : (
          <>
            {newContent}
            {originalContent}
          </>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const estilosIndividual = StyleSheet.create({
  tableContainer: {
    width: '100%',
    aspectRatio: 0.7,
    position: 'relative',
  },
  tableRow: {
    flexDirection: 'row',
    height: '50%',
  },
  tableCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#003366',
    padding: 4,
    paddingTop:'15%',
  },
  tableCell2: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#003366',
    padding: 4,
    paddingTop:'25%',
  },
  cellText: {
    fontSize: 14,
    lineHeight: 16,
    color: '#333',
    marginBottom: 8,
    textAlign:'any',
    fontFamily: 'Lora-Regular',
  },
  
  centerCircle: {
    position: 'absolute',
    top: '33%',
    left: '25%',
    width: '50%',
    height: '34%',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#003366',
    backgroundColor: 'rgba(255,255,255,255)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  keyword: {
    textAlign: 'center',
    fontFamily: 'Lora-SemiBoldItalic',
    textTransform: 'capitalize',
    // color:'#1C4F7C',
    color: '#003366',
    fontSize: 16,
    marginBottom:12,
  },
});

