import { Toast as UIToast } from 'ui-library/toast';
import { observer } from 'mobx-react';
import useStores from 'stores/useStores';

export const Toast = observer(() => {
  const { messagesStore } = useStores();

  const handleToastClose = () => {
    messagesStore.clear();
  };

  return messagesStore.type ? (
    <UIToast
      message={messagesStore.infoString}
      type={messagesStore.type}
      onClose={handleToastClose}
    />
  ) : null;
});
