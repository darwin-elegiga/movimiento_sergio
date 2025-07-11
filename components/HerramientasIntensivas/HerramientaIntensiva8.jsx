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
    navigation.navigate('HerramientaIntensiva8', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVA 8: EFESIOS 4:11</Text>
        <Text style={styles.subtitle}>Herramienta de Multiplicación de Iglesias</Text>
        <Text style={styles.paragraph}>
        La herramienta que vamos a examinar se fundamenta en los roles ministeriales de apóstoles, profetas, evangelistas, pastores y maestros, según Efesios 4:11. Y de la perspectiva bíblica y no como vemos en la actualidad donde muchos se dicen ser y no lo son.  Cuando reflexionamos sobre este pasaje y vemos el gráfico que se proporciona en el video, podemos visualizar una representación que involucra dos flechas: una apuntando hacia abajo y otra hacia adelante. La pregunta que surge es: <Text style={styles.keyword}>¿cuál de estos grupos es más importante?</Text> En realidad, ambos son fundamentales. Sin embargo, en la actualidad, muchas iglesias carecen de una representación equilibrada de estos ministerios, centrándose principalmente en pastores y maestros.
        </Text>
        <Text style={styles.paragraph}>
        Esta falta de ministerios de alcance y expansión, como apóstoles, profetas y evangelistas, resulta en una iglesia con profundos conocimientos pero sin la capacidad de expandirse. Para abordar este desafío, necesitamos implementar un movimiento efectivo de plantación de iglesias que equilibre la profundidad y la expansión.
        </Text>
        <Text style={styles.subtitleDos}>La Clave: Discipulado</Text>
        <Text style={styles.paragraph}>
        El enfoque central para lograr este equilibrio es el discipulado. Sin un movimiento de evangelización, los pastores y maestros no tendrán la necesidad de su labor. Por lo tanto, es crucial que los roles de apóstoles, profetas y evangelistas sean priorizados para iniciar este movimiento. En muchas iglesias, estos ministerios no están presentes, lo que limita el crecimiento.
        </Text>
        <Text style={styles.subtitleDos}>El Rol de la Oración</Text>
        <Text style={styles.paragraph}>
        La oración es un elemento crucial en cada etapa del proceso de plantación de iglesias. Antes de iniciar un nuevo ministerio, es esencial dedicar tiempo a buscar la guía del Espíritu Santo. Las iglesias pueden organizar noches de oración, donde se clame por los líderes, las comunidades y el éxito del movimiento. La oración no solo fortalece la fe, sino que también une a la congregación en un propósito común.
        </Text>
        <Text style={styles.subtitleDos}>Identificación de Líderes</Text>
        <Text style={styles.paragraph}>
        ¿Cómo podemos identificar a las personas con este llamado dentro de iglesias tradicionales? Primero, realizamos entrenamientos específicos. Utilizamos un proceso de <Text style={styles.keyword}>tres toques: modelar, asistir y mirar</Text>. Este entrenamiento básico proporciona herramientas simples, bíblicas y reproducibles que nos permiten detectar a aquellos que tienen un llamado evangelístico.
        </Text>
        <Text style={styles.subtitleDos}>Entrenamiento y Envío</Text>
        <Text style={styles.paragraph}>
        Una vez que hemos identificado a estas personas, nuestro objetivo es involucrar a los pastores y maestros, quienes poseen la autoridad en sus congregaciones, para que apoyen a este grupo en su labor evangelística. Es esencial que su misión no se limite a atraer personas al templo, sino que se expanda para alcanzar a toda la ciudad para Cristo. Dado que no siempre podemos contar con un gran templo, proponemos reuniones en casas, restaurantes o parques. Esto no compite con el edificio tradicional, sino que busca involucrar a toda la comunidad de manera accesible.
        </Text>
        <Text style={styles.subtitleDos}>Ejemplos Prácticos</Text>
        <Text style={styles.paragraph}>
        Un ejemplo inspirador es la iglesia "Creciendo en Cristo", que comenzó con un pequeño grupo de tres familias. A través de un enfoque intencional en la evangelización y el discipulado en sus hogares, lograron formar varias comunidades que hoy en día son iglesias vibrantes, alcanzando a cientos de personas en su ciudad. Este testimonio resalta la efectividad del modelo de plantación de iglesias.
        </Text>
        <Text style={styles.subtitleDos}>Multiplicación de Iglesias</Text>
        <Text style={styles.paragraph}>
        El grupo de evangelistas, respaldado por la iglesia, comenzará a multiplicarse y a plantar iglesias simples en diversas ubicaciones. A medida que evangelizan y conectan con otros, se generará un movimiento de plantación de iglesias. Esta estrategia da lugar a diferentes generaciones de iglesias: la generación 1, que da lugar a la generación 2, y así sucesivamente. Cada generación debe levantar a un nuevo líder que, a su vez, formará a otros.
        </Text>
        <Text style={styles.subtitleDos}>Desarrollo de Líderes</Text>
        <Text style={styles.paragraph}>
        El desarrollo de líderes no se limita solo a la capacitación teológica. Es fundamental empoderar a los líderes emergentes con habilidades prácticas que les permitan guiar a sus comunidades. Proporcionar talleres sobre liderazgo, resolución de conflictos y comunicación efectiva será clave para el éxito y la sostenibilidad de cada nueva iglesia.
        </Text>
        <Text style={styles.subtitleDos}>Enfoque en la Sencillez y Fundamentos</Text>
        <Text style={styles.paragraph}>
        Comenzamos el proceso con un enfoque en la multiplicación, donde todo es simple, bíblico y reproducible. Al principio, no se proporciona un conocimiento profundo, ya que esto podría dificultar la transmisión de la información. Una vez que estas nuevas iglesias comienzan a moverse, regresamos para proporcionar una base sólida que prepare a los líderes para el pastoreo.
        </Text>
        <Text style={styles.paragraph}>
        Cuando la multiplicación está en marcha, se inicia la segunda etapa, donde ofrecemos fundamentos. Cada líder de iglesia recibe preparación pastoral, lo cual permite profundizar en la doctrina y en los mandamientos de Jesús. A medida que avanzan, se evitan sobrecargas de información que podrían abrumar a los nuevos líderes.
        </Text>
        <Text style={styles.subtitleDos}>Evaluación Continua</Text>
        <Text style={styles.paragraph}>
        Es fundamental establecer un proceso de evaluación continua del progreso y el impacto de las iglesias plantadas. Esto puede incluir obtener retroalimentación de la comunidad y de los líderes, así como medir métricas, como el número de conversiones, grupos pequeños formados y la participación comunitaria.
        </Text>
        <Text style={styles.subtitleDos}>Estudios Profundos</Text>
        <Text style={styles.paragraph}>
        Una vez que hemos establecido una red de iglesias y formado líderes capaces, organizamos encuentros para el estudio doctrinal. Los líderes se reunirán para examinar pasajes sobre el Espíritu Santo, la divinidad de Jesús y otros temas relevantes, siempre con el Espíritu Santo como maestro. La intención no es imponer creencias, sino equipar a los líderes para que aprendan a estudiar las Escrituras de manera autónoma.
        </Text>
        <Text style={styles.subtitleDos}>Desafíos y Soluciones</Text>
        <Text style={styles.paragraph}>
        Es importante reconocer que el proceso de plantación de iglesias puede enfrentar varios desafíos, como la resistencia de la comunidad o la falta de recursos. Anticipar problemas y ofrecer soluciones proactivas, como conectar con líderes locales o buscar el apoyo de iglesias madre, será crucial para el éxito.
        </Text>
        <Text style={styles.subtitleDos}>Conclusión</Text>
        <Text style={styles.paragraph}>
        Este enfoque integral, que combina la evangelización, el discipulado y la formación doctrinal, establece un movimiento de plantación de iglesias capaz de alcanzar al mundo entero. Cada iglesia puede convertirse en un centro de multiplicación, impactando a su comunidad local y cumpliendo con la Gran Comisión. Por lo tanto, invitamos a todos los que lean este mensaje a involucrarse en este movimiento, ya sea identificando a nuevos líderes, orando o apoyando de diversas maneras. Con fe y dedicación, podemos cumplir el mandato de Jesús de hacer discípulos en todas las naciones.
        </Text>
        <Text style={styles.paragraph}>
        ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 9  llamada <Text style={styles.keyword}>“LOS 3 VIAJES MISIONEROS DE PABLO”</Text>.  
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
            source={require('../../assets/videos/Intensiva8.mp4')}
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
            <Text style={styles.title}>Efesios 4:11 Movilización desde la etapa numero 4</Text>
            <Image 
              source={require('../../assets/fotos/HI81.png')} 
              style={estilosIndividual.toolImage1}
            />
            </View>

          <View style={styles.contentContainer}>            
            <Image 
              source={require('../../assets/fotos/HI82.png')} 
              style={estilosIndividual.toolImage2}
            />
            </View>

          <View style={styles.contentContainer}>
            <Text style={estilosIndividual.subtitle}>Entrenamiento
            Básico 3 Toques</Text>

            <Image 
              source={require('../../assets/fotos/HI83.png')} 
              style={estilosIndividual.toolImage3}
            />
            <Text style={styles.subtitle}>Intensivo 4 días
            Intermedio <Text style={estilosIndividual.mayuscula}>H.C.H</Text></Text>
            </View>

          <View style={styles.contentContainer}>
             <Text style={styles.title}>fase 1</Text>
             <Text style={estilosIndividual.subtitle}>Multiplicación</Text>
            <Image 
              source={require('../../assets/fotos/HI84.png')} 
              style={estilosIndividual.toolImage4}
            />
            </View>

          <View style={styles.contentContainer}>
             <Text style={styles.title}>fase 2</Text>
             <Text style={estilosIndividual.subtitle}>Fundamentos Desarrollo Pastoral</Text>
            <Image 
              source={require('../../assets/fotos/HI85.png')} 
              style={estilosIndividual.toolImage5}
            />
            </View>

          <View style={styles.contentContainer}>
             <Text style={styles.title}>fase 3</Text>
             <Text style={estilosIndividual.subtitle}>Confesiones Desarrollo Doctrina</Text>
            <Image 
              source={require('../../assets/fotos/HI85.png')} 
              style={estilosIndividual.toolImage5}
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
  toolImage1: {
    width: width - 32,
    height: width - 60,
    borderRadius: 10,
    marginBottom: 8, 
  },
  toolImage2: {
    width: width - 32,
    height: width - 80,
    borderRadius: 10,
    marginBottom: 8,
   
  },
  toolImage3: {
    width: width - 32,
    height: width - 40,
    borderRadius: 10,
    marginBottom: 8,
   
  },
  toolImage4: {
    width: width - 32,
    height: width - 32,
    borderRadius: 10,
    marginBottom: 8,
   
  },
  toolImage5: {
    width: width - 32,
    height: width - 100,
    borderRadius: 10,
    marginBottom: 8,
   
  },
  subtitle: {
    fontSize: 22,
    fontFamily: 'Lora-SemiBold',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#003366',
    marginBottom:8,
  },
  mayuscula:{
    textTransform: 'uppercase',
    fontSize: 22,
    fontFamily: 'Lora-SemiBold',
    textAlign: 'center',
    color: '#003366',
    marginBottom:8,
  },
});
