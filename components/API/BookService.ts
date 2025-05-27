// BookService.ts
// Servicio para gestionar las peticiones a la API de libros

interface Author {
  name: string;
}

export interface Book {
  _id: string;
  title: string;
  authors: string[];
  categories: string[];
  imageUrl: string;
  type: string;
  identifier: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BooksResponse {
  books: Book[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    perPage: number;
  };
}

const API_URL = 'https://biblioteca-backend-coral.vercel.app/api/books';

export const BookService = {
  // Obtener todos los libros
  getBooks: async (): Promise<BooksResponse> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data: BooksResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener libros:', error);
      throw error;
    }
  },

  // Buscar libros por nombre
  searchBooks: async (query: string): Promise<BooksResponse> => {
    try {
      const response = await fetch(`${API_URL}?title=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Error en la búsqueda de libros');
      }
      const data: BooksResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error al buscar libros:', error);
      throw error;
    }
  },

  // Agregar un nuevo libro
  addBook: async (book: Omit<Book, '_id' | 'createdAt' | 'updatedAt' | '__v'>): Promise<Book> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) {
        throw new Error('Error al agregar el libro');
      }
      const data: Book = await response.json();
      return data;
    } catch (error) {
      console.error('Error al agregar libro:', error);
      throw error;
    }
  },
};

export default BookService;
