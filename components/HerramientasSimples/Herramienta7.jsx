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

export default function Herramienta7({ route }) {
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
      toolName: "Her 7: Los 3 Tercios",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta7", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 7: Los Tres Tercios. (3/3)</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Herramienta número 7. <Text style={styles.keyword}>Los tres tercios</Text>. Pero antes de entrar vamos a ubicarnos, recuerdan ya salimos del segundo campo, la siembra. Ahora estamos dentro del campo del crecimiento. <Text style={styles.keyword}>¿Qué es el discipulado? ¿Cómo enseñar a un discípulo?</Text>
        </Text>
        <Text style={styles.paragraph}>
        En la herramienta anterior estudiamos herramientas número 8 el 4.1.1. Ahora es la herramienta número 9. <Text style={styles.keyword}>Los tres tercios</Text>. El formato para los discipulados de los movimientos de alcance mundial.
        </Text>
        <Text style={styles.paragraph}>
        Las dos herramientas del campo de crecimiento están sumamente ligadas, mientras que con el 4.1.1 se enseña a un discípulo a compartir el evangelio como se nueva identidad. Ahora con la herramienta de <Text style={styles.keyword}>los tres tercios</Text> enseñará un discípulo como ser parte de un grupo pequeño que se multiplican.
        </Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento pídeles a tus participantes que tomen una hoja de papel y dibujen tres columnas. Diles que la parte de arriba de la primera columna escriban <Text style={styles.keyword}>MIRAR ATRÁS</Text>. Arriba de la segunda columna que escriba <Text style={styles.keyword}>MIRAR ARRIBA</Text>. Y arriba de la tercera columna que escriba <Text style={styles.keyword}>MIRAR ADELANTE</Text>.
        </Text>
        <Text style={styles.paragraph}>
        Arriba de la palabra <Text style={styles.keyword}>MIRAR ATRÁS</Text> diles que dibujen una flecha apuntando hacia atrás. Esto es porque en el primer tercio de una reunión del grupo pequeño los discípulos echaran un vistazo hacia atrás. Ahora diles que arriba de la palabra <Text style={styles.keyword}>MIRAR ARRIBA</Text> dibujen una flecha hacia arriba, esto es porque los discípulos echaran un vistazo hacia arriba. Es decir hacia la palabra de Dios. Ahora arriba de la palabra <Text style={styles.keyword}>MIRAR ADELANTE</Text>, diles que dibujen una flecha apuntando hacia adelante. Esto es porque los discípulos se preparan para ir y hacer discípulos que hagan discípulos. 
        </Text>
        <Text style={styles.paragraph}>
        Si un grupo pequeño se reúne por una hora. El facilitador puede usar veinte minutos en cada una de estas tres secciones. Ahora dile a tus participantes que vayan a la primer columna de <Text style={styles.keyword}>MIRAR ATRÁS</Text> y diles que básicamente en esta sección el facilitador del grupo pequeño. Llevará a los discípulos a navegar por cuatro cosas.
        </Text>
        <Text style={styles.paragraph}>
        Diles a tus participantes que en la primera columna <Text style={styles.keyword}>MIRAR ATRÁS</Text> escriban número uno <Text style={styles.keyword}>Cuidado pastoral</Text> y debajo que escriban <Text style={styles.keyword}>como estás</Text> y las <Text style={styles.keyword}>seis emociones</Text>. Este es un momento donde los discípulos compartirán cómo se sienten basados en las seis emociones. El facilitador preguntar a cada uno, <Text style={styles.keyword}>cómo le ha ido estos últimos días, algo que te haya hecho sentir feliz</Text>. Emocionado, amado, con miedo, triste, enojado, y dejará que los discípulos compartan.
        </Text>
        <Text style={styles.paragraph}>
         Ahora diles que escriban la palabra número dos <Text style={styles.keyword}>adoración</Text>. A quien facilitador guiará al grupo en un momento de devocional a Dios a través de una <Text style={styles.keyword}>oración, cantos</Text> y el dar a Dios.
        </Text>
        <Text style={styles.paragraph}>
        Ahora diles que escriban la frase número tres <Text style={styles.keyword}>Amorosa Rendición  de Cuenta</Text>. Aquí el modelador hace dos preguntas al grupo de discípulos reunidos y permite que los discípulos de manera voluntaria compartan sus experiencias. Primero cómo te fue con tu <Text style={styles.keyword}>lo haré</Text>. Esto es lo que el discípulo dijo que haría con la palabra de Dios de la semana pasada y deja que entonces los discípulos compartan. Segundo cómo te fue con tus metas fijadas de la semana pasada y deja que los discípulos compartan. 
        </Text>   
        <Text style={styles.paragraph}>
        Ahora diles que escriban cuatro. <Text style={styles.keyword}>Visión</Text>, aquí el facilitador o alguien asignado mantendrá el corazón y la visión de Dios de Génesis Apocalipsis frente al grupo o ejemplos de personas que siguen a Jesús. Ahora que se ha terminado con la parte de reunirse para <Text style={styles.keyword}>MIRAR ATRÁS</Text>, es hora de pasar a la siguiente sección de crecer <Text style={styles.keyword}>MIRAR ARRIBA</Text>. 
        </Text>
        <Text style={styles.paragraph}>
        Diles a tus participantes que estriban en columna <Text style={styles.keyword}>MIRAR ARRIBA</Text>. 
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Número 1 Cuenta la historia.</Text>
        <Text style={styles.paragraph}>
        El facilitador contará la historia bíblica a meditar. Es importante recordar que este no es un sermón o un estudio bíblico donde que instruye habla y habla. Es más bien un método de descubrimiento por ello mismo. Esto ayudara al grupo a motivarse y captar la atención de todos al contar la historia. 
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Número 2. Lea el pasaje de la Biblia.</Text>
        <View style={styles.list}>
        <Text style={styles.subtitleDos}>
        Enseñes con el método inductivo:
        </Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>• Observación.</Text></Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>• Interpretación.</Text></Text>
          <Text style={styles.listItem}><Text style={styles.keyword}>• La aplicación.</Text></Text>
        </View>
        <Text style={styles.paragraph}>
        Ahora pídeles a tus participantes que dibujan una espada y alrededor de ella las siguientes palabras. En la parte de arriba que escriban. <Text style={styles.keyword}>¿Qué hay de Dios?</Text> A la izquierda de la espada escriban. <Text style={styles.keyword}>¿Qué pecado dejar?</Text> y <Text style={styles.keyword}>¿Qué promesas creer?</Text> A la derecha de la espada escriban. <Text style={styles.keyword}>¿Qué ejemplo seguir?</Text> y <Text style={styles.keyword}>¿Que mandamiento obedecer?</Text>
        </Text>
        <Text style={styles.paragraph}>
        Con esto en mente después de leer el pasaje bíblico a estudiar el facilitador va a ser las siguientes preguntas y permitirá que el grupo participe y vaya descubriendo en la biblia las respuestas.
        </Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento pídeles a tus participantes que escriban de bajo las siguientes preguntas:
        </Text>
        <Text style={styles.subtitleDos}>
        Del pasaje bíblico de hoy:
        </Text> 
        <View style={styles.list}>
          <Text style={styles.listItem}>1 ¿Qué aprendemos de Dios? y permite que descubran y compartan.
          </Text>
          <Text style={styles.listItem}>2 ¿Qué aprendemos del hombre? y permite que descubran y compartan. 
          </Text>
          <Text style={styles.listItem}>3 ¿Algún mandamiento obedecer? y permite que descubran y compartan. 
          </Text>
          <Text style={styles.listItem}>4 ¿Algún ejemplo a seguir? y permite que descubran y compartan
          </Text>
        </View>       
        <Text style={styles.paragraph}>
        Como el objetivo es enseñar no solo información sino obediencia. Ahora diles que escriban: 
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Número 3 lo haré.</Text>
        <Text style={styles.paragraph}>
        Diles que escriban debajo:
        </Text>
        <Text style={styles.paragraph}>
        ¿Qué puedes hacer para obedecer lo que Dios te dice que hagas en esta escritura? Y que los discípulos tomen un tiempo para pensar y compartir. Esto es porque Dios nos habla a través de su palabra. Por eso es importante <Text style={styles.keyword}>mirar hacia arriba</Text>, oír su voz y estar prontos a poner por obra lo que nos dice que hagamos.
        </Text>
        <Text style={styles.paragraph}>
        Después de esto es hora de pasar al tercer tercio de la reunión llamado <Text style={styles.keyword}>MIRAR ADELANTE</Text>. Diles a tus participantes que escriban:
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>• Número 1.</Text> Luego practica la historia para que la gente pueda compartirla y encarga a todos a que completen la aplicación que Dios les dio. También que practiquen las herramienta de loa 4 campos.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>• Número 2.</Text> Hacer metas en la semana. Recuérdale sobre los hechos impactantes de su comunidad y la importancia de ser intencionales en el discipulado y de alcanzar a los de su mapa de relaciones.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>• Número 3.</Text> Pedir oraciones por los fieles. Que oren con valentía para que El Espíritu Santo muestre cada persona a adónde dirigirse. Diles que escriban de bajo las siguientes preguntas que ayuden al grupo enfocarse hacia las metas:        
        </Text>
        <Text style={styles.paragraph}>
        ¿En esta semana con quién vas orar? y dejar que los discípulos compartan.        </Text>
        <Text style={styles.paragraph}>
        ¿Con quién vas a compartir? y dejar que los discípulos compartan.         
        </Text>
        <Text style={styles.paragraph}>
        ¿A quién vas a entrenar? y dejar que los discípulos compartan.        
        </Text>
        <Text style={styles.paragraph}>
        ¿Cuándo puedes iniciar un grupo pequeño? y deja que los discípulos compartan.         
        </Text>
        <Text style={styles.paragraph}>
        Al final la reunión de grupos de tres de puede terminar con una oración poniendo los planes y las metas fijadas para <Text style={styles.keyword}>ir</Text>. Para ser instrumentos. Para restaurar la imagen de Dios en las personas y desplegar su gloria hasta los confines de la tierra.         
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras estamos en la última herramienta del <Text style={styles.keyword}>3er campo del crecimiento</Text>. Listo para entrar al <Text style={styles.keyword}>4to campo</Text>, llamado <Text style={styles.keyword}>la cosecha</Text>. Para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. <Text style={styles.keyword}>La próxima herramienta 8. El Círculo Saludable de la Iglesia</Text>.         
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
            source={require("../../assets/videos/Herramienta7.mp4")}
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
          {/* Primer Tercio - REUNIRSE */}
          <View style={styles.contentContainer}>
             <Text style={styles.title}>CÓMO ENSEÑAR A UN DISCÍPULO</Text>
             <Text style={styles.subtitle}>EL PATRÓN DE DISCIPULADO DE LOS TRES TERCIOS</Text>
            <Text style={estilosIndividual.tableHeader}>REUNIRSE</Text>
            <View style={estilosIndividual.tableContainer}>
            <Text style={styles.subtitle}>TIEMPO MUTUO</Text>
            <Text style={styles.paragraph}>• ¿Cómo te sientes?</Text>
            <Text style={styles.paragraph}>• 6 Emociones</Text>
            <Text style={styles.paragraph}>• Feliz, emocionado, amoroso, asustado, triste y enojado.</Text>
            
            <Text style={styles.subtitle}>ADORACIÓN</Text>
            <Text style={styles.paragraph}>Cantos | Oración | Cena del Señor | Ofrenda</Text>
            
            <Text style={styles.subtitle}>APOYO AMOROSO</Text>
            <Text style={styles.paragraph}>¿Cómo te fue con "LO HARÉ" con respecto al último mensaje y también con respecto a las metas que fijaste de orar, compartir y entrenar a otros?</Text>
            
            <Text style={styles.subtitle}>VISIÓN</Text>
            <Text style={styles.paragraph}>Mantenga el corazón y la visión de Dios frente a las personas desde Génesis hasta Apocalipsis o ejemplos de personas comunes que siguen a Jesús.</Text>
          </View>
          </View>

          {/* Segundo Tercio - CRECER */}
          <View style={styles.contentContainer}>
            <Text style={estilosIndividual.tableHeader}>CRECER</Text>
            <View style={estilosIndividual.tableContainer}>
            <Text style={styles.subtitle}>NUEVA LECCIÓN BÍBLICA</Text>
            <Text style={styles.paragraph}>Abrir la palabra de Dios basada en el descubrimiento</Text>
            
            <Text style={styles.subtitle}>MÉTODO ESPADA</Text>
            <Image
              source={require("../../assets/fotos/herramienta007.png")}
              style={estilosIndividual.toolImage}
            />
            <Text style={styles.paragraph}>¿Qué aprendemos acerca de Dios?</Text>
            <Text style={styles.paragraph}>¿Qué aprendemos sobre el hombre?</Text>
            <Text style={styles.paragraph}>¿Hay alguna orden que obedecer?</Text>
            <Text style={styles.paragraph}>¿Hay algún ejemplo a seguir?</Text>
            
            <Text style={styles.paragraph}>Termina con "Esta semana LO HARÉ"</Text>
          </View>
          </View>

          {/* Tercer Tercio - IR */}
          <View style={styles.contentContainer}>
          <Text style={estilosIndividual.tableHeader}>IR</Text>
          <View style={estilosIndividual.tableContainer}>
            <Text style={styles.subtitle}>PRACTIQUE EL DISCIPULADO</Text>
            <Text style={styles.paragraph}>Practicar en 1 minuto:</Text>
            <Text style={styles.paragraph}>• Los 4 campos y su significado</Text>
            <Text style={styles.paragraph}>• Visión Global Gen-Apoc.</Text>
            <Text style={styles.paragraph}>• Mapa Relacional</Text>
            <Text style={styles.paragraph}>• Persona/casa de Paz</Text>
            <Text style={styles.paragraph}>• Testimonio 15 segundos</Text>
            <Text style={styles.paragraph}>• Los 3 Círculos</Text>
            <Text style={styles.paragraph}>• El 411</Text>
            <Text style={styles.paragraph}>• Tres Tercios</Text>
            <Text style={styles.paragraph}>• Círculo Saludable</Text>
            <Text style={styles.paragraph}>• Guía de la Mano Izquierda</Text>
            <Text style={styles.paragraph}>• Herramientas del Liderazgo</Text>
            
            <Text style={styles.subtitle}>FIJE METAS</Text>
            <Text style={styles.paragraph}>Ore con valentía ............ para que el Espíritu Santo muestre a cada persona lo que debe perseguir.</Text>
            <Text style={styles.paragraph}>• ¿Con quién orarás esta semana?</Text>
            <Text style={styles.paragraph}>• ¿Con quién compartirás esta semana?</Text>
            <Text style={styles.paragraph}>• ¿A quién entrenarás esta semana?</Text>
            <Text style={styles.paragraph}>• ¿Quién puede reproducir esto y comenzar un nuevo grupo?</Text>
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
          source={require("../../assets/marcadores/campo3.png")}
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

  tableContainer: {
    borderWidth: 1,
    borderColor: '#1C4F7C',
    padding: 15,
    borderTopLeftRadius: 0,  
    borderTopRightRadius: 0,  
    borderBottomRightRadius: 10,  
    borderBottomLeftRadius: 10,  
  },
  tableHeader: {
    fontSize: 20,
    textAlign: 'center',
    color: '#1C4F7C',
    borderWidth: 1,
    borderColor: '#1C4F7C',
    fontFamily: 'Lora-Bold',
    borderTopLeftRadius: 10,  
    borderTopRightRadius: 10,  
    borderBottomRightRadius: 0,  
    borderBottomLeftRadius: 0,  
  },
  toolImage: {
    marginBottom: 8,
    width: width - 65, // Se ajusta el ancho al contenedor con margen de 8 en cada lado (8 * 2)
    height: (width - 40) / 1.1, // Ajusta la altura automáticamente manteniendo la proporción
    borderRadius: 10,
  },
  
});
