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

export default function Herramienta11({ route }) {
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
      toolName: "Her 11: Hierro Sobre Hierro",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta11", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
        HERRAMIENTA 11: HIERRO SOBRE HIERRO
        </Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Enfocado en cómo desarrollar líderes que se multipliquen. Esta es la lección número quince y la herramienta número once, titulada <Text style={styles.keyword}>"Hierro sobre Hierro"</Text>, que se encuentra en la página veintiuno del manual de entrenamiento. Esta herramienta es fundamental para líderes y se ubica en el círculo central de los cuatro campos. Dado que estamos equipando a otros para que a su vez equipen a otros, necesitamos contar con un enfoque que nos permita animar a quienes estamos formando, ayudándoles a superar obstáculos, barreras y problemas.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>"Hierro sobre Hierro"</Text> es una herramienta de resolución de conflictos. <Text style={styles.keyword}>Como dice Proverbios 27:17, "como el hierro afila el hierro, así una persona afila a otra"</Text>. El propósito de esta herramienta es aprender de otros líderes. Cuando te sientes con otros líderes, practicas el "hierro sobre hierro". Esto es increíble porque aprendes sobre diversas áreas en las que la otra persona está trabajando, lo que te permite ayudarlos con los atascos que puedan encontrar en su camino. Al practicar "hierro sobre hierro", asegúrate de centrarte en el plan y no en la persona; se trata del área laboral y de las dificultades.
        </Text>
        <Text style={styles.paragraph}>
        Para utilizar esta herramienta, necesitarás un facilitador y alguien que controle el tiempo, ya que la sesión no debe durar más de sesenta minutos. "Hierro sobre Hierro" se basa en una serie de preguntas. Se recomienda reunir de cuatro a seis practicantes, aunque la entrevista debe enfocarse solo en uno de los líderes. El facilitador comenzará a hacer algunas preguntas y permitirá que el entrevistado hable, mientras que los demás se limitan a escuchar.
        </Text>
        <Text style={styles.paragraph}>
        Invierte treinta minutos haciendo preguntas sobre las siguientes áreas: **Permanecer, conflicto, visión, contexto, herramientas, ritmo del ministerio y atascos**. Por ejemplo, pregúntale sobre su conexión personal con Jesús, si hay faltas de perdón o conflictos no resueltos en su equipo, cuál es la visión local por la que trabaja, y qué herramientas está utilizando en los cuatro campos. Además, comparte brevemente sobre su ritmo semanal, incluyendo oración, compartir y entrenamientos. También es importante que hable sobre sus grupos, corrientes o movimientos.
        </Text>
        <Text style={styles.paragraph}>
        Una vez que hayas permitido que el líder entrevistado hable, ha llegado el momento de que los otros líderes ofrezcan apoyo. Durante cinco minutos, los otros cinco o seis líderes deben animar al líder entrevistado, mostrándole apoyo amoroso y alentándolo a seguir adelante. Luego, se destinan cinco minutos para aclarar dudas. Esto les permitirá a los otros líderes hacer preguntas que ayuden a aclarar la información discutida.
        </Text>
        <Text style={styles.paragraph}>
        Durante los siguientes quince minutos, planteen soluciones a los atascos y barreras existentes. Las soluciones pueden provenir de las Escrituras, historias o sugerencias de los participantes. Después, permite que el líder entrevistado comparta dos o tres planes de acción que pudo haber descubierto durante la sesión, junto con su plan de responsabilidad. Finalmente, cierra la sesión en dos minutos asegurándote de que el líder entrevistado salga muy animado en su ministerio.
        </Text>
        <Text style={styles.paragraph}>
        La herramienta "Hierro sobre Hierro" es de gran importancia en el liderazgo. Mientras trabajas en los cuatro campos de entrenamiento, habrá líderes que se levantarán y que necesitarán ser confirmados y animados más adelante. Es fundamental que confirmes sus dones, talentos y habilidades, liberándolos para que realicen cosas maravillosas para Dios. Reúnete con ellos de vez en cuando y practica "Hierro sobre Hierro" con ellos. Si solo hay dos líderes, pueden darse la vuelta y practicar esta herramienta juntos.
        </Text>
        <Text style={styles.paragraph}>
        Recuerda que es esencial no atacar a la persona, sino al plan. Cuando te alejes de estas reuniones, lo harás entendiendo al líder y su trabajo, con compasión por lo que hace y reconociendo la mano de Dios en su ministerio. Esto es asombroso. Así que, mientras entrenas a otros con esta herramienta, dedica tiempo a discutir esta información. No lo hagas con alguien si no estás comprometido, porque no funcionará. 
        </Text>
        <Text style={styles.paragraph}>
        "Hierro sobre Hierro" es la herramienta número 11. 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras continuamos con las herramientas del <Text style={styles.keyword}>4to campo de la cosecha</Text>. <Text style={styles.keyword}>El círculo del medio</Text>, llamado <Text style={styles.keyword}>el liderazgo</Text>. Para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. <Text style={styles.keyword}>La próxima herramienta 12. MAOI</Text>.
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
            source={require("../../assets/videos/Herramienta11.mp4")}
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
            <Text style={styles.subtitle}>HIERRO SOBRE HIERRO</Text>

            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Propósito:</Text> aprender de otros
              profesionales mientras se abordan los atascos (barreras) y se
              aclaran los pasos de acción que abordan los atascos.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Reglas:</Text> Ataca el plan, no al
              hombre.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Enfoque:</Text>: Haga esto teniendo
              en cuenta a los perdidos de su comunidad.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Programa propuesto:</Text>: (60
              minutos, asigne un facilitador y un cronometrador para mantener
              las cosas encaminadas)
            </Text>
            <View style={styles.list}>
            <Text style={styles.keyword}>
          
          </Text>
              <Text style={styles.keyword}>
                1. Informe / Actualización (30 min)
              </Text>
              <Text style={styles.keyword}>
          
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>• Permanecer:</Text> ¿Permanece
                personalmente en Jesús con regularidad? (Si / No)
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>• Conflicto:</Text> ¿Hay alguna
                falta de perdón en su corazón o un conflicto no resuelto en su
                equipo? (Si / No)
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>• Visión:</Text> ¿Cuál es la visión
                local por la que está trabajando?"
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>• Contexto</Text>: describe tu
                contexto (ciudad, grupos de personas, etc.)
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>• Herramientas</Text>: comparta
                brevemente qué herramientas está utilizando en cada uno de los 4
                campos.{" "}
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>
                  • Ritmo del ministerio semanal:
                </Text>{" "}
                comparta brevemente su ritmo semanal (oración, compartir,
                discipulado, iglesia, entrenamiento)
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>• Mapa relacional:</Text> se centra
                en las corrientes más fructíferas (o en el mapa / lista
                relacional si todavía no tienes uno)
              </Text>
              <Text style={styles.listItem}>
                <Text style={styles.keyword}>• Atascos:</Text> asegúrese de
                compartir los atascos / barreras que enfrenta en el camino hacia
                la multiplicación de discípulos e iglesias saludables y firmes.
              </Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.keyword}>2. Ánimo (5 min)</Text>
              <Text style={styles.keyword}>
          
              </Text>
              <Text style={styles.keyword}>
                3. Haga preguntas aclaratorias (5 min)
              </Text>
              <Text style={styles.keyword}>
          
              </Text>
              <Text style={styles.keyword}>
                4. Discutir soluciones para abordar las barreras (15 min) -
                Escrituras, historias y sugerencias
              </Text>
              <Text style={styles.keyword}>
          
              </Text>
              <Text style={styles.keyword}>
                5. Comparta 2-3 elementos de acción y su plan de compromiso (3
                min).
              </Text>
              <Text style={styles.keyword}>
          
              </Text>
              <Text style={styles.keyword}>6. Orar por ellos (2 min)</Text>
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
