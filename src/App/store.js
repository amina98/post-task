import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../components/posts/postsSlice";
import userReducer from "../components/users/userSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});
export default store;
