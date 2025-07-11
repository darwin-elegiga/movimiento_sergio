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
    navigation.navigate('HerramientaIntensiva1', { 
      showOnlyOriginalContent: true
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>HERRAMIENTA INTENSIVAS 1: EL FILTRO</Text>
       
        <Text style={styles.paragraph}>
        Esta herramienta se llama  <Text style={styles.keyword}>"El Filtro"</Text>, es muy importante porque hemos observado que muchos pastores pasan más tiempo con las personas que tienen problemas que con aquellas que quieren avanzar en el reino de Dios. Sin embargo, también notamos que esos mismos pastores dedican menos tiempo a quienes verdaderamente están avanzando. El resultado de esta dinámica lo vemos en el ejemplo de Pedro, quien, al predicar por primera vez, logró que tres mil personas se convirtieran al Señor.
        </Text>

        <Text style={styles.paragraph}>
        Por lo tanto, necesitamos examinar qué filtros usaba Jesús para seleccionar a las personas con las que pasaría más tiempo y cómo podemos aplicar esos mismos principios en nuestra labor. De esta manera, podremos evitar dedicar demasiado tiempo a quienes no están progresando en el reino de Dios y, en cambio, encontrar a esos "tres" que darán mucho fruto.
        </Text>
        <Text style={styles.paragraph}>
        Jesús aplicó filtros para discernir quién realmente estaba dispuesto a seguirlo. Esto demuestra que, más allá de las palabras y las apariencias, el seguimiento auténtico implica un compromiso genuino y profundo. Al hablar de la necesidad de renunciar a bienes materiales, de cargar la cruz y de amar a Dios por encima de todo, Jesús invita a sus oyentes a reflexionar sobre sus prioridades y motivaciones. Este proceso de discernimiento resalta que la fe no es un simple acto de adhesión, sino una transformación profunda del corazón y un llamado a vivir según los principios del reino de Dios. En última instancia, Jesús busca discípulos que no solo lo admiren, sino que también estén dispuestos a enfrentar retos y sacrificios en su camino.
        </Text>
        <Text style={styles.paragraph}>
        Uno de los filtros que identificamos son <Text style={styles.keyword}>las palabras duras</Text>. A través de ellas, Jesús pudo discernir quién estaba sinceramente comprometido a continuar en el camino. Otro filtro se encuentra en Mateo 13:34-36, donde se nos dice que <Text style={styles.keyword}>Jesús hablaba por parábolas</Text>. Algunas personas no entendían las parábolas y no hacían preguntas, mientras que los discípulos, que realmente deseaban aprender, se acercaban a Jesús para pedirle aclaraciones sobre su enseñanza.
        </Text>
        <Text style={styles.paragraph}>
        La tercera forma de filtraje se presenta cuando Jesús le dice al joven rico que venda todas sus posesiones y lo siga. Esta instrucción implica una <Text style={styles.keyword}>entrega total</Text>, y el joven reconoció que le faltaba algo. Por lo tanto, otro de los filtros que Jesús utilizaba era la disposición a entregarse por completo.
        </Text>         
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Pasajes en los que Jesús utiliza “El Filtro” con Palabras Duras, Prábolas y la Entrega Total </Text>
        <Text style={styles.subtitleDos}>1. El Filtro de las Palabras Duras</Text>
        <Text style={styles.keyword}>Pasajes Bíblicos:</Text>
        <Text style={styles.keyword}>Juan 6:53-68</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>Este pasaje es parte del discurso del Pan de Vida, donde Jesús declara que hay que comer su carne y beber su sangre para tener vida eterna, lo que genera confusión y rechazo entre muchos de sus seguidores.  
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Esta enseñanza desconcertó a muchos de sus discípulos, quienes la consideraron una "palabra dura" y optaron por abandonar a Jesús.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>El lenguaje simbólico de Jesús expresa la importancia de la comunión y una relación íntima con él. El rechazo de algunos discípulos muestra la dificultad de aceptar su mensaje profundo y espiritual.
        </Text>

        <Text style={styles.keyword}>Lucas 14:26-27</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>Jesús presenta una dura enseñanza sobre los requisitos para ser su discípulo, utilizando un lenguaje fuerte para enfatizar la necesidad de priorizarlo sobre todas las relaciones.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>En este pasaje, Jesús habla a la multitud que lo sigue y les presenta los costos del discipulado.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>La palabra "aborrecer" en relación con las relaciones familiares indica que el amor por él debe ser supremo. También enfatiza la importancia de tomar la cruz, lo que implica estar dispuesto a hacer sacrificios por Él.
        </Text>
        <Text style={styles.keyword}>Mateo 10:34-39</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>Jesús advierte a sus discípulos sobre las divisiones que su mensaje provocará en las familias y lo que significa realmente seguirlo.  
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Aquí, Jesús está enviando a sus discípulos en una misión y les aclara la realidad del discipulado.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>Al mencionar que no ha venido a traer paz, sino espada, Jesús indica que su mensaje puede causar conflictos incluso en las relaciones más cercanas. Destaca que el discipulado requiere lealtad absoluta a Él, incluso por encima de los lazos familiares.
        </Text>
        <Text style={styles.keyword}>Mateo 23:13-36</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>Jesús pronuncia una serie de "ayes" contra los fariseos y los escribas, denunciando su hipocresía y falta de autenticidad.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Este pasaje se encuentra en el Templo de Jerusalén, donde Jesús critica fuertemente a los líderes religiosos.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>Jesús utiliza un lenguaje fuerte para condenar prácticas que alejan a las personas de Dios, señalando cómo los líderes hacen más difícil el camino hacia la salvación y el verdadero conocimiento de Dios.
        </Text>
        <Text style={styles.keyword}>Marcos 8:34-38</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>Jesús habla a la multitud sobre lo que significa ser su discípulo, en el contexto de su anunciada muerte y resurrección.  
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Este pasaje se da tras la revelación de la Pasión, enfatizando el costo del discipulado.  
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>Jesús desafía a la gente a negarse a sí misma y a tomar su cruz, sugiriendo que seguirlo puede implicar sufrimiento y rechazo. Resalta que aferrarse a la vida terrenal lleva a la pérdida, mientras que perderla por su causa resulta en encontrar la verdadera vida.
        </Text>
        <Text style={styles.keyword}>Lucas 12:51-53</Text>,
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>Jesús explica que su venida no trae solamente paz, sino también divisiones entre las personas.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>En este pasaje, Jesús enfatiza el impacto de su mensaje en las relaciones familiares y sociales.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>Al afirmar que su llegada provocará divisiones, Jesús ilustra que seguirlo a menudo conlleva desafíos y conflictos en las relaciones, mostrando que su mensaje radical puede generar reacciones adversas.
        </Text>
        <Text style={styles.subtitleDos}>Resumen del filtro de las palabras duras</Text>
        <Text style={styles.paragraph}>Estos pasajes reflejan las enseñanzas desafiantes de Jesús que no solo confrontaron a su audiencia original, sino que también siguen resonando en los corazones de los creyentes de hoy. En cada uno, se hace un llamado a una lealtad radical y a comprender el sacrificio y el compromiso que implica seguir a Cristo.</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>2. El Filtro de las Parábolas</Text>
        <Text style={styles.subtitleDos}>Pasajes Bíblicos:</Text>
        <Text style={styles.keyword}>Mateo 13:44 </Text>               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>La parábola del tesoro oculto. Jesús compara el reino de los cielos con un tesoro escondido en un campo que, al ser descubierto, impulsa a un hombre a vender todo lo que tiene para comprar ese campo.  
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Esta parábola ilustra la invaluable naturaleza del reino de Dios.  
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>La entrega total se manifiesta en el acto de vender todo lo que el hombre posee para asegurar su posesión del tesoro, mostrando que la relación con Dios debe ser la prioridad máxima en la vida.
        </Text>

        <Text style={styles.keyword}>Mateo 13:45-46 </Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>La parábola de la perla de gran precio. En esta parábola, Jesús habla de un comerciante que busca perlas finas y, al encontrar una de gran valor, vende todo lo que tiene para adquirirla.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Al igual que en la parábola del tesoro oculto, este pasaje destaca la importancia del reino de los cielos.  
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>La entrega total se muestra en el comerciante que está dispuesto a renunciar a todo por algo de valor supremo, simbolizando la dedicación y el sacrificio que implica seguir a Cristo.
        </Text>
        <Text style={styles.subtitleDos}>Resumen del filtro de Parábolas</Text>
        <Text style={styles.paragraph}>Las parábolas muestran la invaluable naturaleza del reino de los cielos y la necesidad de renunciar a lo material para obtenerlo. A través de estas historias, Jesús ilustra conceptos profundos de fe y dedicación de una manera accesible y memorable. Estas narraciones invitan a los oyentes a reflexionar sobre su propia vida y prioridades en relación con el reino de Dios.</Text>,
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>3. El Filtro de la Entrega Total</Text>
        <Text style={styles.subtitleDos}>Pasajes Bíblicos:</Text>
        <Text style={styles.keyword}>Lucas 14:28-30</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>Jesús habla sobre la necesidad de calcular el costo del discipulado, comparándolo con un constructor que debe evaluar si tiene suficientes recursos para terminar una torre.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Este pasaje es parte de un discurso sobre lo que significa seguir a Jesús.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>La oración desafía a los oyentes a considerar la entrega total que requiere el discipulado. Jesús enfatiza que no se puede seguirlo a medias; se necesita una dedicación total para completar la obra.
        </Text>

        <Text style={styles.keyword}>Lucas 9:57-62</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>En este pasaje, Jesús responde a varios hombres que expresan su deseo de seguirlo, y les explica que seguirlo implica renunciar a certezas y compromisos.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>Jesús está en camino a Jerusalén y quiere que los que le siguen comprendan la seriedad de esa decisión.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>La enseñanza de Jesús resalta que el discipulado requiere una entrega total, incluso renunciando a las responsabilidades familiares y sociales si es necesario para seguirlo.
        </Text>
        <Text style={styles.keyword}>Marcos 10:17-27</Text>
               
        <Text style={styles.paragraph}><Text style={styles.keyword}>De qué trata: </Text>El joven rico que se acerca a Jesús preguntándole qué debe hacer para heredar la vida eterna. Jesús le dice que venda todo lo que tiene y lo dé a los pobres.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Contexto: </Text>En este encuentro, Jesús pone a prueba al joven, que era muy rico y aparentemente cumplía con los mandamientos.
        </Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Explicación: </Text>La reacción del joven demuestra la dificultad de la entrega total cuando se valoran más las posesiones materiales. Jesús enseña que la verdadera entrega puede ser un desafío, y que es más fácil para un camello pasar por el ojo de una aguja que para un rico entrar en el reino de Dios.
        </Text>
        <Text style={styles.subtitleDos}>Resumen del filtro de la entrega total</Text>
        <Text style={styles.paragraph}>Los pasajes de entrega total enfatizan que seguir a Jesús implica un compromiso radical y renuncias significativas. Jesús llama a sus seguidores a evaluar verdaderamente lo que están dispuestos a dejar atrás, destacando que la relación con él debe ser de la máxima importancia. Esta entrega puede requerir sacrificios personales, familiares y materiales, poniendo de manifiesto la profundidad de la dedicación que se requiere para ser un verdadero discípulo.</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Asimismo, nosotros hemos desarrollado un enfoque para filtrar a las personas, y lo veremos desde otra perspectiva. Aquí están nuestros filtros:</Text>
       
        <Text style={styles.paragraph}><Text style={styles.keyword}>1. El Evangelio: </Text>Cuando predicamos el evangelio y una persona dice que no está preparada, eso no significa que dejemos de pasar tiempo con ella. Continuaremos orando, pero no dedicaremos nuestro tiempo de manera ineficaz a alguien que no desea arrepentirse.
        </Text>  
        <Text style={styles.paragraph}><Text style={styles.keyword}>2. El 4-1-1: </Text>
        </Text>  Este filtro consiste en preguntar sobre metas. A través de estas preguntas, podemos filtrar quién realmente está comprometido y quién no está obedeciendo.
        <Text style={styles.paragraph}><Text style={styles.keyword}>3. Los tres tercios: </Text>En este enfoque, miramos hacia atrás, hacia arriba y hacia adelante.
        </Text>  
        <Text style={styles.paragraph}><Text style={styles.keyword}>Mirar hacia atrás: </Text>Aquí preguntamos si las personas han compartido el evangelio en la semana anterior. Para muchos, esto puede ser solo una formalidad, y algunos no querrán seguir adelante, lo que nos permitirá filtrarlos. 
        </Text>  
        <Text style={styles.paragraph}><Text style={styles.keyword}>Mirar hacia arriba: </Text>Evaluamos si han aprendido; algunas personas pueden no comprender y ni siquiera preguntar: "¿Me puedes explicar otra vez?". Esto también indica que no están en el camino correcto.
        </Text>  
        <Text style={styles.paragraph}><Text style={styles.keyword}>Mirar hacia adelante: </Text>En este aspecto, planteamos metas y preguntamos: "¿Estás dispuesto a sacrificar tu tiempo o tu dinero para invertir en otros y evangelizar?".
        </Text>    
        <Text style={styles.paragraph}>Existen muchas formas de evaluación y filtraje en cuanto a la obediencia de las personas. Sin embargo, si deseamos realizar un movimiento de plantación de iglesias, debemos enfocarnos en personas obedientes, que estén comprometidas a cumplir su llamado y a predicar a otros.</Text>    
        <Text style={styles.paragraph}>Si aplicamos esta herramienta de los tres tercios, podremos identificar a esas personas obedientes. Entonces, ¿qué haremos con ellas? Al igual que Jesús, pasaremos más tiempo con los obedientes y menos con aquellos que no tienen interés en seguir.</Text> 
        <Text style={styles.paragraph}>Esta pirámide representa el tiempo invertido con la gente. Nuestra estrategia será dedicar menos tiempo a muchos y más a pocos, para avanzar en el reino de Dios. Esto no significa que no amemos a los muchos, sino que necesitamos hacer un filtrado eficaz para encontrar a los pocos que realmente contribuirán al avance del reino. No podemos esperar obtener buenos resultados en la plantación de iglesias si nos centramos solo en aquellos que no están comprometidos, ya que son precisamente esos los que más necesitan.</Text> 
        <Text style={styles.paragraph}>En conclusión, esta herramienta opera como un filtro. Espero que amen tanto a las personas perdidas que estén dispuestos a filtrar para encontrar a los obedientes. Así, las personas que aún no conocen a Cristo podrán escuchar el evangelio y recibir el mensaje que necesitan.</Text> 
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Análisis Detallado del Enfoque de Filtros</Text>
        <Text style={styles.subtitleDos}>1. Contexto del Ministerios:</Text>
        <Text style={styles.paragraph}>Los pastores y líderes a menudo se enfrentan a una presión significativa al intentar atender las necesidades de todos. Sin embargo, la observación de que se dedica más tiempo a las personas con problemas en detrimento de aquellas que realmente están listas para crecer resalta la necesidad de un enfoque más estratégico en el ministerio.</Text> 
        <Text style={styles.paragraph}>La ilustración de Pedro y el derramamiento del Espíritu Santo subraya cómo el compromiso y la dedicación pueden conducir a resultados extraordinarios. En lugar de dispersar esfuerzos, se enfatiza la necesidad de concentrarse en aquellos que están dispuestos y son receptivos.</Text>

        <Text style={styles.subtitleDos}>2. Filtros Usados por Jesús:</Text>
        <Text style={styles.paragraph}><Text style={styles.keyword}>Palabras Duras: </Text>Jesús utilizó enseñanzas desafiantes para distinguir a aquellos que estaban dispuestos a seguirlo de una manera más profunda. Este enfoque puede ser visto como un método de autoevaluación para los oyentes, obligándolos a considerar el costo del discipulado.</Text> 
        <Text style={styles.paragraph}><Text style={styles.keyword}>Parábolas: </Text>Al hablar en parábolas, Jesús no solo atraía a la gente, sino que también separaba a aquellos que realmente deseaban entender su mensaje. Este método permite que aquellos que están sinceramente interesados busquen más información y profundicen su entendimiento.</Text> 
        <Text style={styles.paragraph}><Text style={styles.keyword}>Desafío de la Entrega: </Text>El joven rico es un gran ejemplo de cómo el verdadero discipulado involucra sacrificar posesiones y comodidades. Jesús no estaba buscando seguidores casuales, sino discípulos comprometidos.</Text>

        <Text style={styles.subtitleDos}>3. Implementación Práctica de los Filtros en el Ministerio:</Text>
        <Text style={styles.paragraph}>El Evangelio: El enfoque aquí es evitar el desgaste emocional y espiritual. Al reconocer que no todas las personas están listas para recibir el evangelio, se promueve una salud ministerial y se prioriza el tiempo con aquellos abiertos al arrepentimiento.</Text> 
        <Text style={styles.paragraph}>Modelo 4-1-1: Este método permite a los líderes tener conversaciones que descubran el compromiso individual. Preguntar sobre metas facilita la identificación de la disposición de las personas a participar activamente en el ministerio.</Text> 
        <Text style={styles.paragraph}>Los Tres Tercios: Esta técnica, que implica mirar hacia atrás, hacia arriba y hacia adelante, no solo fomenta la rendición de cuentas, sino que también ayuda a mantener a los miembros enfocados y motivados en su crecimiento espiritual. Plantear objetivos claros es crucial para el éxito del discipulado.</Text>

        <Text style={styles.subtitleDos}>4. Estrategia de Tiempo y Enfoque:</Text>
        <Text style={styles.paragraph}>La idea de invertir menos tiempo en muchos y más en pocos subraya la importancia de la calidad sobre la cantidad. Esto es un reto significativo para muchos líderes que sienten la obligación de atender a todos, y es esencial que reconozcan la necesidad de ser estratégicos en el ministerio.</Text> 
        <Text style={styles.paragraph}>La "pirámide del tiempo" es un concepto interesante porque hace hincapié en que, aunque todos merecen amor y atención, no todos pueden ser desarrollados de la misma manera. Enfocarse en los que muestran disposición y obediencia es clave para la efectividad del ministerio.</Text> 

        <Text style={styles.subtitleDos}>5. Diferenciación de Necesidades:</Text>
        <Text style={styles.paragraph}>Es importante reconocer que no todas las personas que enfrentan problemas están en la misma etapa de su proceso espiritual. Algunos pueden necesitar apoyo a corto plazo, mientras que otros pueden beneficiarse más de un discipulado a largo plazo. Usar filtros permite a los líderes distinguir entre diferentes tipos de necesidades.</Text> 

        <Text style={styles.subtitleDos}>6. Compromiso con la Comunidad:</Text>
        <Text style={styles.paragraph}>Los filtros también pueden incluir un componente de compromiso comunitario. Aquellos que están dispuestos a servir en proyectos de evangelismo o en el servicio a la comunidad muestran un interés genuino en avanzar en el reino. Esta disposición puede ser un indicador clave de su compromiso.</Text> 

        <Text style={styles.subtitleDos}>7. Dones y Talentos:</Text>
        <Text style={styles.paragraph}>Al aplicar filtros, es esencial considerar los dones y habilidades de las personas. Identificar y aprovechar los talentos únicos de los miembros puede ayudar a enfocar el ministerio en áreas donde cada individuo puede contribuir eficazmente.</Text> 

        <Text style={styles.subtitleDos}>8. Cohesión en el Grupo:</Text>
        <Text style={styles.paragraph}>Filtros pueden ayudar a construir un grupo cohesivo donde los miembros comparten objetivos y valores comunes. Esto es esencial para crear un ambiente en el que la edificación mutua y el crecimiento espiritual sean posibles.</Text> 

        <Text style={styles.subtitleDos}>9. Evaluación Continua:</Text>
        <Text style={styles.paragraph}>Los filtros no deben ser un proceso único, sino una parte continua de la vida de la iglesia. Las personas pueden avanzar o retroceder en su disposición y compromiso, por lo que es útil reevaluar regularmente el enfoque de los filtros y las relaciones ministeriales.</Text> 

        <Text style={styles.subtitleDos}>10. Métodos de Discipulado:</Text>
        <Text style={styles.paragraph}>Considerar diferentes métodos de discipulado puede ser parte integral del filtraje. Algunos grupos pueden beneficiarse de estudios bíblicos más profundos, mientras que otros podrían prosperar en un ambiente más informal. Adaptar el enfoque según el contexto del grupo puede generar un mayor impacto.</Text> 

        <Text style={styles.subtitleDos}>11. Fomento de Líderes Multiplicadores:</Text>
        <Text style={styles.paragraph}>Utilizar filtros para identificar a aquellos que tienen el potencial de convertirse en líderes multiplicadores es crucial en la plantación de iglesias. Estos individuos no solo serán discipulados, sino que también pueden ser capacitados para discipular a otros, expandiendo así el evangelio de manera efectiva.</Text> 

        <Text style={styles.subtitleDos}>12. Discernimiento Espiritual:</Text>
        <Text style={styles.paragraph}>Filtros espirituales basados en la oración y el discernimiento pueden ser esenciales. Incluir la dirección del Espíritu Santo en la identificación de individuos puede llevar a resultados más alineados con la voluntad de Dios.</Text> 

        <Text style={styles.subtitleDos}>13. Adaptabilidad del Enfoque:</Text>
        <Text style={styles.paragraph}>La flexibilidad es clave. Según el contexto cultural y social en el que te encuentres, los filtros pueden necesitar adaptarse. Lo que funciona en una comunidad puede no ser efectivo en otra, y es importante estar dispuesto a ajustar enfoques.</Text> 

        <Text style={styles.subtitleDos}>14. Impacto en la Misión:</Text>
        <Text style={styles.paragraph}>Cuando los líderes invierten tiempo y recursos en personas comprometidas, se puede lograr un mayor impacto en la misión de la iglesia. Esto crea un entorno donde el evangelismo y la plantación de iglesias pueden florecer, ya que se sienta una sólida base de creyentes involucrados.</Text> 

        <Text style={styles.subtitleDos}>15. Conclusión y Motivación:</Text>
        <Text style={styles.paragraph}>La invitación a filtrar y enfocarse en las personas obedientes resalta la importancia de tener un propósito claro en la plantación de iglesias. El objetivo es que el evangelio no solo se escuche, sino que también se viva y se propague a través de personas comprometidas.</Text> 
        <Text style={styles.paragraph}>En última instancia, este enfoque no solo es un método de selección, sino una llamada a amar y servir a las almas perdidas al mismo tiempo que se desarrollan líderes comprometidos dentro de la iglesia.</Text>

        <Text style={styles.subtitleDos}>Conclusión</Text>
        <Text style={styles.paragraph}>En conclusión, el enfoque de "Filtros" no solo ayuda a los líderes a concentrarse en aquellos que muestran un compromiso serio, sino que también promueve un entorno donde se pueden cultivar relaciones significativas y eficaces en el discipulado. Al considerar estos nuevos puntos, puedes desarrollar un enfoque más holístico y estratégico en el ministerio y la plantación de iglesias. Si deseas profundizar en algún tema específico de este enfoque, ¡estaré encantado de ayudar!</Text> 

        <Text style={styles.subtitleDos}>Reflexiones Finales</Text>
        <Text style={styles.paragraph}>La herramienta de "Filtros" puede ser transformadora en la manera en que los ministerios operan, ayudando a los líderes a enfocarse en aquellos que realmente están listos para crecer y contribuir al reino de Dios. Esto no solo optimiza los recursos, sino que también fomenta una cultura de compromiso y obediencia en la comunidad de creyentes. </Text> 
        <Text style={styles.paragraph}>Que Dios los guíe en cada paso que den. ¡Hasta pronta herramienta intensiva <Text style={styles.keyword}>“El Mapa Generacional”</Text>, y sigamos adelante en unidad y propósito!
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
            source={require('../../assets/videos/Intensiva1.mp4')}
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
            <Image 
              source={require('../../assets/fotos/HI11.png')} 
              style={estilosIndividual.toolImage1}
            />
          </View>
          
          <View style={styles.contentContainer}>
            <Image 
              source={require('../../assets/fotos/HI12.png')} 
              style={estilosIndividual.toolImage2}
            />
          </View>

          <View style={styles.contentContainer}>
            <Image 
              source={require('../../assets/fotos/HI13.png')} 
              style={estilosIndividual.toolImage3}
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
    width: width -32, 
    height: width +40,
    borderRadius: 10,  
    marginBottom:8,
  },
  toolImage2: {  
    width: width -32, 
    height: width -70,
    borderRadius: 10,  
    marginBottom:8,
  },
  toolImage3: {  
    width: width -32, 
    height: width -30,
    borderRadius: 10,  
    marginBottom:8,
  },
});