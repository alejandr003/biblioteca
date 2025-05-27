import { Book } from '@/components/API/BookService';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Chip, Paragraph, Title } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface BookCardProps {
    book: Book;
    onPress?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
    const handlePress = () => {
        if (onPress) {
            onPress(book);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8} style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.contentContainer}>
                    <Image
                        source={{ uri: book.imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Title numberOfLines={2} style={styles.title}>{book.title}</Title>
                        <Paragraph style={styles.author}>
                            {book.authors.join(', ')}
                        </Paragraph>
                        <View style={styles.chipContainer}>
                            <Chip 
                                icon="book"
                                style={styles.typeChip}
                                textStyle={styles.typeChipText}
                                selectedColor="#2196F3"
                            >
                                {book.type}
                            </Chip>
                        </View>
                        <View style={styles.categoryContainer}>
                            {book.categories.slice(0, 2).map((category, index) => (
                                <Chip
                                    key={index}
                                    style={styles.categoryChip}
                                    textStyle={styles.categoryChipText}
                                >
                                    {category}
                                </Chip>
                            ))}
                            {book.categories.length > 2 && (
                                <Chip
                                    style={[styles.categoryChip, styles.moreChip]}
                                    textStyle={styles.categoryChipText}
                                >
                                    +{book.categories.length - 2}
                                </Chip>
                            )}
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: hp('1.5%'),
        width: '100%',
    },
    card: {
        elevation: 3,
        borderRadius: wp('2.5%'),
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contentContainer: {
        flexDirection: 'row',
        padding: wp('3%'),
    },
    image: {
        width: wp('20%'),
        height: hp('15%'),
        borderRadius: wp('1.5%'),
    },
    textContainer: {
        flex: 1,
        marginLeft: wp('3%'),
        justifyContent: 'space-between',
    },
    title: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: hp('0.3%'),
    },
    author: {
        fontSize: wp('3.5%'),
        color: '#666',
        marginTop: hp('0.4%'),
    },
    chipContainer: {
        flexDirection: 'row',
        marginTop: hp('1%'),
    },
    typeChip: {
        backgroundColor: '#E3F2FD',  // Un azul muy claro
        height: hp('3.5%'),
        borderRadius: wp('5%'),
        elevation: 0,
    },
    typeChipText: {
        fontSize: wp('3%'),
        color: '#2196F3',
        fontWeight: '500',
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: hp('1%'),
        flexWrap: 'wrap',
    },
    categoryChip: {
        marginRight: wp('1%'),
        marginBottom: hp('0.5%'),
        height: hp('3.5%'),
        backgroundColor: '#F0F2FF',
        elevation: 0,
    },
    categoryChipText: {
        fontSize: wp('2.8%'),
        color: '#666',
        fontWeight: '400',
    },
    moreChip: {
        backgroundColor: '#F5FBFF',
    },
});

export default BookCard;
