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
    navigation.navigate("HerramientaIntensiva4", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVA 4: Manos Guías</Text>
      
        <Text style={styles.paragraph}>
          Esta herramienta que le voy a mostrar se llama <Text style={styles.keyword}>"manos guías"</Text>, y usamos nuestras manos como guías para un Movimiento de Alcance Mundial. Primero, explicaré cómo enseñar esta clase a otros. En nuestra mano izquierda, no enumeramos los dedos, sino que les asignamos significados específicos. <Text style={styles.keyword}>El número 1</Text> nos lleva a preguntarnos <Text style={styles.keyword}>quién es la iglesia; el número 2</Text> aborda <Text style={styles.keyword}>qué hace la iglesia</Text>; <Text style={styles.keyword}>el número 3</Text> se refiere <Text style={styles.keyword}>a dónde se reúne</Text>; <Text style={styles.keyword}>el número 4</Text>, a <Text style={styles.keyword}>cuándo se reúne</Text>; y <Text style={styles.keyword}>el número 5, para qué se reúnen</Text>. La idea es que las personas descubran por sí mismas las respuestas a estas preguntas, utilizando diferentes círculos de discusión. 
        </Text>
        <Text style={styles.paragraph}>
          Comenzamos con <Text style={styles.keyword}>la primera pregunta: ¿quién es la iglesia?</Text> Para esto, podemos darles el versículo de <Text style={styles.keyword}></Text>1 Pedro 2:5, que habla de que la iglesia somos nosotros, las piedras vivas, formando el cuerpo de Cristo, cada uno con diferentes funciones. La respuesta sería que la iglesia somos nosotros, el cuerpo de Cristo, donde Él es la cabeza.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>El segundo punto</Text> se enfoca en qué hace la iglesia. Aquí incorporamos el concepto del <Text style={styles.keyword}>"anillo de compromiso"</Text>, que simboliza la relación que tenemos con Dios. En este contexto, <Text style={styles.keyword}>la iglesia se dedica a bautizar, seguir la doctrina de los apóstoles, orar, alabar a Dios, tener líderes, compartir la Cena del Señor, hacer comunión y hacer discípulos</Text>. Estas son las características de una iglesia saludable que estamos formando desde el principio.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>La tercera pregunta</Text> aborda <Text style={styles.keyword}>dónde se reúne la iglesia</Text>. Para esto, podemos referirnos a <Text style={styles.keyword}>Colosenses 4:15, Hechos 2:46</Text>, y <Text style={styles.keyword}>Filemón 1:1-2</Text>. Estos versículos indican que la iglesia se reúne en casa, a veces en templos públicos, y nos muestran que la iglesia puede ser donde nos convenga. <Text style={styles.keyword}>Hechos 2:46</Text> menciona que se reunían frecuentemente, no solo una vez a la semana, sino de manera constante, como lo hacía la iglesia primitiva.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>La cuarta pregunta</Text> es <Text style={styles.keyword}>cuándo se reúne la iglesia</Text>. Usaremos versículos como <Text style={styles.keyword}>1 Corintios 10:31</Text> y <Text style={styles.keyword}>Hebreos 10:24-25</Text>, que nos explican que la reunión es para la edificación del otro y para alabar a Dios. Comenzamos un movimiento de plantación de iglesias, recordando que la Biblia usa el término <Text style={styles.keyword}>"iglesias"</Text> y no otros como "células" o "grupos de vida".
        </Text>
        <Text style={styles.paragraph}>
          Una vez que enseñamos esto, la siguiente mano numera una serie de pasos que se asemejan a la primera, pero en esta ocasión abordamos el proceso de maduración de la iglesia. La madurez es un proceso que puede llevar de uno a tres años para que una iglesia desarrolle profundidad en su espiritualidad y amor. En esta mano, también repartiremos versículos a distintas personas en grupos pequeños para que ellos lean y discutan lo aprendido.
        </Text>
        <Text style={styles.paragraph}>
          En relación a la madurez, la primera marca que discutimos está en <Text style={styles.keyword}>Efesios 1:22-23</Text>, donde Jesús es la cabeza. La segunda marca es la autoridad de la Palabra de Dios, que se describe en <Text style={styles.keyword}>2 Timoteo 3:16-17 y Juan 14:6</Text>. La tercera marca implica que la iglesia tiene servidores, que son los ancianos y diáconos, tal como se indica en <Text style={styles.keyword}>Tito 1:5-7</Text> y en <Text style={styles.keyword}>Hechos 6:2-3</Text>. 
        </Text>
        <Text style={styles.paragraph}>
          También discutimos la importancia de que una iglesia madura sea autosustentable, según <Text style={styles.keyword}>Hechos 2:44-45</Text> y <Text style={styles.keyword}>Hechos 4:34-37</Text>. Esto implica que la iglesia toma decisiones financieras de acuerdo a sus necesidades, como lo hicieron los primeros cristianos. Además, una iglesia madura se auto-gobierna y designa líderes de acuerdo a las necesidades, evidenciado en <Text style={styles.keyword}>Hechos 6:1-7</Text>.
        </Text>
        <Text style={styles.paragraph}>
          Una iglesia madura se reproduce de manera autónoma, lo que se refleja en <Text style={styles.keyword}>1 Tesalonicenses 1:7-8</Text>, donde Pablo declara que la iglesia de Tesalónica se había convertido en un modelo. Finalmente, discutimos que tiene los ministerios de <Text style={styles.keyword}>Efesios 4</Text>, que son necesarios para equipar al cuerpo de Cristo.
        </Text>
        <Text style={styles.paragraph}>
          La herramienta <Text style={styles.keyword}>"Manos Guías"</Text> es una metodología visual y práctica que permite a los líderes y participantes explorar de manera profunda las características, funciones y el proceso de maduración de la iglesia. Al representar conceptos clave en las manos, se facilita la comprensión y el aprendizaje interactivo. Aquí hay algunos aspectos adicionales sobre esta herramienta que pueden enriquecer su uso en el contexto ministerial:
        </Text>

        <Text style={styles.subtitleDos}>Enfoque en la Autoevaluación y Reflexión</Text>
        <Text style={styles.paragraph}>
          Una de las ventajas del método "Manos Guías" es que promueve la autoevaluación y la reflexión entre los participantes. Al abordar preguntas clave sobre la iglesia, se invita a los miembros a considerar sus propios roles y responsabilidades dentro del cuerpo. Este enfoque puede generar discusiones significativas y llevar a un mayor sentido de pertenencia y compromiso con la misión de la iglesia.
        </Text>
        <Text style={styles.subtitleDos}>Establecimiento de un Lenguaje Común</Text>
        <Text style={styles.paragraph}>
          El uso de esta metodología puede ayudar a establecer un lenguaje común entre los miembros de la iglesia. Al definir conceptos como "quién es la iglesia" y "qué hace la iglesia" de forma clara y concisa, se cultiva una comprensión compartida que facilita la cooperación y el trabajo en equipo. Un lenguaje común también reduce confusiones y malentendidos acerca de la misión y visión de la comunidad.
        </Text>
        <Text style={styles.subtitleDos}>Fomento del Compromiso y la Participación Activa</Text>
        <Text style={styles.paragraph}>
          Al diseñar discusiones en círculos sobre cómo responder a las preguntas de la "mano izquierda", se fomenta el compromiso y la participación activa de todos los miembros. En lugar de ser meros receptores de información, los participantes se convierten en actores activos en su aprendizaje, lo que puede resultar en una mayor retención del conocimiento y aplicación práctica. 
        </Text>
        <Text style={styles.subtitleDos}>Profundización en el Discipulado</Text>
        <Text style={styles.paragraph}>
          El proceso de maduración que se aborda en la "mano derecha" puede servir como una guía para el discipulado. Al enseñar sobre las diferentes etapas de crecimiento de la iglesia, los líderes pueden identificar en qué etapa se encuentran sus miembros y ajustar el discipulado a sus necesidades específicas. Esto permite un enfoque más personalizado y efectivo en la formación de líderes y discípulos.
        </Text>
        <Text style={styles.subtitleDos}>Herramienta para la Evaluación de la Salud de la Iglesia</Text>
        <Text style={styles.paragraph}>
          "Manos Guías" también puede ser utilizada como una herramienta de diagnóstico para evaluar la salud de una iglesia. A medida que los líderes y miembros reflexionan sobre las marcas de madurez, pueden identificar áreas que necesitan atención o mejora. Esto puede generar un plan de acción concretos para abordar déficits en áreas como el liderazgo, la enseñanza y el ministerio.
        </Text>
        <Text style={styles.subtitleDos}>Promoción de la Responsabilidad Compartida</Text>
        <Text style={styles.paragraph}>
          La estructura de la "mano izquierda" y "mano derecha" subraya la importancia del trabajo conjunto en la edificación de la iglesia. Cada miembro tiene un papel crucial que desempeñar, y al entender sus responsabilidades, se promueve una cultura de responsabilidad compartida. Esto, a su vez, crea un sentido de comunidad y propósito colectivo.
        </Text>
        <Text style={styles.subtitleDos}>Espacio para la Pregunta y el Aprendizaje</Text>
        <Text style={styles.paragraph}>
          Una de las características más efectivas de la herramienta "Manos Guías" es su flexibilidad. Los líderes pueden adaptar la enseñanza a las necesidades de su audiencia, utilizando diferentes versículos bíblicos, ejemplos prácticos o contextos culturales. Esto hace que la enseñanza sea más relevante y significativa para los participantes.
        </Text>
        <Text style={styles.subtitleDos}>Establecimiento de un Proceso Iterativo</Text>
        <Text style={styles.paragraph}>
          El "Manos Guías" se puede repetir fácilmente, lo que permite ir revisando y mejorando la comprensión y práctica de los conceptos. Cada vez que se utiliza, los participantes pueden profundizar más en los temas, lo que les lleva a un entendimiento más sólido y duradero sobre la iglesia y su función en el mundo. 
        </Text>
        <Text style={styles.subtitleDos}>Inspiración para el Envío Misionero</Text>
        <Text style={styles.paragraph}>
          Además de abordar el crecimiento interno de la iglesia, este método también puede inspirar a los miembros a participar activamente en la misión de alcanzar al mundo. Al entender quiénes son y qué hacen, se puede generar un deseo más fuerte de compartir el evangelio y extender el ministerio más allá de los límites de la iglesia local. 
        </Text>
        <Text style={styles.paragraph}>
          En resumen, la herramienta "Manos Guías" no solo es un recurso para enseñar sobre la iglesia, sino que es un medio para inspirar, empoderar y movilizar a los miembros hacia una participación activa y comprometida en la misión de Dios. Al implementar esta metodología, los líderes pueden facilitar un entorno de  aprendizaje dinámico y productivo que lleve a un crecimiento espiritual y comunitario duradero.
        </Text>
        <Text style={styles.paragraph}>
          Espero que esta metodología de enseñanza de <Text style={styles.keyword}>la "mano izquierda"</Text> y <Text style={styles.keyword}>"mano derecha"</Text> les sirva para comprender cómo se forman y maduran las iglesias desde el principio. Si bien al inicio puede parecer instable, este método está diseñado para facilitar el discipulado y promover un desarrollo saludable en la iglesia. 
        </Text>
        <Text style={styles.paragraph}>
          ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 5  llamada <Text style={styles.keyword}>“Los 3 Toques”</Text>.  
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
            source={require("../../assets/videos/Intensiva4.mp4")}
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
            <Text style={styles.title}>Manos Guías</Text>
            <Image
              source={require("../../assets/fotos/HI41.png")}
              style={estilosIndividual.toolImage1}
            />
          </View>

          <View style={styles.contentContainer}>
          <Text style={styles.title}>IGLESIA SALUDABLE</Text>
            <Image
              source={require("../../assets/fotos/HI42.png")}
              style={estilosIndividual.toolImage2}
            />
            <Text style={styles.subtitle}>Mano Izquierda</Text>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>1</Text>
              <Text style={styles.listItem}>• 1 Corintios 12:12-31</Text>
              <Text style={styles.listItem}>• Efesios 5:22-23</Text>
              <Text style={styles.listItem}>• Hechos 2:41</Text>
              <Text style={styles.listItem}>• 1 Pedro 2:4-10</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>2</Text>
              <Text style={styles.listItem}>• 1 Hechos 2:36-47</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>3</Text>
              <Text style={styles.listItem}>• Colosenses 4:15</Text>
              <Text style={styles.listItem}>• Filemón 1:1-2</Text>
              <Text style={styles.listItem}>• Hechos 16:40</Text>
              <Text style={styles.listItem}>• Hechos 19:9</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>4</Text>
              <Text style={styles.listItem}>• Hechos 2:46</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>5</Text>
              <Text style={styles.listItem}>• 1 Corintios 10:31</Text>
              <Text style={styles.listItem}>• Hebreos 10:24-25</Text>

            </View>
          </View>

          <View style={styles.contentContainer}>
          <Text style={styles.title}>IGLESIA MADURA</Text>
            <Image
              source={require("../../assets/fotos/HI43.png")}
              style={estilosIndividual.toolImage2}
            />
            <Text style={styles.subtitle}>Mano Derecha</Text>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>1</Text>
              <Text style={styles.listItem}>• Efesios 1:22-23</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>2</Text>
              <Text style={styles.listItem}>• 2 Timoteo 3:16-17</Text>
              <Text style={styles.listItem}>• Juan 14:26</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>3</Text>
              <Text style={styles.listItem}>• Hechos 6:2-3</Text>
              <Text style={styles.listItem}>• Tito 1:6-7</Text>
              <Text style={styles.listItem}>• 1Pedro 2:9</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>4</Text>
              <Text style={styles.keyword}>4.1 Autogobernable</Text>
              <Text style={styles.listItem}>• Hechos 6:1-7</Text>
              <Text style={styles.listItem}>• Hechos 11:29</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.keyword}>4.2 Autosustentable</Text>
              <Text style={styles.listItem}>• Hechos 2:44-46</Text>
              <Text style={styles.listItem}>• Hechos 4:34-35</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.keyword}>4.3 Autorreproducible</Text>
              <Text style={styles.listItem}>• 1 Tesalonicenses 1:7-8</Text>
              <Text style={styles.listItem}>• Hechos 16:5</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.keyword}>4.4 Autocorregible</Text>
              <Text style={styles.listItem}>• 2 Timoteo 3:16-17</Text>
            </View>
            <View style={styles.list}>
              <Text style={estilosIndividual.keyword}>5</Text>
              <Text style={styles.listItem}>•  Efesios 4:11-12</Text>
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
  toolImage1: {
    width: width - 32,
    height: width + 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  toolImage2: {
    width: width - 32,
    height: width + 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  keyword: {
    fontFamily: 'Lora-SemiBoldItalic',
    textTransform: 'capitalize',
    // color:'#1C4F7C',
    color: '#003366',
    fontSize: 20,
  },
});
