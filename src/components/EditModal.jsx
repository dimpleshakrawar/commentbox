import { Button, Modal, Input } from "antd";
import { FaUserCircle } from "react-icons/fa";
import "../styles/CommentBox.css";

const EditModal = ({
  comment,
  comments,
  setComments,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { commentText, id } = comment;

  const commentEditHandler = (e) => {
    const commentsData = Object.values(comments).filter(
      (comment) => comment.id === id
    );
    if (commentsData) {
      setComments((comments) => ({
        ...comments,
        [id]: {
          ...comments[id],
          commentText: e.target.value,
        },
      }));
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Edit Commnent"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="profileContainer">
          <Button type="text">
            <FaUserCircle size={25} />
          </Button>
          <Input defaultValue={commentText} onChange={commentEditHandler} />
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
