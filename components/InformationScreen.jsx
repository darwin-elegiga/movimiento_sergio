import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

const ContactCard = ({ name, role, photo, whatsapp, facebookId, instagram, email, description, mayuscula }) => (
  <View style={styles.contactCard}>
    <Image source={photo} style={styles.contactPhoto} />
    <Text style={styles.contactName}>{name}</Text>
    <Text style={styles.contactRole}>{role} <Text style={styles.mayuscula}>{mayuscula}</Text></Text>
    <Text style={styles.contactDescription}>{description}</Text>
    <View style={styles.contactIcons}>
      <TouchableOpacity onPress={() => Linking.openURL(`https://wa.me/${whatsapp.startsWith('+') ? whatsapp.slice(1) : whatsapp}`)}>
        <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
      </TouchableOpacity>
      {/* Commented Facebook button
      <TouchableOpacity onPress={() => Linking.openURL(`fb-messenger://user/${facebookId}`)}>
        <Ionicons name="logo-facebook" size={28} color="#0078FF" />
      </TouchableOpacity>
      */}
      {/* Commented Instagram button
      <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/direct/t/${instagram}`)}>
        <LinearGradient
          colors={['#405DE6', '#5851DB', '#833AB4', '#C13584', '#E1306C', '#FD1D1D', '#F56040', '#F77737', '#FCAF45', '#FFDC80']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.instagramGradient}
        >
          <Ionicons name="logo-instagram" size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
      */}
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
        <Image 
          source={require('../assets/icons/gmail.png')} 
          style={styles.gmailIcon} 
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default function InformationScreen() {
  return (
    <ImageBackground 
      source={require('../assets/icons/fondo1.jpg')} 
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre Nosotros</Text>
          <Text style={styles.sectionText}>
          El Movimiento de Alcance Mundial es ministerio dedicado a expandir 
            el mensaje del evangelio del Reino a través de la comunidades de fe. Nuestro enfoque 
            se basa en estrategias simples, bíblicas y fácil de reproducir para el discipulado y la multiplicación de iglesias saludables.
            A través de nuestra experiencia, sabemos que cada comunidad es única, y nos esforzamos por entender 
            sus necesidades específicas para ofrecerles el apoyo que requieren. Nuestra labor se caracteriza por 
            la colaboración y el esfuerzo conjunto entre los diferentes miembros de la comunidad, creando así 
            un ambiente propicio para el crecimiento saludables de las iglesias.

          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestra Misión</Text>
          <Text style={styles.sectionText}>
          Nuestra misión es equipar y empoderar a iglesias ya existentes y creyentes obedientes para que puedan plantar iglesias saludables 
            y autosostenibles en todas las naciones, alcanzando a aquellos que aún no han sido alcanzados 
            con el mensaje del Reino de Dios. Creemos firmemente en el poder del evangelio para 
            cambiar vidas, y por ello, trabajamos incansablemente para proporcionar las herramientas y 
            recursos necesarios a aquellos que desean multiplicar su impacto en sus comunidades, ciudades y nación. Nos comprometemos a entrenar con las herramientas de evangelismo, desarrollo y multiplicación para que los creyentes se conviertan en agentes de cambio en su entorno y esfera de influencia.

          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestra visión </Text>
          <Text style={styles.sectionText}>
          Es ver un mundo transformado por el poder del evangelio, donde cada iglesia sea un faro de esperanza y un centro de impacto en su comunidad. Imaginamos un movimiento de creyentes apasionados y bien equipados que, al estar arraigados en la palabra de Dios, lleven la luz del Reino a cada rincón de la sociedad. Nuestro deseo es que, a través de iglesias saludables y autosostenibles, se logre un alcance cohesivo y dinámico, tocando vidas y corazones que aún no han experimentado la gracia y el amor de Cristo. Creemos que cada creyente está llamado a ser un puente hacia aquellos que están lejos, facilitando el encuentro con el mensaje transformador del evangelio y fomentando un legado de fe y esperanza en todas las naciones.
          </Text>
        </View>

        <ContactCard
          name="Julio A Fajardo Trujillo"
          role="Líder del "
          mayuscula="M.A.M"
          photo={require('../assets/contactos/julio.jpg')}
          whatsapp="+5355953985"
          facebookId="100000686899395"
          instagram="julio_fajardo"
          email="juliofajardotrujillo@gmail.com"
          description="El Pastor Julio A. Fajardo Trujillo es el líder del Movimiento de Alcance Mundial (M.A.M.), un ministerio comprometido con la expansión del mensaje del evangelio del Reino en lugares que aún no han sido alcanzados. Con una profunda pasión por la multiplicación de iglesias saludables, el Pastor Julio junto a su equipo de trabajo se dedica a enseñar y entrenar a pastores, líderes y a todos los creyentes obedientes a las Escrituras que desean cumplir con la Gran Comisión. Su enfoque se fundamenta en herramientas bíblicas, simples y fáciles de reproducir, promoviendo un ambiente de colaboración y trabajo en equipo que facilita el crecimiento espiritual y el fortalecimiento del discipulado. Teniendo experiencia en el crecimiento intensivo y extensivo con diferentes organizaciones cristianas, evidenciando la eficacia de su labor. A través de su ministerio, el Pastor Julio y su equipo busca empoderar a los creyentes para que se conviertan en auténticos agentes de cambio, tocando las vidas de aquellos que aún no han experimentado la gracia transformadora de Dios."
        />

        <ContactCard
          name="Sergio Rodriguez Trujillo"
          role="Desarrollador de la Aplicación"
          mayuscula=""
          photo={require('../assets/contactos/sergio.png')}
          whatsapp="+5354959570"
          facebookId="100001052583926"
          instagram="SERGIORODRIGUEZTRUJILLO"
          email="ceciysergi@gmail.com"
          description="Sergio es el encargado del desarrollo de nuestra aplicación, asegurando que tengamos herramientas tecnológicas adecuadas para apoyar nuestra misión."
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#16A6FA',
    padding: 20,
    alignItems: 'center',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Lora-SemiBold',
    textTransform: 'capitalize',
    color: '#003366',
    marginBottom: 15,
  },
  sectionText: {
    fontFamily: 'Lora-Regular',
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  contactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    margin: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  contactPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  contactName: {
    fontFamily: 'Lora-SemiBold',
    textTransform: 'capitalize', 
    fontSize: 20,
    color: '#003366',
    marginBottom: 5,
  },
  contactRole: {
    fontSize: 16,
    fontFamily: 'Lora-SemiBoldItalic',
    textTransform: 'capitalize',
    color: '#1C4F7C',
    marginBottom: 10,
  },
  contactDescription: {
    fontFamily: 'Lora-Regular',
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  gmailIcon: {
    width: 28,
    height: 28,
  },
  mayuscula: {
    fontSize: 16,
    fontFamily: 'Lora-SemiBoldItalic',
    textTransform: 'uppercase',
    color: '#1C4F7C',
    marginBottom: 10,
  },
  // Commented Instagram gradient style
  /*
  instagramGradient: {
    width: 28,
    height: 28,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  */
});

