import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { documentosStyles as styles } from "../DocumentosStyles";
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
      await videoRef.current.setPositionAsync(Math.min(status.positionMillis + 10000, status.durationMillis));
      setShowControls(true);
    }
  };

  const skipBackward = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      await videoRef.current.setPositionAsync(Math.max(status.positionMillis - 10000, 0));
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
    navigation.navigate('LessonPowerPoint', { 
      lessonName: ''
    });
  };

  const openWord = () => {
    navigation.navigate('HerramientaIntensiva11', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
       <Text style={styles.title}>HERRAMIENTA INTENSIVA 11: EL 1-3-9</Text>
       <Text style={styles.paragraph}>
       Hoy les enseñaré la nueva herramienta que pienso que nos va a ayudar muchísimo para la multiplicación de discípulos. Esta herramienta es también de las <Text style={styles.keyword}>herramientas 1-3-9</Text> y el principio está en Segundo de Timoteo 2:2, donde vemos que Pablo le dice a Timoteo que enseñe a gente fiel e idónea lo que aprendió de él, que sea capaz de enseñar a otra gente fiel. Entonces vemos que hay varias características de esas personas.
       </Text>
       <Text style={styles.paragraph}>
       Pablo sigue hablando de la palabra, así que me alegra. Ahora, en Segundo de Timoteo 2:1, dice: "Tú, hijo mío, esfuérzate en la gracia que es en Cristo Jesús. Lo que has oído de mí ante muchos testigos, esto encarga a hombres fieles que sean idóneos para enseñar también a otros". Entonces, vemos que Pablo no solamente le está diciendo a Timoteo que invierta su tiempo en otros, sino que también esos otros deben enseñar a otros.
       </Text>
       <Text style={styles.paragraph}>
       El <Text style={styles.keyword}>versículo 3</Text> dice: "Tú, pues, sufre penalidades como buen soldado de Jesucristo". Entonces, vemos que es un soldado de Jesucristo que sufre penalidades por medio de la persecución. Lo que está pasando es que esa persona es fiel a lo que será llamada. Pero, segura de las características de esos hombres fieles, tiene que ser una persona fiel. <Text style={styles.keyword}>Tiene que trabajar fielmente y obedecer al Señor, no importa lo que pase, como buen soldado</Text>.
      </Text>
      <Text style={styles.paragraph}>
      El <Text style={styles.keyword}>versículo 4</Text> dice: "Ninguno que milita se enreda en los negocios de la vida, a fin de agradar a aquel que lo tomó por soldado". Entonces, lo que vemos ahí es que una persona, un soldado que es fiel, tampoco empieza a hacer otras cosas al mismo tiempo. Esta persona <Text style={styles.keyword}>tiene tiempo</Text>, ya que es una persona que dedica <Text style={styles.keyword}>tiempo para hacer el trabajo para la obra de Dios</Text>.
      </Text>
      <Text style={styles.paragraph}>
      En el <Text style={styles.keyword}>versículo 5</Text>, vamos a ver qué dice: "Y también el que lucha como atleta no es coronado si no lucha legítimamente". Un atleta tiene que esforzarse, aprender las reglas y los reglamentos. Un atleta tiene que ser una <Text style={styles.keyword}>persona enseñable</Text>, una persona que <Text style={styles.keyword}>aprende realmente a hacer este trabajo. Es una persona enseñable y es un soldado</Text>. Los soldados no se enredan en las cosas de la vida; tienen el tiempo.
      </Text>
      <Text style={styles.paragraph}>
      Después, en el <Text style={styles.keyword}>versículo 6</Text>, dice: <Text style={styles.keyword}>"El labrador para participar de los frutos debe trabajar el primero"</Text>. Así que también utiliza la figura de un campesino, y el labrador es una de las personas que trabaja y realmente no depende del fruto, sino de Dios. <Text style={styles.keyword}>Tiene que ser una persona con un corazón humilde que sigue haciendo el trabajo</Text>, no importa si ve o no ve el fruto. Es una persona que es enseñable y que es humilde. El labrador es, por tanto, una persona humilde.
      </Text>
      <Text style={styles.paragraph}>
      Cuando nosotros buscamos a las personas que serán nuestros discípulos, no vamos a obligar a la gente. Primero, vamos a orar para no equivocarnos. No vamos a decir: "Este será uno de mis tres discípulos" y después esos tres van a discipular a otros tres más NO. Vamos a orar; y vamos a traer a las personas correctas. A veces, quizás, vamos a encontrar a uno que es fiel, que tiene tiempo, que es enseñable y humilde. Pero ese uno es una suma nada más.
      </Text>
      <Text style={styles.paragraph}>
      Hicimos 1 solamente y es ese 1 a otro 1; así vamos sumando. Por lo menos queremos expresar y después empezar 2 y después 3, mínimos. O sea, vemos que Jesús tenía 12 y después él se enfocó en los 3, ¿verdad? Nosotros a veces queremos enfocarnos en 50 al mismo tiempo. Si vemos a Jesús que es enfocó en 12, entonces tenemos que aprender.
      </Text>
      <Text style={styles.paragraph}>
      <Text style={styles.keyword}>¿Por qué Jesús se enfocó en 12?</Text> Él quería hacer un trabajo bien, un trabajo que realmente ellos podrían aprender de él para que ellos pudieran multiplicarlo después también a otros, enseñar a otros, a hombres fieles. 
      </Text>
      <Text style={styles.paragraph}>
      Lo que hemos visto es la historia de una persona de Haití. Esa persona empezó a discipular a 30, pero el problema con eso fue que parecía que estaba avanzando rápido, tenía muchos discípulos; pero la verdad es que después no le alcanzó el tiempo y no le alcanzaban las finanzas para ir de un lado a otro, y no pudo hacer un buen trabajo porque descuidaba a las personas que realmente estaban obedeciendo.
      </Text>
      <Text style={styles.paragraph}>
      Por lo tanto, no queremos avanzar muy rápido. Lo que termina pasando es que avanzamos muy lento. En Estados Unidos pasa lo mismo. Tenemos varios casos en Latinoamérica que han pasado lo mismo: queremos discipular a muchas personas al mismo tiempo y eso reproduce, en vez de producir más rápido, produce más despacio. 
      </Text>
      <Text style={styles.paragraph}>
      Lo qué termina sucediendo es que si tenemos 20 o 30 casas abiertas y no podemos llegar a todas las casas, o podemos, pero no dedicamos el tiempo suficiente. Nos dedicamos tres o cuatro días por semana a <Text style={styles.keyword}>esa gente que es fiel, que tiene el tiempo, que es enseñable y humilde</Text>. Muchas de esas personas van a desaparecer. Muchas de esas personas se van a ir a alguna iglesia tradicional, se van a ir algunas gentes quizás al mundo. Esas personas no se van a quedar en este proceso para ayudarnos a avanzar el reino de Dios de una forma que multiplica y que alcanza a toda la población. 
      </Text>
      <Text style={styles.paragraph}>
      No es que se pierda muchos de ellos, pero sí se desenfoca en el trabajo para alcanzar una población entera. Estas son las características. 
      </Text>
      <Text style={styles.paragraph}>
      Si hacemos este proceso, va a aparecer mucho. Así que estamos en lo muy despacio, pero en realidad estamos haciendo una base firme para poder, de ahí, multiplicarnos otra vez. Y estos otros encontrarán 3 cada uno; entonces, los 3 encontraran 3 cada uno y serian 9.
      </Text>
      <Text style={styles.paragraph}>
      Y esos 9 tendrán a otros tres más, cada uno, llegando a 27. Así vemos multiplicando hasta que no quede ningún lugar sin alcanzar. Entonces, <Text style={styles.keyword}>¿qué hacemos con esta gente?</Text> Estas son la gente en la que nosotros tenemos que enfocarnos.
      </Text>
      <Text style={styles.paragraph}>
      En esas 3 personas, ¿qué vamos a hacer? Vamos a pasar entre 60 a 90 días al año. Entonces, aquellas personas con las que vamos a estar, dos, tres, cuatro veces por semana, realmente vamos a conocer quiénes son, su familia; vamos a poder amarlos. Vamos a ver las necesidades de esa persona, el carácter, vamos a poder tener una relación realmente de discípulos de verdad.
      </Text>
      <Text style={styles.paragraph}>
      Estas personas, una vez que empiecen a hacer el trabajo, van a poder hablar en nuestras vidas y van a ayudarnos para aprender nosotros también. Así que no piensen que tres son pocas; concéntrense en estos y van a ver que estos tres, una vez que empiecen a multiplicarse y alcancen a otros tres, cada uno de ellos, ahí vamos a hacer mucho más efectivos que tratar de abarcar muchos y entrenar muchas cosas.
      </Text>
      <Text style={styles.paragraph}>
      No queremos tener una generación de iglesias, sino que queremos tener profundidad de 4 a 6 generacional en profundidad; y eso es lo que va a hacer que el movimiento de plantación de iglesias no se muera. 
      </Text>
      <Text style={styles.paragraph}>
      ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 12  llamada <Text style={styles.keyword}>“Para quién es este entrenamiento”</Text>.
      </Text>

                     
      </View>
    </>
  );

  const newContent = (
    <>
      <View style={[styles.videoContainer, isFullscreen && styles.fullscreenVideoContainer]}>
        <TouchableOpacity activeOpacity={1} onPress={handleVideoPress} style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={require('../../assets/videos/Intensiva11.mp4')}
            rate={1.0}
            volume={1.0}
            isMuted={isMuted}
            resizeMode={isFullscreen ? "contain" : "cover"}
            shouldPlay={isPlaying}
            isLooping
            style={[
              styles.video,
              isFullscreen && styles.fullscreenVideo,
              { transform: [{ rotate: `${rotation}deg` }] }
            ]}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
          {showControls && (
            <View style={[
              styles.controls,
              isFullscreen && styles.fullscreenControls,
            ]}>
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
                  <Ionicons name={isPlaying ? "pause" : "play"} size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipForward}>
                  <Ionicons name="play-forward" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleMute}>
                  <Ionicons name={isMuted ? "volume-mute" : "volume-high"} size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFullscreen}>
                  <Ionicons name={isFullscreen ? "contract" : "expand"} size={24} color="white" />
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
            <Text style={styles.title}>Herramienta 1-3-9</Text>
            <Text style={styles.subtitle}>Principio: 2 Timoteo 2:2</Text>

            <Image 
              source={require('../../assets/fotos/HI011.png')} 
              style={estilosIndividual.toolImage}
            />
          </View>
        </>
      )}
    </>
  );

  return (
    <ImageBackground 
      source={require('../../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
      <ScrollView>
        {showOnlyOriginalContent ? originalContent : (showOnlyNewContent ? newContent : (
          <>
            {newContent}
            {originalContent}
          </>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const estilosIndividual = StyleSheet.create({
  toolImage: {
    width: width - 32,
    height: width + 345,
    borderRadius: 10,
    marginBottom: 8,
  },
});