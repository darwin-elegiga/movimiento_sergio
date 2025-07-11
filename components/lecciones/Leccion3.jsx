import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { documentosStyles as styles } from "../DocumentosStyles";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Leccion3({ route }) {
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
      await videoRef.current.setPositionAsync(
        Math.min(status.positionMillis + 10000, status.durationMillis)
      );
      setShowControls(true);
    }
  };

  const skipBackward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      await videoRef.current.setPositionAsync(
        Math.max(status.positionMillis - 10000, 0)
      );
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
    navigation.navigate("LessonPowerPoint", {
      lessonName: "Leccion3: Gran Visión Local",
    });
  };

  const openWord = () => {
    navigation.navigate("Leccion3", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lección 3: Gran Visión Local</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de
          multiplicación de los cuatro campos de un discipulado. En la última
          lección, presentamos la lección número 2: la gran visión de Dios es
          global desde Génesis hasta Apocalipsis. Ahora, siguiendo la gran
          visión, veremos que es local: <Text style={styles.keyword}>hechos impactantes</Text>.
        </Text>
        <Text style={styles.paragraph}>
          Si tú tienes visión de llegar a los perdidos en tu comunidad, en tu
          área, entonces necesitas saber cómo se ve la comunidad perdida.
          ¿Cuántos están perdidos? ¿Cuántos están lejos de Dios? En nuestro
          entrenamiento estaremos haciendo algunos cálculos. Tomemos un ejemplo
          de una región de tres millones de personas. Si hay tres millones de
          personas, ¿cuántos están lejos de Dios? Digamos que el noventa por
          ciento está lejos de Dios, eso hace que 2.7 millones de personas
          existan lejos de Dios en esa área. Si tuvieran que morir hoy, no
          heredarán el reino de Dios. Esto es una verdadera preocupación.
        </Text>
        <Text style={styles.paragraph}>
          En esta lección se enfatiza la necesidad de conocer el estado
          espiritual de la comunidad a la que se desea llegar. Se hace una
          estadística hipotética sobre una región con tres millones de personas
          y se calcula cuántas de ellas estarían lejos de Dios. Este ejercicio
          busca crear conciencia sobre la urgencia de la misión.
        </Text>
        <Text style={styles.paragraph}>
          Así que lo que tenemos que hacer es hacer algunos cálculos en nuestras
          áreas. Si leemos las Escrituras en Hechos 19:8-10, veremos que el
          apóstol Pablo tomó un puñado de discípulos, los entrenó y los equipó.
          Y vemos que el versículo diez dice que todos en Asia escucharon la
          palabra del Señor. Eran entre ocho y quince millones de personas que
          oyeron la palabra de Dios. Bueno, ellos tenían pasión por los
          perdidos, estaban alcanzando su comunidad y estaban haciendo
          discípulos, y hoy queremos hacer lo mismo. Tenemos que entender
          cuántas personas están lejos de Dios en nuestras áreas.
        </Text>
        <Text style={styles.paragraph}>
          En tu entrenamiento, divide a los participantes en grupos y que ellos
          hagan algunos cálculos sobre cuántas personas están en su área o
          cuántos miles o millones. Vamos a usar un área de 100 000 personas en
          una zona determinada. Esta podría ser su pueblo o ciudad. Digamos que
          90% no están en comunión con Dios. Esto significa 90 000 personas
          están lejos de Dios en esa área. Si hacemos un cálculo y tratamos de
          averiguar cuántas iglesias tendremos que plantar, lo que queremos
          hacer es identificar cuál es el tamaño promedio de una iglesia.
        </Text>
        <Text style={styles.paragraph}>
          Digamos 100. Si hay 90 000 personas en esa área, ¿cuántas iglesias
          tendremos que plantar o comenzar? 90. Ahora, si nos ponemos la meta de
          alcanzar solo el 10%, necesitaríamos plantar 90 congregaciones de 100
          personas en esa área.
        </Text>
        <Text style={styles.paragraph}>
          Puedes ver <Text style={styles.keyword}>los hechos impactantes</Text> y el enorme problema que tenemos
          para alcanzar a los perdidos en nuestras comunidades. La gran visión
          de Génesis a Apocalipsis <Text style={styles.keyword}>es global</Text>, pero <Text style={styles.keyword}>los hechos impactantes son locales</Text>. Tenemos que asumir la responsabilidad de nuestra área. Esta
          es una visión local. Primero, averigüen cuántas personas hay en tu
          área, y luego cuántas personas hay que alcanzar con el evangelio. Esto
          determinará cuántas iglesias se necesitan plantar en tu área y cuántos
          líderes vas a tener que equipar. Pero, sobre todo, queremos hacer
          discípulos que hagan otros discípulos también, y así todos tomen
          responsabilidad de alcanzar nuestras comunidades para Cristo.
        </Text>
        <Text style={styles.paragraph}>
          Podemos ver que se destaca la dualidad de la visión que <Text style={styles.keyword}>es global y local</Text>. Se subraya la importancia de asumir la responsabilidad en la propia comunidad y evaluar la capacidad de respuesta en términos de plantar iglesias y equipar líderes. Además, se enfatiza el objetivo de hacer discípulos y multiplicar esa discipulación. <Text style={styles.keyword}>La gran visión es
          local: hechos impactantes</Text>.
        </Text>
        <Text style={styles.keyword}>
          Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros
          mientras nos preparamos para la próxima LECCIÓN <Text style={styles.mayuscula}>3A</Text>. El Método Espada.
        </Text>
      </View>
    </>
  );

  const newContent = (
    <>
      <View
        style={[
          styles.videoContainer,
          isFullscreen && styles.fullscreenVideoContainer,
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleVideoPress}
          style={styles.videoWrapper}
        >
          <Video
            ref={videoRef}
            source={require("../../assets/videos/Leccion3.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={isMuted}
            resizeMode={isFullscreen ? "contain" : "cover"}
            shouldPlay={isPlaying}
            isLooping
            style={[
              styles.video,
              isFullscreen && styles.fullscreenVideo,
              { transform: [{ rotate: `${rotation}deg` }] },
            ]}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
          {showControls && (
            <View
              style={[
                styles.controls,
                isFullscreen && styles.fullscreenControls,
              ]}
            >
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
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipForward}>
                  <Ionicons name="play-forward" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMute}>
                  <Ionicons
                    name={isMuted ? "volume-mute" : "volume-high"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <Ionicons
                    name={isFullscreen ? "contract" : "expand"}
                    size={24}
                    color="white"
                  />
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
            <Text style={styles.title}>
              la gran visión
            </Text>
            <Text style={styles.subtitle}>
              hechos impactantes............ es local
            </Text>
            <Text style={styles.subtitleDos}>
              hechos 19:8-10
            </Text>
            <Text style={styles.paragraph}>
              • Habitantes en tu region o ciudad = <Text style={estilosIndividual.underline}>Supongamos 100 000 habitantes
            </Text></Text>
            <Text style={styles.paragraph}>
              • Suponiendo que el 90% esta alejado de Dios: multiplicado * 0.9 = <Text style={estilosIndividual.underline}>90 000 perdidos
            </Text></Text>
            <Text style={styles.paragraph}>
              • ¿Cuantas congregaciones de 50 miembros se necesitan para alcanzar ese 90%? (Divide el último número que obtuviste entre 50) = <Text style={estilosIndividual.underline}>1800 Congregaciones de 50 miembros
            </Text></Text>
            <Text style={styles.paragraph}>
              • Suponiendo que nos pongamos la meta de alcanzar solo el 10% de los perdidos. (Multiplica el último número que obtuviste * 0.1) = <Text style={estilosIndividual.underline}>180 Congregaciones para alcanzar el 10%
            </Text></Text>
            <Text style={styles.paragraph}>
            • ¿Cuantas congregaciones de 50 miembros hay actualmente en tu area? = <Text style={estilosIndividual.underline}>Supongamos que hay 10 Congregaciones
            </Text></Text>
            <Text style={styles.paragraph}>
            • ¿Cuantas congregaciones de 50 miembros faltan para ganar solo el 10% de los perdidos? = <Text style={estilosIndividual.underline}>170 congregaciones
            </Text></Text>
            <Text style={styles.paragraph}>
            • ¿Cuantos lideres se necesitan equipar?= <Text style={estilosIndividual.underline}> 170 Lideres
            </Text></Text>

          </View>
        </>
      )}
    </>
  );

  return (
    <ImageBackground
      source={require("../../assets/icons/fondo1.jpg")}
      style={styles.container}
    >
      <ScrollView>
        {showOnlyOriginalContent ? (
          originalContent
        ) : showOnlyNewContent ? (
          newContent
        ) : (
          <>
            {newContent}
            {originalContent}
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const estilosIndividual = StyleSheet.create({
  underline: {  
    textDecorationLine: 'underline',  
    textDecorationColor: 'black',  
    textDecorationStyle: 'solid',
    fontFamily: 'Lora-SemiBoldItalic',
    textTransform: 'capitalize',
    // color:'#1C4F7C',
    color: '#003366',
    fontSize: 16,
  },
});