import React, { useState } from "react";
import { Modal, Input, List, Button, Spin, message } from "antd";
import { useMember, useAddMember } from "../../hooks/useGroups";
import { Link } from "react-router-dom";

function GroupPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [member, setMember] = useState("");
  const { members, isLoadingMember, isErrorMember } = useMember(member);
  const { mutate: addMemberMutate } = useAddMember();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMember("");
  };

  const handleSelectMember = (selectedMember) => {
    Modal.confirm({
      title: "Confirm Member Addition",
      content: `Do you want to add ${selectedMember.name} (@${selectedMember.username}) to the group?`,
      onOk: () => {
        return new Promise((resolve, reject) => {
          addMemberMutate(
            { groupId: "some-group-id", memberId: selectedMember._id },
            {
              onSuccess: () => {
                message.success(`${selectedMember.name} was added successfully!`);
                setIsModalOpen(false);
                setMember("");
                resolve();
              },
              onError: (error) => {
                message.error(`Error adding member: ${error.response?.data?.message || error.message}`);
                reject();
              },
            }
          );
        });
      },
      okText: "Yes",
      cancelText: "No",
    });
  };

  return (
    <div className="user-search-page" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <button onClick={showModal} className="open-modal-btn" style={{ backgroundColor: "#007bff", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
        Add Member
      </button>
    
        <Link to="/" style={{ backgroundColor: "#33c2ff", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", textDecoration: "none", marginLeft: "20px" }}>
          Home
        </Link>
  

      <Modal
        className="custom-modal"
        title="Add New Member"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel} className="cancel-btn">
            Cancel
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter member name"
          value={member}
          onChange={(e) => setMember(e.target.value)}
          className="member-input"
        />
        <List
          bordered
          dataSource={members}
          loading={isLoadingMember}
          renderItem={(item) => (
            <List.Item
              onClick={() => handleSelectMember(item)}
              style={{ cursor: "pointer" }}
              className="member-item"
            >
              {item.username}
            </List.Item>
          )}
          style={{ marginTop: "10px", maxHeight: "300px", overflowY: "auto", scrollbarWidth: "none" }}
        />
        {isErrorMember && <p style={{ color: "red" }}>Error loading members</p>}
      </Modal>
    </div>
  );
}

export default GroupPage;
