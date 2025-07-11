import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, TouchableOpacity, View, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import WelcomeScreen from './components/WelcomeScreen';
import MainScreen from './components/MainScreen';
import HerramientasSimples from './components/HerramientasSimples';
import ToolsScreen from './components/ToolsScreen';
import PowerPointScreen from './components/PowerPointScreen';
import LessonPowerPointScreen from './components/LessonPowerPointScreen';
import LeccionesScreen from './components/LeccionesScreen';
import BackgroundWrapper from './BackgroundWrapper';
import InformationScreen from './components/InformationScreen';
import TestimoniosScreen from './components/TestimoniosScreen';
import HerramientasIntensivasScreen from './components/HerramientasIntensivasScreen';

// Importar los componentes de lecciones y herramientas
import Leccion1 from './components/lecciones/Leccion1';
import Leccion2 from './components/lecciones/Leccion2';
import Leccion3 from './components/lecciones/Leccion3';
import Leccion3A from './components/lecciones/Leccion3A';
import Leccion4 from './components/lecciones/Leccion4';
import Herramienta1 from './components/HerramientasSimples/Herramienta1';
import Herramienta2 from './components/HerramientasSimples/Herramienta2';
import Herramienta3 from './components/HerramientasSimples/Herramienta3';
import Herramienta4 from './components/HerramientasSimples/Herramienta4';
import Herramienta5 from './components/HerramientasSimples/Herramienta5';
import Herramienta6 from './components/HerramientasSimples/Herramienta6';
import Herramienta7 from './components/HerramientasSimples/Herramienta7';
import Herramienta8 from './components/HerramientasSimples/Herramienta8';
import Herramienta9 from './components/HerramientasSimples/Herramienta9';
import Herramienta10 from './components/HerramientasSimples/Herramienta10';
import Herramienta11 from './components/HerramientasSimples/Herramienta11';
import Herramienta12 from './components/HerramientasSimples/Herramienta12';
import Herramienta13 from './components/HerramientasSimples/Herramienta13';

// Importa los nuevos componentes
import HerramientaIntensiva1 from './components/HerramientasIntensivas/HerramientaIntensiva1';
import HerramientaIntensiva2 from './components/HerramientasIntensivas/HerramientaIntensiva2';
import HerramientaIntensiva3 from './components/HerramientasIntensivas/HerramientaIntensiva3';
import HerramientaIntensiva4 from './components/HerramientasIntensivas/HerramientaIntensiva4';
import HerramientaIntensiva5 from './components/HerramientasIntensivas/HerramientaIntensiva5';
import HerramientaIntensiva6 from './components/HerramientasIntensivas/HerramientaIntensiva6';
import HerramientaIntensiva7 from './components/HerramientasIntensivas/HerramientaIntensiva7';
import HerramientaIntensiva8 from './components/HerramientasIntensivas/HerramientaIntensiva8';
import HerramientaIntensiva9 from './components/HerramientasIntensivas/HerramientaIntensiva9';
import HerramientaIntensiva10 from './components/HerramientasIntensivas/HerramientaIntensiva10';
import HerramientaIntensiva11 from './components/HerramientasIntensivas/HerramientaIntensiva11';
import HerramientaIntensiva12 from './components/HerramientasIntensivas/HerramientaIntensiva12';
import HerramientaIntensiva13 from './components/HerramientasIntensivas/HerramientaIntensiva13';
import HerramientaIntensiva14 from './components/HerramientasIntensivas/HerramientaIntensiva14';


