import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/get-all-books');
      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch books');
    }
  }
);

// Async thunk for adding a book
export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/Addbook', bookData, {
        headers: { 'Content-Type': 'application/json' },
      });
      // After adding, fetch books to update the list
      dispatch(fetchBooks());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add book');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBook.pending, (state) => {
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state) => {
        // Books will be updated by fetchBooks
      })
      .addCase(addBook.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;
