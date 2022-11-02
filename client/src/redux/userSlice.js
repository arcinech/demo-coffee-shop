import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: {},
};

// thunks
export const loginPost = createAsyncThunk('auth/login', async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch('/auth/login', options).then((res) =>
    res
      .json()
      .then((data) => data)
      .catch((err) => err.message),
  );

  if (response.status === 200) {
    return response;
  }
});

export const registerUser = createAsyncThunk('auth/register', async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('/auth/register', options).then((res) =>
    res
      .json()
      .then((data) => data)
      .catch((err) => err.message),
  );

  if (response.status === 200) {
    return response;
  }
});

export const fetchUser = createAsyncThunk('auth/profile', async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: true,
  };

  const response = await fetch('/auth/profile', options).then((res) =>
    res
      .json()
      .then((data) => data)
      .catch((err) => err.message),
  );

  if (response.status === 200) {
    return response;
  }
});

// slice

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reducer(state, action) {
      state.user.push(action.payload);
    },
    extraReducers: (builder) => {
      builder.addCase(loginPost.fulfilled, (state, action) => {
        state.user = action.payload;
      });
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });

      builder.addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
    },
  },
});
