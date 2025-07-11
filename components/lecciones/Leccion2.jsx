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

export default function Leccion2({ route }) {
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
      lessonName: "Leccion2: Gran Visión Global",
    });
  };

  const openWord = () => {
    navigation.navigate("Leccion2", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lección 2: Gran Visión Global  De Genesis A Apocalipsis</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. En el capítulo anterior presentamos <Text style={styles.keyword}>el bosquejo general</Text> del curso: gran visión, paso libre y herramientas simples. Ahora estamos entrando a <Text style={styles.keyword}>la gran visión</Text> y veremos qué <Text style={styles.keyword}>es global</Text>.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>La visión de Dios</Text>, no nuestra visión, desde Génesis hasta Apocalipsis. Creemos que Dios tiene un plan para revelar su gloria hasta los confines de la tierra y nosotros formamos parte de ese plan. Así que anima a las personas que estás entrenando mostrándoles que ellos forman parte de <Text style={styles.keyword}>la gran visión de Dios</Text>.
        </Text>
        <Text style={styles.paragraph}>
        Se debe destacar que la visión que se debe tener es la de Dios, que abarca desde el inicio hasta el final de la Biblia. Se resalta la idea de que cada participante en el entrenamiento es parte del plan divino y de la misión global de Dios, lo cual motiva a los participantes a sentirse involucrados en esta tarea.
        </Text>
        <Text style={styles.paragraph}>
        Pide a tus participantes que dibujen este pequeño diagrama que se encuentra en la lección 2 en la aplicación móvil. Puedes animarlos inicialmente con las primeras respuestas y luego ellos que sigan haciéndolo. Los puedes dividir en grupos y luego se pueden juntar para compartir lo que aprendieron. Se recomienda que trabajen en grupos para fomentar el intercambio de ideas y aprendizajes, facilitando así un ambiente colaborativo.
        </Text>
        <Text style={styles.paragraph}>
        Primero, háblales de los pasajes de Génesis que están en la parte superior. Y puedes decirles algo así: “En Génesis 1:26, Dios dice: ‘Hagamos al hombre a nuestra imagen’, y continúa diciendo que vayan y se multipliquen. Aquí vemos que Dios siempre tuvo un plan de multiplicación para revelar su imagen hasta los confines de la tierra. En Génesis 3 vemos que Adán y Eva se rebelaron contra Dios y hicieron su palabra por encima de la de Dios, y su imagen por encima de la imagen de Dios. Es triste ver al ser humano rebelándose contra Dios, pero vemos que Dios determinó restaurar su imagen y desplegar su gloria hasta los confines de la tierra.”
        </Text>
        <Text style={styles.paragraph}>
        Llegas a Génesis capítulo 6 en los días de Noé, y vemos que la maldad se ha multiplicado, y donde hay maldad hay pecado, y donde hay pecado hay juicio. Pero donde hay juicio siempre hay gracia, y lo vemos en el nuevo pacto de Dios con todo esto. Porque Dios había determinado restaurar su imagen en las personas y desplegar su gloria hasta los confines de la tierra. Ya en Génesis 11 llegamos a la torre de Babel y una vez más se rebelaron contra Dios, poniendo su gloria por encima de la gloria de Dios. Y hay pecado y hay juicio, pero hay gracia.
        </Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento, pide a los participantes que dibujen este diagrama con tres columnas y que escriban estos pasajes que van a investigar. Que los vayan leyendo y anotando a quién Dios usó y qué tan grande fue la misión de Dios para ellos. Luego los vuelves a reunir y tengan una discusión del grupo con respecto a lo que descubrieron en la Palabra.
        </Text>
        <Text style={styles.paragraph}>
        Aquí lo repasaré un poco contigo: Génesis 12:1-3, ¿a quién llamó a Abram? ¿Qué tan grande? Toda la tierra. Hechos 19:5-6, ¿a quién llamó a Israel? ¿Qué tan grande? Toda la tierra. Salmo 67, ¿a quién llamó Dios a Israel? ¿Qué tan grande? Todas las naciones. Isaías 49:5-6, ¿a quién llamó Jesús profetizado? ¿Qué tan grande? Todo el mundo. Mateo 28:18-20, ¿a quién llamó a los discípulos? ¿Qué tan grande? Todas las naciones. Hechos 1:8, ¿a quién llamó a los discípulos? ¿Qué tan grande? Toda la tierra. Segunda de Corintios 5:18-20, ¿a quién Dios llamó a los discípulos? ¿Qué tan grande? Todo el mundo. Apocalipsis 7:9, ¿a quién llamó? Vemos a las multitudes. ¿Qué tan grande? Todas las naciones, todas las lenguas, todas las tribus, todos los pueblos.
        </Text>
        <Text style={styles.paragraph}>
        Es claro ver varios pasajes bíblicos que demuestran cómo Dios ha llamado a diferentes individuos y grupos a participar en su misión y visión a lo largo de la historia. Se enfatiza la grandeza y el alcance de la visión de Dios, que abarca todas las naciones y pueblos.
        </Text>
        <Text style={styles.paragraph}>
        Ahora que te he mostrado cómo hacerlo, ve tú y has lo mismo. Dios determinó restaurar su imagen en las personas y desplegar su gloria hasta los confines de la tierra, y Dios usó a diferentes personas en diferentes tiempos para llevarlo a cabo. A través de Cristo Jesús en estos tiempos, Dios sigue usando personas. Tú fuiste creado para sus propósitos. Somos parte de la gran misión de Dios. Es global, de Génesis a Apocalipsis. 
        </Text>
        <Text style={styles.keyword}>
        Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros mientras nos preparamos para la proxima LECCIÓN 3. GRAN VISIÓN ES LOCAL. HECHOS IMPACTANTES.
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
            source={require("../../assets/videos/Leccion2.mp4")}
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
            <Text style={styles.title}>LA GRAN VISIÓN</Text>
            <Text style={styles.subtitle}>DESDE GÉNESIS HASTA APOCALIPSIS...Es Global</Text>
            <Text style={styles.paragraph}>Génesis 1:26-28 (Génesis 3) Génesis 6:1, 5 Génesis 9:1 Génesis 11:4
            </Text>
            <View style={estilosIndividual.tableContainer}>
              <View style={estilosIndividual.tableRow}>
                <View style={estilosIndividual.tableHeaderCell}>
                  <Text style={estilosIndividual.tableHeaderText}>
                    REFERENCIA
                  </Text>
                </View>
                <View style={estilosIndividual.tableHeaderCell}>
                  <Text style={estilosIndividual.tableHeaderText}>¿QUIÉN?</Text>
                </View>
                <View style={estilosIndividual.tableHeaderCell}>
                  <Text style={estilosIndividual.tableHeaderText}>
                    ¿CUÁN GRANDE?
                  </Text>
                </View>
              </View>

              {[
                ["Génesis 12:1-3", "Abram", "Toda la tierra"],
                ["Éxodo 19:5-6", "Israel", "Toda la tierra"],
                ["Salmo 67", "Israel", "Toda Nación"],
                ["Isaías 49:5-6", "Jesús (Profetizado)", "Todo el mundo"],
                ["Mateo 28:19-20", "Discípulos", "Toda Nación"],
                ["Hechos 1:8", "Discípulos", "Toda la tierra"],
                ["2 Corintios 5:18-20", "Iglesia", "Todo el mundo"],
                ["Apocalipsis 7:9-10", "Multitudes", "Toda Nación"],
              ].map((row, index) => (
                <View key={index} style={estilosIndividual.tableRow}>
                  <View style={estilosIndividual.tableCell}>
                    <Text style={estilosIndividual.tableCellText}>
                      {row[0]}
                    </Text>
                  </View>
                  <View style={estilosIndividual.tableCell}>
                    <Text style={estilosIndividual.tableCellText}>
                      {row[1]}
                    </Text>
                  </View>
                  <View style={estilosIndividual.tableCell}>
                    <Text style={estilosIndividual.tableCellText}>
                      {row[2]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Text
              style={[estilosIndividual.paragraph]}
            >
              <Text style={estilosIndividual.keyword}>NOTA: </Text>
              Predique las primeras 5 escrituras acerca de cómo Dios creó al
              hombre a su propia imagen y quiso que el hombre se multiplicara y
              revelara su imagen y gloria hasta los confines de la tierra.
              Incluso cuando el pecado entró en el mundo, hubo juicio, luego
              gracia y vemos a Dios decidido a llevar su gloria hasta los
              confines de la tierra mientras usa a diferentes personas para
              lograr su imagen y gloria. ENTONCES, deje de predicar y enseñar y
              haga que las personas a las que está capacitando se sienten en
              grupos y lean las siguientes escrituras y descubran por sí mismos
              A QUIÉN ESTABA USANDO DIOS y CUÁN GRANDE ERA LA VISIÓN. Luego,
              después de 15 minutos, abra la sala y discuta lo que ha aprendido.
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
// [El resto del código se mantiene igual]

// Agregar nuevos estilos
const estilosIndividual = StyleSheet.create({
  tableContainer: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#003366",
    borderRadius:10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#003366",
  },
  tableHeaderCell: {
    flex: 1,
    padding: 4,
    backgroundColor: "#00336622",
    borderBottomWidth:1,
  
    borderRightColor: "#003366",
  },
  tableCell: {
    flex: 1,
    padding: 4,

    borderRightColor: "#003366",
  },
  tableHeaderText: {
    fontSize: 20,
    fontFamily: 'Lora-SemiBold',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#003366',
  },
  tableCellText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Lora-Regular',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
    textAlign: 'justify',
    fontFamily: 'Lora-Regular',
  },
  keyword: {
    fontFamily: 'Lora-SemiBoldItalic',
    textTransform: 'capitalize',
    color: '#1C4F7C',
    fontSize: 20,
  },
});
