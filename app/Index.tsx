import { useRouter } from 'expo-router';
import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import LoginAuth from './Auth/LoginAuth';


export default function Index () {

  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleLogin = async () => {
  if (email === '') {
    alert('Por favor, ingresa tu correo electrónico.');
    return;
  }
  if (!validateEmail(email)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return;
  }
  if (password === '') {
    alert('Por favor, ingresa tu contraseña.');
    return;
  }

  try {
    const result = await LoginAuth(email, password);
    
    if (result.ok) {
      console.log(true);
      if (result.data) {
        const userName = result.data.email ? result.data.email.split('@')[0] : '';
        alert(`Bienvenido ${userName}!`);
        router.push({
          pathname: '/home/tabs/Home',
          params: { userName: JSON.stringify(result.data) }
        });
      } else {
        alert('La respuesta del servidor no tiene el formato esperado');
      }
    } else {
      alert(`Error: ${result.data?.message || 'Ha ocurrido un error al iniciar sesión'}`);
    }
   {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
  } catch (error) {
    alert('Ha ocurrido un error inesperado al procesar el inicio de sesión');
  }
}

  return (
        <View style={styles.cardOne}>

          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/RemoveBiblioteca.png')} style={styles.logoImage} />
          </View>

          <View style={styles.iniciarContainer}>
            <Text style={{ fontSize: wp('6'), fontWeight: 'bold', marginBottom: hp('1.5'), fontFamily: 'Roboto' }}>
              Iniciar Sesión
            </Text>
            <Text style={{ fontSize: wp('4'), fontFamily: 'Roboto', textAlign: 'center', paddingHorizontal: wp('10'), color: '#6B7280'}}>
              Ingresa tus credenciales para acceder.
            </Text>
          </View>
          
          <View style={styles.inputsContainer}>
            <TextInput
              label="Correo electrónico"
              mode="outlined"
              value={email}
              keyboardType='email-address'
              onChangeText={setEmail}
              style={{ margin: wp('5'), backgroundColor: '#FFFFFF' }}
              theme={{ colors: { primary: '#4F46E5', placeholder: '#ADAEBC' } }}
              placeholder='correo@gmail.com'
            />
            <TextInput
              label="Contraseña"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={{ margin: wp('5'), backgroundColor: '#FFFFFF' }}
              theme={{ colors: { primary: '#4F46E5', placeholder: '#ADAEBC' } }}
              placeholder='********'
              right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
            />            <Button
            onPress={handleLogin}
            mode='contained'
            style={{ margin: wp('5'), backgroundColor: '#52c2d2', borderRadius: 5 }}
            >
              Ingresar
            </Button>
          </View>

            <View style={styles.cuentaContainer}>
            <Text style={{ fontSize: wp('3.8'), color: '#6B7280', fontFamily: 'Roboto' }} >
              ¿No tienes cuenta?
            </Text>
            <Text style={{ fontSize: wp('3.8'), color: '#52c2d2', fontFamily: 'Roboto', fontWeight: 'bold' }} onPress={() => router.push('/RegisterScreen')}>
              Regístrate
            </Text>
            </View>

            <View style={styles.pieContainer}>
              <Text style={{ fontSize: wp('3.5'), color: '#6B7280', fontFamily: 'Roboto', textAlign: 'center', marginTop: hp('9') }}>
                © 2025 Biblioteca de Jesus Chan.
                Todos los derechos reservados.
              </Text>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
  cardOne: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3'),
    marginBottom: hp(''),
  },
  logoImage: {
    width: wp('20'),
    height: hp('20'),
    marginTop: hp('1.5'),
    resizeMode: 'contain',
  },
  iniciarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp('2'),
  },
  inputsContainer:{
    marginTop: hp('2'),
    paddingHorizontal: wp('5'),
  },
  cuentaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: wp('11'), 
    marginTop: hp('2')
  },
  pieContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('15'),
    paddingBottom: hp('2'),
    margin: wp('11'),
  },
});
