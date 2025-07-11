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

export default function Herramienta12({ route }) {
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
      toolName: "Her 12: MAOI",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta12", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 12: Ciclo de Oración</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Enfocado en cómo desarrollar líderes que se multipliquen. Esta es la lección número dieciséis y la herramienta número doce, titulada "Principio Me a Hoy", que se encuentra en la página veintidós de tu manual de entrenamiento. Esta herramienta es para líderes y está ubicada en el círculo central de los cuatro campos.  
        </Text>
        <Text style={styles.paragraph}>
        El principio <Text style={styles.mayuscula}>"MAOI"</Text> se basa en modelar, ayudar y observar. Si has estado aquí para otros, lo que realmente has estado haciendo es modelar para ellos. Es por esto que es importante trabajar en la cosecha, ya que todo comienza modelando. El siguiente paso es asistir y ayudar a otros mientras ellos también te ayudan a ti. Luego llega el tiempo en el cual solo observas a los demás hacer el trabajo y finalmente, el momento de dejar que crezcan. 
        </Text>
        <Text style={styles.paragraph}>
        Esta herramienta es genial para transferir conocimientos y habilidades. Es lo que hicieron los apóstoles, y es lo que hacen electricistas, plomeros, y otros en diversas labores. Se trata de equipar y transferir herramientas. El Principio <Text style={styles.mayuscula}>"MAOI"</Text> se puede comparar con el proceso de enseñar a un niño o niña a andar en bicicleta. Primero, el niño observa cómo te subes a la bicicleta, cómo pedalear y cómo mantener el equilibrio. Luego, ayudas al niño a subirse a su bicicleta, a sentarse, a tomar el manubrio, a poner los pies en los pedales y a sujetar la bicicleta mientras intenta equilibrarse.
        </Text>
        <Text style={styles.paragraph}>
        Con el tiempo, comienzas a soltar la bicicleta, pero el niño aún no puede hacerlo solo del todo. A menudo todavía tiene dificultades al dar vueltas o al pasar sobre algunas banquetas. Por ello, continúas ayudando y observando de cerca. Más adelante, observarás cómo el niño puede andar en bicicleta por sí solo, y es entonces que llega el momento de que lo haga libremente y tú puedas irte. Esto implica equipar, transferir herramientas y liberar a la persona para que actúe. 
        </Text>
        <Text style={styles.paragraph}>
        Dios quiere usar a sus hijos para sus propósitos. Sin embargo, el problema es que muchos líderes, en lugar de equipar y liberar, lo que hacen es controlar, como si tuvieran a los demás como posesiones. Es decir, nunca sueltan la bicicleta, aunque el niño ya tenga veinte años. Este principio es simple, bíblico y reproducible. 
        </Text>
        <Text style={styles.paragraph}>
        Hay varios ejemplos en las Escrituras sobre este principio. En Marcos 1, vemos a Jesús predicando, sanando y anunciando de pueblo en pueblo. Lo que realmente hace Jesús es modelar a sus discípulos para que ellos hagan lo mismo. También observamos a Pablo en Hechos capítulo trece al veinte, donde realiza sus viajes misioneros. Va de pueblo en pueblo predicando, discipulando, plantando iglesias y confirmando la fe de otros, todo ello modelando lo que un siervo del Señor debe ser. 
        </Text>
        <Text style={styles.paragraph}>
        En segundo lugar, ayudar. Jesús en Marcos capítulo seis ayuda a sus discípulos alimentando a los cinco mil. No los dejó solos; les pide que alimenten a la multitud mientras observa. Pablo, en primera de Tesalonicenses capítulo tres, llega a Corinto y escribe una carta pidiendo ayuda para llevar su mensaje a Tesalónica, viendo a Timoteo llevando esa carta, ayudándose mutuamente.
        </Text>
        <Text style={styles.paragraph}>
        En tercer lugar, observar. Jesús en Juan capítulo cuatro es mencionado como el que bautizaba más discípulos que Juan, aunque en realidad eran sus discípulos quienes realizaban los bautismos. Jesús observaba su progreso, al igual que Pablo en Segunda de Timoteo 2:2, observando a Timoteo mientras él escribía esa carta desde la distancia. 
        </Text>
        <Text style={styles.paragraph}>
        Finalmente, irse. En Hechos capítulo uno, Jesús le dice a sus discípulos que serán testigos hasta los confines de la tierra y luego se va. Pablo, en Hechos 20, se despide de los ancianos de Éfeso. Hemos visto a Jesús y a Pablo modelar, ayudar, observar y luego irse. 
        </Text>
        <Text style={styles.paragraph}>
        El principio <Text style={styles.mayuscula}>"MAOI"</Text> en tu entrenamiento de los cuatro campos es muy necesario para los líderes, ya que muchas veces, en lugar de equipar y liberar, muchos optan por controlar. La multiplicación de líderes se trata de equipar, transferir herramientas y liberar a otros para que también puedan hacer lo mismo. 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras continuamos con las herramientas del <Text style={styles.keyword}>4to campo de la cosecha. El círculo del medio</Text>, llamado <Text style={styles.keyword}>el liderazgo</Text>. Para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. <Text style={styles.keyword}>La próxima herramienta 13. DINAMICA DE COMO FUNCIONA LA MULTIPLICACION.</Text>
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
            source={require("../../assets/videos/Herramienta12.mp4")}
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
              CÓMO DESARROLLAR LÍDERES QUE SE MULTIPLICAN
            </Text>
            <Text style={styles.subtitle}>PRINCIPIO MAOI</Text>

            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Nota: </Text>MAOI es el acrónimo de
              Modelar, Ayudar, Observar e Irse y es una excelente manera de
              transferir habilidades y equipar a otros y vemos que Jesús y los
              discípulos usaron esto. Esto es común con comerciantes como
              electricistas, plomeros y oficios similares.
            </Text>
            <Text style={styles.paragraph}>
              Me gusta compararme con un padre que enseña a un niño a andar en
              bicicleta. El padre primero montará la bicicleta en frente del
              niño para MODELAR y así el niño pueda ver lo que el padre quiere
              que haga. Luego, los padres AYUDARÁN al niño sujetando el sillón y
              ayudando al niño a mantener el equilibrio, pero también lo
              ayudarán a pedalear. Luego, el padre MIRARÁ al niño andar en
              bicicleta y cuando ese niño pueda viajar, el padre SE IRÁ.
            </Text>

            <Text style={styles.subtitle}>Ejemplos en las escrituras:</Text>

            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>MODELAR </Text>Jesús en Marcos 1:
              modeló la predicación, oración, sanación y el traslado de pueblo
              en pueblo.
              <Text style={styles.paragraph}>
                Pablo en Hechos 13 hasta Hechos 20 modeló cómo plantar iglesias
                y desarrollar equipos.
              </Text>
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>AYUDAR </Text>Jesús en Marcos 6:
              35-41 ayudó a sus discípulos alimentando a los 5000 y luego vemos
              que Jesús les pide a ellos que los alimenten.
            </Text>
            <Text style={styles.paragraph}>
              Pablo en 1 Tesalonicenses 3: 6 llega a Corinto y escribe una
              carta. Cuando necesita ayuda para llevar la carta a Tesalónica, se
              la confía a Timoteo.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>OBSERVAR </Text>A Jesús en Juan 4:2
              se le culpa por bautizar a más discípulos que Juan. De hecho, no
              era Jesús quien bautizaba, sino sus discípulos. Él estaba mirando
              y delegando. Pablo en 2 Timoteo 2:2 estaba mirando a Timoteo desde
              la distancia mientras se acercaba.
            </Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>IRSE </Text>Vemos a Jesús en Hechos
              1:7-11 irse y dice que ustedes serán mis testigos hasta los
              confines de la tierra y las hojas.
            </Text>
            <Text style={styles.paragraph}>
              Y Pablo en Hechos 20:18-35 se despide de los ancianos de Efesios.
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
