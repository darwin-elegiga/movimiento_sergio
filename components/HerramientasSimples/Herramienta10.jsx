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

export default function Herramienta10({ route }) {
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
      toolName: "Her 10: 5 Niveles del Liderazgo",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta10", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Herramienta 10: los 5 Niveles del Liderazgo
        </Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. En esta ocasión, abordaremos la herramienta número diez: desarrollando líderes que se multipliquen. Esta herramienta se llama <Text style={styles.keyword}>"Los 5 niveles de liderazgo"</Text> y destaca la multiplicación de movimientos. Al finalizar este entrenamiento, tus participantes comprenderán que tenemos un gran y hermoso trabajo que hacer en el mundo y que hay un potencial enorme en sus vidas para servir a Dios de manera más grande y mejor, dependiendo de los talentos, dones y habilidades que Dios les ha dado
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>
        Los cinco niveles de liderazgo son: 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>El nivel 1</Text> es el sembrador de semilla. Este individuo es obediente al esparcir el evangelio de Jesucristo; sale y siembra la semilla. A veces, ocurre algo triste: no muchas personas son sembradores de semilla. De hecho, se dice que el 97% de los creyentes no comparten el evangelio ni su fe con otros. Aquí vemos que, como iglesia, tenemos un gran problema. 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>El nivel 2</Text> es el iniciador de grupo pequeño; este individuo no solo es obediente al evangelio, sino que también inicia un grupo pequeño. Esto es hermoso, porque comienza a plantar una iglesia.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>El nivel 3</Text> es el multiplicador de grupos pequeños. Esta persona no solo inicia un grupo, sino que también sabe cómo hacerlo y comienza a capacitar a otras personas. Así, inicia otro grupo, y luego otro, multiplicando su impacto. Para convertirse en un plantador de grupos pequeños, uno puede hacerlo usando sus dones y talentos, pero para ser un multiplicador, es fundamental creer, confiar y empoderar a otras personas, lo cual es muy poderoso. 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>El nivel 4</Text> es el entrenador de multiplicación. Este individuo es obediente a los niveles 1, 2 y 3, y busca trabajar fuera de su movimiento. Inicia una corriente y llega a la tercera o cuarta generación de la iglesia inicial. Un entrenador de multiplicación, después de haberlo logrado una vez, inicia múltiples corrientes, creando así un movimiento.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>El nivel 5</Text> es el catalizador de movimiento. Este es el tipo de liderazgo que tuvo el apóstol Pablo, quien fue un evangelista imparable. Es un individuo que opera en múltiples movimientos, ganando diferentes áreas, regiones o países. 
        </Text>
        <Text style={styles.paragraph}>
        Alguien puede preguntarse cómo llegar a este nivel cinco. La respuesta es sencilla: comienza desde el nivel 1. Esto es hermoso porque si eres un evangelista, puedes crecer y desarrollar una corriente, e incluso un movimiento. Es importante comprender que a la izquierda de una línea que trazamos, solo hay adición, pero al cruzar hacia la derecha, se encuentra la multiplicación, que es la creación de un movimiento. 
        </Text>
        <Text style={styles.paragraph}>
        Al observar los cuatro campos bajo el <Text style={styles.keyword}>nivel 1</Text> consideramos qué herramientas necesita un sembrador de semilla. Para un sembrador de semilla, es crucial saber cómo ingresar a un campo vacío utilizando el mapa relacional y la casa de la persona de paz. También es esencial saber cómo sembrar la semilla a través del testimonio de quince segundos, los tres círculos y el semáforo. Así, el sembrador de semilla comienza a crecer en obediencia. 
        </Text>
        <Text style={styles.paragraph}>
        Ahora, pasamos al <Text style={styles.keyword}>nivel 2</Text>, el plantador de grupo pequeño. Las herramientas necesarias para ser un plantador de un grupo pequeño incluyen las herramientas para entrar en un campo vacío, las herramientas de siembra y las del crecimiento, como <Text style={styles.keyword}>el 4.1.1</Text> y <Text style={styles.keyword}>los 3/3</Text>. También son necesarias las herramientas de <Text style={styles.keyword}>la cosecha</Text>, como <Text style={styles.keyword}>el círculo saludable de la iglesia y la guía de la mano izquierda para comenzar una iglesia</Text>. Sin embargo, para pasar de la adición a la multiplicación, necesitarás las herramientas del centro que son de desarrollo de liderazgo y multiplicación.
        </Text>
        <Text style={styles.paragraph}>
        La herramienta de los cinco niveles de liderazgo es realmente maravillosa y útil para evangelistas, misioneros y líderes. Les ayudará a comprender la importancia de equipar a los miembros de la iglesia. No todos en la iglesia se convertirán en un catalizador de movimiento o en un entrenador de multiplicación, ni en plantadores de grupos pequeños. Pero lo que queremos lograr con este entrenamiento es equipar a los miembros para que al menos sean sembradores de semilla, obedientes al compartir el evangelio de Jesucristo en el lugar donde se encuentran.
        </Text>
        <Text style={styles.paragraph}>
        Durante tu entrenamiento, divide a los participantes en grupos y pídeles que dibujen los cinco niveles de liderazgo, para que así puedan comprender y discutir en grupo. En la iglesia, las personas tienen diferentes dones, habilidades y talentos, y hay algunos evangelistas que están ansiosos por plantar más iglesias y activar un movimiento de multiplicación. Esta herramienta está diseñada para ellos, y podemos alcanzar nuestra región, comunidad y país, tal como lo hizo la iglesia del primer siglo. 
        </Text>
        <Text style={styles.paragraph}>
        Dios te bendiga mientras entrenas y equipas a otros. Necesitamos hacerlo porque la mies es mucha y pocos los obreros. Al hablar de la iglesia, no la llenes solo de información; necesitamos modelar cómo entrenamos y equipamos a los demás para liberarlos para su servicio. Así, serás un modelo para otros y ellos seguirán tu ejemplo, equipando y liberando a alguien más. Así es como logramos la multiplicación de iglesias. Necesitamos muchos multiplicadores de iglesias.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras continuamos con las herramientas del <Text style={styles.keyword}>4to campo de la cosecha</Text>. <Text style={styles.keyword}>El círculo del medio</Text>, llamado <Text style={styles.keyword}>el liderazgo</Text>. Para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. <Text style={styles.keyword}>La próxima herramienta 11. Hierro con Hierro</Text>. 
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
            source={require("../../assets/videos/Herramienta10.mp4")}
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
              CÓMO DESARROLLAR LÍDERES QUE SE MULTIPLIQUEN
            </Text>
            <Text style={styles.subtitle}>LOS 5 NIVELES DEL LIDERAZGO</Text>

            <Text style={styles.subtitle}>N 1: sembrador de semilla</Text>
            <Image
              source={require("../../assets/fotos/herramienta00101.png")}
              style={estilosIndividual.toolImage2}
            />
            <Text style={styles. subtitleDos}>Un discípulo que</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Difunde el evangelio entre familiares y amigos.
              </Text>
              <Text style={styles.listItem}>
                • Domina herramientas sencillas y eficaces para compartir el
                evangelio.
              </Text>
              <Text style={styles.listItem}>• Ama a las personas perdidas</Text>
              <Text style={styles.listItem}>
                • Modela la siembra de semillas para otros
              </Text>
            </View>
            </View>


            <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>N 2: plantador de grupo pequeño</Text>
            <Image
              source={require("../../assets/fotos/herramienta00102.png")}
              style={estilosIndividual.toolImage2}
            />
            <Text style={styles. subtitleDos}>Un líder de nivel 1 que</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Aprende cómo hacer discípulos y plantar iglesias.
              </Text>
              <Text style={styles.listItem}>
                • Entrena a trabajadores de nivel 1 para compartir el evangelio
              </Text>
              <Text style={styles.listItem}>
                • Forma a los discípulos en grupos que se convierten en iglesias
              </Text>
            </View>
            </View>


            <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>
              N 3: Multiplicador de Grupos pequeños
            </Text>
            <Image
              source={require("../../assets/fotos/herramienta00103.png")}
              style={estilosIndividual.toolImage}
            />
             <Text style={styles. subtitleDos}>Un líder de nivel 2 que</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
              • Comienza iglesias que reproducen iglesias hasta cuatro generaciones.
              </Text>
              <Text style={styles.listItem}>
              • Equipa líderes de nivel 1 y nivel 2 
              </Text>
              <Text style={styles.listItem}>
              • Garantiza la salud de las iglesias y otorga autoridad a los líderes locales.
              </Text>
            </View>
            </View>
            

            <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>
              N 4: Entrenador de Multiplicación
            </Text>
            <Image
              source={require("../../assets/fotos/herramienta00104.png")}
              style={estilosIndividual.toolImage}
            />
             <Text style={styles. subtitleDos}> Un líder de nivel 3 que</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
              • Produce cuatro generaciones de nuevas iglesias a través de múltiples corrientes de plantación de iglesias.
              </Text>
              <Text style={styles.listItem}>
              • Se involucra más allá de la propia red del líder para proyectar una visión y entrenar para la multiplicación.
              </Text>
              <Text style={styles.listItem}>
              • Identifica y resuelve las barreras de la multiplicación.
              </Text>
            </View>
            </View>
        

            <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>N 5: Catalizador Movimiento</Text>
            <Image
              source={require("../../assets/fotos/herramienta00105.png")}
              style={estilosIndividual.toolImage}
            />
             <Text style={styles. subtitleDos}>Un líder de nivel 4 que</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
              • Se convierte en un catalizador para múltiples corrientes de plantación de iglesias entre grupos étnicos no alcanzados.
              </Text>
              <Text style={styles.listItem}>
              • Equipa a líderes de nivel 3 y nivel 4 para facilitar múltiples corrientes de múltiples generaciones de plantación de iglesias
              </Text>
              <Text style={styles.listItem}>
              • Se especializa en redes, recursos y proyección de visión
              </Text>
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
      <View>
        <Image
          source={require("../../assets/marcadores/campo5.png")}
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
    height: width, // Ajusta la altura automáticamente
    borderRadius: 10,
    marginBottom: 8,
  },
  toolImage2: {
    width: width - 32, // Se ajusta el ancho al contener con margen de 8 (8 * 2)
    height: width / 2, // Ajusta la altura automáticamente
    borderRadius: 10,
    marginBottom: 8,
  },
});
