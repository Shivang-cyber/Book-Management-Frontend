import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
const api = `http://13.233.157.172:3000/auth`;

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, thunkAPI) => {
    const token = Cookies.get('token'); 
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }

    try {
      const response = await axios.get(`${api}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Invalid token');
    }
  }
);


export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${api}/signin`, credentials);
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signupUser = createAsyncThunk('auth/signupUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${api}/signup`, credentials);
    console.log("🚀 ~ signupUser ~ response:", response)
    return response.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLoading: false,
    error: null,
    loginSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.loginSuccess = false;
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.loginSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.loginSuccess = true;
        
        Cookies.set('token', action.payload.token, { expires: 7 });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : action.payload.message || 'An error occurred';
        state.loginSuccess = false;
      })

      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.loginSuccess = true;

        Cookies.set('token', action.payload.token, { expires: 7 });
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : action.payload.message || 'An error occurred';
      })
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.loginSuccess = true;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = typeof action.payload === 'string' ? action.payload : action.payload.message || 'An error occurred';
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
