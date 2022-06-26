import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllPosts, fetchPosts, searchPostsAction } from "./postsSlice";
import Pagination from "../common/Pagination";
import { Container } from "react-bootstrap";
import PostCard from "./PostCard";
import styles from "./PostList.module.css";

const PostList = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  //   useEffect(() => {
  //     dispatch(fetchPosts(start));
  //   }, [start]);
  useEffect(() => {
    dispatch(fetchPosts(start));
  }, [searchValue]);
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts.postList.slice(start, start + 12).map((post) => (
    <article key={post.id}>
      <PostCard data={post} />
    </article>
  ));
  return (
    <Container className="mb-5">
      <h2>Posts</h2>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={searchValue}
          placeholder="search something ..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div onClick={() => dispatch(searchPostsAction(searchValue))}>
          search
        </div>
      </div>
      <div className={styles.postsContainer}>{renderedPosts}</div>
      <Pagination
        currentPage={parseInt(start) / 12 + 1}
        pageSize={12}
        totalCount={posts.postList.length}
        onPageChange={(num) => {
          setStart((num - 1) * 12);
        }}
      />
    </Container>
  );
};
export default PostList;
