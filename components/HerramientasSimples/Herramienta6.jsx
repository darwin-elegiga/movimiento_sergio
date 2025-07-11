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

export default function Herramienta6({ route }) {
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
      toolName: "Her 6: El 4.1.1",
    });
  };

  const openWord = () => {
    navigation.navigate("Herramienta6", {
      showOnlyOriginalContent: true,
    });
  };

  const originalContent = (
    <>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Herramienta 6: El 4.1.1</Text>
        <Text style={styles.paragraph}>
         Bienvenido al <Text style={styles.keyword}>MOVIMIENTO DE ALCANCE MUNDIAL <Text style={styles.mayuscula}>M.A.M</Text></Text>. El entrenamiento de multiplicación de los cuatro campos de un discipulado. Herramienta número 6. <Text style={styles.keyword}>El 4.1.1</Text>. Pero antes de entrar vamos a ubicarnos, recuerdan ya salimos del segundo campo, la siembra. Ahora estamos entrando al campo del crecimiento. Que es el discipulado. Como enseñar a un discípulo.
        </Text>
        <Text style={styles.paragraph}>
          En el entrenamiento anterior aprendimos a cómo compartir tu historia y compartir también la historia de Jesús. A través del Testimonio de 15 Segundo, Los 3 Círculos y Las 4 Respuesta del Evangelio (El Semáforo).
        </Text>
        <Text style={styles.paragraph}>
         Ahora con esta herramienta <Text style={styles.keyword}>El 4.1.1</Text> comenzamos el entrenamiento de nivel 2. La herramienta para el entrenamiento para el M.A.M. o El movimiento de Alcance Mundial está diseñada para ser simple, fácilmente recordada y fácil de reproducir. Aunque algunos pueden tener aspectos más profundos. Esta es la herramienta de más motivación y responsabilidad es el 4.1.1. Estos números representan 4 preguntas en una hoja de papel, en una ahora. Estas preguntas formarán la norma del <Text style={styles.mayuscula}>ADN</Text> del movimiento y de la base de responsabilidad o la herramienta hierro sobre hierro. Para quienes plantan iglesias, estas preguntas se establecen como normas de pensamientos, planificación y estrategia para multiplicar discípulos e iglesias en cualquier lugar.
        </Text>
        <Text style={styles.paragraph}>
        Para comenzar veamos la gran comisión. Mateo 28:19-20. Este mandamiento fue una de las últimas instrucciones que Jesús dio a sus discípulos, y por lo tanto si nosotros queremos llegar a ser discípulos de Jesús o uno de sus seguidores esta comisión también se convierte en nuestra comisión.
        </Text>
        <Text style={styles.paragraph}>
        Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo, enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Mateo 28:19.
        </Text>
        <Text style={styles.paragraph}>
        En resumen, id, y haced discípulos, literalmente el versículo tiene solo un verbo en el imperativo y tres frases que explican cómo hacer discípulos. Así que Jesús continuó edificando su iglesia a través de los discípulos que se reúnen para servirse unos a otros. ¿Cuáles son los tres pasos necesarios para ser discípulos? Vaya o id a ellos para compartir el evangelio. Bautícelos para seguir a Cristo públicamente. Enséñeles que obedezcan todo lo que Cristo mandó a la iglesia.
        </Text>
        <Text style={styles.paragraph}>
        Pídeles a tus participantes que tomen una hoja de papel de manera horizontal y la doblen a la mitad. En la parte de enfrente diles que escriban <Text style={styles.keyword}>la pregunta número 1: ¿Por qué? ¿Por qué es importante compartir el evangelio?</Text> Luego diles que abran sus hojas dobladas y en la parte de dentro del lado izquierdo escriban <Text style={styles.keyword}>la pregunta número 2: ¿Con quién? ¿Con quién compartir el evangelio?</Text> Del lado derecho que escriban <Text style={styles.keyword}>la pregunta número 3: ¿Qué? ¿Qué van a compartir?</Text> Y en la parte de atrás en la contraportada que escriban <Text style={styles.keyword}>la pregunta número 4: ¿Cuándo? ¿Cuándo lo van a hacer? ¿Cuándo deberíamos separar tiempo para formar discípulos?</Text>
        </Text>
        <Text style={styles.paragraph}>
        Esto es porque necesitamos enseñar a los discípulos a ser intencionales, como lo eran los cristianos de la Biblia. Las respuestas a estas preguntas las tendremos en los siguientes entrenamientos. Ahí profundizaremos en cada pregunta del 4.1.1. Ahora practique. Tome ahora unos pocos minutos para que doble la hoja de papel. Numere cada doblez, coloque las preguntas en cada página. Asegúrese de que a los que está entrenando lo hagan fácil reproducir. En las próximas lecciones vamos a ampliar cada una de estas preguntas.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>¿Por qué? Primera pregunta del 4.1.1</Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>El 4.1.1</Text>. Pero antes de entrar vamos a ubicarnos, recuerdan ya salimos del segundo campo, la siembra. Ahora estamos entrando al campo del crecimiento. ¿Qué es el discipulado? ¿Cómo enseñar a un discípulo?
        </Text>
        <Text style={styles.paragraph}>
        Al comienzo enseñamos en qué consistía La Herramienta el 4.1.1. Ahora profundizaremos en cada pregunta de esta herramienta. Hoy con el ¿Por qué? Primera pregunta del 4.1.1.
        </Text>
        <Text style={styles.paragraph}>
        La primera pregunta de la herramienta 4.1.1 es el ¿Por qué deberíamos hacer discípulos? Hemos leído en la gran comisión que Jesús ordenó hacer discípulos, enseñándoles cómo él vivió y cómo nosotros deberíamos hacerlo. Sin embargo, hay más para que seamos motivados. Hacer discípulos no es solo lo que hacemos, es parte de quienes somos. Es nuestra nueva identidad como seguidores de Cristo.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Examinamos 2 Corintios 5:17 al 21</Text>
        <Text style={styles.paragraph}>
        "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí, todas son hechas nuevas. Y todo esto proviene de Dios, quien nos reconcilió consigo mismo por Cristo, y nos dio el ministerio de la reconciliación; que Dios estaba en Cristo reconciliando consigo al mundo, no tomándoles en cuenta sus pecados, y nos encargó a nosotros la palabra de la reconciliación. Así que somos embajadores en nombre de Cristo, como si Dios rogase por medio de nosotros; os rogamos en nombre de Cristo: Reconciliaos con Dios. Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuésemos hechos justicia de Dios en él."
        </Text>
        <Text style={styles.paragraph}>
        Note que hay tres elementos claves en este pasaje: nosotros somos primero una nueva creación, verso 17. Segundo, nos hizo embajadores de Cristo, verso 20. Y tercero, que él nos ha dado su justicia en intercambio a nuestra injusticia y pecados. Todo esto sin costo, sin obras, versículo 21. ¡Qué gran mensaje para darlo al mundo! En resumen, Jesús nos ha reconciliado y nos ha hecho completamente aceptables para Dios, limpiándonos de todos los pecados y trayéndonos a una relación perfecta con Dios.
        </Text>
        <Text style={styles.paragraph}>
        Este periodo da como resultado dos grandes verdades acerca de cada seguidor de Cristo. Primero, ahora eres una nueva criatura; no importa lo que hayas hecho o lo que te hayan hecho, tú eres una nueva persona. Segundo, ahora tienes una nueva identidad; ahora eres su embajador. Dios quiere que le representes en el mundo perdido con un mensaje dispuesto a perdonar y aceptar a todo el que esté dispuesto a creer en él.
        </Text>
        <Text style={styles.paragraph}>
        Conclusión: no puedes llegar a ser una nueva criatura sin también llegar a ser un embajador. Al que se le ha dado mucho se le exigirá mucho, y al que se le ha confiado mucho se le pedirá aún más (Lucas 12:48). Ahora te daré indicaciones de qué debes hacer con tus discípulos para entrenarlos con esta herramienta bíblica, simple y fácil de reproducir.
        </Text>
        <Text style={styles.paragraph}>
        A continuación, diles a tus participantes que dibujen un rectángulo y que dentro escriban la cita bíblica de 2 Corintios 5:17-21. Luego, diles que dibujen una cruz en el centro y dos flechas hacia abajo, una a la izquierda y otra a la derecha del rectángulo. 
        </Text>
        <Text style={styles.paragraph}>
        En la flecha de la izquierda escriban el versículo 17 y en la flecha de la derecha escriban el versículo 20. Diles que lean el versículo 17 y que escriban debajo la palabra "Nuevo" y debajo de esta palabra que dibujen una persona brillando. Ahora pídeles que lean el versículo 20 y que escriban debajo de la flecha la palabra "Embajador" y debajo de esta palabra que dibujen un mundo. 
        </Text>
        <Text style={styles.paragraph}>
        Diles que ahora, como nuevas personas, también son embajadores del Señor. Diles que no se puede ser una nueva criatura en Cristo y no ser embajadores, y no se puede ser embajador sin ser una nueva criatura en Cristo. Diles que ahora, como nuevas personas, estas dos cosas juntas son su nueva identidad en Cristo. Es decir, Nueva Criatura y Embajador.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>¿Qué es ser Nueva Criatura y ser Embajador?</Text>
        <Text style={styles.subtitle}>¿Qué significa que un cristiano es una nueva criatura (2 Corintios 5:17)?</Text>
        <Text style={styles.paragraph}>
        La nueva criatura se describe en 2 Corintios 5:17: "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí, todas son hechas nuevas". La frase "de modo que" nos remite a los versículos 14-16 donde Pablo nos dice que todos los creyentes han muerto con Cristo y ya no viven para sí mismos. Nuestras vidas ya no son de este mundo; ahora son espirituales. Nuestra "muerte" es la de la vieja naturaleza pecaminosa que fue clavada en la cruz con Cristo. Fue sepultada con él, y así como él fue resucitado por el Padre, nosotros también somos levantados para "andar en vida nueva" (Romanos 6:4). Esa nueva persona que fue levantada es la que Pablo menciona en 2 Corintios 5:17 como la "nueva criatura".
        </Text>
        <Text style={styles.paragraph}>
        Para entender la nueva criatura, primero debemos entender que en realidad es una creación, algo creado por Dios. Juan 1:13 nos dice que este nuevo nacimiento se produjo por la voluntad de Dios. No hemos heredado la naturaleza nueva; no decidimos re-crearnos a nosotros mismos una vez más, ni tampoco Dios limpió nuestra vieja naturaleza; él creó algo totalmente fresco y único. La nueva creación es completamente nueva, traída de la nada, al igual que todo el universo fue creado por Dios. Solo el creador puede lograr tal hazaña.
        </Text>
        <Text style={styles.paragraph}>
        En segundo lugar, "las cosas viejas pasaron". Lo "viejo" se refiere a todo lo que es parte de nuestra vieja naturaleza: el orgullo natural, el amor al pecado, la confianza en las obras y nuestras opiniones, hábitos y pasiones pasadas. Más importante aún, lo que amábamos ha muerto, especialmente el máximo amor a uno mismo, junto con la jactancia, la auto-promoción y la auto-justificación. La nueva criatura ve externamente y pone su mirada en Cristo, en lugar de verse interiormente a sí mismo. Las cosas viejas murieron; se clavaron en la cruz con nuestra naturaleza pecaminosa.
        </Text>
        <Text style={styles.paragraph}>
        Al igual que ha pasado lo viejo, "¡lo nuevo ha llegado!". Las cosas viejas y muertas se reemplazan con cosas nuevas, llenas de vida y de la gloria de Dios. El alma del recién nacido se deleita en las cosas de Dios y aborrece las cosas del mundo y de la carne. Nuestros propósitos, sentimientos, deseos e ideas son frescos y diferentes. Vemos el mundo de manera diferente. La Biblia parece ser un nuevo libro, y aunque la hayamos leído antes, hay una belleza en ella que nunca vimos antes y que nos maravillamos de no haber percibido.
        </Text>
        <Text style={styles.paragraph}>
         Toda la imagen de la naturaleza nos parece diferente, y parece que estamos en un mundo nuevo. Los cielos y la tierra están llenos de nuevas maravillas, y todas las cosas parecen que ahora cuentan las alabanzas de Dios. Hay nuevos sentimientos hacia todas las personas, una nueva clase de amor hacia la familia y amigos, una nueva compasión que nunca antes se sintió por los enemigos, y un nuevo amor por la humanidad. El pecado al que una vez nos aferramos ahora deseamos que se aleje para siempre. Nos "despojamos del viejo hombre con sus hechos" (Colosenses 3:9), y nos vestimos del "nuevo hombre, creado según Dios en la justicia y santidad de la verdad" (Efesios 4:24).
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>¿Qué pasa con el cristiano que sigue pecando?</Text>
        <Text style={styles.paragraph}>
        Hay una diferencia entre seguir pecando y seguir viviendo en pecado. Nadie alcanza la perfección de vivir sin pecado en esta vida, pero el cristiano redimido está siendo santificado (hecho santo) día a día, pecando menos y odiando más al pecado cada vez que falla. Sí, todavía pecamos, pero en la medida en que maduramos, lo hacemos involuntariamente y con menor frecuencia. Nuestra nueva naturaleza odia el pecado que todavía tiene poder sobre nosotros. La diferencia es que la nueva creación ya no es esclava del pecado, como fuimos anteriormente. Ahora somos libres del pecado y ya no tiene poder sobre nosotros (Romanos 6:6-7). Ahora estamos empoderados por y para la justicia. Ahora tenemos la opción de "dejar que el pecado reine" o considerarnos "muertos al pecado pero vivos para Dios en Cristo Jesús" (Romanos 6:11-12). Lo mejor de todo es que ahora tenemos el poder de elegir lo segundo.
        </Text>
        <Text style={styles.paragraph}>
        La nueva creación es una cosa maravillosa, formada en la mente de Dios y creada por su poder y para su gloria.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Ahora veremos qué es ser Embajador de Cristo.</Text>
        <Text style={styles.subtitle}>¿Qué es un embajador?</Text>
        <Text style={styles.paragraph}>
        Es una persona que representa a un país ante otro o una organización internacional. Sus funciones son negociar y representar a su país y fomentar las relaciones internacionales. Es un diplomático del más alto nivel que es el representante oficial de un estado ante otro. Es una persona reconocida en el extranjero como máximo representante nacional de una determinada actividad, normalmente artística o deportiva.
        </Text>
        <Text style={styles.subtitle}>¿Qué privilegios tiene un embajador? </Text>
        <Text style={styles.paragraph}>
        La misión diplomática y los agentes diplomáticos tienen el privilegio de exención de todo impuesto y gravamen del Estado receptor y de importación con franquicia arancelaria de los bienes y objetos destinados a su uso. De la misma manera, contamos con el máximo respaldo de Dios y de todo su Reino al que representamos. Gozamos con toda la autoridad delegada por el Señor para ejercer nuestras funciones en la tierra. Y la iglesia es la embajada del Reino de Dios en la tierra de los vivientes.
        </Text>
        <Text style={styles.subtitle}>¿Qué es un embajador en la Biblia? </Text>
        <Text style={styles.paragraph}>
        Un embajador es el representante de una autoridad gobernante. Los embajadores serían escogidos entre las personas con madurez y experiencia. El apóstol Pablo lo aplica a los mensajeros cristianos como embajadores designados por Dios para llevar su mensaje del Evangelio a todas las naciones (2 Corintios 5:20).
        </Text>
        <Text style={styles.subtitle}>¿Cuál es la función de un embajador de Cristo?</Text>
        <Text style={styles.paragraph}>
          El 4.1.1 es una estrategia de discipulado y multiplicación que se enfoca en cuatro campos de cosecha, un discípulo y una generación a la vez.Los embajadores de Cristo deben aprender a soportar afrentas a fin de estar listos para futuros días de persecución (2 Timoteo 3:12). Durante el tiempo de persecución no queremos actuar en nuestra propia fuerza sino en el Espíritu, para no hacer nada que deshaga el Evangelio de Cristo.
        </Text>
        <Text style={styles.subtitle}>¿Qué significa ser representante de Cristo?  </Text>
        <Text style={styles.paragraph}>
        Ser un seguidor de Cristo implica esforzarse por adaptar nuestras acciones, conducta y vida a las del Salvador. Es adquirir virtudes; es ser un verdadero discípulo de Jesucristo. Todos los cristianos deben representar las enseñanzas de Jesucristo, su fe, su amor, su carácter y su Reino venidero. De esta manera, ellos son embajadores de Cristo, el gobernante de ese Reino. Este es el llamado de todos los creyentes.
        </Text>
        <Text style={styles.subtitle}>¿Qué significa ser un embajador de Jesucristo?</Text>
        <Text style={styles.paragraph}>
        Como cristiano eres un embajador, uno que representa a Cristo. Del mismo modo que un embajador terrenal representa y comunica los deseos y la voluntad del Jefe de Estado que lo ha enviado, así debes representar y comunicar la voluntad de Cristo a los demás.
        </Text>
        <Text style={styles.subtitle}>¿Cómo puede un cristiano ser un embajador de Cristo?  </Text>
        <Text style={styles.paragraph}>
        En su pasaje sobre la reconciliación en 2 Corintios 5, Pablo dice que los cristianos son embajadores de Cristo (2 Corintios 5:20). Un embajador es un enviado oficial que representa a un soberano extranjero y proporciona un vínculo entre su país de acogida y el país que representa. Los embajadores trabajan para construir relaciones y desarrollar políticas que favorezcan tanto al anfitrión como al país de origen del embajador. Un embajador es designado por el liderazgo de aquellos a quienes él representa y se le da autoridad para hablar en su nombre.
        </Text>
        <Text style={styles.paragraph}>
        Un embajador debe ser muy cuidadoso. Vive en un país, pero es responsable ante otro. Debe representar el mensaje de un líder que no está presente directamente. También debe encarnar el carácter de su país de origen, siguiendo las leyes y costumbres que no son necesariamente conocidas ni bienvenidas en la nación anfitriona. Debe hacer esto todo el tiempo respetando las leyes y costumbres de ese anfitrión.
        </Text>
        <Text style={styles.paragraph}>
        En 2 Corintios 5, en lugar de una nación, Pablo es un embajador del Reino de Dios. A diferencia de los embajadores políticos modernos, Pablo no se originó de la "nación" que él representa. Tenía que ser adoptado a través del sacrificio de Cristo, y luego tuvo que experimentar un cambio de perspectiva. Ya no era ciudadano del mundo y ya no veía las cosas como ciudadano del mundo. Él veía las cosas desde la perspectiva de un ciudadano del Reino de Dios: era una nueva creación (2 Corintios 5:17).
        </Text>
        <Text style={styles.paragraph}>
        El trabajo de Pablo como embajador fue difundir el mensaje de su gobernante a su nación anfitriona. Ese mensaje fue reconciliación. Dios quería reconciliarse personalmente con las personas con las que Pablo vivía. En cierto modo, Pablo estaba pidiendo a sus anfitriones que cometieran traición contra el reino del mundo y se comprometieran con la ciudadanía del Reino de Dios.
        </Text>
        <Text style={styles.paragraph}>
        Luego, podrían seguir los pasos de Pablo convirtiéndose en embajadores de Cristo en sus propias vidas, así como nosotros también. Comienza con un cambio en la ciudadanía. Si queremos representar a Jesús en el mundo, primero debemos pertenecer al Reino de Dios en lugar del reino de nosotros mismos. Debemos vivir según los estándares de nuestro nuevo Rey, aunque estemos temporalmente alejados de Él (2 Corintios 5:6-9). Lo más importante, debemos aceptar que esta tierra no es nuestro hogar, sino que nos espera "una casa eterna en el cielo" (2 Corintios 5:1), incluso si somos encarcelados y abusados por nuestro país anfitrión (Efesios 6:20). Finalmente, los embajadores deben difundir su mensaje: que todos sean bienvenidos a tener tal relación con Dios.
        </Text>
        <Text style={styles.paragraph}>
        Ser un embajador de Cristo es el cumplimiento de la increíblemente importante perspectiva del reino. Seguir a Cristo significa abandonar el reino de uno mismo y el reino del mundo, y jurar lealtad al Reino de Dios. Significa que nuestro hogar es el cielo, no la tierra. Nuestra responsabilidad es contarles a los demás las buenas nuevas para que también puedan unirse al Reino de Dios.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>¿Con quién? Segunda pregunta del 4.1.1</Text>
        <Text style={styles.paragraph}>
        Anteriormente enseñamos el <Text style={styles.keyword}>¿Por qué deberíamos hacer discípulos?</Text> Continuaremos con la herramienta. Ahora con el <Text style={styles.keyword}>¿Con quién?</Text> Con quién compartir el evangelio. Segunda pregunta del 4.1.1.
        </Text>
        <Text style={styles.paragraph}>
        ¿Por qué deberíamos hacer discípulos? Hemos leído en la gran comisión que Jesús ordenó hacer discípulos, enseñándoles como él vivió y como nosotros deberíamos hacerlo. Sin embargo, hay más para que seamos motivados. Hacer discípulos no es solo lo que hacemos, es parte de quienes somos.
        </Text>
        <Text style={styles.paragraph}>
        El mapa relacional es una herramienta de alcance para hacer discípulos. El mapa relacional es personal; estamos interconectados. No es solo global, no es solo local; también es personal. Todos estamos interconectados, y tus redes de relaciones son una de las mejores formas para que el evangelio se difunda y para que aprendas a entrar en campos vacíos.
        </Text>
        <Text style={styles.paragraph}>
        Este parece ser un método intencional y estratégico utilizado por Jesús y los apóstoles. En Juan 1:41 al 42 vemos a Andrés que lleva a su hermano Simón a Jesús. Lo primero que hizo Andrés fue buscar a su hermano Simón y decirle: "Hemos encontrado al Mesías, al Cristo." Andrés llevó a su hermano Simón a Jesús; es personal. En Juan 1:43 al 45 vemos a Felipe que trae a Natanael a Jesús. Felipe halló a Natanael y le dijo: "Hemos hallado aquel de quien escribió Moisés en la ley, así como en los profetas, a Jesús el hijo de José de Nazaret. Ven y mira," dijo Felipe a Natanael; es personal.
        </Text>
        <Text style={styles.paragraph}>
        En Hechos 10:24 vemos a Cornelio acercándose a sus parientes y amigos cercanos para venir a Jesús. Cornelio estaba interconectado. En Hechos 16:15 vemos no solo a Lidia, sino también a las personas que están en su casa que se bautizan. Lidia estaba interconectada con ellos. En Hechos 16:30 al 33 vemos no solo al carcelero, sino también a su familia viniendo a Jesús.
        </Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento, anima a los que estás enseñando a trazar su red relacional. Aquellos en su red deben ser personas que están cerca de ellos pero lejos de Dios. Estas mismas personas son porteros de otras personas que están lejos de Dios. No es necesario ser teólogo, todos estamos conectados y es nuestra responsabilidad compartir el evangelio de una manera sencilla. Porque es personal.
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Cómo funciona el mapa relacional</Text>
        <Text style={styles.paragraph}>
        En tu entrenamiento, pídeles a tus participantes que dibujen un círculo en el centro y que escriban su nombre en él. Luego, diles que dibujen círculos alrededor y que conecten con una línea todos los círculos, como lo estás viendo en el gráfico. En esos nuevos círculos, diles a tus participantes que piensen en personas cercanas a ellos pero lejos de Dios. Tal vez amigos, parientes, vecinos, compañeros de trabajo, su mamá, tío, sobrino; personas cerca de ellos pero lejos de Dios.
        </Text>
        <Text style={styles.paragraph}>
        Pídeles a tus participantes que escriban estos nombres en los círculos. Si tienen más personas conectadas a ellos que conocen, pídeles que dibujen otros círculos conectados a ellos. Veamos un ejemplo: En el círculo del centro tenemos a usted, quien tiene a Marta, su tía, que está cerca de él pero lejos de Dios. Marta está casada con José y ellos tienen dos hijos: Jorge y Juan. Esta familia está cerca de usted pero lejos de Dios. Usted también tiene allí a su vecino Luis, que está cerca de él pero lejos de Dios.
        </Text>
        <Text style={styles.paragraph}>
        Su vecino Luis está casado con Laura y tienen una hija llamada Rebeca. Esta familia está cerca de usted pero lejos de Dios. Usted también tiene a Ana, su hermana, que está cerca de usted pero lejos de Dios. Ana está casada con Marcos y tienen dos hijos: Roberto y Noé. Esta familia está cerca de usted pero lejos de Dios.
        </Text>
        <Text style={styles.paragraph}>
        Una vez que entrenes a tus participantes para que dibujen su mapa relacional, pídeles que oren intencionalmente por las personas de su mapa relacional y que oren constantemente. El mapa relacional es una herramienta poderosa para alcanzar a los que están cerca de nosotros pero lejos de Dios.
        </Text>
        <Text style={styles.paragraph}>
        A medida que comiencen a orar por las personas en su mapa relacional, diles a tus participantes que con esa herramienta podrán encontrar a su persona de paz. Esto es realmente emocionante porque es personal. No es solo el trabajo del predicador compartir el evangelio. Todos necesitamos compartir el evangelio en nuestro espacio, en nuestro lugar; porque estamos hablando de multiplicación.
        </Text>
        <Text style={styles.paragraph}>
        El mapa relacional, herramienta del 4.1.1, te prepara para cómo entrar a un campo vacío. Hay campos vacíos a nuestro alrededor y estamos en camino de saber cómo identificarlos.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>¿Qué decir? Tercera pregunta del 4.1.1</Text>
        <Text style={styles.paragraph}>
        Ahora estamos dentro del campo del crecimiento. ¿Qué es el discipulado? ¿Cómo enseñar a un discípulo?
        </Text>
        <Text style={styles.paragraph}>
        A medida que nos comprometemos con nuestros <Text style={styles.mayuscula}>OIKOS</Text>, o las personas de nuestro mapa de relaciones debemos asegurarnos de comunicar que es lo más importante.
        </Text>
        <Text style={styles.paragraph}>
        Primer queremos buscar puertas abiertas en sus mentes conscientes, para plantar la semilla del mensaje del evangelio. Esto generalmente toma dos pasos.
        </Text>
        <Text style={styles.paragraph}>
        Uno el testimonio personal y dos la presentación del evangelio. Hay varias maneras de dirigir la conversación hacia conceptos espirituales.  Lo ideal sería que no estilo de vida provoca la pregunta de ¿por qué hacéis tal cosa?, algo que un cristiano hace que es inusual en una sociedad secular. Esto puede ser dicho de diferente manera, pero tú siguientes que ellos están lo suficientemente curiosos como para preguntar. Deberíamos ser bastante diferentes para ser admirados. Pero no demasiado raro hacer rechazadas.
        </Text>
        <Text style={styles.paragraph}>
        Por ejemplo: Mostrar un gran matrimonio, o maldecir, o reírse de los chistes sucios o no compartir chistes sucios. Mantener limpia y ordenada de la casa. Probarse como confiable, humilde y honesto y en especial sentirte seguro fuente la muerte.
        </Text>
        <Text style={styles.paragraph}>
        Pedro dijo, en cambio adoran a Cristo como el Señor de su vida. Si alguien pregunta cerca de la esperanza que tienen como creyentes. Estén siempre preparados para dar una explicación. Pueden usar también similitudes. Las conversaciones pueden tratar de un sin número de temas que son paralelos a las verdades bíblicas.
        </Text>
        <Text style={styles.paragraph}>
        Si estás hablando acerca de la pesca, ventas o publicidad, etcétera. En donde el suelo es la clave. Tú podrías introducir el tema de qué fue lo primero que te atrajo tu atención al evangelio y que logró cambiar su vida.
        </Text>
        <Text style={styles.paragraph}>
        Jesús pidió un vaso de agua y luego le habló a la mujer samaritana acerca del agua la vida. Que podía ser suya si ella creía en él. Juan 7:38.
        </Text>
        <Text style={styles.paragraph}>
        Puedes usar también la confrontación. Podemos de iniciar una conversación con una pregunta personal, algunas preguntas comunes son. Si tú mueres hoy sabéis si tu irías al cielo. O has explicado alguien como a provisto Dios para su salvación. O tu piensas que eres una buena persona.
        </Text>
        <Text style={styles.paragraph}>
        Todos tienden a pensar que son bastantes buenas y que Dios seguramente los aceptará. Ellos necesitan ver su pecaminosidad antes de estar interesados en el evangelio. Con oración y creatividad la mayoría de las conversaciones pueden llevarte a una oportunidad de compartir tu testimonio en 15 segundos. Luego si está interesado a la persona puedes compartir la presentación del evangelio con los 3 círculos.
        </Text>
        <Text style={styles.paragraph}>
        Primero tu testimonio en 15 segundos, comience con una declaración general. 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Hubo un tiempo en mi vida</Text> que yo pensaba que eres suficiente bueno para entrar en el cielo. O yo vivía con un estilo de vida muy malo. Yo buscaba la verdad pero nunca lo encontré. Algo así. Es solo un ejemplo. 
        </Text>
        <Text style={styles.paragraph}>
        Busca testificar experiencias similares con la persona con que estás hablando. 
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>El ¿Cómo?</Text>
        <Text style={styles.paragraph}>
        Jesús vino a mi vida, alguien vino a mí y me explico cómo Dios me amaba y cómo podía ser perdonado a fin de que Dios pudiera aceptarme en su cielo. Yo creía lo que él me mostro en la biblia. 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Ahora</Text> yo sé que cuando muere en Cristo es mi salvador por siempre. O sea que tengo una paz mi corazón que no puedo explicar. Pero también pueden ser que tengo seguridad de mi salvación de ahora tengo propósito en mi vida. 
        </Text>
        <Text style={styles.paragraph}>
        ¿Tienes una historia como esta?
        </Text>
        <Text style={styles.paragraph}>
        ¿Puedes tú decir lo mismo me cuanto a tu vida?
        </Text>
        <Text style={styles.paragraph}>
        ¿Estarías interesado en conocer lo que Dios dice en cuanto al ofrecimiento de la salvación?
        </Text>
        <Text style={styles.paragraph}>
        Si hay algún tipo de intereses. Pregúntale si puedes mostrarle el diagrama que me ayudó a entender el mensaje del evangelio. Para refrescar puedes buscar la herramienta 4.  Los 3 círculos en los videos ilustrativos de la aplicación móvil.
        </Text>
        <Text style={styles.paragraph}>
        Primero dibújale el círculo de la derecha y que digan. No hay duda que vivimos en un mundo quebrantado, estás de acuerdo. Basta con ver las noticias, las redes sociales y a nuestro alrededor para darnos cuenta que vivimos en un mundo quebrantado, lleno de enfermedad tragedia dolor aflicción y muerte. Sin embargo Dios nunca tuvo la intención de que viviéramos en un mundo quebrantado. 
        </Text>
        <Text style={styles.paragraph}>
        Ahora dibujen en el círculo de la izquierda con un corazón en el centro y que digan: En el principio cuando Dios creó el mundo todo era bueno, no había enfermedad, ni tragedia, ni dolor, ni aflicción y muerte. 
        </Text>
        <Text style={styles.paragraph}>
        Sin embargo Adán y Eva y todos nosotros nos revelamos contra Dios, amando nos a nosotros mismos y a otras cosas más que Dios. Ahora pídeles a tus participantes que dibujen una flecha y una persona huyendo de Dios y escriban la palabra pecado. Y continuó en diciendo. Al desobedecer a Dios debido al pecado nos alejamos de la comunión con Dios, dejando el diseño original, creando nuestro propio mundo quebrantado y vida quebrantada.
        </Text>
        <Text style={styles.paragraph}>
        Qué difícil es vivir en quebrantamiento, por lo que las personas buscan sus propias maneras de salir de su quebrantamiento. Ahora pide a tus participantes que dibujen estas flechas en forma de resortes saliendo hacia arriba en el mundo de quebranto y digan. 
        </Text>
        <Text style={styles.paragraph}>
        Las personas quebrantadas buscan su forma de escapar. Algunos tratan de escapar a través del alcohol, riqueza, inmoralidad, drogas, éxito en la vida, cosas materiales. Con el propósito de sanar su quebrantamiento, pero no lo pueden lograr. Cuando intentan escapar a su manera regresan con más ímpetu a su quebrantamiento es una condición terrible. Dios desde el principio miró que estaríamos en esta situación y en su plan envió a su hijo Jesús para salvarnos.
        </Text>
        <Text style={styles.paragraph}>
        Ahora dibújales en el círculo en el centro y los símbolos y que digan. Dios envió a su hijo Jesucristo para hacer algo que nosotros no podíamos hacer. Jesús murió en la cruz para pagar por nuestros pecados. Fue sepultado y al tercer día resucitó.
        </Text>
        <Text style={styles.paragraph}>
        Ahora pide a tus participantes que dibujen esta puerta en el mundo de quebranto y esta flecha saliendo del mundo de quebranto hacia el circulo en el medio donde esta Cristo. Y que digan, a través de Jesús, Dios a proveído la puerta y el camino para salir del quebrantamiento y recibir salvación. Toda persona que pone su fe en Jesucristo y en su sacrificio por nuestros pecados, se arrepiente y se bautiza recibe el perdón y la reconciliación con Dios. Haciendo a Jesús el rey de su vida.
        </Text>
        <Text style={styles.paragraph}>
        Ahora dibújales la corona en el tercer círculo que digan. Sólo a través de Jesús la imagen de Dios se restauran las personas. Pídeles que dibujen una flecha y una persona brillando entre el primer círculo y el tercero, y que digan. 
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
        Guíeles en una oración a Dios por esa persona por aceptar el sacrificio de Cristo en su vida.
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>¿Cuándo? Cuarta pregunta del 4.1.1</Text>
        <Text style={styles.paragraph}>
        Ahora vamos a la pregunta número cuatro <Text style={styles.keyword}>¿Cuándo? Cuarta pregunta del 4.1.1</Text>
        </Text>
        <Text style={styles.paragraph}>
        Cuándo lo vas a hacer. Es importante enseñar a un nuevo discípulo a no dejar el llamado de Cristo a la deriva. Sino hacer intencionales con respecto al llamado de ser embajadores de Dios en la tierra. Por eso ayuda nuevo discípulo hacer un plan intencional.
        </Text>
        <Text style={styles.keyword}>
        Primero diles que escriba debajo la palabra orar. 
        </Text>
        <Text style={styles.paragraph}>
        Cuando puedes apartar tiempo para orar por las personas que están en tu mapa relacional. Nombre, fecha y hora.
        </Text>
        <Text style={styles.keyword}>
        Luego diles que escriba la palabra compartir. 
        </Text>
        <Text style={styles.paragraph}>
        Con quien puedes empezar a compartir el evangelio a través de una herramienta de los 3 círculos. Nombre, fecha y hora 
        </Text>
        <Text style={styles.keyword}>
        Luego diles que escriba la palabra entrenar.
        </Text>
        <Text style={styles.paragraph}>
        A quien puedes entrenar con la herramienta 4.1.1. Nombre, fecha y hora. 
        </Text>
        <Text style={styles.keyword}>
        Luego diles que escriba la palabra comenzar. 
        </Text>
        <Text style={styles.paragraph}>
        Cuando puedes comenzar un grupo pequeño de crecimiento. Nombre, fecha y hora.
        </Text>
        <Text style={styles.paragraph}>
        Recuérdale que no está solo, que hay otros discípulos que pueden apoyarle para que inicie un grupo de crecimiento.
        </Text>
        <Text style={styles.subtitleDos}>
        Esta es la herramienta 4.1.1. 
        </Text>
        <Text style={styles.paragraph}>
        1. Por qué es importante compartir el evangelio. 
        </Text>
        <Text style={styles.paragraph}>
        2. Con quien lo vas a compartir. 
        </Text>
        <Text style={styles.paragraph}>
        3. Que les vas a decir 
        </Text>
        <Text style={styles.paragraph}>
        4. Cuando lo vas a hacer 
        </Text>
        <Text style={styles.paragraph}>
        Un nuevo discípulo crecerá fuerte y saludable en Cristo practicando esta herramienta del campo del crecimiento del discipulado. 
        </Text>
        <Text style={styles.paragraph}>
        <Text style={styles.keyword}>Que la Gracia de nuestro Señor Jesucristo sea con todos nosotros</Text> mientras entramos <Text style={styles.keyword}>al 3er campo, el crecimiento llamado el discipulado</Text>. Listo para entrenar a otros que entren a otros con esta herramienta simple, bíblica y fácil de reproducir. <Text style={styles.keyword}>La próxima herramienta 7. Los 3 tercios. (3/3)</Text>  
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
            source={require("../../assets/videos/Herramienta6.mp4")}
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
            <Image
              source={require("../../assets/fotos/herramienta61.png")}
              style={estilosIndividual.toolImage}
            />
            <Image
              source={require("../../assets/fotos/herramienta62.png")}
              style={estilosIndividual.toolImage}
            />
            <Image
              source={require("../../assets/fotos/herramienta63.png")}
              style={estilosIndividual.toolImage}
            />
            <Image
              source={require("../../assets/fotos/herramienta64.png")}
              style={estilosIndividual.toolImage}
            />
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
          source={require("../../assets/marcadores/campo3.png")}
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
    width: width - 30, 
    height: width + 45, 
    borderRadius: 10,
    marginBottom: 32,
  },
});