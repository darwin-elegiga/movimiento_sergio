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

export default function Herramienta13({ route }) {
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
      toolName: "Her 13: Descripción General",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta13", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          HERRAMIENTA 13: DINAMICA DE COMO FUNCIONA LA MULTIPLICACION
        </Text>
        <Text style={styles.paragraph}>
          Bienvenido al{" "}
          <Text style={styles.keyword}>
            MOVIMIENTO DE ALCANCE MUNDIAL{" "}
            <Text style={styles.mayuscula}>M.A.M</Text>
          </Text>
          . El entrenamiento de multiplicación de los cuatro campos de un
          discipulado. En esta lección trataremos cómo funciona la
          multiplicación de los cuatro campos. Te animo a que esta presentación
          la puedas llevar a cabo en tus entrenamientos, cuando ya estés
          enseñando las herramientas de la siembra. Si lo haces por
          videoconferencia, puedes usar el PowerPoint que se proporciona. Si lo
          estás llevando de manera presencial, puedes hacer un espacio y
          utilizar los gráficos que verás aquí en los 4 campos, para ayudar a la
          audiencia a imaginar esta dinámica. Es muy importante porque abre los
          ojos respecto a cómo funciona la multiplicación.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>
            Comencemos. Tenemos 4 campos: el campo vacío, el campo de la
            siembra, el campo del crecimiento y el campo de la cosecha. En el
            centro, tenemos el liderazgo
          </Text>
          . Esto se trata de hacer discípulos que hagan discípulos. La
          multiplicación comienza con una persona. Supongamos que eres tú. Y has
          sido entrenado completamente con todas las herramientas de los cuatro
          campos y estás preparado para actuar.
        </Text>
        <Text style={styles.paragraph}>
          Primero, te encuentras en un campo vacío. Allí, con las herramientas
          del mapa relacional y la persona de paz, vas a identificar a alguien
          que está buscando a Cristo, ya sea que esté en tu mapa relacional o
          que lo encuentres fuera de él. Así que ahora, tu persona de paz es la
          figura que identificaste. A medida que le encuentras y estás listo,
          caminarás con tu persona de paz al campo de la siembra. Con la
          herramienta del testimonio de quince segundos, los tres círculos y las
          4 respuestas del evangelio, sembrarás el evangelio.
        </Text>
        <Text style={styles.paragraph}>
          Si tu persona de paz decide bautizarse, entonces la llevarás al campo
          del crecimiento. Allí, lo entrenarás con el 4.1.1 y los tres tercios,
          para que crezca fuerte y saludable en Cristo. Luego, caminarás con tu
          nuevo hermano o hermana al campo de la cosecha. En este campo, los
          entrenarás con el círculo saludable y la guía de la mano izquierda,
          para que sepan cómo es una iglesia saludable, quiénes la conforman,
          cómo se reúnen, etc.
        </Text>
        <Text style={styles.paragraph}>
          Una vez que hayan llegado ahí, tú y tu nuevo hermano o hermana que se
          han bautizado volverán al campo vacío y cada uno encontrará a su
          persona de paz. Así, ambos se sumarán al proceso de multiplicación.
          Luego, los 4 se moverán al campo de la siembra, donde cada uno
          sembrará el evangelio en su persona de paz.. Cada uno de ellos
          entrenará a su nuevo hermano o hermana con las herramientas del
          crecimiento, se bautizan, y luego los llevarán a la cosecha.
        </Text>
        <Text style={styles.paragraph}>
          Este proceso se repite. Ahora, en lugar de solo tú y tu nueva hermana
          o hermano, ya son 4 personas. Cada uno de los 4 va de regreso al campo
          vacío y encuentra a su persona de paz, llevando la cuenta a 8. En el
          PowerPoint los de colores verdes son líderes que se van formando, que
          también están trabajando en los campos. Lo mismo ocurre con los 8 una
          vez que completen el siclo de los 4 campos, estos 8 buscan y
          encuentran cada uno su persona de paz, alcanzando así a 16.
        </Text>
        <Text style={styles.paragraph}>
          Una vez que completen los 16 el siclo de los 4 campos, los 16 se
          trasladan a la siembra y repiten el ciclo. Cada uno siembra el
          evangelio en su persona de paz. Este proceso continúa, y pronto verás
          que esos 16 se multiplican y encuentran a nuevas personas de paz, de
          modo que ahora hay 32. Cada uno, en un nuevo ciclo, sembrará el
          evangelio, entrenará a los nuevos hermanos y luego los llevará al
          campo de la cosecha. El objetivo es hacer discípulo que a su vez hagan
          otros discípulos.
        </Text>
        <Text style={styles.paragraph}>
          Los 32 sigue el mismo patrón. Los grupos continúan multiplicándose, y
          las herramientas de siembra, crecimiento y cosecha se instalan en cada
          nuevo creyente. En cada generación, el mensaje del evangelio se
          disemina y el liderazgo se desarrolla verticalmente en el centro.</Text>
        <Text style={styles.paragraph}>
          Una vez que identifican a su persona de paz, los 32 se trasladan a la siembra y repiten el ciclo. Cada uno siembra el evangelio en su persona de paz. Este proceso continúa, y pronto verás que son 64 personas y los 64 busca cada uno una persona de paz, de modo que ahora hay 128 personas.
        </Text>
        <Text style={styles.paragraph}>
          Si tu persona de paz decide bautizarse, entonces la llevarás al campo del crecimiento. Allí, lo entrenarás con el 4.1.1 y los tres tercios, para que crezca fuerte y saludable en Cristo. Luego, caminarás con tu nuevo hermano o hermana al campo de la cosecha. En este campo, los entrenarás con el círculo saludable y la guía de la mano izquierda, para que sepan cómo es una iglesia saludable, quiénes la conforman, cómo se reúnen, etc. Este proceso se repetirá cada vez que se busque y se encuentren las personas de paz.
        </Text>
        <Text style={styles.paragraph}>
          Cada nuevo grupo, sigue el mismo patrón. Los grupos continúan multiplicándose, y las herramientas de siembra, crecimiento y cosecha se instalan en cada nuevo creyente. En cada generación, el mensaje del evangelio se disemina y el liderazgo se desarrolla verticalmente en el centro.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>
          A continuación le mostraremos una tabla que ilustra el proceso de
          multiplicación de los 4 campos:
        </Text>
        <View style={estilosIndividual.tabla}>
          <View style={estilosIndividual.encabezado}>
            <Text style={estilosIndividual.headerCell}>Siclos</Text>
            <Text style={estilosIndividual.headerCell}>Maestros (Líderes)</Text>
            <Text style={estilosIndividual.headerCell}>
              Discípulos (Nuevos Creyentes)
            </Text>
            <Text style={estilosIndividual.headerCell}>
              Total (Maestros + Discípulos)
            </Text>
          </View>
          {[
            [1, 1, 1, 2],
            [2, 2, 2, 4],
            [3, 4, 4, 8],
            [4, 8, 8, 16],
            [5, 16, 16, 32],
            [6, 32, 32, 64],
            [7, 64, 64, 128],
            [8, 128, 128, 256],
            [9, 256, 256, 512],
            [10, 512, 512, 1024],
            [11, 1024, 1024, 2048],
            [12, 2048, 2048, 4096],
          ].map((row, index) => (
            <View key={index} style={estilosIndividual.fila}>
              {row.map((cell, cellIndex) => (
                <Text key={cellIndex} style={estilosIndividual.celda}>
                  {cell}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <Text style={styles.paragraph}>
          Finalmente, cuando llegamos a miles, el crecimiento se vuelve
          ilimitado. Este es el ciclo que no para. Por ello, es sumamente
          importante estar bien entrenados con las herramientas y una buena
          capacitación. Una iglesia que tiene miembros bien equipados y bien
          entrenados es una iglesia activa que realiza el trabajo necesario para
          avanzar en el Reino, anunciando las virtudes de Aquel que nos llamó de
          las tinieblas. Mientras tanto, los líderes se enfocan en desarrollar y
          capacitar a otros en el proceso.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>
          Algunos aspectos fundamentales de la dinámica de cómo funciona la
          multiplicación en el contexto del{" "}
          <Text style={estilosIndividual.mayuscula}>
            MOVIMIENTO DE ALCANCE MUNDIAL (M.A.M.)
          </Text>{" "}
          y el proceso de discipulado en los cuatro campos:
        </Text>

        <Text style={styles.subtitleDos}>1. Conocimiento de los Cuatro Campos</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Campo Vacío: Identificar a personas que están abiertas a escuchar el evangelio. Es aquí donde comienza el proceso de discipulado, utilizando mapas relacionales y personas casa de paz.
          </Text>
          <Text style={styles.listItem}>
            • Campo de la Siembra: Introducir el mensaje del evangelio a la persona de paz. Las herramientas como el testimonio de 15 segundos y los círculos permiten una comunicación clara y efectiva del mensaje.
          </Text>
          <Text style={styles.listItem}>
            • Campo del Crecimiento: Capacitar a los nuevos creyentes para que crezcan en su fe. Utilizar métodos como el 4.1.1 y los tres tercios proporciona un enfoque estructurado para el desarrollo espiritual.
          </Text>
          <Text style={styles.listItem}>
            • Campo de la Cosecha: Preparar a los creyentes para ser parte activa de la comunidad de fe y facilitar su integración en una iglesia saludable.
          </Text>
        </View>

        <Text style={styles.subtitleDos}>2. Proceso de Multiplicación</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • La multiplicación comienza con una sola persona que identifica a su persona de paz. A medida que los nuevos creyentes avanzan a través de los campos, cada uno se convierte en un multiplicador, identificando y entrenando a otros. Esta dinámica genera un crecimiento exponencial.
          </Text>
          <Text style={styles.listItem}>
            • Cada ciclo de cuatro campos se repite, haciendo que las cifras de líderes y nuevos creyentes aumenten siguiendo un patrón geométrico.
          </Text>
         
        </View>
        <Text style={styles.subtitleDos}>3. Liderazgo Central</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • El liderazgo juega un papel crucial en el proceso de multiplicación. Los líderes no solo deben ser multiplicadores, sino que también deben entrenar a otros para capacitarles en el proceso. En el modelo del M.A.M., el liderazgo se desarrolla verticalmente, formando una base sólida para el crecimiento.
          </Text>
           
        </View>
        <Text style={styles.subtitleDos}>4. Uso de Herramientas Efectivas</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Hay herramientas específicas diseñadas para cada etapa del proceso: el mapa relacional para encontrar personas de paz, técnicas de siembra como el testimonio de 15 segundos y métodos de crecimiento como el 4.1.1. Estas herramientas no solo facilitan la transmisión del evangelio, sino que también ayudan a asegurar que los nuevos creyentes se desarrollen adecuadamente.
          </Text>
         
        </View>
        <Text style={styles.subtitleDos}>5. Cultura de Discípulo a Discípulo</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Fomentar una cultura donde los discípulos no solo se convierten, sino que también hacen discípulos a otros. Este ciclo es fundamental para llegar a la multiplicación continua y sostenible del Reino.
          </Text>
         
        </View>
        <Text style={styles.subtitleDos}>6. Importancia de la Capacitación Continua</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • La formación y el equipamiento son cruciales para el éxito del movimiento. Una iglesia bien entrenada es activa y efectiva, capaz de expandir el trabajo del Reino y de proporcionar un apoyo sólido a sus miembros en el proceso de discipulado.
          </Text>
          
        </View>
        <Text style={styles.subtitleDos}>7. Crecimiento Ilimitado</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Al alcanzar cifras altas de nuevos creyentes y líderes, el crecimiento se vuelve prácticamente ilimitado, lo que representa una oportunidad increíble para el avance del Reino. Este crecimiento debe ser manejado con sabiduría y una buena estructura.
          </Text>
         
        </View>
        <Text style={styles.subtitleDos}>8. Visión y Enfoque en el Proceso</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • Mantener una visión clara de lo que significa hacer discípulos, asegurando que cada persona involucrada en el proceso comprenda su rol y compromiso con la misión general del movimiento.
          </Text>
          
        </View>
        <Text style={styles.subtitleDos}>9. Adaptación y Flexibilidad</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            • A medida que el movimiento crece, es fundamental ser adaptables y flexibles. Las estrategias y métodos pueden necesitar ajustes para seguir alcanzando a más personas y adaptarse a contextos cambiantes.
          </Text>
        </View>
        <Text style={styles.paragraph}>
        Estos aspectos fundamentales ayudan a estructurar y guiar el proceso de multiplicación en el contexto del M.A.M., fomentando un enfoque integral para hacer discípulos que puedan a su vez hacer otros discípulos.
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
            source={require("../../assets/videos/Herramienta13.mp4")}
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
            <Text style={styles.subtitle}>
              Tabla de Crecimiento de una multiplicación
            </Text>
            <View style={estilosIndividual.tabla}>
              <View style={estilosIndividual.encabezado}>
                <Text style={estilosIndividual.headerCell}>Siclos</Text>
                <Text style={estilosIndividual.headerCell}>
                  Maestros (Líderes)
                </Text>
                <Text style={estilosIndividual.headerCell}>
                  Discípulos (Nuevos Creyentes)
                </Text>
                <Text style={estilosIndividual.headerCell}>
                  Total (Maestros + Discípulos)
                </Text>
              </View>
              {[
                [1, 1, 1, 2],
                [2, 2, 2, 4],
                [3, 4, 4, 8],
                [4, 8, 8, 16],
                [5, 16, 16, 32],
                [6, 32, 32, 64],
                [7, 64, 64, 128],
                [8, 128, 128, 256],
                [9, 256, 256, 512],
                [10, 512, 512, 1024],
                [11, 1024, 1024, 2048],
                [12, 2048, 2048, 4096],
              ].map((row, index) => (
                <View key={index} style={estilosIndividual.fila}>
                  {row.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={estilosIndividual.celda}>
                      {cell}
                    </Text>
                  ))}
                </View>
              ))}
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
  tabla: {
    marginVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#003366",
  },
  encabezado: {
    flexDirection: "row",
    backgroundColor: "#00336622",
    borderBottomWidth: 2,
    borderColor: "#003366",
  },
  headerCell: {
    flex: 1,
    paddingVertical: 8,
    fontFamily: "Lora-SemiBoldItalic",
    textTransform: "capitalize",
    // color:'#1C4F7C',
    color: "#003366",
    fontSize: 16,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#003366",
  },
  fila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#003366",
  },
  celda: {
    fontSize: 16,
    lineHeight: 22,
    color: "#333",
    textAlign: "justify",
    fontFamily: "Lora-Regular",
    flex: 1,
    padding: 8,
    textAlign: "center",
    borderRightWidth: 1,
    borderColor: "#003366",
  },
  mayuscula: {
    textTransform: "uppercase",
  },
});
