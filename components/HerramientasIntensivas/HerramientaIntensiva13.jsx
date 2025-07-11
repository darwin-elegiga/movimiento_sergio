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
    navigation.navigate('HerramientaIntensiva13', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENIVA 13: PRINCIPIOS PARA ENSEÑAR </Text>
        <Text style={styles.paragraph}>
        Hoy vamos a enseñar los principios esenciales para entrenar a otras personas. Prepararse adecuadamente es fundamental antes de comenzar a enseñar. A menudo, podemos pensar que sabemos todo y que estamos bien preparados, pero si no dedicamos tiempo a prepararnos, es probable que cometamos errores de los que solo nos daremos cuenta cuando sea demasiado tarde. Por eso, repasar el contenido antes de dar un entrenamiento es crucial.
        </Text>
        <Text style={styles.paragraph}>
        Generalmente, dedicamos entre 4 a 6 horas el día anterior al entrenamiento. En ese tiempo, nos reunimos con todos los participantes y modelamos cada parte del entrenamiento, asignando a cada persona un rol específico. Esto asegura que todos estén bien preparados y que sepamos lo que estamos haciendo antes de llevar a cabo la capacitación. Por lo tanto, la preparación es un principio vital.
         </Text>
         <Text style={styles.paragraph}>
         Otro aspecto importante es permitir que los participantes descubran el contenido por sí mismos. A menudo, nos gusta enseñar y predicar. Sin embargo, es esencial que brindemos tiempo a los asistentes para que comprendan por su cuenta lo que dice la Palabra de Dios. Esto es especialmente relevante cuando estamos tratando pasajes bíblicos. Si comenzamos a explicar antes de que ellos lo descubran, perdemos la oportunidad de que la Biblia tenga un impacto directo en ellos. Por ello, es crucial que el texto hable por sí mismo.
         </Text>
         <Text style={styles.paragraph}>
         El siguiente principio es <Text style={styles.keyword}>modelar y practicar</Text>. Cuando enseñamos, debemos modelar de manera clara y sencilla. Dejar suficiente tiempo para la práctica es esencial. Si al final de la clase los participantes no entendieron qué debían practicar porque hemos introducido demasiados conceptos o detalles no esenciales, el entrenamiento pierde efectividad. Por esta razón, es importante que nuestro modelaje sea sencillo, concreto y bíblico, y que deje espacio para la práctica. Se debe evitar llenar el tiempo con información que no sea necesaria para el objetivo del entrenamiento.
         </Text>
         <Text style={styles.paragraph}>
         La simplicidad también es clave. Después de cada entrenamiento, nos reunimos para evaluar cómo fue la sesión. Una de las preguntas que planteamos es: “¿Lo hicimos simple o lo complicamos?”. Es común sentir la tentación de agregar elementos que creemos que mejorarán la sesión, pero muchas veces, menos es más. Para que un mensaje sea reproducible, debe ser simple y fácil de entender. Si complicamos demasiado el contenido, corremos el riesgo de que no pueda ser replicado, lo que obstaculiza el proceso de multiplicación.
         </Text>
         <Text style={styles.paragraph}>
         Por último, debemos actuar con humildad. Es importante preguntarnos si estamos adoptando una actitud de humildad al enseñarle a otros. No debemos presentarnos como expertos en todo, sino como compañeros de aprendizaje. Un buen entrenador siempre está dispuesto a aprender y a servir. No debemos aislarnos o perder de vista a nuestros participantes; debemos estar atentos para ofrecer apoyo y colaborar en el aprendizaje.
         </Text>
         <Text style={styles.paragraph}>
         Recuerda que la humildad implica reconocer que estamos aquí para servir, como nos enseñó Jesús, quien no vino a ser servido, sino a servir. Por lo tanto, a lo largo del proceso de entrenamiento, debemos prepararnos, permitir que los demás descubran la Palabra por sí mismos, modelar de manera concreta, mantener la simplicidad, y presentarnos con humildad y deseo de aprender. Siguiendo estos principios, podremos entrenar de manera efectiva y ayudar a otros a crecer en su fe.
         </Text>
         <Text style={styles.paragraph}>
         ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 14  llamada  <Text style={styles.keyword}>“Entrenamiento y Enseñanza”</Text>.  
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
            source={require('../../assets/videos/Intensiva13.mp4')}
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

