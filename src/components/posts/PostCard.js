import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./PostCard.module.css";
import { editPosts } from "./postsSlice";
import { useDispatch } from "react-redux";

const PostCard = ({ data }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState({
    ...data,
  });
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.postTitle}>{data.title.substring(0, 20)}</h3>
      <p className={styles.postBody}>{data.body.substring(0, 100)}</p>
      <div className={styles.editBtn} onClick={() => setShowModal(true)}>
        Edit post
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post {data.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.editBox}>
            <label htmlFor="title">Title: </label>
            <textarea
              id="title"
              rows={3}
              value={postContent.title}
              onChange={(e) =>
                setPostContent({ ...postContent, title: e.target.value })
              }
            />
          </div>
          <div className={styles.editBox}>
            <label htmlFor="body">body: </label>
            <textarea
              id="body"
              rows={6}
              value={postContent.body}
              onChange={(e) =>
                setPostContent({ ...postContent, body: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(editPosts(postContent));
              setShowModal(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostCard;
