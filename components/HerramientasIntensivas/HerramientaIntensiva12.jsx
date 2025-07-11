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
    navigation.navigate('HerramientaIntensiva12', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta intensiva 12. ¿PARA QUIEN ES ESTE ENTRENAMIENTO?</Text>
        <Text style={styles.paragraph}>
        Cuando salimos para compartir esta visión, hay tres aspectos clave que normalmente consideramos. Primero, buscamos individuos que tengan un corazón quebrantado por los perdidos, personas que sientan una profunda preocupación y compasión por aquellos que aún no conocen a Cristo. Esta empatía nos motiva a actuar y a esforzarnos por alcanzar a quienes están alejados de la fe.
        </Text>
        <Text style={styles.paragraph}>
        En segundo lugar, es fundamental que compartan una visión alineada con la de Dios, una visión amplia que aspire a alcanzar a todos los perdidos. Esto implica entender que el llamado a compartir el evangelio no se limita a un grupo particular, sino que se extiende a todas las naciones, culturas y comunidades. La visión de Dios es inclusiva y busca transformar vidas en cada rincón del mundo.
        </Text>
        <Text style={styles.paragraph}>
        Por último, es esencial que las personas estén dispuestas a recibir entrenamiento. Este entrenamiento no es solo un conjunto de conocimientos teóricos, sino que se traduce en habilidades prácticas que les permitirán llevar adelante su misión de manera efectiva. Estamos aquí para guiarlos en ese camino.
        </Text>

        <Text style={styles.subtitleDos}>Objetivos del Entrenamiento</Text>
        <Text style={styles.paragraph}>
        Nuestro objetivo es proporcionarles el entrenamiento necesario para que puedan cumplir con la visión que Dios les ha dado. En este proceso, cubrimos tres aspectos básicos:
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>1. Aprender a hacer discípulos:</Text> Identificamos y capacitamos a aquellos que desean aprender a hacer discípulos. Abordamos principios fundamentales, como la importancia de las relaciones, la escucha activa y la enseñanza de las Escrituras. Utilizamos métodos prácticos, como estudios bíblicos y ejercicios de vida en comunidad, para que los participantes comprendan cómo compartir su fe y guiar a otros en su camino espiritual.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>2. Plantar iglesias: </Text>Para muchos, el deseo de plantar iglesias surge de un llamado a expandir el reino de Dios. Proporcionamos formación sobre cómo iniciar y sostener una nueva congregación. Esto incluye la identificación de líderes, la creación de una visión y misión, y la construcción de una comunidad comprometida. Estudiamos ejemplos bíblicos y contemporáneos, ofreciendo herramientas para enfrentar desafíos comunes y fomentar el crecimiento.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>3. Movilizar misiones: </Text>Enseñamos a los participantes a entender la urgencia del llamado misionero y cómo pueden contribuir, ya sea yendo a los campos de misión o apoyando a otros. Proporcionamos recursos sobre diversas culturas y contextos donde se necesita el evangelio, ayudando a adaptar su enfoque de manera efectiva.
        </Text>
        <Text style={styles.subtitleDos}>Testimonios de Transformación</Text>
        <Text style={styles.paragraph}>
        A lo largo de este entrenamiento, hemos recopilado testimonios impactantes. Por ejemplo, María, una joven que asistió al entrenamiento, comenzó con el deseo de hacer discípulos en su comunidad. Tras recibir formación, no solo pudo compartir su fe, sino que también inició un grupo de discipulado donde varios jóvenes encontraron a Cristo. Su pasión y dedicación transformaron no solo su vida, sino también la de aquellos a su alrededor.
        </Text>

        <Text style={styles.paragraph}>
        Del mismo modo, Juan y Ana, una pareja con el sueño de plantar una iglesia, participaron en nuestro programa y aprendieron la importancia de construir relaciones sólidas. Esto les permitió establecer una nueva congregación que hoy cuenta con varios miembros comprometidos, muchos de los cuales han comenzado su propio camino de discipulado.
        </Text>
        <Text style={styles.subtitleDos}>Impacto del Entrenamiento</Text>
        <Text style={styles.paragraph}>
        El impacto de este entrenamiento va más allá de los individuos; se extiende a las comunidades y ciudades. Al capacitarlos para hacer discípulos, plantar iglesias y movilizar misiones, estamos sembrando semillas de fe en lugares que necesitan esperanza. Las iglesias que se plantan no solo sirven como centros comunitarios, sino que se convierten en espacios donde las vidas se transforman, ofreciendo apoyo, amor y recursos a sus miembros y vecinos.
        </Text>
        <Text style={styles.subtitleDos}>Recursos Adicionales</Text>
        <Text style={styles.paragraph}>
        Para maximizar el aprendizaje, ofrecemos una serie de recursos adicionales durante el entrenamiento:
        </Text>
        <Text style={styles.paragraph}>
        - Materiales de estudio: Proporcionamos libros, guías y recursos en línea que abordan los fundamentos de la evangelización, el discipulado y la plantación de iglesias.
        </Text>
        <Text style={styles.paragraph}>
        - Mentoría: Cada participante tiene acceso a un mentor que los guiará en su proceso. Esto permite recibir orientación personalizada y ayuda práctica en cada etapa.
        </Text>
        <Text style={styles.paragraph}>
        - Grupos de apoyo: Fomentamos la creación de grupos de apoyo entre los participantes, creando un espacio donde puedan compartir experiencias, desafíos y avances en su misión.
        </Text>
        <Text style={styles.paragraph}>
        - Oportunidades de servicio: Organizamos experiencias de servicio y misiones donde los participantes pueden aplicar lo aprendido, encontrando oportunidades reales en comunidades necesitadas.
        </Text>

        <Text style={styles.subtitleDos}>El Llamado a la Acción</Text>
        <Text style={styles.paragraph}>
        Si tienes un corazón quebrantado por los perdidos, una visión alineada con la de Dios y el deseo de ser entrenado, estamos aquí para servirte. Te invitamos a contactarnos; estaremos dispuestos a apoyarte y ayudarte en todo lo que podamos para que seas un agente de transformación en tu comunidad y más allá. La obra que estamos llevando a cabo necesita personas comprometidas que anhelan hacer una diferencia. Juntos, podemos extender el amor de Cristo y llevar esperanza a los corazones que lo necesitan.
        </Text>

        <Text style={styles.paragraph}>
        ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 13  llamada <Text style={styles.keyword}>“PRINCIPIOS PARA ENSEÑAR”.</Text>
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
            source={require('../../assets/videos/Intensiva12.mp4')}
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

