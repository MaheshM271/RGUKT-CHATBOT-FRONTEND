import { Modal } from "antd";
import { ReactNode, useCallback, useState, ReactElement } from "react";
import { ButtonProps } from 'antd/lib';
interface Props {
  component: ReactNode;
  maskClosable?: boolean;
  handleSubmit?: () => void;
  width: string | number;
  saveLabel?: string;
  handleCancel?: () => void;
  okButtonProps?: ButtonProps;
}
export const useModalView = ({
  component,
  handleSubmit,
  width,
  saveLabel = 'Save',
  handleCancel,
  okButtonProps,
  maskClosable,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const a = useCallback(
    (b: boolean) => {
      setShowModal(b);
    },
    [setShowModal],
  );

  const onCancel = useCallback(() => {
    if (handleCancel) {
      handleCancel();
    }
    setShowModal(false);
  }, [handleCancel, setShowModal]);

  let modal: ReactElement | null = null;

  if (showModal) {
    modal = (
      <Modal
        maskClosable={false}
        okText={saveLabel}
        width={width}
        onOk={handleSubmit}
        onCancel={onCancel}
        okButtonProps={okButtonProps}
        open
      >
        {component}
      </Modal>
    );
  }
  return [modal, a] as const;
};

interface NoFooterProps {
  component: ReactNode;
  width?: number;
  top?: number;
  close?: boolean;
}

export const useModalViewNoFooter = ({
  component,
  width,
  top,
  close=false,
}: NoFooterProps) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (visible: boolean) => {
    setShowModal(visible);
  };

  let modal: ReactElement | null = null;
  if (showModal) {
    modal = (
      <Modal
        maskClosable={false}
        width={width}
        onCancel={() => setShowModal(false)}
        open
        closable={!close}
        footer={<div></div>}
        style={{ top: top !== undefined ? top : 'center', overflowX: 'hidden' }}
      >
        {component}
      </Modal>
    );
  }

  return [modal, toggleModal] as const;
};
