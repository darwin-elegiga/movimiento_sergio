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
    navigation.navigate('HerramientaIntensiva5', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
              <Text style={styles.title}>HERRAMIENTA INTENSIVA 5: LOS 3 TOQUES EN 3 DÍAS</Text>
            
              <Text style={styles.paragraph}>
              Lo que llamamos <Text style={styles.keyword}>tres toques en tres días</Text> es una serie de entrenamientos intensivos. Este enfoque, que se ha implementado en diferentes iglesias de diferentes denominaciones en el territorio cubano y en otros países de Hispanoamérica, ha producido resultados sorprendentes. Por ejemplo, en un país de Centroamérica, fueron entrenados 120 personas y, tras realizar <Text style={styles.keyword}>tres toques en tres días</Text>, un mes después esa gente había alcanzado a 2000 personas. No solo eso, sino que también se iniciaron 250 obras nuevas. De esta manera, podemos ver el impacto de estos entrenamientos intensivos.
              </Text>
              <Text style={styles.paragraph}>
              El primer paso es la llegada de un grupo de fuera del país, o de alguna persona local que ya haya recibido entrenamiento, para modelar el proceso. Este entrenamiento se realiza a través de un evento que generalmente se lleva a cabo de 9 am a 5 pm. Después de cada evento, hacemos prácticas para alistar el siguiente día. En el segundo día de entrenamiento, no solo practicamos en un solo lugar, sino que nos dividimos en varios grupos y le pedimos a los locales que participen en el siguiente entrenamiento para que estén capacitados.
              </Text>
              <Text style={styles.paragraph}>
              El día dos es clave: tenemos una segunda sesión de entrenamiento, también de 9 am a 5 pm. Por la noche, pasamos entre cuatro y seis horas practicando lo aprendido. A medida que más personas participan, la dinámica se enriquece y podemos incluir a más locales en el proceso. Esta noche de práctica resulta intensa, pero los resultados justifican el esfuerzo.
              </Text>
              <Text style={styles.paragraph}>
              En el tercer día, nuestra función cambia; nosotros, que venimos de fuera, solo observamos. Durante este día, el cien por ciento del entrenamiento es proporcionado por los locales, lo que permite que ellos integren su aprendizaje con la práctica y, al final del evento, posean la habilidad de reproducir el entrenamiento en el futuro. Hemos constatado que, inmediatamente después de nuestros entrenamientos, las iglesias locales continúan formando otros grupos para compartir el evangelio, creando una especie de dinamismo.
              </Text>
              <Text style={styles.paragraph}>
              Esto funciona como una chispa que enciende un fuego. Antes, este tipo de entrenamiento se hacía cada 2 o 3 meses, pero hemos visto que este enfoque intensivo de <Text style={styles.keyword}>tres días</Text> eleva a muchos líderes en poco tiempo. Sin embargo, es crucial que, tras el evento, se forme un equipo de trabajo. Este equipo será responsable de realizar entrenamientos y desarrollar grupos de iglesia que también realicen actividades de evangelismo. Si no hay un equipo comprometido, el trabajo podría desaparecer, así que nos aseguramos de que haya personas dispuestas a continuar con el entrenamiento.
              </Text>
              <Text style={styles.paragraph}>
              Después de 3 a 6 meses, regresamos y proporcionamos un entrenamiento intensivo de 40 horas. Este es el primer nivel, diseñado para que todos aprendan rápidamente lo básico y no tardemos años en alcanzar esta etapa. En este retorno, enseñamos principios bíblicos y herramientas de liderazgo que son esenciales para el crecimiento. A menudo, se plantea la preocupación de que este enfoque genera mucho crecimiento, pero con poca profundidad. Sin embargo, es necesario que los nuevos aprendices comiencen con conceptos simples antes de profundizar.
              </Text>
              <Text style={styles.paragraph}>
              Regresamos para impartir esa profundidad bíblica necesaria, para que el nuevo líder sea capaz de encontrar, nombrar y filtrar a otros líderes eficaces. Todo esto se basa en el marco estratégico que estamos implementando, que incluye principios bíblicos fundamentales para seguir avanzando en el proceso de formación de iglesias.
              </Text>
              
              <Text style={styles.subtitleDos}>Una Perspectiva Ampliada </Text>
              <Text style={styles.paragraph}>
              El método de "tres toques en tres días" ha demostrado ser una estrategia poderosa en la capacitación y movilización de líderes en comunidades. Su estructura intensiva no solo favorece la adquisición rápida de habilidades, sino que también busca generar un impacto sostenible a largo plazo en las comunidades locales. Permíteme profundizar un poco más en cada fase del proceso y destacar algunos aspectos adicionales de su efectividad. 
              </Text>
              <Text style={styles.subtitle}>Estructura del Proceso</Text>
              <Text style={styles.subtitleDos}>1. Día 1: Introducción y Modelado</Text>
              <Text style={styles.paragraph}>
              En el primer día, la llegada de un equipo externo proporciona una oportunidad invaluable para que los participantes experimenten un entrenamiento diseñado con un enfoque práctico. Este modelo de entrenamiento no solo se centra en la teoría, sino que permite que los participantes vean la implementación real de los conceptos. El ambiente colaborativo creado fomenta una cultura de aprendizaje, donde los participantes se sienten motivados a interactuar, hacer preguntas y decidir cómo van a aplicar lo que aprenden.
              </Text>
              <Text style={styles.subtitleDos}>2. Día 2: Expansión y Prácticas Intensivas</Text>
              <Text style={styles.paragraph}>
              Durante el segundo día, la dinámica se transforma radicalmente. La división en grupos para prácticas y la inclusión de más miembros de la comunidad enriquecen la experiencia. Este diseño también facilita la construcción de relaciones, lo que es crucial para el funcionamiento de una iglesia. La práctica de habilidades en equipos pequeños fomenta la confianza, y permite a los participantes abordar sus desafíos específicos dentro de sus contextos. Además, destaca el papel de la comunidad, mostrando que el evangelismo no es una tarea individual, sino un esfuerzo colectivo.
              </Text>
              <Text style={styles.subtitleDos}>3. Día 3: Empoderamiento Local</Text>
              <Text style={styles.paragraph}>
              El tercer día se centra en el empoderamiento. Los participantes locales asumen el control del entrenamiento y se convierten en los instructores. Este cambio de rol es crucial, ya que asegura que el conocimiento y las habilidades adquiridas se integren en la comunidad. Además, el hecho de que los locales enseñen a otros solidifica su aprendizaje y les da la confianza necesaria para continuar con la misión. Al final del evento, estos líderes emergentes deben sentirse capacitados y entusiasmados para reproducir el entrenamiento a nivel local.
              </Text>
              <Text style={styles.subtitleDos}>Impacto Sostenible</Text>
              <Text style={styles.paragraph}>
              La clave del éxito de este modelo radica en la formación de un equipo de trabajo comprometido que actúe como catalizador en la comunidad una vez que los entrenadores externos se retiren. La creación de este equipo no solo asegura que el conocimiento se mantenga vivo, sino también que se implemente de manera efectiva en la evangelización continua.
              </Text>
              <Text style={styles.subtitleDos}>La Importancia del Seguimiento</Text>
              <Text style={styles.paragraph}>
              Para garantizar que el crecimiento no se limite a una explosión numérica superficial sino que se sostenga a lo largo del tiempo, es fundamental el seguimiento posterior al entrenamiento. Este puede manifestarse en la forma de entrenamientos adicionales, como el intensivo de cuarenta horas mencionado, donde se profundiza en los principios bíblicos y en sólidos fundamentos de liderazgo. Este ciclo de capacitación y seguimiento contribuye a que los nuevos líderes desarrollen sus habilidades y se sientan respaldados en su contexto pastoral.
              </Text>
              <Text style={styles.subtitleDos}>Implicaciones para el Futuro</Text>
              <Text style={styles.paragraph}>
              Un aspecto crucial que vale la pena mencionar es la flexibilidad del modelo. La estrategia de "tres toques en tres días" puede adaptarse a diferentes culturas y contextos, lo que hace que sea aplicable en lugares diversos. Además, el enfoque en la simplicidad inicial permite una rápida incorporación de nuevos aprendices mientras se establece una base sólida para el crecimiento.
              </Text>
              <Text style={styles.paragraph}>
              A medida que el modelo se implementa y se ajusta, existe un potencial emocionante para crear un movimiento de liderazgo significativo que no solo alcance a más personas, sino que también las edifique en su fe de manera profunda y duradera. La combinación de un enfoque intensivo, la comunitarización del aprendizaje y el seguimiento estratégico puede establecer un ciclo continuo de evangelización y crecimiento en cada comunidad, marcando una diferencia duradera en cada nación y región donde se implementen los entrenamientos intensivos.
              </Text>
              <Text style={styles.paragraph}>
              En conclusión, estos son los <Text style={styles.keyword}>"tres toques"</Text>. Si está interesado en que visitemos su iglesia y realicemos esta capacitación, puede contactarnos. Estaríamos encantados de colaborar. Este enfoque ha probado ser el más efectividad para alcanzar resultados significativos. Con la base establecida desde el primer día, los participantes estarán bien preparados para hacer discípulos y plantar iglesias.
              </Text>
              <Text style={styles.paragraph}>
              ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 6  llamada <Text style={styles.keyword}>“El Proceso para entrenar iglesias que planten iglesias”</Text>.  
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
            source={require('../../assets/videos/Intensiva5.mp4')}
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

