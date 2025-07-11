import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { documentosStyles as styles } from "../DocumentosStyles";
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Leccion1({ route }) {
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
      lessonName: ''
    });
  };

  const openWord = () => {
    navigation.navigate('HerramientaIntensiva14', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVA 14: ENTRENAMIENTO  Y ENSEÑANZAS </Text>
        <Text style={styles.paragraph}>
        Hoy exploraremos en profundidad el concepto de entrenamiento y enseñanza, dos pilares fundamentales en nuestro desarrollo personal y espiritual dentro de los cuatro campos del discipulado. Aunque ambas son importantes en nuestro camino de crecimiento, es crucial entender las diferencias que las caracterizan.
        </Text>
        
        <Text style={styles.subtitleDos}>La Enseñanza: El Poder del Conocimiento</Text>
        <Text style={styles.paragraph}>
        La enseñanza es el proceso mediante el cual adquirimos información y conocimiento. Nos ayuda a comprender conceptos, principios y valores que forman la base de nuestra fe. A través de la enseñanza, nos llenamos de sabiduría. Leemos las Escrituras, participamos en estudios bíblicos y escuchamos a nuestros líderes espirituales. Este conocimiento es invaluable, ya que nos permite crecer en nuestra comprensión de quién es Dios, cuál es Su propósito para nosotros y cómo podemos vivir de acuerdo a Su palabra.
        </Text>
        <Text style={styles.paragraph}>
        Sin embargo, el conocimiento por sí solo no es suficiente. Necesitamos que ese conocimiento se traduzca en acción, y aquí es donde entra en juego el entrenamiento.
        </Text>
        <Text style={styles.subtitleDos}>El Entrenamiento: La Adquisición de Habilidades</Text>
        <Text style={styles.paragraph}>
        El entrenamiento se refiere a la práctica y perfeccionamiento de habilidades específicas necesarias para actuar de manera efectiva en los diferentes campos del discipulado. Por ejemplo, el campo del evangelismo nos desafía a salir y compartir el mensaje de Jesucristo, no solo con conocimiento, sino también con habilidades interpersonales y una empatía profunda hacia aquellos que nos rodean. Consideremos a un deportista profesional: no se limita a conocer las reglas del juego o las técnicas necesarias; dedica horas a practicar cada movimiento, cada jugada, hasta que sus habilidades se convierten en un reflejo natural de su formación.
        </Text>
        <Text style={styles.paragraph}>
        De manera similar, si deseamos representar adecuadamente a Jesús en nuestra vida diaria, debemos comprometernos a practicar continuamente lo que hemos aprendido en cada uno de estos campos. Esto implica no solo conocer Su mensaje, sino también vivirlo, demostrarlo y compartirlo. Necesitamos entrar en situaciones donde podamos aplicar lo que hemos aprendido en el campo del servicio, ofreciendo nuestras manos y corazones a quienes lo necesitan, y en el campo de la comunidad, fomentando la unidad y el amor entre nuestros hermanos en la fe.
        </Text>
        <Text style={styles.subtitleDos}>La Importancia de la Práctica y la Repetición</Text>
        <Text style={styles.paragraph}>
        Para adquirir habilidades, la repetición es clave. Así como un atleta entrena una y otra vez para perfeccionar su técnica, nosotros debemos practicar nuestras habilidades de fe como la oración, el servicio y el amor hacia los demás, hasta que se conviertan en parte de nuestra naturaleza. Cada campo del discipulado exige una práctica activa; por ejemplo, la enseñanza integrada en grupos pequeños permite una repetición y un crecimiento significativo en nuestras comunidades.
        </Text>
        <Text style={styles.paragraph}>
        Además, el entrenamiento no tiene que hacerse en soledad. Es beneficioso contar con compañeros o mentores que nos acompañen en este viaje. Trabajar en equipo nos motiva, nos brinda apoyo y nos da la oportunidad de aprender los unos de los otros. Esto se traduce en ejercicios de discipulado en los que podemos practicar nuestras habilidades mientras nos animamos mutuamente.
        </Text>
        <Text style={styles.subtitleDos}>Reflexión y Preguntas para Compartir</Text>
        <Text style={styles.paragraph}>
        Hoy, mientras practicamos juntos, propongo que nos hagamos dos preguntas importantes:
        </Text>
        <Text style={styles.paragraph}>
        ¿Cuál fue el objetivo de tu aprendizaje hoy? ¿Qué aspectos de tu fe deseas profundizar y cómo planeas aplicarlos en cada uno de los campos del discipulado en tu vida?
        </Text>
        <Text style={styles.paragraph}>
        ¿Cuánta gente vive en tu ciudad? Este es un recordatorio de que nuestras acciones pueden tener un impacto significativo en la comunidad que nos rodea, y cómo cada campo del discipulado puede ser una respuesta a las necesidades de nuestra sociedad.
        </Text>
        <Text style={styles.paragraph}>
        Al compartir nuestras respuestas, no solo ampliamos nuestro entendimiento, sino que también comenzamos a formar lazos que pueden enriquecer nuestro entrenamiento conjunto. Recuerda, el camino hacia la habilidad es un viaje continuo de aprendizaje y práctica en los cuatro campos del discipulado. ¡Así que adelante, hablemos y crezcamos juntos en este proceso!
        </Text>
        <Text style={styles.paragraph}>
        ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes!
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
            source={require('../../assets/videos/Intensiva14.mp4')}
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

