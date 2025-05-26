import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Buscar from './Buscar';
import Categorias from './Categorias';
import Inicio from './Inicio';
import Perfil from './Perfil';

const TabsHome = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'inicio', title: 'Inicio', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'categorias', title: 'Categorías', focusedIcon: 'format-list-bulleted', unfocusedIcon: 'format-list-bulleted-type' },
    { key: 'buscar', title: 'Buscar', focusedIcon: 'magnify' },
    { key: 'perfil', title: 'Perfil', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    inicio: Inicio,
    categorias: Categorias,
    buscar: Buscar,
    perfil: Perfil,
  });

  return (
    <BottomNavigation
      style={styles.container}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      labeled={true}
      compact={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabsHome;