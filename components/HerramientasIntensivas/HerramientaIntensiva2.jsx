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
    navigation.navigate('HerramientaIntensiva2', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVA 2: Mapa Generacional</Text>

        <Text style={styles.paragraph}>
        Cuando usted comienza un grupo o una nueva iglesia, es fundamental encontrar un método para evaluar qué tan saludable es dicha iglesia. Sabemos que existe el círculo de la iglesia, pero eso se aplica no solo a grupos ya establecidos, sino también a líderes que inician nuevos grupos. Es esencial que estos grupos no sean solo encuentros sociales, sino que funcionen como una iglesia saludable. Para ello, vamos a utilizar una herramienta llamada <Text style={styles.keyword}>"mapa generacional"</Text>, que nos permitirá ver cómo se están formando las generaciones dentro de la iglesia.
        </Text>
        <Text style={styles.paragraph}>
        Lo primero que haremos será situar nuestra iglesia en un círculo. Debemos conocer cómo está funcionando en términos de asistencia y compromiso. Por ejemplo, si su iglesia tiene 20 personas, es crucial cuantificar cuántas de ellas son cristianas, cuántas están bautizadas, y cuántas se han bautizado desde que comenzó el grupo. Este mapeo podría incluir representaciones gráficas, como bolitas que indiquen a los bautizados desde el inicio. Cada elemento debe estar claro: el número total de personas, las nacidas de nuevo, y las nuevas criaturas en Cristo.
        </Text>
        <Text style={styles.paragraph}>
        Además de estos números, es importante analizar si la iglesia está operando de manera saludable. Para esto, referenciamos el libro de Hechos, que nos ofrece una idea clara de las funciones de la iglesia. <Text style={styles.keyword}>Una iglesia saludable</Text> debe estar comprometida con las nueve funciones, que incluyen la lectura de la Palabra, la oración, la evangelización, y la comunión entre los miembros. Queremos comprender cómo está funcionando la iglesia en todos estos aspectos.
        </Text>
        <Text style={styles.paragraph}>
        Cada iglesia tiene diferentes generaciones. Queremos registrar quién comenzó la iglesia y quién es el líder actual, así como también dónde se reúnen y cuándo se inició el grupo. Esta información no sirve para controlar, sino para ayudar a las personas a avanzar de una generación a otra. Denominamos la primera etapa como <Text style={styles.keyword}>"generación cero"</Text>, donde se inicia el proceso de discipulado. A medida que un líder levanta a más líderes, estos comienzan a formar nuevos grupos.
        </Text>
        <Text style={styles.paragraph}>
        Cuando un grupo se identifica como una iglesia, eso se traduce en un compromiso más sólido. No es obligatorio que cumplan todas las funciones desde el principio para ser considerados una iglesia. Lo importante es que se reconozcan como miembros del cuerpo de Cristo y que funcionen en las áreas donde están comprometidos.
        </Text>
        <Text style={styles.paragraph}>
        El objetivo del mapa generacional es proporcionar un diagnóstico sobre la salud de las iglesias y los grupos formados, permitiendo a los líderes entender cómo está progresando cada generación. A través de esta herramienta, podemos identificar la falta de áreas como liderazgo, oración y evangelización, que son esenciales para el crecimiento del grupo.
        </Text>
        <Text style={styles.paragraph}>
        Cada líder puede utilizar este mapa para mejorar su propio grupo y ayudar a otros a desarrollar la salud congregacional. Al igual que se menciona en 2 Timoteo 2:2, el esfuerzo de multiplicar líderes es fundamental, ya que solo a través de ellos podemos alcanzar a toda la población y generar un impacto significativo.
        </Text>
        <Text style={styles.paragraph}>
        El mapa generacional funciona como un diagnóstico que permite evaluar la salud de los grupos que estamos formando y entender dónde pueden estar los problemas si nos detenemos en la cuarta o quinta generación. Cuando llegamos a este punto, es crucial que los líderes sean capaces de entrenar a otros, fomentando un movimiento que se expanda automáticamente. Al principio, puede parecer difícil, pero una vez que logramos establecer un ritmo y formar líderes que puedan replicar el proceso, el movimiento empezará a rodar con mayor facilidad.
        </Text>
        <Text style={styles.paragraph}>
        El <Text style={styles.keyword}>"mapa generacional"</Text> es una herramienta poderosa para evaluar y asegurar la salud de una iglesia o grupo en sus etapas iniciales. Mientras más clara sea nuestra comprensión sobre cómo se desarrollan las generaciones de líderes y miembros en la comunidad de fe, más efectivos seremos en el proceso de discipulado y expansión del evangelio.
        </Text>
        <Text style={styles.paragraph}>
        Una de las claves del uso del mapa generacional es la identificación de las diferentes etapas en las que se encuentra la iglesia. Cada generación debe ser cuidadosamente documentada para definir no solo quiénes son los líderes actuales, sino también quiénes fueron los pioneros y cómo cada uno ha influido en el crecimiento del grupo. Esto no solo aporta claridad a la estructura de la iglesia, sino que también revela historias de fe y transformación que son esenciales para la cultura del grupo.
        </Text>
        <Text style={styles.paragraph}>
        Es importante recordar que la salud de la iglesia no solo se evalúa por la cantidad de personas que asisten, sino que también debe entenderse en términos de su compromiso con las funciones bíblicas. Si bien el número de miembros es un indicador, el verdadero crecimiento radica en la calidad de la participación, que incluye la oración, la enseñanza de la Palabra y el compartir entre los miembros. La salud espiritual de la congregación debe ser una prioridad; si se descuida, puede resultar en estancamiento o en una dinámica débil.
        </Text>
        <Text style={styles.paragraph}>
        El proceso de avanzar de una generación a otra requiere visión y dedicación. Cada líder tiene la responsabilidad de equipar a otros para que puedan asumir el rol de guías en sus propias comunidades. Esto crea un ciclo virtuoso de capacitación y multiplicación, en línea con el mandato de hacer discípulos que Cristo nos dejó. La referencia a 2 Timoteo 2:2 es fundamental en este sentido, ya que subraya la importancia de pasar el conocimiento a la siguiente generación de líderes.
        </Text>
        <Text style={styles.paragraph}>
        A medida que se utiliza el mapa generacional, debemos estar atentos a las áreas que requieren atención. Si notamos que un grupo se estanca en un ciclo, será esencial indagar en los motivos: falta de oración, escaso compromiso con las enseñanzas, o la ausencia de un plan claro de evangelización. Identificar estos factores puede guiarnos para implementar cambios que revitalicen la comunidad y la lleven a un estadio más saludable.
        </Text>
        <Text style={styles.paragraph}>
        Finalmente, el <Text style={styles.keyword}>"Mapa Generacional"</Text> nos invita a ser proactivos. No se trata solo de hacer un diagnóstico, sino de establecer estrategias para que cada grupo de líderes y miembros pueda evolucionar y crecer. En este contexto, cultivar un ambiente positivo donde los errores se vean como oportunidades de aprendizaje es esencial. De esta manera, podremos construir no solo comunidades de fe vibrantes, sino también discípulos comprometidos y fervorosos que estén dispuestos a avanzar en la obra del Señor.
        </Text>
        <Text style={styles.paragraph}>
        En resumen, el <Text style={styles.keyword}>"Mapa Generacional"</Text> es más que una herramienta; es un llamado a la acción para los líderes que desean elevar el estándar de salud en sus iglesias y asegurar un futuro lleno de esperanza y crecimiento. Al utilizarlo con sabiduría y dedicación, lograremos no solo formar iglesias saludables, sino también una generación activa y motivada de seguidores de Cristo.
        </Text>
        <Text style={styles.paragraph}>
        Al llegar al final de este encuentro, quiero tomar un momento para expresar mi sincero agradecimiento por su atención, participación y compromiso. Ha sido un privilegio compartir juntos en esta herramienta, y estoy emocionado por el potencial que cada uno de ustedes tiene para impactar sus comunidades a través de las herramientas y enseñanzas que hemos explorado.   
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>El "Mapa Generacional"</Text> es, en esencia, una metodología estratégica que permite a los líderes de iglesias y grupos evaluar no solo la asistencia y el crecimiento numérico, sino también la vitalidad y la salud espiritual de su comunidad. A continuación, se presentan algunos aspectos adicionales relevantes sobre esta herramienta y su aplicación en el contexto del ministerio.
        </Text>

        <Text style={styles.subtitleDos}>Evaluación Integral de la Salud de la Iglesia</Text>
        <Text style={styles.paragraph}>
        Además de cuantificar el número de miembros, <Text style={styles.keyword}>El "Mapa Generacional"</Text> permite un diagnóstico más profundo al incluir no solo datos demográficos, sino también aspectos como la participación activa en las funciones bíblicas fundamentales. Esto abarca el discipulado, la enseñanza y la evangelización, permitiendo a los líderes tener una visión holística de la presión del grupo en comparación con las enseñanzas de las Escrituras.
        </Text>
        <Text style={styles.subtitleDos}>Captura de la Cultura y la Historia de la Congregación</Text>
        <Text style={styles.paragraph}>
        Cada generación dentro de la iglesia puede contar una historia singular de fe y transformación. Esta narrativa no solo es significativa para el grupo en el presente, sino que también ayuda a cimentar su identidad colectiva. Capturar la cultura y la historia del grupo es esencial para propiciar un sentido de pertenencia y propósito, motivando a los miembros a participar más activamente en la misión de la iglesia.
        </Text>
        <Text style={styles.subtitleDos}>Herramienta de Alineación y Enfoque Compartido</Text>
        <Text style={styles.paragraph}>
        El "Mapa Generacional" actúa como un marco que puede alinear a los líderes y miembros hacia un objetivo común. Al tener claridad sobre las diferentes generaciones y su progreso, se puede fomentar un sentido de unidad y colaboración en la visión de la iglesia. Esta alineación es crucial para asegurar que todos trabajen hacia el mismo propósito y se sientan parte del crecimiento colectivo.
        </Text>
        <Text style={styles.subtitleDos}>Priorización del Discipulado en el Contexto Generacional</Text>
        <Text style={styles.paragraph}>
        El enfoque en la transición de una generación a la siguiente subraya la importancia del discipulado. Los líderes tienen la responsabilidad de no solo formar a otros en el conocimiento teológico, sino también en la práctica del liderazgo. Este proceso puede incluir mentoría, capacitación y el establecimiento de relaciones que animen a los participantes a asumir roles activos dentro de la iglesia.
        </Text>
        <Text style={styles.subtitleDos}>Identificación de Necesidades y Oportunidades de Desarrollo</Text>
        <Text style={styles.paragraph}>
        A lo largo del uso del "Mapa Generacional", se pueden identificar tanto las carencias como las áreas de oportunidad para el crecimiento. Esto permite a los líderes llevar a cabo intervenciones específicas, ya sea a través de talleres, capacitaciones o estudios bíblicos que aborden necesidades particulares que han sido reveladas a través de la evaluación. Al abordar estas áreas, la congregación puede trabajar para mejorar su salud y, por ende, su efectividad en su misión.
        </Text>
        <Text style={styles.subtitleDos}>Proyección de Futuro y Planificación Estratégica</Text>
        <Text style={styles.paragraph}>
        Otro aspecto clave del Mapa Generacional es su capacidad para influir en la planificación estratégica. Al observar las generaciones y sus trayectorias, los líderes pueden identificar hacia dónde se dirigen y qué pasos deben seguir para asegurar un crecimiento sostenible. Esto incluye preparar a futuros líderes y establecer un plan de sucesión claro para evitar vacíos de liderazgo.
        </Text>
        <Text style={styles.subtitleDos}>Creación de un Entorno de Aprendizaje</Text>
        <Text style={styles.paragraph}>
        Fomentar un ambiente que valore el aprendizaje continuo es vital. El "Mapa Generacional" proporciona una plataforma para discutir no solo los éxitos, sino también los fracasos y las lecciones aprendidas. Al normalizar la idea de que los errores son oportunidades para crecer y mejorar, se puede construir una cultura con un fuerte compromiso.
        </Text>
        <Text style={styles.subtitleDos}>Responsabilidad y Seguimiento</Text>
        <Text style={styles.paragraph}>
        El uso de esta herramienta también incentiva a los líderes a establecer mecanismos de seguimiento y rendición de cuentas. Esto puede incluir reuniones periódicas donde se evalúen los progresos en las generaciones y se discutan las estrategias que están funcionando, así como aquellas que requieren ajustes. La rendición de cuentas es fundamental para mantener un enfoque constante en la misión y los objetivos de la comunidad.
        </Text>
        <Text style={styles.subtitleDos}>Inspiración y Motivación</Text>
        <Text style={styles.paragraph}>
        Finalmente, el "Mapa Generacional" es una fuente de inspiración. A medida que los líderes y miembros ven los frutos de su trabajo y el desarrollo de las generaciones, se genera un sentido de motivación para continuar en la misión de Dios. La imagen de un movimiento creciente y saludable puede servir como un poderoso aliciente para todos en la comunidad de fe.
        </Text>

        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>En conclusión, el "Mapa Generacional"</Text> representa una oportunidad invaluable para evaluar, empoderar y motivar a las congregaciones en su camino hacia la salud y el crecimiento. Al utilizarla de manera efectiva, los líderes pueden cultivar una cultura de activa y comprometida, capaz de impactar no solo a sus miembros, sino también a la comunidad en general. A medida que los líderes implementan estas estrategias, es crucial recordar que cada esfuerzo hacia el crecimiento generacional es un paso hacia la realización del propósito de Dios en sus vidas y en la vida de la iglesia.
        </Text>

        <Text style={styles.paragraph}>
        Recuerden que cada paso que damos hacia el crecimiento y la salud de nuestras iglesias es un paso hacia el avance del reino de Dios. Que la pasión por compartir el evangelio y multiplicar líderes guíe nuestras acciones en el futuro. Sigamos construyendo un legado de fe, amor y servicio, recordando siempre que no estamos solos en este camino. Les animo a que sigan adelante, perseverando en su llamado y apoyándose mutuamente en este hermoso viaje. Espero ver cómo cada uno de ustedes florece y lidera en sus respectivas comunidades.    
        </Text>
        <Text style={styles.paragraph}>
        ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva 3 llamada  <Text style={styles.keyword}>“Hierro con Hierro”</Text>.  
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
            source={require('../../assets/videos/Intensiva2.mp4')}
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