const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Lora-Regular': require('./assets/fonts/Lora/static/Lora-Regular.ttf'),
        'Lora-Italic': require('./assets/fonts/Lora/static/Lora-Italic.ttf'),
        'Lora-Bold': require('./assets/fonts/Lora/static/Lora-Bold.ttf'),
        'Lora-BoldItalic': require('./assets/fonts/Lora/static/Lora-BoldItalic.ttf'),
        'Lora-SemiBold': require('./assets/fonts/Lora/static/Lora-SemiBold.ttf'),
        'Lora-SemiBoldItalic': require('./assets/fonts/Lora/static/Lora-SemiBoldItalic.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <BackgroundWrapper>
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: '#16A6FA', 
              height: 100,
            },
            headerTintColor: '#fff',
            headerTitle: ({ children }) => (
              <View style={{ 
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
                <Text style={{
                  fontSize: 24,
                  fontFamily: 'Lora-SemiBold',
                  color: '#fff',
                  textAlign: 'left',
                  flexWrap: 'wrap',
                  marginRight: route.name.match(/^Herramienta\d+$/) ? 70 : 0,
                }}>
                  {children}
                </Text>
              </View>
            ),
            headerTitleAlign: 'left',
            headerLeft: () => (
              navigation.canGoBack() ? (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ margin: 12 }}
                >
                  <Ionicons name="arrow-back" size={35} color="#fff"/>
                </TouchableOpacity>
              ) : null
            ),
          })}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Main" 
            component={MainScreen} 
            options={{ title: 'Inicio' }}
          />
          <Stack.Screen 
            name="HerramientasSimples" 
            component={HerramientasSimples} 
            options={{ title: 'Herramientas Simples' }}
          />
          <Stack.Screen 
            name="Tools" 
            component={ToolsScreen} 
            options={{ title: 'Herramientas' }}
          />
          <Stack.Screen 
            name="PowerPoint" 
            component={PowerPointScreen} 
            options={{ title: 'PowerPoint' }}
          />
          <Stack.Screen 
            name="LessonPowerPoint" 
            component={LessonPowerPointScreen} 
            options={{ title: 'PowerPoint' }}
          />
          <Stack.Screen 
            name="Lecciones" 
            component={LeccionesScreen} 
            options={{ title: 'Lecciones' }}
          />
          <Stack.Screen 
            name="Information" 
            component={InformationScreen} 
            options={{ title: 'Información y Contactos' }}
          />
          <Stack.Screen 
            name="Testimonios" 
            component={TestimoniosScreen} 
            options={{ title: 'Testimonios' }}
          />
          <Stack.Screen 
            name="HerramientasIntensivas" 
            component={HerramientasIntensivasScreen} 
            options={{ title: 'Herramientas Intensivas' }}
          />
          
          <Stack.Screen name="Leccion1" component={Leccion1} options={{ title: 'Leccion 1: Bosquejo del Entrenamiento' }} />
          <Stack.Screen name="Leccion2" component={Leccion2} options={{ title: 'Leccion 2: Gran Visión Global' }} />
          <Stack.Screen name="Leccion3" component={Leccion3} options={{ title: 'Leccion 3: Gran Visión Local' }} />
          <Stack.Screen name="Leccion3A" component={Leccion3A} options={{ title: 'Leccion 3A: Método Espada' }} />
          <Stack.Screen name="Leccion4" component={Leccion4} options={{ title: 'Leccion 4: Panorama 4 Campos' }} />

          <Stack.Screen name="Herramienta1" component={Herramienta1} options={{ title: 'Hr 1: Mapa Relacional' }} />
          <Stack.Screen name="Herramienta2" component={Herramienta2} options={{ title: 'Hr 2: Persona/Casa de Paz' }} />
          <Stack.Screen name="Herramienta3" component={Herramienta3} options={{ title: 'Hr 3: Testimonio 15s' }} />
          <Stack.Screen name="Herramienta4" component={Herramienta4} options={{ title: 'Hr 4: Los 3 Círculos' }} />
          <Stack.Screen name="Herramienta5" component={Herramienta5} options={{ title: 'Hr 5: El Semáforo' }} />
          <Stack.Screen name="Herramienta6" component={Herramienta6} options={{ title: 'Hr 6: El 4.1.1' }} />
          <Stack.Screen name="Herramienta7" component={Herramienta7} options={{ title: 'Hr 7: Los 3 Tercios' }} />
          <Stack.Screen name="Herramienta8" component={Herramienta8} options={{ title: 'Hr 8: El Círculo Saludable' }} />
          <Stack.Screen name="Herramienta9" component={Herramienta9} options={{ title: 'Hr 9: Guía de la Mano Izquierda' }} />
          <Stack.Screen name="Herramienta10" component={Herramienta10} options={{ title: 'Hr 10: Los 5 Niveles del Liderazgo' }} />
          <Stack.Screen name="Herramienta11" component={Herramienta11} options={{ title: 'Hr 11: Hierro Sobre Hierro' }} />
          <Stack.Screen name="Herramienta12" component={Herramienta12} options={{ title: 'Hr 12: MAOI' }} />
          <Stack.Screen name="Herramienta13" component={Herramienta13} options={{ title: 'Hr 13: Dinámica de la multiplicación' }} />

          <Stack.Screen name="HerramientaIntensiva1" component={HerramientaIntensiva1} options={{ title: 'H.I 1: El Filtro' }} />
          <Stack.Screen name="HerramientaIntensiva2" component={HerramientaIntensiva2} options={{ title: 'H.I 2: Mapa Generacional' }} />
          <Stack.Screen name="HerramientaIntensiva3" component={HerramientaIntensiva3} options={{ title: 'H.I 3: Hierro con Hierro' }} />
          <Stack.Screen name="HerramientaIntensiva4" component={HerramientaIntensiva4} options={{ title: 'H.I 4: Manos Guías' }} />
          <Stack.Screen name="HerramientaIntensiva5" component={HerramientaIntensiva5} options={{ title: 'H.I 5: Los 3 Toques en 3 Días' }} />
          <Stack.Screen name="HerramientaIntensiva6" component={HerramientaIntensiva6} options={{ title: 'H.I 6: Proceso para Entrenar Iglesias' }} />
          <Stack.Screen name="HerramientaIntensiva7" component={HerramientaIntensiva7} options={{ title: 'H.I 7: Las 4 Etapas de un Movimiento' }} />
          <Stack.Screen name="HerramientaIntensiva8" component={HerramientaIntensiva8} options={{ title: 'H.I 8: Efesios 4:1' }} />
          <Stack.Screen name="HerramientaIntensiva9" component={HerramientaIntensiva9} options={{ title: 'H.I 9: Los 3 Viajes Misioneros de Pablo' }} />
          <Stack.Screen name="HerramientaIntensiva10" component={HerramientaIntensiva10} options={{ title: 'H.I 10: La Misión de Dios de Génesis a Apocalipsis' }} />
          <Stack.Screen name="HerramientaIntensiva11" component={HerramientaIntensiva11} options={{ title: 'H.I 11: Herramienta 1-3-9' }} />
          <Stack.Screen name="HerramientaIntensiva12" component={HerramientaIntensiva12} options={{ title: 'H.I 12: Para quien es este Entrenamiento' }} />
          <Stack.Screen name="HerramientaIntensiva13" component={HerramientaIntensiva13} options={{ title: 'H.I 13: Principios para Entrenar' }} />
          <Stack.Screen name="HerramientaIntensiva14" component={HerramientaIntensiva14} options={{ title: 'H.I 14: Entrenamiento y Enseñanzas' }} />
          
        </Stack.Navigator>
      </BackgroundWrapper>
    </NavigationContainer>
  );
}

