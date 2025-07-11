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

export default function Herramienta3({ route }) {
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
      toolName: "Her 3: Testimonio 15s",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta3", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 3: Testimonio 15s</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Herramienta número 3 en tu manual de entrenamiento <Text style={styles.keyword}>palabras clave</Text>. El cómo sembrar la semilla.
        </Text>
        <Text style={styles.paragraph}>
        En el último entrenamiento estudiamos la herramienta número 3 Abriendo Casas de Paz. Aprendimos el fundamento bíblico de las iglesias en las casas. También aprendimos cuando Jesús envió a sus discípulos a buscar una persona de paz, les dijo algunas cosas que SÍ debían hacer y otras que <Text style={styles.keyword}>NO</Text>. Y lo último que aprendimos son las tres características de una persona de paz. Número uno recibe al mensajero. Dos recibe el mensaje. Y tres recibe la misión.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Ahora veremos la herramienta número 3. El Testimonio en 15 Segundos. </Text>
        <Text style={styles.paragraph}>
        El testimonio en quince segundos <Text style={styles.keyword}>Juan 4</Text>. Jesús les dijo a sus discípulos que él necesitaba pasar por Samaria donde la mayoría de los judíos nunca iban. En esta región se encontraba un pueblo llamado Sicar en donde había un pozo de agua para refrescar a los viajeros. Al medio día los discípulos dejaron a Jesús en el pozo y se fueron al pueblo.
        </Text>
        <Text style={styles.paragraph}>
        En seguida apareció una mujer y Jesús le pidió agua. Ella se sorprendió porque los judíos nunca hablaban con una mujer samaritana. Él le habló acerca del agua de la Vida Eterna que cuando la pruebas nunca más tendrás sed. Jesús le mostró lo pecadora que ella era, pero también le mostró como el Padre estaba buscando a todos los que le adorarían en espíritu y en verdad. Ella luego corrió al pueblo para contar a todos su testimonio de que ella había encontrado al Mesías. Todos estaban tan impresionados que salieron del pueblo y fueron a ver a Jesús. <Text style={styles.keyword}>Juan 4:30</Text>
        </Text>
        <Text style={styles.paragraph}>
        Muchos de los samaritanos que vivían en aquel pueblo creían en Él, por el testimonio que daba la mujer. <Text style={styles.keyword}>Juan 4:39</Text>. Así cuando los samaritanos fueron a su encuentro le insistieron en que se quedara con ellos. Jesús permaneció allí dos días. <Text style={styles.keyword}>Juan 4:40</Text>. Jesús nos mandó que vayamos al mundo entero con su mensaje. Él dijo vayan y hagan discípulos en todas las naciones. <Text style={styles.keyword}>Mateo 28:19</Text>.
        </Text>
        <Text style={styles.paragraph}>
        Nosotros no debemos esperar que el mundo venga a nosotros o a nuestra iglesia. Las personas en el mundo no pueden darse cuenta por sí mismas. Es decir, alguien tuvo que mostrarnos cómo ser salvos. No podemos esperar que nuestra familia y nuestros amigos se pierdan.
        </Text>
        <Text style={styles.paragraph}>
        Un testimonio no explica el evangelio pero sirve como un puente o introducción a una explicación más detallada del evangelio. El objetivo es que quien escucha quiera escuchar más acerca del evangelio. En Juan 9 cuenta la historia de un hombre ciego que Jesús sanó. Llamaron al hombre delante de los fariseos para dar testimonio del milagro. ¿Cuánto conocimiento fue necesario para que él diera un testimonio efectivo en <Text style={styles.keyword}>Juan 9:25</Text>?
        </Text>
        <Text style={styles.paragraph}>
        La respuesta, solo fue necesario su experiencia personal. El ciego respondió a los fariseos: Una cosa sé, que habiendo sido ciego, ahora veo o sé que soy salvo para siempre. Este fue un testimonio dinámico de 4 segundos, dado en el momento preciso que tuvo un gran impacto. Así como lo tendrá el tuyo. Todos tenemos un testimonio que contar. El testimonio es un puente al evangelio; demasiados detalles pueden convertirse en una distracción.
        </Text>
        <Text style={styles.paragraph}>
        Debido a que a veces tenemos miedo de hablar de Jesús o de abrir nuestra Biblia y compartir un pasaje de las escrituras, una excelente manera de comenzar una conversación es compartiendo tu historia. Tu testimonio personal es muy poderoso porque demuestra que Dios tiene poder para cambiar nuestras vidas. Es una historia de contrastes entre tu antigua vida y tu nueva vida en Jesús. Sin embargo, uno de los mayores errores al compartir nuestro testimonio es compartir demasiados detalles y demasiado tiempo. Pero hay poder en tu historia.  
        </Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento pídeles a tus participantes que tengan una hoja de papel y dibujen una cruz arriba en el centro. Luego una flecha apuntando hacia atrás y una flecha apuntando hacia adelante. Diles que su testimonio se trata de su vida antes de Cristo, luego del momento en que vinieron a Jesús y ahora en Cristo. En otras palabras, el ANTES, COMO Y DESPUÉS de conocer a Cristo.  
        </Text>
        <Text style={styles.paragraph}>
        Pídeles que dibujen 2 líneas a la izquierda, 2 líneas de abajo y 2 líneas a la derecha. A la izquierda pídeles que escriban la frase "hubo un tiempo en mi vida". En el centro que escriban "pero un día", y en el lado derecho que escriban "ahora en Jesús".
        </Text>
        <Text style={styles.paragraph}>
        Diles a tus participantes que cuando entrenen a otros necesitan pensar y escribir a la izquierda dos palabras que describan su vida anterior. Dos palabras que describan cuando se convirtieron en Jesús y dos palabras a la derecha que describan su vida ahora en Jesús.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Veamos un ejemplo:</Text>
        <Text style={styles.paragraph}>
        Hubo un tiempo en mi vida en el que vivía inseguro y enojado, pero un día alguien me habló del sacrificio de Jesús. Puse mi confianza en Él y me bauticé. Ahora en Jesús estoy seguro y lleno de gozo. ¿Tienes tú una historia como esta?
        </Text>
        <Text style={styles.paragraph}>
        Esta última pregunta es muy importante ya que invita a la otra persona a compartir su propia experiencia. Así que mientras sembramos la semilla, conoce y comparte tu historia porque hay poder en ella. En el libro de <Text style={styles.keyword}>Hechos capítulo 22 y 26</Text> vemos que el apóstol Pablo compartía su historia. Tú también tienes una historia, la historia de Dios y él está obrando en tu vida y hay poder en tu testimonio de 15 segundos.  
        </Text>
        <Text style={styles.paragraph}>
        Además, recuerda mantener tu historia corta. Esta herramienta es solo la puerta a la próxima herramienta que es la poderosa historia que cambia vidas, la historia de Jesús, llamada los 3 círculos. En tu historia, mira hacia atrás, mira hacia arriba y mira hacia adelante. Recuerda que estás entrenando a otros sobre cómo sembrar la semilla. Cuando practiques esta herramienta en grupo, pídele a un participante que inicie. Y al terminar, que elija a otro participante para que le haga la pregunta: ¿tienes tú una historia como esta? Y así lo vayan haciendo uno por uno.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras seguimos en el <Text style={styles.keyword}>2do campo, La siembra</Text>. Listo para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. La próxima herramienta 4. Los 3 Círculos.
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
            source={require("../../assets/videos/Herramienta3.mp4")}
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
            <Text style={styles.title}>CÓMO SEMBRAR LA SEMILLA</Text>
            <Text style={styles.subtitle}>CONOZCA SU HISTORIA</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Nota: </Text>¡Su testimonio personal
              es muy poderoso porque demuestra que Dios tiene poder para cambiar
              nuestras vidas! Es una historia de contrastes entre tu antigua
              vida y tu nueva vida en Cristo. Pero uno de los mayores errores al
              compartir nuestro testimonio es que compartimos demasiados
              detalles y demasiado tiempo. Hay poder en tu historia.
            </Text>
            <Image
              source={require("../../assets/fotos/herramienta003.jpg")}
              style={estilosIndividual.toolImage}
            />
            <Text style={styles.paragraph}>
              Piense en DOS PALABRAS que describan su vida antes de conocer a
              Jesús. Luego piense en DOS PALABRAS que describan su conversión.
              Luego, DOS PALABRAS que describen tu vida después de convertirte
              en cristiano. 
            </Text>
            <Text style={styles.paragraph}>
            <Text style={styles.keyword}>EJEMPLO: </Text>
              “Hubo un tiempo en mi vida en el que estaba inseguro y enojado.
              Luego conocí a Jesús, puse mi confianza en Él y lo hice número uno
              en mi vida. Ahora estoy a salvo y lleno de alegría.
            </Text>
            <Text style={styles.keyword}>
                ¿Tienes una historia como esta?”
            </Text>
            <Text style={styles.paragraph}>
              Esa última pregunta es muy importante, ya que invita a la otra
              persona a compartir su propia experiencia. Cuando practique este
              método en un grupo, use esa última frase para pasársela a alguien
              más en el grupo para que la practique… y así sucesivamente.
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
    marginVertical:8,
    width: width -32, // Se ajusta el ancho al contenedor con margen de 8 en cada lado (8 * 2)
    height: (width - 32) /2.4, // Ajusta la altura automáticamente manteniendo la proporción
    borderRadius: 10,
  },
  
});