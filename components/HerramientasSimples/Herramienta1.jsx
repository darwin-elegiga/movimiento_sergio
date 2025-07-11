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

export default function Herramienta1({ route }) {
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
      toolName: "Her 1: Mapa Relacional",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta1", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 1: Mapa Relacional</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Como entrar a un campo vacío, el mapa relacional es la herramienta número uno. Puedes encontrar la lección cinco en la página ocho de tu manual de entrenamiento. Esta herramienta es fundamental para el alcance y para hacer discípulos.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>El Mapa Relacional: Una Interconexión Personal</Text>
        <Text style={styles.paragraph}>
        Todos estamos interconectados, no solo de manera global o local, sino también de manera personal. Las redes de relaciones son una de las mejores formas para que el evangelio se difunda y para que aprendamos a centrarnos en los campos vacíos. Este parece ser un método intencional y estratégico utilizado por Jesús y los apóstoles.
        </Text>
        <Text style={styles.paragraph}>
        En <Text style={styles.keyword}>Juan 1:41-42</Text>, vemos a Andrés que lleva a su hermano Simón a Jesús. Andrés fue a buscar a su hermano Simón y le dijo: “Hemos encontrado al Mesías, al Cristo”. Andrés llegó a su hermano Simón; la relación con Jesús es personal.
        </Text>
        <Text style={styles.paragraph}>
        En <Text style={styles.keyword}>Juan 1:43-45</Text>, Felipe trae a Natanael a Jesús, diciéndole: “Hemos hallado a aquel de quien escribió Moisés en la ley, así como los profetas: a Jesús, el hijo de José”. Nuevamente, esto es un ejemplo de lo personal de la fe.
        </Text>
        <Text style={styles.paragraph}>
        En <Text style={styles.keyword}>Hechos 10:24</Text>, vemos a Cornelio acercándose a sus parientes y amigos cercanos para presentarlos a Jesús. Cornelio estaba interconectado. En Hechos 16:15, no solo Lidia se bautiza, sino también las personas de su casa, mostrando que Lidia también estaba interconectada con ellos. 
        </Text>
        <Text style={styles.paragraph}>
        En <Text style={styles.keyword}>Hechos 16:30-33</Text>, vemos al carcelero y a su familia viniendo a Jesús.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Un Ejercicio Práctico</Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento, anima a los participantes a trazar su red relacional. Aquellos en su red deben ser personas que están cerca de ellos pero lejos de Dios. Estas mismas personas pueden ser portadores del mensaje para otras que también están alejadas de Dios.
        </Text>
        <Text style={styles.paragraph}>
        No es necesario ser teólogo; todos estamos conectados y tenemos la habilidad de compartir el evangelio de una manera sencilla porque es algo personal.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Cómo Funciona el Mapa Relacional</Text>
        <Text style={styles.paragraph}>
        En el entrenamiento, pide a los participantes que dibujen un círculo en el centro de una hoja y que escriban su nombre dentro. Luego, pídeles que dibujen círculos alrededor de ese centro y que conecten todos los círculos con líneas, tal como se muestra en el diagrama.
        </Text>
        <Text style={styles.paragraph}>
        En esos nuevos círculos, dile a los participantes que incluyan personas cercanas a ellos pero que están lejos de Dios: amigos, parientes, vecinos, compañeros de trabajo, etc. Deben escribir estos nombres en los círculos.
        </Text>
        <Text style={styles.paragraph}>
        Si tienen más personas conectadas entre sí que conocen, pídeles que dibujen otros círculos adicionales que estén conectados. Por ejemplo, en el círculo del centro puede estar "JUAN", quien tiene a su tía cerca de él, pero ella está lejos de Dios.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Algunos aspectos adicionales y complementarios que puedes considerar sobre el tema del mapa relacional en el contexto del discipulado y la evangelización:</Text>
        <Text style={styles.subtitleDos}>1. Importancia de las Relaciones Personales</Text>
        <Text style={styles.paragraph}>
        Las relaciones son fundamentales para el discipulado. Como se evidencian en los ejemplos bíblicos, las interacciones personales pueden facilitar la apertura de corazones hacia el evangelio. Esto sugiere que invertir tiempo en conocer a las personas y construir relaciones de confianza puede ser una vía más efectiva para compartir la fe.
        </Text>
        <Text style={styles.subtitleDos}>2. Identificación de Necesidades Espirituales</Text>
        <Text style={styles.paragraph}>
        Al trazar la red relacional, los participantes pueden empezar a identificar las necesidades espirituales que tienen sus amigos y familiares. Esto les permite acercarse a ellos de manera más específica, ya sea ofreciendo oración, apoyo emocional en momentos difíciles o simplemente escuchando sus inquietudes.
        </Text>
        <Text style={styles.subtitleDos}>3. Estrategias para la Conexión</Text>
        <Text style={styles.paragraph}>
        Instruye a los participantes sobre cómo establecer conexiones significativas. Pueden comenzar con actividades simples como invitar a amigos a eventos sociales, compartir un café o participar juntos en actividades recreativas. Estas interacciones informales pueden abrir puertas para conversaciones más profundas sobre la fe.
        </Text>
        <Text style={styles.subtitleDos}>4. El Rol del Testimonio Personal</Text>
        <Text style={styles.paragraph}>
        Compartir testimonios personales es una forma poderosa de evangelización. Al hablar de cómo la fe ha impactado sus vidas, los participantes pueden motivar a otros a explorar su propia espiritualidad. Tu experiencia personal puede ser un puente relevante para comunicar verdades espirituales.
        </Text>
        <Text style={styles.subtitleDos}>5. Aprovechar las Oportunidades</Text>
        <Text style={styles.paragraph}>
        Los ambientes cotidianos, como el trabajo, la escuela o el vecindario, son lugares ideales para compartir el mensaje del evangelio. Anima a los participantes a estar atentos a momentos en los cuales pueden mencionar su fe, ofrecer oración o invitar a alguien a la iglesia.
        </Text>
        <Text style={styles.subtitleDos}>6. Desarrollo del Liderazgo en Discipulado</Text>
        <Text style={styles.paragraph}>
        Al animar a otros a compartir su fe con sus redes, también estás desarrollando líderes en el discipulado. Puedes fomentar la formación de grupos de apoyo donde los participantes puedan compartir historias de éxito y desafíos al compartir el evangelio, creando así una comunidad de aprendizaje mutuo.
        </Text>
        <Text style={styles.subtitleDos}>7. Seguimiento y Acompañamiento</Text>
        <Text style={styles.paragraph}>
        El evangelismo relacional no termina con una invitación o conversación inicial. Es crucial dar seguimiento a las interacciones. Esto puede incluir preguntar sobre cualquier decisión que hayan tomado, invitar nuevamente a eventos o simplemente seguir construyendo la relación.
        </Text>
        <Text style={styles.subtitleDos}>8. El Poder de la Oración</Text>
        <Text style={styles.paragraph}>
        La oración es una parte esencial del proceso. Motiva a los participantes a orar específicamente por las personas en sus redes relacionales. Esto no solo les prepara a ellos para compartir el evangelio, sino que también les ayuda a ver cómo Dios puede trabajar en la vida de esas personas.
        </Text>
        <Text style={styles.subtitleDos}>9. Educación Continua</Text>
        <Text style={styles.paragraph}>
        Instruye a los participantes sobre cómo establecer conexiones significativas. Pueden comenzar con actividades simples como invitar a amigos a eventos sociales, compartir un café o participar juntos en actividades recreativas. Estas interacciones informales pueden abrir puertas para conversaciones más profundas sobre la fe.Promueve la revisión continua del mapa relacional, animando a los participantes a actualizarlo a medida que sus relaciones cambian y crecen. Además, ofrécele capacitaciones adicionales sobre cómo compartir su fe de manera efectiva y cómo responder a preguntas difíciles.
        </Text>
        <Text style={styles.paragraph}>
        Recuerda que el enfoque principal del mapa relacional es la autenticidad en las relaciones. El evangelio se difunde mejor cuando fluye naturalmente de interacciones genuinas, donde el amor y el respeto son evidentes. Espero que estos puntos adicionales te sean útiles.
        </Text>
        <Text style={styles.keyword}>
        Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros mientras nos preparamos para comenzar con las herramientas simples. La próxima herramienta 2. Persona Casa de Paz
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
            source={require("../../assets/videos/Herramienta1.mp4")}
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
            <Text style={styles.title}>CÓMO ENTRAR A UN CAMPO VACÍO</Text>
            <Text style={styles.subtitle}>MAPA RELACIONAL</Text>
            <Image
              source={require("../../assets/fotos/herramienta001.png")}
              style={estilosIndividual.toolImage}
            />
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Nota: </Text>Tu red de relaciones es
              una de las mejores formas para que el evangelio se difunda y para
              que aprendas a ingresar en campos vacíos. Este parece ser un
              método intencional y estratégico utilizado tanto por Jesús como
              por los Apóstoles (Jn. 1,35-51, Hechos 10,34-48; 16,14-15, 30-33).
            </Text>
            <Text style={styles.paragraph}>
              En su formación, anime a los que está enseñando a trazar su red
              relacional. Aquellos en su red deben ser personas que usted
              conozca y que estén lejos de Dios. Son estas mismas personas las
              que son porteros de otras personas que están lejos de Dios.
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
          source={require("../../assets/marcadores/campo1.png")}
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
    width: width -32, // Se ajusta el ancho al contener con margen de 8 (8 * 2)  
    height: width/1.7, // Ajusta la altura automáticamente  
    borderRadius: 10,  
    marginBottom:8,
  },
});