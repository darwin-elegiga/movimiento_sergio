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
    navigation.navigate("HerramientaIntensiva9", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          HERRAMIENTA INTENSIVA 9: LOS 3 VIAJES MISIONEROS DE PABLO
        </Text>
        <Text style={styles.paragraph}>
          Dios los bendiga a todos. Hoy quiero hablar sobre los tres viajes
          misioneros de Pablo. Comencemos con el contexto en el que se
          desarrolla esta historia. En una época marcada por una gran diversidad
          religiosa y cultural, el Imperio Romano era un mosaico de creencias y
          prácticas. Jesús había instruido a sus discípulos a permanecer en
          Jerusalén hasta recibir el poder del Espíritu Santo, prometiéndoles
          que serían testigos en Jerusalén, Judea, Samaria y hasta lo último de
          la tierra.
        </Text>
        <Text style={styles.paragraph}>
          Sin embargo, los discípulos no hicieron caso y se quedaron
          principalmente en Jerusalén, donde comenzó la primera iglesia. Con el
          tiempo, tras la persecución y la muerte de Esteban, el evangelio
          comenzó a dispersarse, y la gente salió de Jerusalén, lo que permitió
          que el movimiento de la iglesia primitiva avanzara a otras ciudades.
        </Text>
        <Text style={styles.paragraph}>
          Pablo, quien inicialmente perseguía a los cristianos, tuvo un
          encuentro transformador con el Señor en Damasco.{" "}
          <Text style={styles.keyword}>
            Este radical cambio en su vida lo llevó a convertirse en uno de los
            misioneros más influyentes de la historia
          </Text>
          . Después de su conversión, fue enviado a Tarso, donde permaneció
          durante varios años. Durante este tiempo, las iglesias en Antioquía
          comenzaron a crecer. Pablo no solo predicaba a judíos y griegos, sino
          también a gentiles, lo que fue una novedad en ese contexto religioso.{" "}
          <Text style={styles.keyword}>
            Barnabé, al reconocer la obra de Dios en la vida de Pablo, fue
            enviado a Antioquía para confirmar este crecimiento del evangelio y,
            tras verlo con sus propios ojos, se une a Pablo en la misión
          </Text>
          .
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>El Primer Viaje Misionero</Text> de Pablo
          comienza en Hechos 13, donde el Espíritu Santo lo separa junto con
          Barnabé. Salen de Antioquía, visitan varias sinagogas en Chipre y se
          encuentran con un procónsul que desea creer, enfrentándose a la
          oposición de varios magos. Pablo realiza un milagro que manifiesta el
          poder de Dios, lo que provoca la conversión de muchos. Sin embargo, a
          medida que avanzan en su viaje, enfrentan severas persecuciones; por
          ejemplo, en Listra, a pesar de realizar milagros, son perseguidos y
          Pablo es apedreado y dado por muerto. A pesar de esto, continúa
          predicando en cada lugar donde va, como en Iconio y Listra,
          estableciendo iglesias. En Listra, a pesar de realizar milagros,
          también enfrentan oposición y persecución. Pablo se toma el tiempo
          necesario para edificar a los nuevos creyentes, nombrar ancianos y
          asegurarse de que las iglesias estén organizadas y llenas del Espíritu
          Santo. Este esfuerzo por consolidar las iglesias tiene un impacto
          duradero en la comunidad cristiana.
        </Text>
        <Text style={styles.paragraph}>
          Después de regresar a Antioquía, Pablo enfrenta el problema de la
          circuncisión y la aplicación de las leyes judías a los gentiles, lo
          que lleva al concilio en Jerusalén, donde se discuten y establecen las
          directrices para la iglesia. **Este concilio fue crucial, ya que
          decidió que los gentiles no debían seguir las leyes mosaicas, lo que
          permitió una mayor expansión del evangelio entre los no judíos.**
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>En el Segundo Viaje Misionero</Text>,
          Pablo y Silas visitan nuevamente las ciudades donde habían predicado.
          Este viaje se caracteriza por la inclusión de Timoteo en su
          ministerio. Pablo recibe una visión que lo conduce a Macedonia, donde
          predica en Filipos, convirtiendo a Lidia y a muchos más. Sin embargo,
          enfrentan encarcelamiento; aun en prisión, son fieles, lo que provoca
          la conversión del carcelero, ilustrando cómo el sufrimiento a menudo
          conduce a oportunidades de fe. Durante este viaje, Pablo sigue
          predicando y estableciendo iglesias en Tesalónica, Atenas y Corinto.
          En Atenas, se enfrenta a los filósofos y comparte el evangelio
          utilizando referencias culturales,{" "}
          <Text style={styles.keyword}>
            como citar a un poeta griego. Su habilidad para relacionarse con
            diversos grupos es un ejemplo del enfoque misionero adaptativo que
            empleó en su ministerio
          </Text>
          .
        </Text>
        <Text style={styles.paragraph}>
          En Corinto, Pablo permanece un año y medio, escribiendo cartas a las
          iglesias para abordar doctrinas y problemas. Durante este periodo,
          siente la urgencia de alcanzar a España, ya que la obra y el
          movimiento de iglesias se expanden rápidamente.{" "}
          <Text style={styles.keyword}>
            Su tiempo en Corinto también es significativo porque establece una
            comunidad vibrante que perduraría en el tiempo
          </Text>
          .
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>El Tercer Viaje Misionero</Text> de Pablo
          se dedica a visitar las iglesias ya establecidas y fortalecerlas. Él
          pasa tres meses en Éfeso, donde realiza un gran trabajo evangelístico
          y envía cartas a los corintios para corregir problemas doctrinales. A
          lo largo de su ministerio, Pablo asegura que todos los nuevos
          creyentes sean discipulados adecuadamente y que se establezcan líderes
          en cada iglesia, formando una base sólida para la fe cristiana.{" "}
          <Text style={styles.keyword}>
            Su enfoque en la formación de líderes locales garantiza la
            continuidad del mensaje del evangelio en las comunidades que fundó
          </Text>
          .
        </Text>
        <Text style={styles.paragraph}>
          Finalmente, después de completar su trabajo en varias comunidades y
          ver el crecimiento de las iglesias, Pablo regresa a Jerusalén, donde
          es arrestado. A lo largo de sus viajes, Pablo establece un modelo
          claro para el trabajo misionero: entrar en nuevos lugares, predicar el
          evangelio, formar discípulos, establecer iglesias y levantar líderes
          que continúen con la obra.
        </Text>
        <Text style={styles.paragraph}>
          El impacto de sus viajes no solo sentó las bases para el desarrollo de
          la iglesia primitiva, sino que también influyó en la expansión del
          cristianismo en el mundo occidental. Sus cartas, escritas a lo largo
          de estos viajes, siguen siendo relevantes en la enseñanza y formación
          de los creyentes hoy en día. Su vida y ministerio nos desafían a vivir
          nuestra fe con valentía y compromiso, buscando siempre nuevas maneras
          de compartir el amor de Cristo en nuestras comunidades.
        </Text>
        <Text style={styles.paragraph}>
          ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes!
          Hasta próxima herramienta intensiva número 9 llamada{" "}
          <Text style={styles.keyword}>
            “LA MISIÓN DE DIOS DE GÉNESIS A APOCALIPSIS”
          </Text>
          .
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
            source={require("../../assets/videos/Intensiva9.mp4")}
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
