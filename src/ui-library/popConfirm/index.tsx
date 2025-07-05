import React from 'react';
import { Popconfirm } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { LabelDesign } from './styles';

interface ConfirmProps {
  title: string;
  description: string;
  onConfirm: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  okText?: string;
  cancelText?: string;
  fontSize?: number;
  text?: boolean
  disabled?: boolean
}

export const Confirm = ({
  title,
  description,
  onConfirm,
  onCancel,
  okText = "Yes",
  cancelText = "No",
  fontSize = 16,
  text,
  disabled,
}: ConfirmProps) => {
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={(event) => onConfirm(event as React.MouseEvent<HTMLElement, MouseEvent>)}
      onCancel={(e) => e?.stopPropagation() || onCancel?.(e)}
      onPopupClick={(e) => e.stopPropagation()}
      okText={okText}
      cancelText={cancelText}
    >
      {text ? (
        <LabelDesign>Paste</LabelDesign>
      ) : (
        <FontAwesomeIcon
          color={disabled ? 'rgba(0, 0, 0, 0.25)' : 'black'}
          className={disabled ? 'cursorNotAllowed' : 'curosr'}
          onClick={(e) => e.stopPropagation()}
          icon={faTrash}
          fontSize={fontSize}
        />
      )}

    </Popconfirm>
  );
};

export default Confirm;
