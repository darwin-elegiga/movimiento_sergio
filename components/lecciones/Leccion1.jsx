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
      lessonName: "Leccion1: Bosquejo del Entrenamiento",
    });
  };

  const openWord = () => {
    navigation.navigate("Leccion1", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lección 1: Bosquejo del Entrenamiento</Text>
        <Text style={styles.paragraph}>
          Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de
          multiplicación de los cuatro campos de un discipulado. Cuando
          comienza, en un entrenamiento lo que debes hacer es presentar el
          bosquejo de este entrenamiento, y este es básicamente nuestro
          bosquejo. Trabajamos dentro de estos parámetros. Esto es genial porque
          toda la idea de ser discípulos y de multiplicar tiene la base de ser
          simple, bíblico y fácil de reproducir.
        </Text>
        <Text style={styles.paragraph}>
          La idea es introducir al lector al entrenamiento de multiplicación
          enfocado en el discipulado. Explica que el entrenamiento se basa en un
          bosquejo que se presentará y que sigue una estructura específica. La
          simplicidad, base bíblica y la reproducibilidad son destacadas como
          características esenciales del proceso, preparando al lector para el
          contenido de la formación.
        </Text>
        <Text style={styles.paragraph}>
          Antes de que podamos entrenar a alguien en compartir el evangelio,
          tenemos que entender la gran visión de Dios. Es grande, es del tamaño
          de Dios y no de nuestra limitada perspectiva. A veces, simplemente
          reducimos el reino de Dios al tamaño de nuestros pensamientos, pero lo
          que debemos entender es que Dios tiene una gran visión. Y esta es <Text style={styles.keyword}>global</Text>. Miraremos desde Génesis hasta Apocalipsis; también es <Text style={styles.keyword}>local</Text>. Echaremos un vistazo a algunos hechos impactantes sobre nuestras áreas; y también es <Text style={styles.keyword}>personal.</Text> Todos estamos conectados y relacionados
          con otras personas.
        </Text>
        <Text style={styles.paragraph}>
          Es necesario enfatizar la necesidad de comprender la visión expansiva
          de Dios antes de entrenar a otros. Se menciona que esta visión es
          global, local y personal, lo que resalta la conectividad entre las
          personas y la importancia de ver el evangelio desde una perspectiva
          amplia. La referencia a Génesis y Apocalipsis sugiere que la visión de
          Dios trasciende el tiempo y el espacio.
        </Text>
        <Text style={styles.paragraph}>
          Antes de que consideremos equipar con diferentes herramientas,
          aclaremos que <Text style={styles.keyword}>Dios tiene una gran visión</Text>. Luego, en el <Text style={styles.keyword}>paso libre</Text>,
          trabajamos dentro de los cuatro campos: cómo entrar a un campo vacío,
          cómo sembrar la semilla, cómo ayudar a crecer haciendo discípulos que
          hagan otros discípulos, y cómo juntar la cosecha; sí, como reunir
          grupos en la comunidad que se multipliquen de manera saludable. En la <Text style={styles.keyword}>parte del centro se encuentra el liderazgo.</Text> Así que <Text style={styles.keyword}>gran visión, paso libre</Text> y, a medida que se equipa y se avanza en el entrenamiento, están las dos herramientas simples que obtendrás y podrás poner en tu corazón, que podrás poner en tu caja de herramientas, en tu bolsillo; y a medida que los discípulos van por la vida, pueden usar estas herramientas al entrar en campos corazones vacíos y al sembrar la semilla.
        </Text>
        <Text style={styles.paragraph}>
          Se debe describir bien las acciones específicas que se llevarán a cabo
          en el entrenamiento, centrándose en los <Text style={styles.keyword}>"cuatro campos"</Text> del discipulado: <Text style={styles.keyword}>entrar en campos vacíos, sembrar, ayudar a crecer y cosechar</Text>. Es necesario mencionar la centralidad del liderazgo y la importancia de las herramientas prácticas que los participantes podrán usar a lo largo de su vida para compartir el evangelio.
        </Text>
        <Text style={styles.paragraph}>
          Les animamos a revisar el bosquejo presentado, con los recursos que se
          proporcionan en la aplicación móvil, tales como videos ilustrativos,
          imágenes y PowerPoint.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras eches un vistazo a nuestro bosquejo: <Text style={styles.keyword}>gran visión, paso libre y herramientas simples</Text>.
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
            source={require("../../assets/videos/Leccion1.mp4")}
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
              CARACTERÍSTICAS DE LOS MOVIMIENTOS DE MULTIPLICACIÓN DE LA IGLESIA
            </Text>
            <Text style={styles.paragraph}>
              Mateo 28:18-20 Por tanto, id, y haced discípulos a todas las
              naciones, bautizándolos en el nombre del Padre, y del Hijo, y del
              Espíritu Santo; enseñándoles que guarden todas las cosas que os he
              mandado.
            </Text>
            <Text style={styles.subtitle}>GRAN VISIÓN</Text>
            <Text style={styles.paragraph}>
              • Global Génesis ___________ Apocalipsis
            </Text>
            <Text style={styles.paragraph}>
              • Local ____________ Hechos impactantes
            </Text>
            <Text style={styles.paragraph}>
              • Personal ____________ Mapa relacional
            </Text>
            <Text style={styles.subtitle}>PASOS CLAROS</Text>
            <Image
              source={require("../../assets/fotos/leccion1.png")}
              style={estilosIndividual.toolImage}
            />
            <Text style={styles.subtitle}>HERRAMIENTAS SIMPLES</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• Mapa relacional</Text>
              <Text style={styles.listItem}>• Casa de Paz</Text>
              <Text style={styles.listItem}>• Testimonio 15s</Text>
              <Text style={styles.listItem}>• Los 3 Circulos</Text>
              <Text style={styles.listItem}>• El Semáforo</Text>
              <Text style={styles.listItem}>• EL 4.1.1</Text>
              <Text style={styles.listItem}>• Los 3 Tercios</Text>
              <Text style={styles.listItem}>• El Círculo saludable</Text>
              <Text style={styles.listItem}>• Guía de la Mano Isquierda</Text>
              <Text style={styles.listItem}>• 5 Niveles del Liderazgo</Text>
              <Text style={styles.listItem}>• Hierro Sobre Hierro</Text>
              <Text style={styles.listItem}>• MAOI</Text>
              <Text style={styles.listItem}>• Dinámica de cómo funciona la multiplicación</Text>
            </View>
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
  toolImage: {
    width: width - 34, // Se ajusta el ancho al contener con margen de 8 (8 * 2)
    height: width / 1.1, // Ajusta la altura automáticamente
    borderRadius: 10,
    marginBottom: 8,
  },
});
