import React from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';

export default function ToolsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { tools, toolNumber } = route.params;

  const getImageForToolNumber = (toolNumber) => {
    switch (toolNumber) {
      case 1:
        return require('../assets/icons/campo 1.png');
      case 2:
        return require('../assets/icons/campo 2.png');
      case 3:
        return require('../assets/icons/campo 4.png');
      case 4:
        return require('../assets/icons/campo 3.png');
      default:
        return require('../assets/icons/campo 5.png');
    }
  };

  const getToolNumber = (buttonNumber, index) => {
    if (buttonNumber === 2) {
      return index + 3;
    } else if (buttonNumber === 3) {
      return index + 8;
    } else if (buttonNumber === 4) {
      return index + 6;
    } else if (buttonNumber === 5) {
      return index + 10;
    } else {
      return (buttonNumber - 1) * 2 + index + 1;
    }
  };

  const renderToolButton = (title, index) => {
    const handlePress = () => {
      const toolIndex = getToolNumber(toolNumber, index);
      navigation.navigate(`Herramienta${toolIndex}`, { showOnlyNewContent: true });
    };

    const imageSource = getImageForToolNumber(toolNumber);

    return (
      <View key={index} style={styles.button}>
        <TouchableOpacity onPress={handlePress}>
          <View style={{ alignItems: 'center' }}>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground 
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
      <View>
        <ScrollView contentContainerStyle={styles.toolsContainer}>
          {tools.map((tool, index) => renderToolButton(tool, index))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

