import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { documentosStyles as styles } from "../DocumentosStyles";
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function Leccion3A({ route }) {
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
      lessonName: 'Leccion3A: Método Espada'
    });
  };

  const openWord = () => {
    navigation.navigate('Leccion3A', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Lección 3A: el Método Espada</Text>
        <Text style={styles.paragraph}> 
        Bienvenidos al <Text style={styles.keyword}>Movimiento de Alcance Mundial <Text style={styles.mayuscula}>M.A.M</Text></Text>, un ministerio interdenominacional dedicado a hacer discípulos a todas las naciones, tribus, pueblos y lenguas. En la lección pasada, exploramos la lección 3: "Gran visión es local. Hechos impactantes". Ahora, presentamos <Text style={styles.keyword}>la lección 3A</Text>, que se centra en el método espada de descubrimiento bíblico como un complemento a la gran visión local.
        </Text>
        <Text style={styles.paragraph}> 
        El método espada de descubrimiento bíblico es una de las herramientas del taller de los cuatro campos del discipulado, diseñada para fomentar tanto <Text style={styles.keyword}>el evangelismo</Text> como <Text style={styles.keyword}>el discipulado</Text>. Así como una luz de pesca de alta tecnología atrae a los peces, esta herramienta está destinada a atraer a las almas perdidas a la palabra de Dios. La visión de Dios es alcanzar a nuestras comunidades, y una iglesia que crece y se multiplica se mueve en esta gran visión local.
        </Text>
        <Text style={styles.paragraph}> 
        Una forma bíblica y efectiva de alcanzar nuestras comunidades es llevando a Jesús a los hogares y equipando a otros sobre cómo realizar reuniones de estudio en sus casas utilizando el método espada. Aunque durante estas reuniones los creyentes se edifican y enriquecen, el enfoque principal debe estar en las almas perdidas que son atraídas para conocer a Jesús y su palabra. <Text style={styles.keyword}>El objetivo es ganar almas y equipar a los salvos</Text>. No se debe permitir que el método espada se convierta en un foro para profundas interpretaciones teológicas o discusiones que desvien el enfoque original.
        </Text>
        <Text style={styles.paragraph}> 
        El método espada se presenta como una reunión sencilla pero poderosa y debe llevarse a cabo con una mentalidad participativa. Se puede comparar con un grupo de mineros listos para entrar a la mina de la palabra de Dios, escarbando juntos y extrayendo sus riquezas mientras mantienen a las almas perdidas en mente.
        </Text>
        <Text style={styles.paragraph}> 
        A continuación, aprenderás a capacitar a otros en el uso del método espada, aclarando que esta lección no es una sesión de <Text style={styles.keyword}>método espada</Text>, sino una capacitación sobre cómo implementarlo. Para comenzar, pide a tus participantes que ubiquen <Text style={styles.keyword}>la lección 3A</Text> en su aplicación móvil, manual y PowerPoint que se proporcional y dibujen en una espada en el centro y anota las palabras <Text style={styles.keyword}>"Dios" arriba, "hombre" abajo, "ejemplo" a la izquierda y "mandamiento" a la derecha</Text>.
        </Text>

        <Text style={styles.subtitleDos}>El proceso comienza con la lectura de un pasaje bíblico. Luego, el facilitador hace preguntas al grupo:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. ¿Qué aprendemos acerca de Dios?</Text>
          <Text style={styles.listItem}>2. ¿Qué aprendemos acerca del hombre?</Text>
          <Text style={styles.listItem}>3. ¿Hay algún ejemplo a seguir?</Text>
          <Text style={styles.listItem}>4. ¿Hay algún mandamiento a obedecer?</Text>
        </View>

        <Text style={styles.paragraph}> 
        El facilitador no enseña directamente, sino que fomenta la participación del grupo. Por ejemplo, un participante podría compartir: "Yo veo en el versículo 26 que Dios envió a Felipe para ayudar al Eunuco, lo que demuestra que Dios se interesa por aquellos que buscan ayuda". Después de cada descubrimiento, se hace énfasis en pasar a la aplicación, preguntando: "¿Cuál es tu 'lo haré' de lo que descubriste en este pasaje?".
        </Text>

        <Text style={styles.subtitleDos}>Algunos puntos importantes a recordar son:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. Se pueden elegir cualquier pasaje que funcione bien con el método espada; la mayoría son adecuados.</Text>
          <Text style={styles.listItem}>2. El facilitador ayuda al grupo a descubrir, no a enseñar.</Text>
          <Text style={styles.listItem}>3. Es crucial que se mantengan en el mismo pasaje durante la sesión.</Text>
          <Text style={styles.listItem}>4. Se deben evitar discusiones sobre temas controversiales; estos se pueden tratar en otro momento.</Text>
        </View>
        <Text style={styles.subtitleDos}>Además, asegúrate de que los participantes:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>1. Mencionen el versículo donde hicieron su descubrimiento.</Text>
          <Text style={styles.listItem}>2. Compartan basándose solo en lo descubierto en ese versículo y no en otros pasajes.</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
      <Text style={styles.title}>EL ENFOQUE INTEGRAR DEL MÉTODO ESPADA</Text>
      <Text style={styles.subtitleDos}>1. Un Enfoque Transformador</Text>
        <Text style={styles.paragraph}> 
        El método espada es un recurso valioso para el discipulado, diseñado para facilitar el aprendizaje colaborativo y la auto-descubrimiento de la Palabra de Dios. El objetivo principal es capacitar a los creyentes no solo para que conozcan más sobre la Biblia, sino también para que sean capaces de compartir su fe y discipular a otros. Este enfoque de descubrimiento se centra en el acto de leer, reflexionar y aplicar las enseñanzas bíblicas a la vida cotidiana. 
        </Text>
        <Text style={styles.subtitleDos}>2. Importancia del Enfoque Participativo</Text>
        <Text style={styles.paragraph}> 
        La esencia del método espada radica en su naturaleza participativa. Contrario a las lecciones tradicionales donde un líder expone el contenido, este método permite que cada miembro del grupo aporte sus observaciones y entendimientos. Esto promueve un ambiente de colaboración y crea una mayor conexión y responsabilidad entre los participantes. Cada voz es valiosa, y todos tienen la oportunidad de contribuir a la discusión, lo que puede resultar en una variedad de perspectivas y aplicaciones personales. 
        </Text>
        <Text style={styles.subtitleDos}>3. Capacitación en el Uso del Método</Text>
        <Text style={styles.paragraph}> 
        Para que el método espada sea efectivo, es fundamental que aquellos que lo facilitan estén bien entrenados. La capacitación no solo se centra en cómo hacer preguntas, sino también en cómo crear un ambiente seguro y acogedor donde los participantes se sientan cómodos compartiendo sus pensamientos y experiencias. Las preguntas planteadas se deben enfocar en el texto y contribuir a un aprendizaje más profundo, evitando desvíos hacia temas controversiales que puedan interrumpir el flujo del estudio. 
        </Text>
        <Text style={styles.subtitleDos}>4. Proceso de Aplicación</Text>
        <Text style={styles.paragraph}> 
        Una de las secciones más impactantes del método espada es la aplicación. Una vez que el grupo ha explorado lo que el pasaje bíblico dice sobre Dios, el ser humano, ejemplos a seguir y mandamientos a cumplir, el facilitador motiva a los participantes a identificar formas concretas de aplicar esas enseñanzas en su vida diaria. Preguntas como "¿Qué acción tomarás esta semana basado en lo que descubriste?" ayudan a convertir el conocimiento en acción. 
        </Text>
        <Text style={styles.paragraph}> 
        Este enfoque también fomenta una cultura de rendición de cuentas entre los miembros del grupo. Al compartir sus compromisos, los participantes están más inclinados a seguir adelante con sus resoluciones, ya que se establecen como parte de un compromiso colectivo. 
        </Text>
        <Text style={styles.subtitleDos}>5. Enfoque en la Evangelización</Text>
        <Text style={styles.paragraph}> 
        Un aspecto esencial del método espada es su énfasis en la evangelización. Este método fue concebido no solo para el crecimiento espiritual de los creyentes, sino también para atraer a aquellos que aún no conocen a Cristo. Las reuniones de estudio en hogares ofrecen una oportunidad única para crear conexiones más personales y profundas, lo que puede resultar en un ambiente acogedor para los no creyentes. 
        </Text>
        <Text style={styles.subtitleDos}>6. Multiplicación de Grupos</Text>
        <Text style={styles.paragraph}> 
        La multiplicación es un objetivo clave en el uso del método espada. Mientras los grupos pequeños se forman y crecen, el deseo es que se multipliquen en otras áreas y comunidades, creando un efecto cascada. Cuando los participantes son discipulados y equipados para usar este método, se sienten motivados a comenzar nuevos grupos en sus hogares y vecindarios. Esto es fundamental para la misión y visión del Movimiento de Alcance Mundial. 
        </Text>
        <Text style={styles.subtitleDos}>Conclusión</Text>
        <Text style={styles.paragraph}> 
        El método espada de descubrimiento bíblico es, sin duda, una herramienta poderosa para el discipulado. Combina la enseñanza bíblica con una metodología que promueve la participación activa, la reflexión personal y la aplicación práctica, todo mientras se mantiene el enfoque en alcanzar a los no creyentes. Al implementar este método, no solo se enriquece la vida espiritual de los creyentes, sino que también se preparan para convertirse en discípulos que hacen discípulos, contribuyendo así a la gran visión de alcanzar comunidades enteras con el evangelio. El impacto de esta práctica puede ser profundo y duradero, creando una cultura de fe vibrante y multiplicadora en nuestras comunidades.  
        </Text>
      </View>

      <View style={styles.contentContainer}>
      <Text style={styles.subtitle}>Aspectos adicionales que son importantes en el método espada de descubrimiento bíblico que pueden enriquecer aún más su implementación y efectividad. Aquí tienes algunas consideraciones clave:</Text>
      <Text style={styles.subtitleDos}>1. Flexibilidad del Método</Text>
        <Text style={styles.paragraph}> 
        El método espada es altamente flexible y se puede adaptar a diversos contextos y tipos de grupos. Puede ser utilizado en reuniones en hogares, en grupos de jóvenes, en estudios bíblicos en iglesias, o incluso en reuniones informales entre amigos. Esta adaptabilidad permite que cada facilitador lo ajuste según las necesidades y dinámicas de su grupo, haciendo que la experiencia sea más relevante y atractiva. 
        </Text>
        <Text style={styles.subtitleDos}>2. Enfoque en el Contexto Cultural</Text>
        <Text style={styles.paragraph}> 
        Al utilizar el método espada, es vital considerar el contexto cultural y social de los participantes. Esto incluye reconocer sus antecedentes, experiencias y cualquier barrera que puedan enfrentar en su camino hacia la fe. Un facilitador sensible al contexto ayudará a crear un espacio donde las personas se sientan cómodas y puedan abrirse. Esto puede enriquecer las discusiones y contribuir a un entendimiento más profundo de la Escritura. 
        </Text>
        <Text style={styles.subtitleDos}>3. Importancia de la Oración</Text>
        <Text style={styles.paragraph}> 
        La oración juega un papel fundamental en el método espada. Antes de comenzar una sesión, tomar un momento para orar puede preparar el corazón y la mente de los participantes, invitando al Espíritu Santo a guiar el tiempo de estudio. También se puede incluir oraciones al final de cada sesión, pidiendo por la aplicación de lo aprendido y por aquellos que aún no conocen a Cristo. La oración refuerza la dependencia de Dios y enfoca las reuniones en Su poder. 
        </Text>
        <Text style={styles.subtitleDos}>4. Uso de Recursos Complementarios</Text>
        <Text style={styles.paragraph}> 
        Aunque el método espada se centra en la Biblia, utilizar recursos complementarios puede proporcionar mayor profundidad a las discusiones. Esto puede incluir comentarios bíblicos, libros de devocionales o testimonios. Sin embargo, es importante que estos recursos no se conviertan en el enfoque principal de la reunión; deben servir para enriquecer el estudio sin desviar la atención de la Escritura misma.
        </Text>
        <Text style={styles.subtitleDos}>5. Desarrollo de la Comunidad</Text>
        <Text style={styles.paragraph}> 
        El método espada no solo se enfoca en la enseñanza individual, sino que también fomenta la creación de comunidad. A medida que los miembros del grupo participan en el descubrimiento y comparten sus experiencias, se construyen lazos más fuertes entre ellos. Esta comunidad puede ofrecer apoyo, rendición de cuentas y amistad, elementos cruciales para el crecimiento espiritual y emocional de sus integrantes.
        </Text>
        <Text style={styles.subtitleDos}>6. Implementación de Seguimiento</Text>
        <Text style={styles.paragraph}> 
        Es importante incorporar un sistema de seguimiento después de cada reunión. Esto puede incluir revisitar los compromisos que los participantes hicieron al final de la sesión, preguntando cómo les ha ido y si han podido aplicar lo aprendido. Este seguimiento no solo motiva a los participantes, sino que también se convierte en una herramienta de rendición de cuentas, ayudándolos a desarrollar una práctica constante de acción.
        </Text>
        <Text style={styles.subtitleDos}>7. Celebración de Logros</Text>
        <Text style={styles.paragraph}> 
        Es esencial celebrar los logros y los testimonios dentro del grupo. Reconocer los avances, las respuestas a la oración o las decisiones tomadas en base a lo aprendido puede servir para motivar a los participantes. Estos momentos de celebración ayudan a mantener el entusiasmo en el grupo y subrayan la importancia del trabajo que están realizando junto a Dios. 
        </Text>
        <Text style={styles.subtitleDos}>8. Formación de Líderes</Text>
        <Text style={styles.paragraph}> 
        Una de las metas del método espada debe ser fomentar el liderazgo dentro del grupo. A medida que los participantes se sienten más cómodos con el método y desarrollan su comprensión de las Escrituras, se les puede animar a asumir roles más activos, facilitando sesiones ellos mismos. Esto no solo multiplica la enseñanza, sino que también capacita a otros, continuando con la misión de hacer discípulos. 
        </Text>
        <Text style={styles.subtitleDos}>Conclusiones finales</Text>
        <Text style={styles.paragraph}> 
        El método espada es una herramienta poderosa y versátil que puede transformar la manera en que se lleva a cabo el discipulado. Al enfocarse en la Biblia, fomentar la participación, y ser sensible al contexto de los participantes, se puede crear un ambiente propicio para el aprendizaje y el crecimiento espiritual. Además, al incorporar los elementos mencionados, puedes maximizar el impacto de este método y contribuir a la creación de una comunidad vibrante y multiplicadora en la fe.
        </Text>
        <Text style={styles.paragraph}> 
        Que la gracia de Dios te acompañe mientras avanzas y enseñas a otros cómo llevar la palabra de Dios a los hogares y grupos pequeños, animando a personas que generalmente no son utilizadas. Nos vemos en la siguiente lección número 4: <Text style={styles.keyword}>"El panorama de los cuatro campos"</Text>.
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
            source={require('../../assets/videos/Leccion3A.mp4')}
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
            <Text style={styles.title}>método espada de descubrimiento bíblico</Text>
            <Image 
              source={require('../../assets/fotos/leccion3a.png')} 
              style={estilosIndividual.toolImage}
            />
            <Text style={styles.paragraph}>Despues de leer un pasaje, pregunta:</Text>
            <Text style={styles.subtitle}>en este pasaje...</Text>
            <View style={styles.list}>
                      <Text style={styles.listItem}>1. ¿Qué aprenderemos acerca de <Text style={styles.keyword}>Dios</Text>?"</Text>
                      <Text style={styles.listItem}>2. ¿Qué aprenderemos acerca del <Text style={styles.keyword}>Hombre</Text>?"</Text>
                      <Text style={styles.listItem}>3. ¿Hay algún <Text style={styles.keyword}>ejemplo</Text> a seguir?"</Text>
                      <Text style={styles.listItem}>4. ¿Hay algún <Text style={styles.keyword}>Mandamiento</Text> a obedecer?"</Text>
            </View>
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
    width: width - 28,
    height: width -100,
    borderRadius: 10,
    marginBottom: 8,
  },
});
