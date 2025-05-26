import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {

    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    return (
            <View style={styles.cardOne}>

                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/RemoveBiblioteca.png')} style={styles.logoImage} />
                </View>

                <View style={styles.registroContainer}>
                    <Text style={{ fontSize: wp('6'), fontWeight: 'bold', marginBottom: hp('1.5'), fontFamily: 'Roboto' }}>
                        Registrarse
                    </Text>
                    <Text style={{ fontSize: wp('4'), fontFamily: 'Roboto', textAlign: 'center', paddingHorizontal: wp('10'), color: '#6B7280' }}>
                        Completa los campos para poder registrarse.
                    </Text>
                </View>

                <View style={styles.inputsContainer}>
                    <TextInput
                        label="Correo electrónico"
                        mode="outlined"
                        value={email}
                        keyboardType='email-address'
                        onChangeText={text => setEmail(text)}
                        style={{ margin: wp('5'), backgroundColor: '#FFFFFF', marginBottom: hp('0') }}
                        theme={{ colors: { primary: '#4F46E5', placeholder: '#ADAEBC' } }}
                        placeholder='correo@gmail.com'
                    />
                    <TextInput
                        label="Contraseña"
                        mode="outlined"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!showPassword}
                        style={{ margin: wp('5'), backgroundColor: '#FFFFFF', marginBottom: hp('0') }}
                        theme={{ colors: { primary: '#4F46E5', placeholder: '#ADAEBC' } }}
                        placeholder='********'
                        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                    />
                    <TextInput
                        label="Confirmar Contraseña"
                        mode="outlined"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!showConfirmPassword}
                        style={{ margin: wp('5'), backgroundColor: '#FFFFFF', marginBottom: hp('0') }}
                        theme={{ colors: { primary: '#4F46E5', placeholder: '#ADAEBC' } }}
                        placeholder='********'
                        right={<TextInput.Icon icon={showConfirmPassword ? "eye-off" : "eye"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />}
                    />
                    <TextInput
                        label="Numero de teléfono"
                        mode="outlined"
                        keyboardType='phone-pad'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={{ margin: wp('5'), backgroundColor: '#FFFFFF', marginBottom: hp('2') }}
                        theme={{ colors: { primary: '#4F46E5', placeholder: '#ADAEBC' } }}
                        placeholder='123-456-7890'
                    />
                    <Button
                        mode='contained'
                        style={{ margin: wp('5'), backgroundColor: '#52c2d2', borderRadius: 5 }}
                    >Registrarse</Button>
                </View>

                <View style={styles.cuentaContainer}>
                    <Text style={{ fontSize: wp('3.8'), color: '#6B7280', fontFamily: 'Roboto' }}>
                        Tengo una cuenta
                    </Text>
                    <Text style={{ fontSize: wp('3.8'), color: '#52c2d2', fontFamily: 'Roboto', fontWeight: 'bold' }} onPress={() => router.push('/Index')}>
                                Iniciar sesión
                                </Text>
                </View>

                <View style={styles.pieContainer}>
                    <Text style={{ fontSize: wp('3.5'), color: '#6B7280', fontFamily: 'Roboto', textAlign: 'center', marginTop: hp('-5') }}>
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
    registroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: hp('2'),
    },
    inputsContainer: {
        marginTop: hp('1'),
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
