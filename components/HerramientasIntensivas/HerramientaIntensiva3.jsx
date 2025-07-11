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
      lessonName: "",
    });
  };

  const openWord = () => {
    navigation.navigate("HerramientaIntensiva3", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVA 3: HIERRO CON HIERRO</Text>
        <Text style={styles.paragraph}>
        El propósito principal de esta sesión es equipar a otros para que, a su vez, puedan equipar a otros, abordando así la importancia de formar un ciclo continuo de liderazgo. Este enfoque no solo contribuye al crecimiento individual de cada líder, sino que también fortalece la comunidad de fe, creando una red de apoyo y formación que puede extenderse a lo largo del tiempo y espacio.
        </Text>
        <Text style={styles.subtitleDos}>Importancia del "Hierro sobre Hierro" en el Liderazgo</Text>

        <Text style={styles.paragraph}>
        El proverbio "como el hierro afila el hierro, así una persona afila a otra" (Proverbios 27:17) encapsula la esencia de esta herramienta. A través de la interacción directa y la colaboración, se cultiva un ambiente propicio para el desarrollo mutuo. Esta dinámica no se limita a la resolución de conflictos; también se trata de un aprendizaje recíproco donde cada líder, con sus experiencias, desafíos y éxitos, aporta a la formación del grupo. Este proceso no solo mejora la capacidad de cada individuo para enfrentar sus propios obstáculos, sino que también enriquece el liderazgo colectivo, permitiendo que la comunidad crezca en unidad y eficacia.
        </Text>
        <Text style={styles.paragraph}>
        Este principio se basa en la importancia del liderazgo colaborativo. En un entorno donde todos se sienten libres de compartir sus luchas y éxitos, se crea un sentido de pertenencia y apoyo mutuo. Esto no solo fortalece la conexión entre los líderes, sino que también permite un mejor discernimiento en la identificación y superación de los obstáculos que puedan surgir en el camino ministerial. La diversidad de experiencias dentro del grupo se convierte en una ventaja estratégica: cada historia compartida, cada consejo ofrecido y cada sombra de duda se convierten en oportunidades para todos.
        </Text>
        <Text style={styles.subtitleDos}>Implementación de la Herramienta</Text>
        <Text style={styles.paragraph}>
        Para que "Hierro sobre Hierro" sea efectivo, es necesario establecer una estructura clara y detallada para las sesiones. La preparación y organización son vitales para el éxito del proceso. Se requieren ciertos roles definidos dentro de cada sesión:
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Un facilitador:</Text> Esta persona guiará la reunión, asegurándose de que se mantenga el enfoque, se respeten los tiempos y todos los participantes tengan la oportunidad de expresar sus ideas y emociones. El facilitador también debe crear un ambiente seguro donde todos se sientan cómodos para compartir.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Un cronometrista:</Text> Esta figura garantizará que la sesión no exceda el tiempo límite establecido de sesenta minutos, lo cual es crucial para mantener la atención y la energía durante la conversación. Un manejo eficiente del tiempo fomenta la participación activa y evita que se profundice demasiado en un solo tema, permitiendo una discusión más equilibrada.
        </Text>
        <Text style={styles.subtitleDos}>Estructura de la Sesión</Text>
        <Text style={styles.paragraph}>
        La práctica "Hierro sobre Hierro" se basa en una serie de preguntas preparadas y específicas que orientan la conversación. Reunir de cuatro a seis líderes es lo ideal, aunque el enfoque debe estar centrado en un solo entrevistado en cada sesión. La etapa inicial se dedica a la escucha activa durante aproximadamente treinta minutos. Algunas preguntas clave pueden incluir:
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Permanecer:</Text> Explorar cómo el líder está manteniendo su conexión personal con Dios en medio de los retos. Preguntar sobre sus prácticas espirituales y cómo estas afectan su vida y ministerio.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Conflicto:</Text> Identificar si hay conflictos no resueltos dentro del equipo y cómo esos conflictos están afectando el ministerio. Reflexionar sobre la importancia del perdón y la reconciliación.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Visión:</Text> Comprender cuál es la visión local que está guiando sus esfuerzos. Preguntar por las metas a corto y largo plazo y cómo estas se alinean con la misión global.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Contexto:</Text> Analizar el contexto en el que el líder está operando, lo cual puede ayudar a identificar barreras externas. ¿Qué factores socioculturales están influyendo en su trabajo?
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Herramientas:</Text> Discutir qué recursos y metodologías está utilizando en los cuatro campos del ministerio. ¿Qué herramientas están resultando eficaces y cuáles necesitan revisión?
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Ritmo del ministerio</Text> Examinar su rutina semanal, incluyendo momentos de oración, capacitación y actividades de compartir. Reflexionar sobre cómo el balance entre el trabajo y el descanso influye en su efectividad.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>- Atascos:</Text> Reconocer los obstáculos específicos que están impidiendo el progreso del líder y su equipo. Aquí, es importante profundizar en cómo estos atascos están afectando a la moral y la motivación del equipo.
        </Text>
        <Text style={styles.paragraph}>
        El espacio creado durante esta fase es fundamental, ya que permite que el líder entrevistado se exprese libremente, fomentando un entorno de confianza que facilita la honestidad y la vulnerabilidad, elementos esenciales para un crecimiento genuino.
          </Text>
        <Text style={styles.subtitleDos}>Ejercicio de Apoyo y Clarificación</Text>
        <Text style={styles.paragraph}>
        Una vez finalizada la parte de escucha, es el momento de que los otros líderes ofrezcan su apoyo. Durante cinco minutos, cada uno debe ofrecer palabras de ánimo, validación y comprensión hacia el líder entrevistado. Este ejercicio tiene un doble propósito: por un lado, fortalecer la confianza del líder en su camino y, por el otro, fomentar un ambiente de comunidad y solidaridad que resuena con el amor de Cristo.
        </Text>
          <Text style={styles.paragraph}>
          A continuación, se puede dedicar cinco minutos a la aclaración de dudas. Este tiempo es crítico para resolver malentendidos y asegurarse de que todos los participantes compartan una comprensión clara del desafío presentado. Este espacio no solo permite esclarecer conceptos, sino que también abre la puerta a soluciones efectivas.
          </Text>

          <Text style={styles.subtitleDos}>Planteamiento de Soluciones</Text>
        <Text style={styles.paragraph}>
        Durante los próximos quince minutos, el grupo se enfocará en explorar soluciones para los atascos y barreras discutidos. Se puede fomentar un intercambio de ideas que abarque:
        </Text>
        <Text style={styles.paragraph}>
        - Perspectivas bíblicas que ofrezcan un fundamento espiritual para las decisiones a tomar.
        </Text>
        <Text style={styles.paragraph}>
        - Historias de éxito de otros líderes que hayan enfrentado y superado desafíos similares. La narrativa de experiencias ajenas a menudo proporciona inspiración.
        </Text>
        <Text style={styles.paragraph}>
        - Sugerencias creativas de todos los participantes. En esta etapa, cada voz tiene un valor especial, y las ideas pueden surgir de las perspectivas más inesperadas.
        </Text>
        <Text style={styles.paragraph}>
        Este ejercicio no solo genera una diversidad de ideas, sino que también fomenta una sensación de unidad y colaboración. Todos están trabajando hacia un objetivo común, lo que refuerza el sentido de comunidad. 
        </Text>
        <Text style={styles.paragraph}>
        Una vez que se hayan identificado varias soluciones, el líder entrevistado debe compartir dos o tres planes de acción que haya descubierto durante la sesión, junto con un compromiso personal de responsabilidad. Esto proporciona un cierre estructurado a la sesión y ayuda a establecer expectativas claras para el futuro, asegurando que no solo se discutan ideas, sino que se implementen.
        </Text>

        <Text style={styles.subtitleDos}>Reflexión Final y Compromiso</Text>
        <Text style={styles.paragraph}>
        Al cerrar la sesión en los últimos dos minutos, asegúrate de que el líder entrevistado se sienta apoyado y motivado en su ministerio. Reiterar el principio de que el enfoque debe ser en el plan, no en la persona, es fundamental para mantener un ambiente constructivo. Recuerda a todos que evolucionar y superar barreras es parte de la jornada de liderazgo. Cada uno tiene un papel en el proceso de edificación, y al hacerlo juntos, se construye una comunidad resilient.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>"Hierro sobre Hierro"</Text> es, por tanto, una herramienta esencial no solo para resolver conflictos, sino para fortalecer el liderazgo a través del aprendizaje y las interacciones significativas. Es importante recordar que durante tu trabajo en los cuatro campos de entrenamiento, habrá líderes emergentes que necesiten ser confirmados en sus dones y habilidades. Practicar "Hierro sobre Hierro" de manera regular no solo contribuirá al desarrollo de los líderes, sino que también reforzará la misión hacia la multiplicación del discipulado.
        </Text>
        <Text style={styles.paragraph}>
        A medida que finalizas la sesión, es crítico que cada participante se lleve consigo un sentido renovado de propósito y un compromiso hacia el continuo crecimiento personal y comunitario. Este proceso no es un evento aislado, sino un viaje continuo que refleja el amor y la gracia de Dios en cada interacción, motivando a otros a subir sus propias montañas en el desafío del liderazgo.
        </Text>
        <Text style={styles.paragraph}>
        Que Dios los guíe en cada paso que den. ¡Hasta pronta herramienta intensiva <Text style={styles.keyword}>“Manos Guías”</Text>, y sigamos adelante en unidad y propósito!
        </Text>


      </View>

      <Text style={styles.paragraph}>
        <Text style={styles.keyword}></Text>
        </Text>


      <Text style={styles.paragraph}>
          
          </Text>
          <Text style={styles.keyword}></Text> 
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
            source={require("../../assets/videos/Intensiva3.mp4")}
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
            <Text style={styles.subtitle}>Hierro con hierro</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>PROPOSITO</Text> Soluciona problemas y trabas
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>ENFOQUE</Text> Gente perdida
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>Regla</Text> Atacar el plan no a la persona o el proceso.
              </Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.keyword}>1 REPORTES (20min)</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>¿Has pasado tiempo con Dios?</Text> (Si/No)
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>¿Hay algún conflicto con tu equipo?</Text> (conflictos interpersonales)
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>Visión</Text> (¿A dónde Dios te esta mandando?)
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>¿Cuántas veces comparten el evangelio como equipo?</Text>
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>¿Cuántas personas entrenaron en los últimos tres meses?</Text>
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>¿Qué herramienta estas usando en cada campo?</Text>
              </Text>
            </View>
            <Image
              source={require("../../assets/fotos/HI31.png")}
              style={estilosIndividual.toolImage}
            />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>Habla de tu trabajo local</Text>  (Usar mapa Generacional y planilla de M.A.M.L)
              </Text>
              <Text style={styles.listItem}>
                • <Text style={styles.keyword}>Problemas y trabas</Text> (¿Cuales son los problemas y trabas que no te permiten multiplicar lideres y grupos?)
              </Text>
            </View>
            <Image
              source={require("../../assets/fotos/HI32.png")}
              style={estilosIndividual.toolImage}
            />
          </View>

          <View style={styles.contentContainer}>
          <View style={styles.list}>
              <Text style={styles.keyword}>2 ALENTAR (5 MIN)</Text>  
              <Text style={styles.paragraph}><Text style={styles.keyword}>3 PREGUNTAS PARA ACLARAR (10 MIN)</Text> (Observación del trabajo usar Mapa Generacional y hoja M.A.M.L)</Text> 
              <Text style={styles.paragraph}><Text style={styles.keyword}>4 CONCLUSIONES (5 MIN)</Text> (Discutir: barreras encontradas y posibles soluciones)</Text>
              <Text style={styles.paragraph}><Text style={styles.keyword}>5 COMPARTIR 2 O 3 ACCIONES A TOMAR (5 MIN)</Text> (Compartir acciones sacadas del punto 4
                ¿A quien vas a rendir cuentas?)</Text>
              <Text style={styles.keyword}>6 ORAR (5 MIN)</Text>
              </View>
              <Image
              source={require("../../assets/fotos/HI33.png")}
              style={estilosIndividual.toolImage}
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
    width: width -32, 
    height: width -70,
    borderRadius: 10,  
    marginBottom:8,
  },
});