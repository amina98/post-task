import "./App.css";
import { Provider } from "react-redux";
import store from "./App/store";
import Header from "./components/common/Header";
import PostList from "./components/posts/PostList";
import Login from "./components/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className="routes">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
