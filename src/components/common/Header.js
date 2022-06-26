import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../posts/postsSlice";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { logOutUserAction, selectUser } from "../users/userSlice";

const Header = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <div className={styles.container}>
      <Container className={styles.headerContainer}>
        <div className={styles.links}>
          <span>
            <Link to={"/"}>home</Link>
          </span>
          {user?.userData?.name ? (
            <>
              <span>{`${user.userData.name} ${user.userData.lastName}`}</span>{" "}
              <span
                className={styles.logOutBtn}
                onClick={() => dispatch(logOutUserAction())}
              >
                log out
              </span>
            </>
          ) : (
            <span>
              <Link to={"/login"}>login</Link>
            </span>
          )}
        </div>
        <span>post count: {posts.postList.length}</span>
      </Container>
    </div>
  );
};

export default Header;
