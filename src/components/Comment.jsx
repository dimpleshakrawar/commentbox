import { useState } from "react";
import { Input, Button } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import "../styles/CommentBox.css";
import EditModal from "./EditModal";

const Comment = ({ comments, comment, setComments, addComment }) => {
  const { commentText, childCommments, id } = comment;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childComment, setChildComment] = useState("");
  const [show, setShow] = useState(true);
  const [showAddComponent, setShowAddComponent] = useState(false);

  const onAdd = () => {
    addComment(id, childComment);
    setChildComment("");
    setShowAddComponent(false);
  };

  const showChildComponentHandler = () => {
    if (childCommments.length > 0) setShow((show) => !show);
  };

  const commentDeleteHandler = () => {
    const commentsData = Object.values(comments).filter(
      (comment) => comment.id === id
    );
    if (commentsData) {
      const filteredPeople = Object.values(comments).filter(
        (comment) => comment.id !== id
      );
      setComments(filteredPeople);
    }
  };

  return (
    <div style={{ marginLeft: "2rem" }}>
      <div className="commentContainer" onClick={showChildComponentHandler}>
        <div className="profileContainer">
          <Button type="text">
            <FaUserCircle size={25} />
          </Button>
          <p>{commentText}</p>
        </div>
        <div className="replyEditbtnContainer">
          <Button type="primary" onClick={() => setShowAddComponent(true)}>
            Reply
          </Button>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            <MdEdit />
            Edit
          </Button>
          <Button type="primary" onClick={commentDeleteHandler}>
            <AiFillDelete />
            Delete
          </Button>
        </div>
        <EditModal
          comments={comments}
          comment={comment}
          setComments={setComments}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <div>
        <div>
          {showAddComponent && (
            <div className="addChildCommentContainer">
              <Input
                type="text"
                value={childComment}
                onChange={(e) => setChildComment(e.target.value)}
                placeholder="add comment"
              />{" "}
              <Button type="primary" onClick={onAdd}>
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
      {show &&
        childCommments.map((childCommentEl, key) => {
          return (
            <Comment
              key={key}
              comment={childCommentEl}
              addComment={addComment}
            />
          );
        })}
    </div>
  );
};

export default Comment;
