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
    navigation.navigate('HerramientaIntensiva10', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVA 10: LA MISIÓN DE DIOS DE GÉNESIS A APOCALIPSIS.</Text>
        <Text style={styles.paragraph}>
        Esta clase se titula <Text style={styles.keyword}>"La Misión de Dios de Génesis a Apocalipsis"</Text> y nos enfocaremos en cuál es la visión que Dios desea que tengamos. Revisaremos lo que nos dice la Biblia desde Génesis hasta el último libro, Apocalipsis. 
        </Text> 
        <Text style={styles.paragraph}>
        Para iniciar esta clase, recopilamos todos los versículos que consideramos importantes y dejamos espacios para ir agregando otros a medida que avanzamos. En la primera parte, pido a los participantes que lean los versículos y trato de explicar lo que intentan comunicar, buscando que ellos también puedan captar la misma comprensión.
        </Text> 
        <Text style={styles.paragraph}>
        Comenzamos con <Text style={styles.keyword}>Génesis 1:26-28</Text>, donde queda claro que el deseo de Dios es multiplicar Su imagen en la tierra, creando al hombre a Su imagen y semejanza. Este versículo establece la continuidad de la creación de Dios. 
        </Text> 
        <Text style={styles.paragraph}>
        Luego, en <Text style={styles.keyword}>Génesis 3</Text>, encontramos la caída del hombre. Aunque <Text style={styles.keyword}>Génesis 1:27-28</Text> declara que Dios quiere multiplicar y que creó al hombre a Su imagen, la caída afecta este propósito. En Génesis 6:1-5, vemos que el hombre usa la imagen de Dios para multiplicar la maldad.
        </Text> 
        <Text style={styles.paragraph}>
        Más adelante, en <Text style={styles.keyword}>Génesis 6:9</Text>, Dios decide empezar de nuevo con Noé, ordenándole que se multiplique y llene la tierra. Esto indica que Su deseo de llenar la tierra con Su gloria no ha cambiado. En <Text style={styles.keyword}>Génesis 11:1-4</Text>, encontramos la historia de la Torre de Babel, donde el hombre intenta hacerse un nombre propio en lugar de multiplicar la imagen de Dios.
        </Text> 
        <Text style={styles.paragraph}>
        Hasta este punto, hemos establecido que la intención de Dios es que Su imagen se multiplique, pero el hombre opta por hacerse un nombre, lo que contradice el propósito divino. Después de esta enseñanza, pasamos a la segunda parte de la clase, donde planteamos dos preguntas: ¿a quién quiere Dios alcanzar? y ¿a quién quiere usar?
        </Text> 
        <Text style={styles.paragraph}>
        Primero, pedimos a los participantes que lean en voz alta los versículos y reflexionen sobre lo que dicen. Por ejemplo, en <Text style={styles.keyword}>Éxodo 3:10</Text>, Dios quiere usar a Moisés para liberar a Su pueblo. Al preguntar: "¿A quién quiere alcanzar Dios?", encontramos la respuesta en <Text style={styles.keyword}>Éxodo 3:6</Text>, donde se menciona que Él desea alcanzar a todas las familias de la tierra. También podemos leer <Text style={styles.keyword}>Salmos 67, Isaías 49:5-6, Mateo 28:19-20 y Hechos 1:8</Text>, entre otros.
        </Text> 
        <Text style={styles.paragraph}>
        Damos a los participantes unos minutos para completar este ejercicio. Después de diez minutos, regresamos a <Text style={styles.keyword}>Éxodo 20:18-20</Text>, donde vemos que Dios desea tener una relación directa con Su pueblo, pero ellos rechazan Su invitación y piden que Moisés hable con Dios en su lugar. Este punto es crucial, pues muchas veces Dios quiere que hagamos algo, pero nosotros buscamos que otras personas nos digan qué hacer en lugar de aprender a ir directamente a Él.
        </Text> 
        <Text style={styles.paragraph}>
        Discutimos también cómo, en ocasiones, las personas pueden tener miedo de obedecer y buscar confirmaciones de otros en lugar de escuchar la voz de Dios por sí mismos. Es esencial que cada individuo entienda su identidad y el llamado que Dios tiene para ellos. En este proceso, las personas pueden rechazar lo que Dios desea hacer en sus vidas, y debemos alentarlas a que tengan confianza y se acerquen a Él directamente.
        </Text> 
        <Text style={styles.paragraph}>
        Queremos evitar que las personas rechacen su identidad y lo que Dios está diciendo, buscando siempre la confirmación de otros en lugar de buscar la dirección del Espíritu Santo. Esta falta de obediencia puede llevar a perder la visión de lo que Dios quiere hacer en sus vidas, por lo que es crucial fomentar esta relación personal con Dios.
        </Text> 
        <Text style={styles.paragraph}>
        ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 11  llamada <Text style={styles.keyword}>“EL 1-3-9”</Text>.  
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
            source={require('../../assets/videos/Intensiva10.mp4')}
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

