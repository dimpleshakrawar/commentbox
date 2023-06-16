import "../styles/CommentsPage.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Divider } from "antd";
import Comment from "../components/Comment";
import InputCommentBox from "../components/InputCommentBox";

const getNewComment = (commentValue, isRootNode = false, parentNodeId) => {
  return {
    id: uuidv4(),
    commentText: commentValue,
    childCommments: [],
    isRootNode,
    parentNodeId,
  };
};

const initialState = {};

function CommentsPage() {
  const [comments, setComments] = useState(initialState);
  const [rootComment, setRootComment] = useState("");

  const addComment = (parentId, newCommentText) => {
    let newComment = null;
    if (parentId) {
      newComment = getNewComment(newCommentText, false, parentId);
      setComments((comments) => ({
        ...comments,
        [parentId]: {
          ...comments[parentId],
          childCommments: [...comments[parentId].childCommments, newComment.id],
        },
      }));
    } else {
      newComment = getNewComment(newCommentText, true, null);
    }
    setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
  };

  const commentMapper = (comment) => {
    return {
      ...comment,
      childCommments: comment.childCommments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };

  const enhancedComments = Object.values(comments)
    .filter((comment) => {
      return !comment.parentNodeId;
    })
    .map(commentMapper);

  const onAdd = () => {
    addComment(null, rootComment);
    setRootComment("");
  };

  return (
    <div className="pageLayout">
      <h2>Comments</h2>
      <Divider />
      <InputCommentBox
        onAdd={onAdd}
        rootComment={rootComment}
        setRootComment={setRootComment}
      />
      <div>
        {enhancedComments.map((comment, key) => {
          return (
            <Comment
              key={key}
              comment={comment}
              comments={comments}
              addComment={addComment}
              setComments={setComments}
            />
          );
        })}
      </div>
    </div>
  );
}
export default CommentsPage;
