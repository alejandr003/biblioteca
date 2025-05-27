import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Chip, HelperText, TextInput, Title } from 'react-native-paper';
import { BookService } from '@/components/API/BookService';

const Agregar = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [authors, setAuthors] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const addAuthor = () => {
    if (author.trim()) {
      setAuthors([...authors, author.trim()]);
      setAuthor('');
    }
  };

  const removeAuthor = (index: number) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  const addCategory = () => {
    if (category.trim()) {
      setCategories([...categories, category.trim()]);
      setCategory('');
    }
  };

  const removeCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = 'El título es obligatorio';
    if (authors.length === 0) newErrors.authors = 'Debe agregar al menos un autor';
    if (categories.length === 0) newErrors.categories = 'Debe agregar al menos una categoría';
    if (!imageUrl) newErrors.imageUrl = 'La URL de la imagen es obligatoria';
    if (!type) newErrors.type = 'El tipo de libro es obligatorio';
    if (!identifier) newErrors.identifier = 'El identificador es obligatorio';
    if (!description) newErrors.description = 'La descripción es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const newBook = {
          title,
          authors,
          categories,
          imageUrl,
          type,
          identifier,
          description,
        };

        await BookService.addBook(newBook);
        
        // Resetear formulario después de guardar
        setTitle('');
        setAuthor('');
        setAuthors([]);
        setCategory('');
        setCategories([]);
        setImageUrl('');
        setType('');
        setIdentifier('');
        setDescription('');
        setErrors({});
        
        Alert.alert('Éxito', 'Libro agregado correctamente');
      } catch (error) {
        console.error('Error al agregar libro:', error);
        Alert.alert('Error', 'No se pudo agregar el libro. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Title style={styles.title}>Agregar Nuevo Libro</Title>

        <TextInput
          label="Título del libro *"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          mode="outlined"
          error={!!errors.title}
        />
        {errors.title && <HelperText type="error">{errors.title}</HelperText>}

        <View style={styles.inputContainer}>
          <TextInput
            label="Autor"
            value={author}
            onChangeText={setAuthor}
            style={styles.inputWithButton}
            mode="outlined"
            error={!!errors.authors && authors.length === 0}
            right={
              <TextInput.Icon
                icon="plus"
                onPress={addAuthor}
              />
            }
          />
        </View>
        {errors.authors && <HelperText type="error">{errors.authors}</HelperText>}

        <View style={styles.chipContainer}>
          {authors.map((item, index) => (
            <Chip
              key={index}
              style={styles.chip}
              onClose={() => removeAuthor(index)}
            >
              {item}
            </Chip>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Categoría"
            value={category}
            onChangeText={setCategory}
            style={styles.inputWithButton}
            mode="outlined"
            error={!!errors.categories && categories.length === 0}
            right={
              <TextInput.Icon
                icon="plus"
                onPress={addCategory}
              />
            }
          />
        </View>
        {errors.categories && <HelperText type="error">{errors.categories}</HelperText>}

        <View style={styles.chipContainer}>
          {categories.map((item, index) => (
            <Chip
              key={index}
              style={styles.chip}
              onClose={() => removeCategory(index)}
            >
              {item}
            </Chip>
          ))}
        </View>

        <TextInput
          label="URL de la imagen *"
          value={imageUrl}
          onChangeText={setImageUrl}
          style={styles.input}
          mode="outlined"
          error={!!errors.imageUrl}
        />
        {errors.imageUrl && <HelperText type="error">{errors.imageUrl}</HelperText>}

        <TextInput
          label="Tipo de libro (físico/e-book) *"
          value={type}
          onChangeText={setType}
          style={styles.input}
          mode="outlined"
          error={!!errors.type}
        />
        {errors.type && <HelperText type="error">{errors.type}</HelperText>}

        <TextInput
          label="Identificador (ISBN/ISSN) *"
          value={identifier}
          onChangeText={setIdentifier}
          style={styles.input}
          mode="outlined"
          error={!!errors.identifier}
        />
        {errors.identifier && <HelperText type="error">{errors.identifier}</HelperText>}

        <TextInput
          label="Descripción *"
          value={description}
          onChangeText={setDescription}
          style={styles.textArea}
          mode="outlined"
          multiline
          numberOfLines={5}
          error={!!errors.description}
        />
        {errors.description && <HelperText type="error">{errors.description}</HelperText>}

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Libro'}
        </Button>
        {loading && <ActivityIndicator style={styles.loading} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  textArea: {
    marginBottom: 12,
    backgroundColor: '#fff',
    height: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  inputWithButton: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  chip: {
    margin: 4,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 6,
    backgroundColor: '#2196F3',
  },
  loading: {
    marginTop: 10,
  },
});

export default Agregar;
