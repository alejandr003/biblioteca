import BookService, { Book } from '@/components/API/BookService';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';
import BookCard from '@/components/BookCard';

const Buscar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
    };

    const onSearch = async () => {
        if (!searchQuery.trim()) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSearched(true);
            const response = await BookService.searchBooks(searchQuery);
            setBooks(response.books);
        } catch (err) {
            setError('Error al buscar libros. Por favor, inténtelo de nuevo más tarde.');
            console.error('Error al buscar libros:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleBookPress = (book: Book) => {
        // En el futuro, podríamos navegar a una vista detallada del libro
        console.log('Libro seleccionado:', book.title);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>                <Searchbar
                    placeholder="Buscar por título"
                    onChangeText={onChangeSearch}
                    onSubmitEditing={onSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                    icon="magnify"
                    clearIcon="close-circle"
                    onIconPress={onSearch}
                    iconColor="#2196F3"
                    inputStyle={{color: '#333'}}
                />
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0066cc" />
                        <Text style={styles.infoText}>Buscando...</Text>
                    </View>                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : searched && books.length === 0 ? (
                    <View style={styles.emptyContainer}>                        <Text style={styles.infoText}>
                            No se encontraron libros con el título {`"${searchQuery}"`}
                        </Text>
                    </View>
                ) : searched ? (
                    <View>                        <Title style={styles.resultTitle}>
                            Resultados para {`"${searchQuery}"`}
                        </Title>
                        <Text style={styles.resultCount}>
                            {books.length} {books.length === 1 ? 'libro encontrado' : 'libros encontrados'}
                        </Text>
                        <View style={styles.booksContainer}>
                            {books.map(book => (
                                <BookCard
                                    key={book._id}
                                    book={book}
                                    onPress={handleBookPress}
                                />
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.infoText}>
                            Ingresa un título de libro para buscar
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        zIndex: 10,
    },
    searchbar: {
        height: 50,
        borderRadius: 25,
        elevation: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
        minHeight: '100%',
    },
    loadingContainer: {
        paddingVertical: 32,
        alignItems: 'center',
    },
    emptyContainer: {
        paddingVertical: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },    resultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#2196F3',
    },
    resultCount: {
        marginBottom: 16,
        color: '#666',
        fontSize: 14,
    },
    booksContainer: {
        width: '100%',
    },
});

export default Buscar;
