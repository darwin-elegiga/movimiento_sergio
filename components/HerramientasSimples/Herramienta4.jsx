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

export default function Herramienta4({ route }) {
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
      toolName: "Her 4: Los 3 Círculos",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta4", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 4: Los 3 Círculos</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Herramienta número 4 en tu manual de entrenamiento. <Text style={styles.keyword}>Los 3 círculos</Text>. Campo número 2, la siembra. El cómo sembrar la semilla. 
        </Text>
        <Text style={styles.paragraph}>
        En el último entrenamiento estudiamos la herramienta número 3, El testimonio en 15 Segundo. Aprendimos como contar nuestro testimonio de una manera fácil y simple. Aprendimos a testificar el antes de Cristo en mi vida, el cómo fue el encuentro con Cristo y el después que decidí seguir a Cristo en mi vida.
        </Text>
        <Text style={styles.paragraph}>
        Ahora está la herramienta número 4. <Text style={styles.keyword}>Los 3 círculos</Text>. Este es una de las herramientas más importantes porque nos muestra cómo compartir de manera sencilla la historia de Jesús, el mensaje del evangelio. Con esta herramienta podrás entrenar a otros para que entrenen a otro sin necesidad de un título de teología. En tu entrenamiento pide a tus participantes que dibujen esta herramienta mientras vas explicando lo siguiente.
        </Text>
        <Text style={styles.paragraph}>
        Primero diles que dibujen el círculo de la derecha y que digan. No hay duda que vivimos en un mundo quebrantado, estás de acuerdo. Basta con ver las noticias, las redes sociales y a nuestro alrededor para darnos cuenta que vivimos en un mundo quebrantado, lleno de enfermedad tragedia dolor aflicción y muerte. Sin embargo Dios nunca tuvo la intención de que viviéramos en un mundo quebrantado. 
        </Text>
        <Text style={styles.paragraph}>
        Diles a tus participantes que ahora dibujen en el círculo de la izquierda con un corazón en el centro y que digan: En el principio cuando Dios creó el mundo todo era bueno, no había enfermedad, ni tragedia, ni dolor, ni aflicción y muerte. 
        </Text>
        <Text style={styles.paragraph}>
          Los 3 Círculos es una herramienta visual simple pero poderosa para
          explicar el evangelio y el plan de salvación de Dios.Sin embargo Adán y Eva y todos nosotros nos revelamos contra Dios, amando nos a nosotros mismos y a otras cosas más que Dios. Ahora pídeles a tus participantes que dibujen una flecha y una persona huyendo de Dios y escriban la palabra pecado. Y continuó en diciendo. Al desobedecer a Dios debido al pecado nos alejamos de la comunión con Dios, dejando el diseño original, creando nuestro propio mundo quebrantado y vida quebrantada.
        </Text>
        <Text style={styles.paragraph}>
        Qué difícil es vivir en quebrantamiento, por lo que las personas buscan sus propias maneras de salir de su quebrantamiento. Ahora pide a tus participantes que dibujen estas flechas en forma de resortes saliendo hacia arriba en el mundo de quebranto y digan. 
        </Text>
        <Text style={styles.paragraph}>
        Las personas quebrantadas buscan su forma de escapar. Algunos tratan de escapar a través del alcohol, riqueza, inmoralidad, drogas, éxito en la vida, cosas materiales. Con el propósito de sanar su quebrantamiento, pero no lo pueden lograr. Cuando intentan escapar a su manera regresan con más ímpetu a su quebrantamiento es una condición terrible. Dios desde el principio miró que estaríamos en esta situación y en su plan envió a su hijo Jesús para salvarnos.
        </Text>
        <Text style={styles.paragraph}>
        Ahora diles que dibujen en el círculo en el centro y los símbolos y que digan. Dios envió a su hijo Jesucristo para hacer algo que nosotros no podíamos hacer. Jesús murió en la cruz para pagar por nuestros pecados. Fue sepultado y al tercer día resucitó.
        </Text>
        <Text style={styles.paragraph}>
        Ahora pide a tus participantes que dibujen esta puerta en el mundo de quebranto y esta flecha saliendo del mundo de quebranto hacia el circulo en el medio donde esta Cristo. Y que digan, a través de Jesús, Dios a proveído la puerta y el camino para salir del quebrantamiento y recibir salvación. Toda persona que pone su fe en Jesucristo y en su sacrificio por nuestros pecados, se arrepiente y se bautiza recibe el perdón y la reconciliación con Dios. Haciendo a Jesús el rey de su vida.
        </Text>
        <Text style={styles.paragraph}>
        Ahora diles que dibujen la corona en el tercer círculo que digan. Sólo a través de Jesús la imagen de Dios se restauran las personas. Pídeles que dibujen una flecha y una persona brillando entre el primer círculo y el tercero, y que digan. 
        </Text>
        <Text style={styles.paragraph}>
        En segunda de corintios 5:17 nos dice que en Cristo somos nuevas creaturas, las cosas viejas pasaron he aquí todas son hechas nuevas. Ahora ya restaurados y reconciliados con Dios. Él nos  envía de nuevo al mundo quebrantado, pero ya no quebrantados al mundo de dolor, pero ya sin dolor. Para que podamos hablarle a las personas en el mundo quebrantado de que hay una puerta, un camino Jesucristo. Y llevar a todos hacia el para recibir salvación y vida eterna 
        </Text>
        <Text style={styles.paragraph}>
        Al final pide a tus participantes que hagan 2 preguntas a la persona con quienes están compartiendo.
        </Text>
        <Text style={styles.paragraph}>
        ¿En cuál de estos tres círculos te encuentras tú?
        </Text>
        <Text style={styles.paragraph}>
        Si la persona sincera y responde que está en el del quebrantamiento haga la segunda pregunta.
        </Text>
        <Text style={styles.paragraph}>
        ¿En dónde te gustaría estar? En el círculo del quebranto o el círculo del plan de Dios. Si te responde correctamente en el plan de Dios. Porque a nadie le gusta sufrir. Les dirás la tercera pregunta.
        </Text>
        <Text style={styles.paragraph}>
        ¿Qué te impide hacer a Jesús el rey de tu vida? 
        </Text>
        <Text style={styles.paragraph}>
        Si la persona responde no me impide nada que tengo que hacer, entonces ha llegado el momento de la oración de fe y de orar por esa persona. Después tomarles los datos personales para que la iglesia envíe a una persona a esa casa de paz, que tendrá la misión de plantar una nueva casa iglesias en ese lugar. 
        </Text>
        <Text style={styles.paragraph}>
        Recuerda que estás entrenando a otros en como sembrar la semilla, es la herramienta de los tres círculos la historia de Jesús. Todos estamos llamados a compartir el evangelio no sólo algunos. Esta es una manera maravillosa de compartir el evangelio con alguien que está lejos de Dios y una excelente manera de hacerlo.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras seguimos en <Text style={styles.keyword}>el 2do campo, La siembra</Text>. Listo para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. La próxima herramienta 5. El Semáforo.
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
            source={require("../../assets/videos/Herramienta4.mp4")}
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
            <Text style={styles.subtitle}>CONOZCA LA HISTORIA DE JESUS</Text>
            <Image
              source={require("../../assets/fotos/herramienta004.jpg")}
              style={estilosIndividual.toolImage}
            />
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Nota: </Text>Esta es una manera
              maravillosa de compartir el evangelio con alguien que está lejos
              de Dios y una excelente manera de hacerlo, es preguntarle a
              alguien si puede mostrarle algo que cambió su vida y especialmente
              después de contarle su testimonio de 15 segundos.
            </Text>
            <Text style={styles.paragraph}>
              Hay 3 círculos y el de la derecha representa el mundo quebrantado.
              Entonces, cuando comience, explique lo siguiente: No cabe duda que
              vivimos en un mundo quebrantado, hay aflicción, dolor, enfermedad
              y muerte. Sin embargo, Dios nunca tuvo la intención de que
              viviéramos en un mundo quebrantado. Al principio en el mundo que
              Dios creó todo era bueno (circulo de la izquierda), no había nada
              de lo que hay ahora. Pero Adán y Eva y todos nosotros por el
              pecado nos alejamos del diseño original de Dios e hicimos este
              mundo quebrantado. Es muy difícil vivir en quebrantamiento, por
              ello las personas buscan escapar a través de muchas cosas (flechas
              que apuntan hacia afuera), a través de los vicios, fiestas, éxito,
              bienes materiales, etc. Pero no lo logran porque regresan con más
              ímpetu al quebrantamiento. Dios desde un principio tenía preparado
              un plan para rescatarnos y a su tiempo envió a su Hijo Jesús
              (circulo de abajo), Jesús vino, murió por nuestros pecados, fue
              sepultado y al tercer día resucitó, para que todos los que en El
              crean, se arrepientan y se bautizan sean salvos y salgan del mundo
              de pecado recibiendo su perdón y haciéndolo el Rey de sus vidas,
              ahora la imagen de Dios es restaurada en Cristo siendo nuevas
              criaturas y volviendo al diseño original de Dios en comunión con
              El. Ahora, Dios nos vuelve a enviar al mundo quebrantado, pero ya
              no quebrantados para hablarles a las personas de que hay una
              puerta y un camino: Jesucristo. Al final haga las dos preguntas:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                1. En cuál de los dos círculos de arriba te encuentras tú?
              </Text>
              <Text style={styles.listItem}>
                2. Que te impide hacer a Jesús el Rey de tu vida?
              </Text>
              <Text style={styles.listItem}>
                3. Si la persona te responde que nada le impide, es hora de pasar a la oracion de Fe.
              </Text>
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
    marginBottom: 8,
    width: width - 32, // Se ajusta el ancho al contenedor con margen de 8 en cada lado (8 * 2)
    height: (width - 32) / 1.4, // Ajusta la altura automáticamente manteniendo la proporción
    borderRadius: 10,
  },
});
