import axios from 'axios';
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';

const baseURL = 'https://657c9ecd853beeefdb99b9c5.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    try {
      const { data } = await axios.get(`${baseURL}/contacts`);
      return data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }
);

export const createContact = createAsyncThunk(
  'contacts/createContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`${baseURL}/contacts`, contact);
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${baseURL}/contacts/${id}`);
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const selectCount = createSelector(
  [state => state.contacts.list],
  contacts => {
    const count = contacts.filter(Boolean).length;
    return count;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
export const { setFilter } = contactsSlice.actions;
export const selectIsLoading = state => state.contacts.status === 'loading';
export const selectError = state => state.contacts.error;
export const selectContacts = state => state.contacts.list;
export const selectFilter = state => state.contacts.filter;
