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

export default function Herramienta2({ route }) {
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
      toolName: "Her 2: Casa de Paz",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta2", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 2: Casa de Paz</Text>
        <Text style={styles.paragraph}>
        Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación que te enseña a cómo entrar y preparar un campo vacío, que es el 1er campo, sembrar la semilla en 2do campo que es la siembra del evangelio en las personas, a continuar en el 3er campo del crecimiento de la siembra que es el discipulado, el 4to campo que es la cosecha que es la formación de nuevas iglesias y por último los diferentes niveles de liderazgo. 
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Hoy estudiaremos Personas Casas de Paz</Text>
        <Text style={styles.paragraph}>
        La herramienta número 2 que tiene por título Abriendo Casas de Paz. Antes de entrar, vamos a ubicarnos en donde estamos, ya hemos hablado de los 4 campos y estamos en el campo número 1. La entrada al campo vacío, que es el plan inicial.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Primero queremos darle el fundamento bíblico de las iglesias en las casas: </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hechos 2:46</Text> Y perseverando unánimes cada día en el templo, y partiendo el pan en las casas, comían juntos con alegría y con sencillez de corazón.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hechos 2:2</Text> Y de repente vino un estruendo del cielo como de un viento recio que corría, el cual hinchió toda la casa donde estaban sentados.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hechos 20:20</Text> Cómo nada que fuese útil he rehuido de anunciaros y enseñaros, públicamente y por las casas.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hechos 16:29-32</Text> El entonces pidiendo luz, entró dentro, y temblando, postró a los pies de Pablo y de Sìlas, y sacándolos fuera, le dice: Señores, ¿qué es menester que yo haga para ser salvo? Y ellos dijeron: Cree en el Señor Jesucristo, y serás salvo tú, y tu casa. Y le hablaron la palabra del Señor, y a todos los que están en su casa.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hechos 5:42</Text> Y todos los días, en el templo y por las casas, no cesaban de enseñar y predicar a Jesucristo.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Colosenses 4:15</Text> Saludad a los hermanos que están en Laodicea, y a Nimfas, y a la iglesia que está en su casa.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Romanos 16:5</Text> Asimismo a la iglesia de su casa. Saludad a Epeneto, amado mío, que es las primicias de Acaya en Cristo.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>1 Corintios 16:19</Text> Las iglesias de Asia os saludan. Os saludan mucho en el Señor Aquila y Priscila, con la iglesia que está en su casa.  
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Filemón 1:2</Text> Y a la amada hermana Ápia, y a Arquipo nuestro compañero de milicia, y a la iglesia que está en tu casa.
        </Text>
        <Text style={styles.paragraph}>
        Solo Dios sabe el costo para construir un templo, estamos hablando del costo en materiales, añadiéndole esfuerzo físico, los alimentos y todas las cosas que hay que hacer para la construcción de un templo. Con esto no digo que construir templo sea malo hacerlo. Pero creo que las almas están primero que los templos. ¿De qué nos sirve tener locales y tenerlos vacíos? La iglesia primitiva tenía las iglesias en casa. Ellos no tenían el tiempo ni recurso para dedicarse a construir.
        </Text>
        <Text style={styles.paragraph}>
        LA URGENCIA ERA PREDICAR EL EVANGELIO DEL REINO. Y en lo que hay ministros que las finanzas y el tiempo lo utilizan construyendo edificios, hay otros que usan los recursos para predicar y ganar almas en las casas.
        </Text>
        <Text style={styles.paragraph}>
        De eso se trata. La iglesia tiene que salir, la iglesia tiene que decir mi trabajo principal es predicar y hacer discípulos por las casas. Las otras cosas son 2do y 3er lugar en el Reino de Dios.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Por eso hoy te enseñaremos la herramienta Personas Casas de Paz.</Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento divide en grupos y pídeles a tus participantes que abran sus Biblias y lean Lucas 10 del 1 al 9, pídeles que dibujen en una hoja de papel 2 columnas y que escriban en el lado izquierdo la palabra <Text style={styles.keyword}>SÍ</Text> y en el lado derecho la palabra <Text style={styles.keyword}>NO</Text>. Cuando Jesús envió a sus discípulos a buscar una persona de paz, les dijo algunas cosas que SÍ debían hacer y otras que <Text style={styles.keyword}>NO</Text>.
        </Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento, cuando tus participantes estén listos con las 2 columnas en blanco, pídeles que lean el pasaje y que descubran por sí mismos las respuestas. Póngale pausa a la clase y haga lo que se le está pidiendo. Luego continúe.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>A continuación lo haré aquí contigo.</Text>
        <Text style={styles.paragraph}>
        Según <Text style={styles.keyword}>Lucas 10</Text>, vemos cosas que los discípulos <Text style={styles.keyword}>SÍ</Text> deben hacer para encontrar una persona de paz. Por ejemplo:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. Ir de 2 en 2.</Text>
          <Text style={styles.listItem}>2. Orar al Señor por obreros.</Text>
          <Text style={styles.listItem}>3. Si te reciben, decir paz.</Text>
          <Text style={styles.listItem}>4. Quedarse.</Text>
          <Text style={styles.listItem}>5. Comer y beber lo que le pongan en la mesa.</Text>
          <Text style={styles.listItem}>6. Sanar a los enfermos.</Text>
          <Text style={styles.listItem}>7. Decir el Reino de Dios se ha acercado.</Text>
          <Text style={styles.listItem}>8. Si no son bienvenidos, sacuda el polvo de sus pies.</Text>
        </View>

        </View>
        <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Ahora cosas que los discípulos NO deben hacer cuando buscan una persona de paz.</Text>
        <Text style={styles.paragraph}>
        No llevéis bolsa, ni alforja, esto significa que necesitas 0 presupuesto para compartir el evangelio ni que les paguen para expandir el EVANGELIO DEL REINO DE DIOS. Es un llamado de Dios para todos.
        </Text>
        <Text style={styles.paragraph}>
        No sandalias significa confiar y depender de las provisiones de Dios.
        </Text>
        <Text style={styles.paragraph}>
        No saludes a nadie en el camino, significa que no te distraigas en tu misión; ya que algunas personas hablarán y argumentarán y podrán distraerte del objetivo.
        </Text>
        <Text style={styles.paragraph}>
        No andar de casa en casa, esto significa que cuando encuentres a tu persona de paz, detente, dedica tiempo a esa familia, no te apresures hasta que el evangelio haya sido predicado a todos en esa casa. Esto podría ser el comienzo de una Casa Iglesia allí mismo.
        </Text>
        <Text style={styles.paragraph}>
        Vemos a Jesús y los apóstoles modelando esta estrategia para encontrar una persona de paz. Cuando tus participantes terminen el tiempo que les has dado para que vean por sí mismos lo que SÍ y lo que NO pueden hacer, vuelvan a reunirse y tengan una discusión en grupo. Hablen de algunos ejemplos bíblicos de personas de paz y algunas características para identificarlas.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>
          Comparte con tus participantes 3 características de una persona de paz.
          </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. Recibe al mensajero.</Text>
          <Text style={styles.listItem}>2. Recibe el mensaje.</Text>
          <Text style={styles.listItem}>3. Recibe la misión.</Text>
        </View>
        </View> 

         <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Ejemplos de personas de paz en los evangelios.</Text>
        <Text style={styles.paragraph}>
        En <Text style={styles.keyword}>Juan 4</Text>, la mujer del pozo, la samaritana fue la persona de paz de Jesús, porque ella recibe al mensajero, el mensaje y su misión.
        </Text>
        <Text style={styles.paragraph}>
        En el libro de <Text style={styles.keyword}>Marcos capítulo 2</Text>, Leví o Mateo igual fue una persona de paz, porque recibió al mensajero a Jesús, su mensaje y su misión. Él le dijo sígueme y él lo siguió.
        </Text>
        <Text style={styles.paragraph}>
        En el libro de <Text style={styles.keyword}>Lucas 19</Text>, Zaqueo, otra persona de paz. Allí arriba de ese árbol, también es una persona de paz porque recibió al mensajero, a Jesús, en su casa, su mensaje y su misión. Y la salvación vino sobre la casa de Zaqueo, expresó Jesús en el versículo 9.
        </Text>
        <Text style={styles.paragraph}>
        El endemoniado gadareno en Lucas 8 también es una persona de paz, porque recibió al mensajero a Jesús, su mensaje y su misión. Una vez que fue libre, le rogaba seguir al Señor, pero él lo envió a su casa a testificar las cosas que Dios había hecho con él.
        </Text>
        <Text style={styles.paragraph}>
        Vemos también que no solo en los evangelios encontramos personas de paz, sino también en la iglesia naciente en el libro de los Hechos. Ahora veremos algunas personas de paz en el libro de los Hechos.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hechos 8</Text>, el eunuco etíope recibió a Felipe, el mensajero, el mensaje del evangelio y la misión. Fue bautizado.
        </Text>
        <Text style={styles.paragraph}>
        En <Text style={styles.keyword}>Hechos 10</Text>, Cornelio es también una persona de paz de la misma manera. Recibió a Pedro, el mensajero, el mensaje y la misión, junto con toda su casa.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hechos 16</Text>, Lidia y también en el mismo 16, el carcelero. También son personas de paz, ¿qué interesante, lo cree usted? ¿Será que Jesús, como sus discípulos, nos está mostrando aquí un modelo a seguir, a descubrir y a identificar a la persona o a la casa de paz?
        </Text>
        <Text style={styles.paragraph}>
        Vemos a Jesús y los apóstoles modelando esta estrategia para encontrar una persona de paz y guiarlos hacia la salvación. Todas estas personas de paz recibieron al mensajero, el mensaje y la misión.
        </Text>
        <Text style={styles.paragraph}>
        Tal vez alguien se pueda preguntar: ¿y cómo encuentro mi persona o mi casa de paz? La respuesta es a través de la herramienta mapa relacional, dentro de las personas que están en tu círculo de influencia, en tu mapa relacional, que están lejos de Dios pero cerca de usted. Oren por ellas.
        </Text>
        <Text style={styles.paragraph}>
        Fíjate bien cuál de ellas recibe al mensajero, cuál de ellas puede recibir el mensaje y puede recibir la misión. Mientras se preparan para ingresar al 2do campo que es la siembra.
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras te preparas para entrar al <Text style={styles.keyword}>2do campo, La siembra</Text>. Listo para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. La proxima herramienta 3. El Testimonio en 15 Segundo.
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
            source={require("../../assets/videos/Herramienta2.mp4")}
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
            <Text style={styles.subtitle}>PERSONA/CASA DE PAZ</Text>

            <Text style={styles.paragraph}>
              Lea Lucas 10: 1-9 y divida la página en dos columnas como en el
              siguiente ejemplo, luego responda las siguientes preguntas del
              pasaje:
            </Text>

            <Text style={styles.paragraph}>
              1) ¿Qué le dijo Jesús a los discípulos que hicieran?
            </Text>
            <Text style={styles.paragraph}>
              2) ¿Qué le dijo Jesús a los discípulos que no hicieran?
            </Text>

            <View style={styles.list}>
              <Text style={styles.subtitle}>SÍ</Text>
              <Text style={styles.listItem}>• Orar, ir, 2x2</Text>
              <Text style={styles.listItem}>• Decir "paz sea a esta casa"</Text>
              <Text style={styles.listItem}>• Quedarse en esa casa,</Text>
              <Text style={styles.listItem}>
                • Comer/beber lo que les ofrecieran
              </Text>
              <Text style={styles.listItem}>• Sanar al enfermo</Text>
              <Text style={styles.listItem}>• Decir "el reino está cerca"</Text>
              <Text style={styles.listItem}>•¿No son bienvenidos?</Text>
              <Text style={styles.listItem}>• Sacúdanse el polvo.</Text>
            </View>

            <Text style={styles.subtitle}>NO</Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• No llevar bolsa</Text>
              <Text style={styles.listItem}>• No llevar alforja</Text>
              <Text style={styles.listItem}>• No llevar calzado</Text>
              <Text style={styles.listItem}>• No saludar por el camino</Text>
              <Text style={styles.listItem}>• No pasarse de casa en casa</Text>
            </View>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>NOTA:</Text> No llevar cartera
              significa llevar cero presupuesto, necesario para compartir el
              evangelio. Sin bolsos ni sandalias significa confianza y depender
              de las provisiones de Dios. No saludar significa que no se
              distraiga. No moverse de casa en casa significa que cuando
              encuentre a una persona de paz o casa de paz DETÉNGASE y dé tiempo
              a esa familia y no se apresure hasta que el evangelio haya sido
              predicado a todos.
            </Text>

            <Text style={styles. subtitleDos}>EJEMPLOS DE PERSONAS DE PAZ:</Text>
            <Text style={styles.paragraph}>
              (Mujer junto al pozo Jn. 4), (Leví Mc. 2) (Zaqueo Lc. 19) (El
              Eunuco Hechos 8) (Cornelio Hechos 10) (Lidia y el Carcelero Hechos
              16)
            </Text>

            <Text style={styles. subtitleDos}>
              CARACTERÍSTICAS DE UNA PERSONA DE PAZ:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• Reciben al mensajero</Text>
              <Text style={styles.listItem}>• Reciben el mensaje</Text>
              <Text style={styles.listItem}>• Reciben la misión</Text>
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
