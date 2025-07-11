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
    navigation.navigate('HerramientaIntensiva7', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
            <Text style={styles.title}>HERRAMIENTA INTENIVA 7: LAS 4 ETAPAS DE UN MOVIMIENTO</Text>
                           
            <Text style={styles.paragraph}>
            Cuando analizamos la historia de un movimiento de plantación de iglesias, podemos identificar cuatro etapas distintivas que han sido evidentes a lo largo de los años.
            </Text>
            <Text style={styles.paragraph}>
            <Text style={styles.keyword}>La primera etapa es cuando un misionero llega a un lugar donde nunca se ha predicado el evangelio, un campo blanco</Text>. En esta etapa inicial, el enfoque es compartir el evangelio y, a medida que algunas personas comienzan a creer, se establece un grupo de creyentes. Es crucial que estas primeras personas reciban su identidad como embajadores y sacerdotes, ya que necesitamos que se conozcan y empiecen a compartir el evangelio con otros.
            </Text>
            <Text style={styles.paragraph}>
            <Text style={styles.keyword}>La segunda etapa es conocida como la etapa de multiplicación</Text>. En esta fase, vemos que muchas personas están predicando el evangelio y cada vez hay más cristianos. Las reuniones pueden comenzar a realizarse en casas, y la siembra del evangelio se intensifica. A medida que crece la cantidad de creyentes, surgen los ministerios constituido por el mismo Señor. En esta etapa, la multiplicación de iglesias en los hogares se hace más evidente.
             </Text>
             <Text style={styles.paragraph}>
             <Text style={styles.keyword}>La tercera etapa se llama formalización</Text>. En esta fase, las iglesias simples que se han formado en casas comienzan a juntarse en un lugar específico, como un edificio, debido al aumento de miembros. Si bien el evangelio sigue siendo predicado, la intensidad de la predicación disminuye a medida que las personas se sienten cómodas en las grandes iglesias. Aquí, los factores como pastores y maestros adquieren mayor importancia, y comienzan a surgir personajes con un perfil de "estrella" en el liderazgo.
             </Text>
             <Text style={styles.paragraph}>
             <Text style={styles.keyword}>La cuarta etapa, que es la institucionalización</Text>. En esta fase, las iglesias crecen a gran escala y se convierten en megaiglesias. Muchos de los miembros buscan ser como el pastor estrella y recurren a instituciones teológicas para capacitaciones. Esto crea una desconexión, ya que a menudo se prioriza el edificio y el conocimiento académico sobre la multiplicación espontánea y el discipulado. En este punto, vemos que, a pesar de contar con grandes edificios, estas iglesias no logran reproducir un liderazgo efectivo y terminan vacías, especialmente en regiones como Europa.
             </Text>
             <Text style={styles.paragraph}>
             En Estados Unidos, muchas iglesias se encuentran en una etapa de formalización e institucionalización, tratando de enviar misioneros a campos donde aún no hay trabajo. Sin embargo, aquellos que egresan de los institutos a menudo no están preparados con métodos sencillos y reproducibles para compartir el evangelio. Esto dificulta la propagación rápida del evangelio en otros países, ya que se requiere mucho dinero y conocimiento. 
             </Text>
             <Text style={styles.paragraph}>
             Para contrarrestar este problema, es crucial priorizar la multiplicación de iglesias simples en casas. Cuando se inicia un movimiento saludable, enviamos nuevamente a los creyentes a lugares sin evangelizar, donde pueden comenzar a reproducir comunidades de fe en lugar de enfocarse solo en construir edificios. Este proceso es esencial para que todas las personas escuchen el evangelio.
             </Text>
             <Text style={styles.paragraph}>
             Vemos también que, en cuanto al manejo del dinero, al principio, todos compartían sus posesiones y no había necesidad entre los creyentes. Sin embargo, conforme avanzamos en las etapas, el dinero tiende a concentrarse en las iglesias más grandes. Esto crea una desconexión, ya que muchas personas enriquecidas experimentan problemas mientras los edificios sólidos quedan vacíos. Lo que queremos lograr es que cada iglesia sea autosuficiente y capaz de mantenerse, así como de enviar misioneros y tomar decisiones financieras acordes con su comunidad de fe.
             </Text>
             <Text style={styles.paragraph}>
             Las primeras dos etapas se basan más en <Text style={styles.keyword}>la obediencia</Text> y <Text style={styles.keyword}>la acción</Text>, mientras que las siguientes etapas se enfocan en <Text style={styles.keyword}>el conocimiento</Text> y <Text style={styles.keyword}>la formación</Text>. A medida que avanzamos, el énfasis cambia hacia un conocimiento más profundo, que debe ser equilibrado con la necesidad constante de obedecer la palabra y actuar. Estas son las cuatro etapas de un movimiento de plantación de iglesias.
             </Text>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>Varios argumentos respaldados por estadísticas y datos de organizaciones relevantes:</Text>

            <Text style={styles.subtitleDos}>1. Evidencias de la Estancación en el Crecimiento de Iglesias</Text>   
            <Text style={styles.paragraph}>
            - Según el Instituto Barna, el 70% de las iglesias en EE. UU. están en declive o estancadas, lo que indica que muchas iglesias no están reproduciendo discípulos ni plantando nuevas congregaciones.
            </Text>
            <Text style={styles.paragraph}>
            - Pew Research Center reporta que en los últimos años, un creciente número de estadounidenses se identifica como "sin afiliación religiosa", sugiriendo que las estrategias actuales de crecimiento no están efectivas.
            </Text>
            <Text style={styles.subtitleDos}>2. El Problema de las Megaiglesias</Text>   
            <Text style={styles.paragraph}>
            - Un estudio de Church Growth International indica que aunque las megaiglesias a menudo atraen grandes congregaciones, su capacidad para plantar nuevas iglesias disminuye drásticamente. Solo el 2% de las megaiglesias participan activamente en la plantación de nuevas iglesias y muchas veces se centran más en el mantenimiento de su edificio y programación que en el evangelismo.
            </Text>
            <Text style={styles.paragraph}>
            - En Europa, un informe de Eurobarómetro muestra que el 71% de las personas se declaran no religiosas o no creen, lo que sugiere que las iglesias institucionalizadas están teniendo dificultades para conectar con la cultura contemporánea.
            </Text>
            <Text style={styles.subtitleDos}>3. Desconexión en el Discipulado</Text>   
            <Text style={styles.paragraph}>
            - La Asociación de Iglesias de (X) denominación revela que la mayoría de los seminaristas egresados no se sienten capacitados para abordar las necesidades de las comunidades, lo que evidencia que el enfoque en la formación teológica tradicional no siempre prepara a los líderes para el trabajo práctico en el evangelismo.
            </Text>
            <Text style={styles.paragraph}>
            - Las estadísticas de Cambia la Historia muestran que el 84% de los nuevos creyentes se convierten a través de relaciones personales y no a través de programas institucionales, lo que pone de relieve la importancia de métodos de evangelismo sencillos y personales.
            </Text>
            <Text style={styles.subtitleDos}>4. Priorizar la Multiplicación de Iglesias Simples</Text>   
            <Text style={styles.paragraph}>
            - Movimientos de Iglesia en Casa (HCM, por sus siglas en inglés) han visto un crecimiento exponencial, con informes de multiplicaciones de grupos que alcanzan cientos de nuevas comunidades en pocos años. Esto resalta que el modelo de iglesias simples es eficaz para propagar el evangelio rápidamente.
            </Text>
            <Text style={styles.paragraph}>
            - Según el Movimiento de Iglesias Multiplicadoras, aquellas iglesias que se enfocan en el discipulado y la formación de líderes a través de grupos pequeños logran multiplicarse entre 3 y 5 veces más rápido que las que solo se enfocan en el crecimiento numérico en edificios.
            </Text>
            <Text style={styles.subtitleDos}>5. Reforzar el Enfoque en el Contexto Local</Text>   
            <Text style={styles.paragraph}>
            - Un estudio de Gartner Research indica que las iglesias que adaptan sus métodos al contexto local son más efectivas en alcanzar a las comunidades no alcanzadas. Esto destaca la importancia de desarrollar métodos de evangelismo que sean culturalmente relevantes y adaptativos.
            </Text>
            <Text style={styles.subtitleDos}>Conclusión</Text>  
            <Text style={styles.paragraph}>
            Para persuadir a los pastores, es crucial presentar información clara y concreta que vincule el ciclo de formalización e institucionalización con una disminución en la efectividad de la evangelización. Es posible que deseen considerar alternativas centradas en la multiplicación de iglesias sencillas, que han demostrado ser más efectivas en la expansión del evangelio y la creación de comunidades de fe dinámicas y saludables. Fomentar la conexión personal y el enfoque en el discipulado puede revitalizar el llamado a hacer discípulos de todas las naciones.
             </Text>
          </View>  

          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>Algunas comparaciones de las 4 etapas del proceso de plantación de iglesias:</Text>
                           
            <Text style={styles.paragraph}>
            En la primera etapa, que se centra en la plantación, los grupos se encuentran en hogares y tienen un enfoque fuerte en la evangelización y el discipulado directo. Esto permite una conexión orgánica y un crecimiento rápido. Los líderes son emergentes y laicos, lo que fomenta una alta participación de los miembros. Esta etapa crea un ambiente de colaboración donde todos se sienten parte de la misión.
            </Text>
            <Text style={styles.paragraph}>
            La segunda etapa, la multiplicación, se caracteriza por la reproducción orgánica de grupos, donde nuevas iglesias surgen a partir de otras existentes. Aquí la comunidad se ve activa en la generación de nuevas congregaciones, generando un impacto significativo en el entorno local. La participación de los miembros sigue siendo alta, y se busca siempre el contacto y la conexión con nuevas personas.
            </Text>
            <Text style={styles.paragraph}>
            Por otro lado, la tercera etapa es la formalización. En esta fase, se da una consolidación en un lugar específico, lo que a menudo lleva a un aumento en la burocracia y, en algunos casos, a disminuir el enfoque en el evangelismo práctico. Los pastores se vuelven más profesionales, y se da un mayor énfasis en la arquitectura y el mantenimiento físico del espacio de culto. Esto conduce a una disminución en la participación activa de los miembros, ya que la estructura puede volverse rígida y menos accesible.
             </Text>
             <Text style={styles.paragraph}>
             Finalmente, la cuarta etapa es la institucionalización. Aquí, las iglesias tienden a convertirse en megaiglesias, donde la jerarquía organizacional se vuelve predominante. A menudo, se prioriza el mantenimiento de los edificios y los programas, lo que puede resultar en una desconexión con la comunidad local. Los miembros pueden verse reducidos a una audiencia pasiva, lo que impide que se produzca el crecimiento de nuevas comunidades.
             </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.subtitle}>Estrategias para regresar a las etapas iniciales sin malinterpretaciones por parte de los líderes establecidos en las etapas posteriores.</Text>
                           
            <Text style={styles.paragraph}>
            Para regresar a las primeras etapas sin que los líderes que están en las etapas de formalización e institucionalización malinterpreten este intento, es vital seguir algunas estrategias claras. En primer lugar, hay que realizar una revisión del propósito, organizando talleres que reflexionen sobre la misión original de hacer discípulos y realizar plantaciones. 
            </Text>
            <Text style={styles.paragraph}>
            Además, la capacitación en evangelismo relacional es fundamental, ofreciendo formación que priorice las relaciones personales en lugar de métodos institucionales. Promover el envío de líderes a comunidades no alcanzadas también es crucial para reavivar la plantación de iglesias desde la base.
            </Text>
            <Text style={styles.paragraph}>
            Asimismo, es importante crear espacios para grupos pequeños, fomentando reuniones en casas o lugares informales que pueden servir de incubadoras para nuevas iglesias. Redefinir el éxito, enfocando la narrativa en el número de discípulos enviados y comunidades plantadas, puede también ayudar a cambiar la visión de lo que se considera un crecimiento saludable.
             </Text>
             <Text style={styles.paragraph}>
             Involucrar a los miembros en las decisiones de la iglesia y promover una cultura de multiplicación, mediante testimonios de éxito en plantaciones de iglesias y discipulado, también es esencial para facilitar este proceso de regreso a las etapas iniciales.
             </Text>                           
            <Text style={styles.paragraph}>
            Además, para evitar malentendidos, es clave mantener una comunicación clara y transparente sobre las intenciones detrás de estas iniciativas, subrayando que no se trata de eliminar estructuras existentes, sino de volver a los fundamentos que fomentan el crecimiento saludable. Involucrar a los líderes de las etapas posteriores puede hacer que se sientan parte del cambio, y mantener un espíritu de colaboración enfatiza que cada etapa tiene su valor en el esfuerzo de hacer discípulos y expandir el evangelio.
            </Text>
            <Text style={styles.paragraph}>
            En conclusión, reintegrar las primeras etapas de plantación y multiplicación en el enfoque de la iglesia es vital para revitalizar el evangelismo y el discipulado. Con un enfoque estratégico y colaborativo, se puede asegurar que todos participen en la tarea de expandir el reino de Dios de manera efectiva y significativa.
            </Text>
            <Text style={styles.paragraph}>
            La siguiente herramienta intensiva es una estrategia que a continuación propone una estrategia bíblica para llevar a las iglesias alcanzar tribus, lenguas, pueblos y naciones. 
             </Text>
             <Text style={styles.paragraph}>
             ¡Que la gracia y paz de nuestro Señor estén con cada uno de ustedes! Hasta próxima herramienta intensiva número 8  llamada <Text style={styles.keyword}>“EFESIOS 4.11”</Text>.  
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
            source={require('../../assets/videos/Intensiva7.mp4')}
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

