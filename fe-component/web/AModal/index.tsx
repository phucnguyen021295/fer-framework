import React, { memo } from "react";
import { Modal, ModalProps } from "antd";

/**
 * Component Modal base với khả năng tự động xử lý scroll khi nội dung quá dài
 */
const AModal: React.FC<ModalProps> = ({ children, ...restProps }) => {
  return (
    <Modal
      bodyStyle={{
        maxHeight: "calc(100vh - 96px)", // Chiều cao tối đa = chiều cao màn hình - 200px
        overflow: "auto", // Tự động scroll khi nội dung vượt quá
      }}
      {...restProps}
    >
      {children}
    </Modal>
  );
};

export default memo(AModal);
