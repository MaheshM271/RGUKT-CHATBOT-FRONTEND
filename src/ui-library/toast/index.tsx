import { useEffect } from 'react';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { notification } from 'antd';

interface Props {
  type: NotificationType;
  onClose: () => void;
  message: string;
  duration?: number;
}
type NotificationType = 'success' | 'error' | 'info';

export const Toast = ({ type, onClose, message, duration }: Props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    placement: NotificationPlacement = 'top',
    duration: number = 1
  ) => {
    api[type]({
      message,
      duration: 1,
      placement,
      className: `notification ${type}-notification`,
      onClose,
    });
  };

  useEffect(() => {
    if (message) {
      openNotificationWithIcon(type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  return <div>{contextHolder}</div>;
};
