import { Input, Button } from "antd";
import "../styles/CommentBox.css";

const InputCommentBox = ({ onAdd, rootComment, setRootComment }) => {
  const { TextArea } = Input;
  return (
    <div className="addCommentContainer">
      <TextArea
        rows={4}
        placeholder="Comment here..."
        value={rootComment}
        onChange={(e) => setRootComment(e.target.value)}
      />
      <Button size="large" type="primary" onClick={onAdd}>
        Post
      </Button>
    </div>
  );
};

export default InputCommentBox;
