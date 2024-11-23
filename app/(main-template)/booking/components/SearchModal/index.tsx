import React, { useState } from "react";
import { Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FormSearchBooking from "../FormSearchBooking";
import { createStyles } from "antd-style";
import { useSelector } from "@/fer-framework/fe-base/reducers";
import { appSelector } from "@/fer-framework/fe-core/reducers/app";

const SearchModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { styles } = useStyles();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const isMobile = useSelector(appSelector.getIsMobile)

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="text"
        shape="circle"
        icon={<SearchOutlined style={{ color: "#ED1C24" }} />}
      />
      <Modal
        title="Tìm kiếm chuyến bay"
        open={open}
        onOk={handleOk}
        width={1200}
        style={{ top: isMobile ? 0 : 120 }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        className={styles.modal}
      >
        <FormSearchBooking isModal={true} />
      </Modal>
    </>
  );
};

export default SearchModal;

const useStyles = createStyles(({ token, css }) => ({
    modal: css`
    `,
  }));
