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

export default function Herramienta5({ route }) {
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
      toolName: "Her 5: El Semáforo",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta5", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 5: El Semáforo</Text>
        <Text style={styles.subtitle}>Herramienta 5: El Semáforo</Text>

        <Text style={styles.paragraph}>
          Bienvenido al{" "}
          <Text style={styles.keyword}>
            MOVIMIENTO DE ALCANCE MUNDIAL{" "}
            <Text style={styles.mayuscula}>M.A.M</Text>
          </Text>
          . El entrenamiento de multiplicación de los cuatro campos de un
          discipulado. Herramienta número 5 en tu manual de entrenamiento.
          Cuando nosotros compartimos el evangelio, siempre vamos a encontrarnos
          con diferentes respuestas.{" "}
          <Text style={styles.keyword}>
            El semáforo. "Las Cuatro Respuestas que Obtenemos Cuando Compartimos
            el Evangelio"
          </Text>
          . Son cuatro respuestas al evangelio que siempre vamos a ver y
          necesitamos estar conscientes de que habrá esas respuestas. Porque, si
          no, no podemos encontrarnos con la primera respuesta y, como decimos
          muchas veces, tiramos la toalla respecto al evangelismo. O simplemente
          decimos: "hoy no quiero meterme en eso porque me fue muy mal". Pero,
          como seguidores de Jesús, necesitamos conocer estas cuatro respuestas
          y qué hacer al respecto.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Pasaje Bíblico:</Text>
        <Text style={styles.paragraph}>
          Quiero invitarlos a que tomen una hoja de
          papel. Si no la tienen, corran a buscar una. Vamos a escribir en la
          parte de arriba de la hoja las "Cuatro Respuestas al Evangelio".
          También vamos a poner un pasaje, que se encuentra en Hechos, capítulo
          17, versículos 32 al 34:
        </Text>
        <Text style={styles.paragraph}>
          "Pero cuando oyeron lo de la resurrección de los muertos, unos se
          burlaban, y otros decían: 'Ya te oiremos acerca de esto otra vez.' Y
          así, Pablo salió de en medio de ellos. Más algunos creyeron,
          juntándose con él, entre los cuales estaban Dionisio el Areopagita,
          una mujer llamada Damaris y otros con ellos."
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Observaciones:</Text>
        <Text style={styles.paragraph}>
          Pablo compartió el evangelio con una gran multitud de personas. Ahora
          vamos a dibujar un semáforo. Dibujen un rectángulo vertical y coloquen
          sus tres luces en la parte de arriba: la luz roja, la luz amarilla y
          la luz verde.
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            - A la izquierda, vamos a poner la respuesta de la gente en Hechos,
            capítulo 17, que tuvieron al evangelio.
          </Text>
          <Text style={styles.listItem}>
            - En la parte derecha, vamos a poner nuestra postura ante su
            respuesta.
          </Text>
          <Text style={styles.listItem}>
            1. Rojo: Se burlaban del mensaje del evangelio. La respuesta de
            ellos fue un "no".
          </Text>
          <Text style={styles.listItem}>
            2. Amarillo: Algunos dijeron: "Te oiremos más otra vez". La
            respuesta de ellos fue un "tal vez".
          </Text>
          <Text style={styles.listItem}>
            3. Verde: Algunos creyeron, y la respuesta de ellos fue que sí.
          </Text>
        </View>
        <Text style={styles.paragraph}>
          Así que vemos esas tres respuestas cuando se comparte el evangelio: un
          "no" en forma de burla, un "tal vez" y un "sí". Pero también hay una
          cuarta respuesta que te vas a encontrar, que se representa con una
          cruz. La cuarta respuesta es:{" "}
          <Text style={styles.keyword}>
            "Yo ya soy cristiano" o "Yo ya soy cristiana"
          </Text>
          .
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Nuestra Respuesta:</Text>
        <Text style={styles.paragraph}>
          Ahora, la pregunta es: ¿cuál va a ser nuestra respuesta cuando
          hablemos a otros de Cristo? Te vas a encontrar con personas que te
          pondrán un semáforo en rojo. El problema es que, cuando nos
          encontramos con una persona que nos pone el semáforo en rojo, a veces
          nos desanimamos y dejamos de hablarles a otros por causa de una o dos
          personas que pusieron semáforo en rojo. Imagínate si en Atenas había
          miles de personas; unas cuantas pusieron semáforo en rojo.
        </Text>
        <Text style={styles.paragraph}>
          Cuando nos encontramos con una persona que nos pone el semáforo en
          rojo, nuestra respuesta debe ser orar por ellos y servirles. A veces,
          esas personas son familiares, vecinos, compañeros de trabajo,
          compañeros de escuela o incluso nuestros padres, esposas, hermanos o
          primos. Entonces, a ellos sí podemos orar y servirles, buscando
          oportunidades para ayudarles.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>
            Lo que no debemos hacer es desanimarnos. No te desanimes si alguien
            te pone el semáforo en rojo. Sigue hablando y compartiendo.
          </Text>
        </Text>
        <Text style={styles.paragraph}>
          Te vas a encontrar también con personas que te ponen el semáforo en
          amarillo. Esto significa que están en un punto intermedio, como cuando
          los invitas a una reunión y parecen interesados, pero no se animan.
          Nuestra respuesta será ser amables y servirles. Aunque no te dicen que
          no, lo importante es mantener la puerta abierta porque, en muchos
          casos, cuando surgen problemas o dificultades en sus vidas, eres tú a
          quien van a buscar.
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Finalidad:</Text>
        <Text style={styles.paragraph}>
          Cuando tenemos un semáforo en verde, es decir, cuando la persona
          quiere conocer a Cristo, nuestra respuesta debe ser estar listos para
          entrenarlos y equiparlos. Es muy importante que cada seguidor de
          Cristo sepa cómo entrenar y equipar a las personas que están abiertas
          a recibir el evangelio. Si no lo hacemos, podemos caer en la trampa de
          pensar que solo los pastores deben hacerlo. La voluntad de Dios es que
          la iglesia esté entrenada y equipada para poder compartir el
          evangelio.
        </Text>
        <Text style={styles.paragraph}>
          De la multitud que Pablo encontró en Hechos 17, solo unas pocas
          personas respondieron positivamente. Al final, podemos decir que,
          aunque el número es pequeño, si esas personas son bien entrenadas y
          equipadas, algo precioso sucederá. Su respuesta puede ser el inicio de
          una congregación que brinde luz a toda la ciudad.
        </Text>
        <Text style={styles.paragraph}>
          Si alguien ya te dice que es cristiano, vamos a hacer exactamente lo
          mismo que con el semáforo en verde: entrenarlos. A través del
          entrenamiento, esa persona puede aprender sobre ser parte de una
          iglesia saludable.
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Conclusión:</Text>
        <Text style={styles.paragraph}>
          Quiero animarte a que, si te encuentras con personas que ponen el
          semáforo en rojo, no te desanimes. Continúa compartiendo tu fe. Si te
          dicen "amarillo", sé amable y sírveles. Si te dicen "verde",
          entrénalos. Y si te dicen que ya son cristianos, también entrénalos
          para que conozcan más sobre cómo ser parte de una iglesia saludable.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>
            Que la Gracia de nuestro Señor Jesucristo sea con todos nosotrose
          </Text>{" "}
          mientras culminamos con última herramienta del{" "}
          <Text style={styles.keyword}>el 2do campo de siembra</Text>. Listo
          para entrar al 3er campo del crecimiento, llamado el crecimiento.
          Listo para entrenar a otros que entren a otros con esta herramienta
          simple, bíblica y fácil de reproducir. La próxima herramienta 6.{" "}
          <Text style={styles.keyword}>El 4.1.1.</Text>
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
            source={require("../../assets/videos/Herramienta5.mp4")}
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
            <Text style={styles.subtitle}>las 4 respuestas del evangelio</Text>
            <Text style={styles.subtitle}>hechos 17:32-34</Text>
            
            <Text style={styles.paragraph}>
              <Image
              source={require("../../assets/fotos/herramienta51.png")}
              style={estilosIndividual.toolImage}
            /> V.32 Y como oyeron la resurrección de los muertos, unos se burlaban
            </Text>
            
            <Text style={styles.paragraph}>
            <Image
              source={require("../../assets/fotos/herramienta52.png")}
              style={estilosIndividual.toolImage}
            /> V.32 Y otros decían: Te oiremos acerca de esto otra vez.
            </Text>
           
            <Text style={styles.paragraph}>
            <Image
              source={require("../../assets/fotos/herramienta53.png")}
              style={estilosIndividual.toolImage}
            /> V.33 Y así Pablo salió de en medio de ellos. V.34 Mas algunos creyeron, juntándose con él. 
            </Text>
            <Image
              source={require("../../assets/fotos/herramienta54.png")}
              style={estilosIndividual.toolImage2}
            />
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
          source={require("../../assets/marcadores/campo2.png")}
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
    width: 15, 
    height: 15, 
    borderRadius: 10,
    marginBottom: 8,
  },
  toolImage2: {
    left:-6,
    width: 365,
    height: 500,
    borderRadius: 10,
    marginTop:20,
    marginBottom: 16,
    resizeMode:"stretch",
  },
});
