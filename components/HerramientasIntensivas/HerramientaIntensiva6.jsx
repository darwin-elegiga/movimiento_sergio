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
    navigation.navigate('HerramientaIntensiva6', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVA 6: El Proceso para entrenar Iglesias que planten Iglesias.</Text>
                  
        <Text style={styles.paragraph}>
        Este es el proceso que utilizamos para entrenar iglesias. Voy a explicar cómo implementamos un proceso que ha dado muchos resultados y por qué utilizamos este enfoque para levantar otros líderes, plantar iglesias y ayudar a que ellos también comiencen a plantar otras iglesias. Al inicio del entrenamiento, mi equipo de entrenamiento, compuesto por personas con experiencias con diferentes iglesias a la que hemos ayudado en su crecimiento intensivo y extensivo, se reúne con alguna iglesia que desea recibir entrenamiento. Este equipo modela el proceso de entrenamiento donde los expertos realizan el 100% del trabajo.
        </Text>
        <Text style={styles.paragraph}>
        Durante este entrenamiento, enseñamos conceptos como los <Text style={styles.keyword}>tres tercios (3/3)</Text>, el modelo <Text style={styles.keyword}>4.1.1</Text>, la importancia de la <Text style={styles.keyword}>casa de paz</Text>, y los <Text style={styles.keyword}>cuatro campos</Text>. Además, reservamos un tiempo para aplicar el proceso en situaciones reales, lo que implica salir a evangelizar junto con los entrenados. Esta parte es crucial, ya que si no hacemos esto, las personas pueden pensar que se trata de un entrenamiento más, que no funcionará. Por ende, es esencial que los participantes salgan a las calles con nosotros y modelar cómo evangelizar, usando las herramientas que han aprendido en el primer entrenamiento.
        </Text>
        <Text style={styles.paragraph}>
        La segunda parte del proceso es aplicar lo aprendido. En esta etapa, elegimos e incorporamos a personas locales que han estado practicando y evangelizando en los <Text style={styles.keyword}>tres tercios (3/3)</Text>. Así, en este entrenamiento, el <Text style={styles.keyword}>50%</Text> de la formación es impartido por nosotros y el resto por la iglesia local, lo que les permite aprender a entrenar. En muchas ocasiones, realizamos 3 entrenamientos de aplicación seguidos en 3 días usando la herramienta <Text style={styles.keyword}>los 3 toques</Text> como método de entrenamientos, especialmente cuando no tenemos la opción de regresar en múltiples ocasiones. Esto nos ayuda a levantar líderes que continuarán el proceso en nuestra ausencia.
        </Text>
        <Text style={styles.paragraph}>
        Sin embargo, lo ideal es dejar al menos un mes entre entrenamientos para visualizar su trabajo real, identificar quiénes están participando y asegurarnos de que aquellos que asisten a las reuniones semanales están progresando en la evangelización y el discipulado. Aquellas personas son las que utilizaremos en el proceso de enseñanza del entrenamiento. 
        </Text>
        <Text style={styles.paragraph}>
        En la siguiente fase, se repite el modelo de formación, pero esta vez con más involucramiento de la iglesia local. Es impresionante ver cómo están surgiendo <Text style={styles.keyword}>casas de paz</Text>, lo que significa que están comenzando pequeños grupos o iglesias en casa.
        </Text>
        <Text style={styles.paragraph}>
        Después de varios meses, o a la tercera vez que regresamos, la iglesia local realiza el <Text style={styles.keyword}>100%</Text> del entrenamiento. En esta etapa, ya no solo saben cómo entrenar, sino que están aplicando prácticas y comprendiendo mucho mejor el proceso. A medida que avanzan, es crucial que sigan abriendo nuevas casas de paz y plantando más iglesias en sus comunidades.
        </Text>
        <Text style={styles.paragraph}>
        También debemos tener en cuenta que, en muchas ocasiones, los grupos que inician el proceso deben adaptarse a la cultura y necesidad de la iglesia local. Aunque en un primer momento realizamos el entrenamiento básico, muchas veces no regresamos como entrenadores. Por esta razón, es vital que el equipo local desarrolle la habilidad de continuar por sí solo, manteniendo las herramientas bíblicas simples y reproducibles para que puedan pasar el conocimiento a otros de futuras generaciones.
        </Text>
        <Text style={styles.paragraph}>
        Este primer proceso es clave para iniciar un movimiento de alcance. Con el entrenamiento básico, las personas adquirirán los fundamentos necesarios para luego avanzar a entrenamientos más profundos. En esta etapa, enseñamos la metodología de los cuatro campos, la que proporciona herramientas prácticas para identificar problemas y buscar soluciones. Este equipo que recibe el entrenamiento en los cuatro campos aplicará lo aprendido y comenzará a enseñar a los líderes de las casas y a aquellos que están multiplicándose en el proceso de formación.
        </Text>
        <Text style={styles.paragraph}>
        Una vez que la aplicación ha comenzado, es importante que los participantes vean el proceso de formación varias veces, al menos 2 o 3 veces, para poder enfrentar los desafíos que surjan. Al concluir este ciclo, pasamos a una etapa intermedia a través de reuniones programadas. En este tratamiento, realizamos entrenamientos de un día enfocados en identificar problemas y encontrar soluciones para seguir expandiendo la obra.
        </Text>
        <Text style={styles.paragraph}>
        Al final de cada entrenamiento, la iglesia local debe saber cómo solucionar los problemas que enfrenta en su plantación. Este enfoque no solo beneficia a quienes tienen experiencia, sino que también fomenta la colaboración entre los miembros locales, permitiendo que aprendan unos de otros y resuelvan juntos sus dificultades.
        </Text>
        <Text style={styles.paragraph}>
        El proceso que estamos utilizando se basa en la multiplicación de iglesias. La palabra de Dios nos instruye a plantar iglesias y movilizar misioneros. En nuestro entrenamiento de cuatro campos, enseñamos cómo hacer discípulos y cómo movilizar iglesias. Es fundamental que ningún lugar quede sin alcanzar y que cada persona escuche el mensaje. Lo básico es la base que proporcionará un buen fundamento para que el equipo y la iglesia entrenados obtengan resultados positivos.
        </Text>
        <Text style={styles.paragraph}>
        Es importante no comenzar un entrenamiento intensivo con una iglesia nueva, ya que esto puede generar una sobrecarga de conocimiento sin aplicación efectiva. Siempre se deben iniciar con un entrenamiento básico antes de pasar al intermedio. Debemos tener cuidado de no abrumar a las nuevas iglesias con demasiada información, ya que esto puede llevar a la parálisis por análisis.
        </Text>
        <Text style={styles.paragraph}>
        Al cerrar este espacio de aprendizaje sobre el proceso intensivo para entrenar iglesias que plantan iglesias, quiero expresar mi más sincero agradecimiento a cada uno de ustedes por su dedicación y compromiso. Este proceso no solo se trata de adquirir conocimiento, sino de poner en práctica todas las herramientas que hemos compartido para alcanzar a más personas con el mensaje de Cristo.
        </Text>
        <Text style={styles.paragraph}>
        Recuerden que cada uno de ustedes tiene la responsabilidad y la oportunidad de ser agentes de cambio en sus comunidades. A través de los conceptos que hemos explorado, como el modelo de los tres tercios, la casa de paz y los cuatro campos, podemos crear un impacto duradero. Es emocionante pensar en cómo cada iglesia entrenada puede convertirse en una semilla que produzca más iglesias, llevando el amor de Dios hacia aquellos que aún no lo conocen.
        </Text>
        <Text style={styles.paragraph}>
        Les animo a que, al regresar a sus congregaciones, sigan aplicando lo aprendido y continúen sembrando en sus comunidades. Sigan abriendo casas de paz, formando líderes y nunca dejen de evangelizar. El movimiento que comenzamos aquí tiene el potencial de transformaciones inimaginables.
        </Text>
        <Text style={styles.paragraph}>
        Agradezco su valentía para aprender y su disposición para llevar esta misión en sus corazones. Que el Señor los guíe y fortalezca mientras siguen adelante en este apasionante viaje de formación de iglesias. Espero con ilusión escuchar sobre sus progresos y los frutos que Dios traerá a través de su trabajo.
        </Text>
        <Text style={styles.paragraph}>
        ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 7  llamada <Text style={styles.keyword}>“LAS 4 ETAPAS DE UN MOVIMIENTO”</Text>.  
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
            source={require('../../assets/videos/Intensiva6.mp4')}
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

