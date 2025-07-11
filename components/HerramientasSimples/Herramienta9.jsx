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

export default function Herramienta9({ route }) {
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
    navigation.navigate("PowerPoint", {
      toolName: "Her 9: Guía de la Mano Izquierda",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta9", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
        HERRAMIENTA 9: GUIA MANO IZQUIERDA PARA INICIAR GRUPO DE IGLESIA
        </Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. <Text style={styles.keyword}>Herramienta número 9</Text> en tu manual de entrenamiento. En este entrenamiento de multiplicación, abordaremos el campo número cuatro: la cosecha y cómo juntar discípulos en grupos. En la lección anterior, estudiamos la herramienta número 8, el "círculo saludable" de la iglesia. Ahora presentaremos la herramienta número nueve: la guía de la mano izquierda para iniciar un grupo de iglesia. Esta es la lección número trece, página diecinueve de tu manual de entrenamiento.
        </Text>
        <Text style={styles.paragraph}>
        El campo cuatro es el campo de la cosecha, también llamado la iglesia. Durante el entrenamiento, pide a tus participantes que tomen una hoja de papel, que pongan su mano izquierda encima y marquen el contorno de su mano y de sus dedos. Luego, pídeles que escriban una pregunta sobre cada dedo, en específico, que escriban “quién”, “qué”, “dónde”, “cuándo” y “por qué”. Es importante enseñar esto a los nuevos discípulos, especialmente si alguno de ellos está pensando en empezar un grupo pequeño de crecimiento.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Comencemos con las preguntas:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}><Text style={styles.keyword}>Número 1: ¿Quiénes son la iglesia? En Hechos 2:36-47</Text>, vemos que la iglesia está compuesta por personas: creyentes arrepentidos y bautizados.</Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>Número 2: ¿Qué hace la iglesia? En Hechos 2:36-47</Text> también encontramos lo que la iglesia de la Biblia hacía, que es reflejado en el círculo saludable de la iglesia. </Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>Número 3: ¿Dónde se reúne la iglesia? Hechos 2:46, 5:42 y 16:40. </Text>Por lo tanto, la iglesia se reúne en cualquier lugar: en un edificio, en casas, en el parque, etc.</Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>Número 4: ¿Cuándo se reúne la iglesia? Hechos 2:46</Text> señala las reuniones de oración, y <Text style={styles.keyword}>Hechos 20:7</Text> indica el primer día de la semana. Así que la iglesia se reúne en cualquier momento, sin dejar de congregarse como dice <Text style={styles.keyword}>Hebreos 10:25</Text>.</Text>
        </View>
        <Text style={styles.listItem}><Text style={styles.keyword}>Número 5: ¿Por qué se reúne la iglesia? En 1 Corintios 10:31</Text> se nos dice que hagamos todo para la gloria de Dios, y Hebreos 10:24 nos anima a motivarnos unos a otros hacia las buenas obras. Por ello, la iglesia se reúne para glorificar a Dios y para animarse mutuamente.</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Recapitulando:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}><Text style={styles.keyword}>¿Quiénes son la iglesia? </Text>Los creyentes arrepentidos y bautizados.</Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>¿Qué hace la iglesia?</Text> Lo que indica el círculo saludable de la iglesia.</Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>¿Dónde se reúne la iglesia? </Text>En cualquier lugar. </Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>¿Cuándo se reúne la iglesia? </Text>En cualquier momento.</Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>¿Por qué se reúne la iglesia?</Text> Para glorificar a Dios y animarse unos a otros. </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>
        Estamos en el campo de la cosecha y aprendiendo a juntar a los discípulos en grupos saludables. Ahora es tiempo de practicar: divide a tus participantes en grupos de dos personas y pídeles que se describan mutuamente esta herramienta. Al finalizar, que levanten su mano izquierda y ambos choquen sus manos como señal de haber terminado con esta herramienta. Así, los nuevos discípulos sabrán la información básica que deben conocer sobre la iglesia para que puedan comenzar sus grupos pequeños de "tres tercios", es decir, grupos de iglesias saludables que se multiplican.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras estamos en la última herramienta del <Text style={styles.keyword}>4to campo del crecimiento</Text>. Listo para entrar al <Text style={styles.keyword}>círculo del medio</Text>, llamado <Text style={styles.keyword}>el liderazgo</Text>. Para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. <Text style={styles.keyword}>La próxima herramienta 10. Los 5 Niveles del Liderazgo</Text>
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
            source={require("../../assets/videos/Herramienta9.mp4")}
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
          {/* <View style={styles.contentContainer}>
            <Image
              source={require("../../assets/fotos/herramienta9.jpg")}
              style={styles.toolImage}
            />
          </View> */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>CÓMO JUNTAR DISCÍPULOS EN GRUPOS</Text>
            <Text style={styles.subtitle}>
              GUÍA DE LA MANO IZQUIERDAbPARA EL INICIO DE IGLESIA
            </Text>
            <Image
              source={require("../../assets/fotos/herramienta009.png")}
              style={estilosIndividual.toolImage}
            />
            <Text style={styles.subtitle}>Preguntas</Text>
            
              <Text style={styles.keyword}>¿Quién es la iglesia?</Text>
              <Text style={styles.paragraph}>
              CREYENTES ARREPENTIDOS Y BAUTIZADOS: Para responder esta pregunta
              por primera vez, hemos elegido un pasaje de las Escrituras. Hechos
              2: 36-47 que nos muestra el punto de entrada para la formación de
              las primeras iglesias del Nuevo Testamento. La iglesia consiste en
              creyentes bautizados arrepentidos
            </Text>
           
              <Text style={styles.keyword}>¿Qué hace una iglesia?</Text>
              <Text style={styles.paragraph}>
              CÍRCULO SALUDABLE DE LA IGLESIA: Aquí necesitamos hacer una lista
              simple de las actividades de la primera iglesia que se registraron
              para nosotros en Hechos 2: 36-47 y podemos consultar el Círculo
              Saludable de la Iglesia que se encuentra en la página 18.
            </Text>
           
              <Text style={styles.keyword}>¿Dónde se reúnen las iglesias?</Text>
              <Text style={styles.paragraph}>
              EN CUALQUIER LUGAR: La respuesta se encuentra en las siguientes
              escrituras. Hechos 2: 46 / 5: 42 / 16: 40 / 17: 5-7 / 18:7 / 19: 9
              / 20: 20 / Romanos 16: 1-5. 1 Cor. 16:19 / Col. 4:15 / Filemón 1:
              1-2
            </Text>
            
              <Text style={styles.keyword}>¿Cuándo se reúnen?</Text>
              <Text style={styles.paragraph}>
              EN CUALQUIER MOMENTO: Aquí la respuesta no está escrita en piedra;
              de hecho, el precedente de la primera iglesia señalará las
              reuniones diarias (ver Hechos 2:46) y el primer día de la semana
              (Hechos 20: 7). Sin embargo, lo que se puede afirmar es la
              necesidad de un plan regular de reuniones. Hebreos 10: 24-25.
            </Text>
           
              <Text style={styles.keyword}>¿Por qué se reúnen?</Text>
              <Text style={styles.paragraph}>
              PARA GLORIFICAR A DIOS Y ANIMARSE UNOS A OTROS: La respuesta aquí
              es nuestro motivo principal. 1 Cor. 10:31 dice: “Así que, ya sea
              que coman o beban o hagan cualquier otra cosa, háganlo para la
              gloria de Dios” hebreos 10:24 y Juan 17: 20-21
            </Text>
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
      <View>
        <Image
          source={require("../../assets/marcadores/campo4.png")}
          style={styles.marker}
        />
      </View>
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
  toolImage: {
    width: width - 32, // Se ajusta el ancho al contener con margen de 8 (8 * 2)
    height: width / 1.7, // Ajusta la altura automáticamente
    borderRadius: 10,
    marginBottom: 40,
  },
});
