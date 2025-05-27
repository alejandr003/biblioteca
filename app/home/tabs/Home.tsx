import * as React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { BottomNavigation, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Agregar from './Agregar';
import Buscar from './Buscar';
import Inicio from './Inicio';
import Perfil from './Perfil';

// Tema claro personalizado para la aplicación
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    accent: '#03A9F4',
    background: '#f5f5f5',
    surface: '#ffffff',
  },
};

const TabsHome = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'inicio', title: 'Inicio', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'agregar', title: 'Agregar', focusedIcon: 'book-plus', unfocusedIcon: 'book-plus-outline' },
    { key: 'buscar', title: 'Buscar', focusedIcon: 'magnify', unfocusedIcon: 'magnify' },
    { key: 'perfil', title: 'Perfil', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    inicio: Inicio,
    agregar: Agregar,
    buscar: Buscar,
    perfil: Perfil,
  });

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#2196F3" barStyle="light-content" />        <BottomNavigation
          style={styles.bottomNavigation}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          labeled={true}
          sceneAnimationType="shifting"
          barStyle={styles.navigationBar}
          activeColor="#2196F3"
          inactiveColor="#757575"
        />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bottomNavigation: {
    flex: 1,
  },
  navigationBar: {
    backgroundColor: '#ffffff',
    elevation: 8,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
  },
});

export default TabsHome;