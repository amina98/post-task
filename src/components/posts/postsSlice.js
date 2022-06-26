import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetch", async (start) => {
  const response = await fetch(
    // `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=12`
    `https://jsonplaceholder.typicode.com/posts`
  );
  const data = await response.json();
  return data;
});
export const editPosts = createAsyncThunk("posts/edit", async (info) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${info.id}`,
    {
      method: "PUT",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
});
const initialState = {
  postList: [],
  fetchingPosts: false,
  editingPost: false,
  errorMessage: null,
};
const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    searchPosts(state, action) {
      console.log(state.postList, action);
      state.postList = state.postList.filter((post) =>
        post.title.includes(action.payload)
      );
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.postList = action.payload;
      state.fetchingPosts = false;
    },
    [fetchPosts.pending]: (state) => {
      state.fetchingPosts = true;
    },
    [fetchPosts.rejected]: (state) => {
      state.fetchingPosts = false;
      state.errorMessage = "error";
    },
    [editPosts.fulfilled]: (state, action) => {
      const editedPostIndex = state.postList.indexOf(
        state.postList.find((post) => post.id == action.payload.id)
      );
      state.postList[editedPostIndex] = action.payload;
      state.fetchingPosts = false;
    },
    [editPosts.pending]: (state) => {
      state.fetchingPosts = true;
    },
    [editPosts.rejected]: (state) => {
      state.fetchingPosts = false;
      state.errorMessage = "error on edit";
    },
  },
});
export const selectAllPosts = (state) => state.posts;
export const { searchPosts: searchPostsAction } = postsSlice.actions;
export default postsSlice.reducer;
