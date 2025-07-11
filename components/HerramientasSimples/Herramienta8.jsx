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

export default function Herramienta8({ route }) {
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
      toolName: "Her 8: El Círculo Saludable",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta8", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          HERRAMIENTA 8: CÍRCULO SALUDABLE IGLESIA
        </Text>
        <Text style={styles.paragraph}>
          Bienvenido al{" "}
          <Text style={styles.keyword}>
            MOVIMIENTO DE ALCANCE MUNDIAL{" "}
            <Text style={styles.mayuscula}>M.A.M</Text>
          </Text>
          . El entrenamiento de multiplicación de los cuatro campos de un
          discipulado. <Text style={styles.keyword}>Herramienta número 8</Text>.
          Hoy abordaremos el entrenamiento de multiplicación, campo número 4,
          que trata sobre la cosecha: cómo juntar discípulos en grupos. Esta es{" "}
          <Text style={styles.keyword}>
            la herramienta número 8, el "círculo saludable" de la iglesia
          </Text>
          .
        </Text>
        <Text style={styles.paragraph}>
          El campo cuatro,{" "}
          <Text style={styles.keyword}>el campo de la cosecha</Text>, también es
          conocido como la iglesia. Así como un agricultor lleva la voz a la
          cosecha y la recoge, nosotros reunimos a los creyentes en grupos de
          una manera saludable. Recuerda que has estado aquí formando nuevos
          discípulos con herramientas simples. Cuando un discípulo es parte de
          un grupo de "tres tercios", algunos de ellos pueden estar pensando en
          iniciar un nuevo grupo pequeño, y eso es hermoso: grupos que se
          multiplican. Por ello, es importante enseñarles lo que es una iglesia
          saludable, según la Biblia, para que al iniciar su grupo pequeño sepan
          qué cosas deben hacer.
        </Text>
        <Text style={styles.paragraph}>
          En este entrenamiento, pide a tus participantes que escriban en la
          parte superior de la hoja la cita bíblica de Hechos 2:36-47. En este
          pasaje podemos encontrar lo que la iglesia en la Biblia predicaba y
          practicaba, y lo que debemos hacer hoy. Cuando pidas a tus
          participantes leer este pasaje, diles que descubran las cosas que la
          iglesia primitiva hacía. Pide a los participantes que dibujen en su
          hoja un círculo con una línea punteada; este círculo simboliza un
          círculo no saludable. A medida que van leyendo el pasaje, irán
          haciendo nueve dibujos; al finalizar, marcarán el círculo punteado
          hasta que quede completamente cerrado con una línea sólida, lo que
          significará un círculo saludable.
        </Text>
        <Text style={styles.paragraph}>
          A continuación, haré aquí algunas observaciones. En Hechos 2:38, vemos
          que Pedro dice "arrepentíos". Por lo tanto, en una iglesia saludable
          se predica y practica el arrepentimiento. Aquí buscamos una flecha
          afuera del círculo que simboliza el arrepentimiento y un cambio de
          dirección. En el versículo 38 también leemos sobre el bautismo; así
          que dibujemos una forma de agua que simboliza el bautismo: nacer del
          agua y del espíritu.
        </Text>
        <Text style={styles.paragraph}>
          Una iglesia saludable está compuesta por creyentes bautizados. En
          Hechos 2:42 leemos que perseveraban en la oración; aquí los
          participantes pueden dibujar un ícono que simbolice una iglesia de
          oración. En Hechos 2:47 leemos que el Señor añadía cada día a la
          iglesia; por lo tanto, pídeles que dibujen algo que simbolice el
          discipulado. En una iglesia saludable hay multiplicación.
        </Text>
        <Text style={styles.paragraph}>
          En Hechos 2:44 leemos sobre el amor que tenían los unos por los otros
          y cómo estaban juntos en comunión. Pídeles que dibujen un corazón y
          diles que en una iglesia saludable, los miembros se cuidan mutuamente
          buscando el bien de los demás. En Hechos 2:47 se menciona que alababan
          a Dios; por ello, pídeles que dibujen algo que represente la alabanza.
          Una iglesia saludable alaba y exalta a Dios, no a los hombres.
        </Text>
        <Text style={styles.paragraph}>
          En Hechos 2:42 leemos que perseveraban en el partimiento del pan;
          pídeles que hagan este dibujo, pues una iglesia saludable recuerda
          constantemente el sacrificio de Jesús a través de la Cena del Señor.
          En Hechos 2:45 vemos que los creyentes ofrecían de corazón, vendían
          sus cosas y las repartían según la necesidad; pídeles que dibujen algo
          que represente la ofrenda, ya que en una iglesia saludable los
          discípulos ofrendan de corazón y de manera voluntaria.
        </Text>
        <Text style={styles.paragraph}>
          En Hechos 2:42 leemos que la iglesia perseveraba en la doctrina de los
          apóstoles; pídeles que hagan este dibujo porque una iglesia saludable
          se edifica en las enseñanzas del Nuevo Testamento. Hechos 2:42 y 43
          nos enseñan que la iglesia tenía líderes; diles que dibujen algo
          relacionado con liderazgo. Una iglesia saludable tiene líderes que no
          manipulan ni controlan, sino que tienen el carácter de Cristo y animan
          a otros con amor.
        </Text>
        <Text style={styles.paragraph}>
          Al final, diles a tus participantes que marquen el círculo con una
          línea sólida. Con esta herramienta, los nuevos discípulos aprenden lo
          que es una iglesia saludable para que puedan comenzar sus grupos
          pequeños saludables que se multiplican.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.keyword}>
            Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros
          </Text>{" "}
          mientras fomentas entre unos y otros el uso de herramientas simples,
          bíblicas y reproducibles.
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
            source={require("../../assets/videos/Herramienta8.mp4")}
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
            <Text style={styles.title}>CÓMO JUNTAR DISCÍPULOS EN GRUPOS</Text>
            <Text style={styles.subtitle}>CÍRCULO SALUDABLE DE LA IGLESIA</Text>
            <Text style={styles.paragraph}>
              <Text style={styles.keyword}>Nota:</Text> Vaya a Hechos 2: 36-47 y
              léalo con su grupo y dibuje un círculo punteado roto y deje que el
              grupo descubra lo que hizo la iglesia primitiva y coloque los
              símbolos dentro del círculo. Ejemplo, ¿qué vimos allí? Bautismo,
              oración, discipulado, amor, alabar a Dios, partir el pan, dar, la
              palabra de Dios y el liderazgo. 9 cosas y cuando una tiene todas
              las 9, puede dibujar un círculo sólido que indique que es una
              iglesia saludable.
            </Text>
            <Image
              source={require("../../assets/fotos/herramienta008.png")}
              style={estilosIndividual.toolImage}
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>Componentes del círculo saludable</Text>
            <View style={styles.list}> 
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 01.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>1. Jesucristo es Señor: Hechos 5:31</Text>
                  <Text style={styles.paragraph}>• Historia: (Exaltación de Cristo) Filipenses 2:6-11</Text>
                  <Text style={styles.paragraph}>• Adicional: Hechos 4:11-12</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 02.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>2. Arrepiéntete y Cree: Mateo 4:17</Text>
                  <Text style={styles.paragraph}>• Historia: (Zaqueo) Lucas 19:1-10</Text>
                  <Text style={styles.paragraph}>• Adicional: Romanos 3:23 / 6:23 /</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 03.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>3. Se Bautizado: Mateo 28:19</Text>
                  <Text style={styles.paragraph}>• Historia: (Felipe y el Etíope) Hechos 8:26-39</Text>
                  <Text style={styles.paragraph}>• Adicional: Romanos 6:3-4, Mateo 3:13-16, Hechos 2:38</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 04.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>4. Espíritu Santo: Lucas 11:13</Text>
                  <Text style={styles.paragraph}>• Historia: (La promesa del Espíritu Santo) Juan 14:12-26</Text>
                  <Text style={styles.paragraph}>• Adicional: Mateo 3:11 / Hechos 11:16</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 05.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>5. Perseverar en la Doctrina: 1 Timoteo 4:13</Text>
                  <Text style={styles.paragraph}>• Historia: (El alboroto en Tesalónica)
                  Hechos 17:1-12</Text>
                  <Text style={styles.paragraph}>• Adicional: 2 Timoteo 3:16/Romanos 15:4</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 06.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>6. Amor: Mateo 22:37-39</Text>
                  <Text style={styles.paragraph}>• Historia: (El Buen Samaritano) 
                  Lucas 10:25-37</Text>
                  <Text style={styles.paragraph}>• Adicional: Juan 15:13, 1 Corintios 13, Juan 13:34-35, Mateo 22:37-39, Juan 14:15/21:17</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 07.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>7. Santa Cena: Lucas 22:19-20</Text>
                  <Text style={styles.paragraph}>•Historia: (Institución de la Cena del Señor) Lucas 22:7-20/1 Corintios. 11:23-29</Text>
                  <Text style={styles.paragraph}>• Adicional: Hechos 4:11-12</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 08.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>8. Orar: Mateo 6:9-13</Text>
                  <Text style={styles.paragraph}>• Historia: (Jesús nos enseña a orar) Mateo 6:5-15</Text>
                  <Text style={styles.paragraph}>• Adicional: Lucas 10:2</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 09.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>9.  Señales y Prodigios: Mateo 10:8</Text>
                  <Text style={styles.paragraph}>• Historia: (Jesús sana al siervo de un Centurión) Lucas 7:1-10</Text>
                  <Text style={styles.paragraph}>• Adicional: 1 Juan 3:8/Marcos 1:34
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 10.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>10. Dar: Mateo 6:1-4</Text>
                  <Text style={styles.paragraph}>• Historia: (La viuda que da) Marcos 12:41-44</Text>
                  <Text style={styles.paragraph}>• Adicional: 2 Corintios 9:6-7, Mateo 6:1-4, Hechos 4:34-35</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 11.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>11. . Alabanza: Mateo 4:10</Text>
                  <Text style={styles.paragraph}>• Historia: (Pablo y Silas) Hechos 16:25-34</Text>
                  <Text style={styles.paragraph}>• Adicional: Santiago 5:13/Hebreos 13:15</Text>
                </View>
              </View>
            </View>

            <View style={styles.list}>
              <View style={estilosIndividual.imageTextContainer}>
                <Image
                  source={require("../../assets/fotos/element 12.png")}
                  style={estilosIndividual.toolImage2}
                />
                <View style={estilosIndividual.textContainer}>
                  <Text style={styles.keyword}>12. Ve...Haz Discípulos: Mateo 28:19-20</Text>
                  <Text style={styles.paragraph}>• Historia: (La Mujer Samaritana)
                  Juan 4:4-42</Text>
                  <Text style={styles.paragraph}>• Adicional: Lucas 10:1-11</Text>
                </View>
              </View>
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
          source={require("../../assets/marcadores/campo4.png")}
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
    width: width - 28,
    height: width - 28,
    borderRadius: 10,
    marginBottom: 8,
  },
  toolImage2: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 10,
    resizeMode: "stretch",
  },
  imageTextContainer: {
    padding:10,
    borderWidth:1,
    borderColor: '#003366',
    borderRadius:10,
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft:-8,
  },
  textContainer: {
    flex: 1,
  },
});
