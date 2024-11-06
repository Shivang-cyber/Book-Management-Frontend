import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const api = `http://13.201.78.142:3000/books/`;

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(api);
  return response.data;
});

export const createBook = createAsyncThunk(
  "books/createBook",
  async (newBook) => {
    const response = await axios.post(api, newBook, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (updatedBook) => {
    const response = await axios.put(`${api}${updatedBook.id}`, updatedBook, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId) => {
    await axios.delete(`${api}${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return bookId;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload); 
      })
      .addCase(createBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = state.items.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = state.items.filter((book) => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
