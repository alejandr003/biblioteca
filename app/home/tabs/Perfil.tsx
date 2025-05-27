import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Divider, List, Switch, Text, Title } from 'react-native-paper';

const Perfil = () => {
    const navigation = useNavigation();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);

    // Esta función simula el cierre de sesión
    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que quieres cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Cerrar sesión",
                    onPress: () => navigation.navigate('Index' as never),
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerSection}>
                <Avatar.Image
                    size={100}
                    source={require('../../../assets/images/Biblioteca.png')}
                    style={styles.avatar}
                />
                <Title style={styles.username}>Usuario Biblioteca</Title>
                <Text style={styles.email}>usuario@example.com</Text>
                <Text style={styles.memberDate}>Miembro desde Mayo 2025</Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Title style={styles.statNumber}>8</Title>
                        <Text style={styles.statLabel}>Libros</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Title style={styles.statNumber}>12</Title>
                        <Text style={styles.statLabel}>Favoritos</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Title style={styles.statNumber}>3</Title>
                        <Text style={styles.statLabel}>Reseñas</Text>
                    </View>
                </View>
            </View>

            <Card style={styles.section}>
                <Card.Title title="Preferencias" />
                <Card.Content>
                    <List.Item
                        title="Notificaciones"
                        description="Recibir alertas sobre nuevos libros"
                        right={() => (
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                color="#2196F3"
                            />
                        )}
                    />
                    <Divider />
                    <List.Item
                        title="Tema oscuro"
                        description="Cambiar al modo oscuro"
                        right={() => (
                            <Switch
                                value={darkThemeEnabled}
                                onValueChange={setDarkThemeEnabled}
                                color="#2196F3"
                            />
                        )}
                    />
                </Card.Content>
            </Card>

            <Card style={styles.section}>
                <Card.Title title="Cuenta" />
                <Card.Content>
                    <List.Item
                        title="Editar perfil"
                        left={props => <List.Icon {...props} icon="account-edit" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Editar perfil', 'Esta función estará disponible próximamente.')}
                    />
                    <Divider />
                    <List.Item
                        title="Cambiar contraseña"
                        left={props => <List.Icon {...props} icon="lock-reset" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Cambiar contraseña', 'Esta función estará disponible próximamente.')}
                    />
                    <Divider />
                    <List.Item
                        title="Mis libros guardados"
                        left={props => <List.Icon {...props} icon="book-multiple" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Mis libros', 'Esta función estará disponible próximamente.')}
                    />
                </Card.Content>
            </Card>

            <Card style={styles.section}>
                <Card.Title title="Soporte y ayuda" />
                <Card.Content>
                    <List.Item
                        title="Preguntas frecuentes"
                        left={props => <List.Icon {...props} icon="frequently-asked-questions" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('FAQs', 'Esta función estará disponible próximamente.')}
                    />
                    <Divider />
                    <List.Item
                        title="Contacto"
                        left={props => <List.Icon {...props} icon="email" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Contacto', 'Esta función estará disponible próximamente.')}
                    />
                    <Divider />
                    <List.Item
                        title="Acerca de"
                        left={props => <List.Icon {...props} icon="information" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => Alert.alert('Acerca de', 'Biblioteca App v1.0\nDesarrollada para UT Proyectos\nApp Multiplataforma © 2025')}
                    />
                </Card.Content>
            </Card>

            <Button
                mode="outlined"
                onPress={handleLogout}
                style={styles.logoutButton}
                icon="logout"
            >
                Cerrar Sesión
            </Button>

            <View style={styles.footerSection}>
                <Text style={styles.footerText}>Biblioteca App v1.0</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerSection: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatar: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    memberDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    section: {
        margin: 10,
        elevation: 2,
    },
    logoutButton: {
        margin: 20,
        borderColor: '#ff5252',
        borderWidth: 1,
    },
    footerSection: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        color: '#888',
        fontSize: 12,
    },
});

export default Perfil;
