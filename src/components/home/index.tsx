// import { Sidebar } from '../sidebar';
// import { Layout } from 'antd';
import { ContentLayout } from './styles';
// import { AuthorizedRoutes } from '../routes';
// import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import { loadStores } from 'stores/utils';
import { Toast } from 'components/common/toastMessage';
import { Slider } from 'components/slider';

export const Home = () => {

  // const loadData = async () => {
  //   await loadStores();
  // }

  // useEffect(() => {
  //   loadData()
  // }, [])

  return (
    <ContentLayout>
      <Toast />
      <Slider />
    </ContentLayout>
  );
};
