import BookService, { Book } from '@/components/API/BookService';
import BookCard from '@/components/BookCard';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PaperProvider, Title } from 'react-native-paper';

export default function Inicio() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await BookService.getBooks();
      
      // Mezclar los libros para que aparezcan en orden aleatorio
      const shuffled = [...response.books].sort(() => 0.5 - Math.random());
      setBooks(shuffled);
    } catch (err) {
      setError('No se pudieron cargar los libros. Por favor, inténtelo de nuevo más tarde.');
      console.error('Error al cargar libros:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookPress = (book: Book) => {
    // En el futuro, podríamos navegar a una vista detallada del libro
    console.log('Libro seleccionado:', book.title);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Cargando libros...</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Title style={styles.title}>Descubre Nuevos Libros</Title>
        </View>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : books.length === 0 ? (
            <Text style={styles.emptyText}>No hay libros disponibles</Text>
          ) : (
            <View style={styles.booksContainer}>
              <View style={styles.sectionContainer}>
                <Title style={styles.sectionTitle}>Selección Para Ti</Title>
                <View style={styles.booksList}>
                  {books.slice(0, 3).map(book => (
                    <BookCard 
                      key={book._id} 
                      book={book} 
                      onPress={handleBookPress}
                    />
                  ))}
                </View>
              </View>
              
              <View style={styles.sectionContainer}>
                <Title style={styles.sectionTitle}>Novedades</Title>
                <View style={styles.booksList}>
                  {books.slice(3).map(book => (
                    <BookCard 
                      key={book._id} 
                      book={book} 
                      onPress={handleBookPress}
                    />
                  ))}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
    minHeight: '100%',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  sectionContainer: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#2196F3',
  },
  booksList: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  booksContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  userText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
});