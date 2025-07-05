import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import { stores } from './stores';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={
          {
            components: {
              Button: {
                colorPrimary: "#143D59",
                colorPrimaryHover: "#143D59",
              },
              Tabs: {
                colorPrimary: "#143D59",
                cardBg: '#C8D0D6',
                itemHoverColor: "#143D59",
                itemSelectedColor: "#143D59",
                itemColor: "#7A7A7A",
                cardGutter: 4,
                inkBarColor: 'none',
                titleFontSize: 20,
                horizontalItemGutter: 0,
              },
              Segmented: {
                itemColor: 'black',
                itemHoverColor: '#143D59',
                itemSelectedColor: 'white',
                colorText: 'white',
                itemSelectedBg: '#143D59',
                colorBgLayout: '#C8D0D6',
              }
            }
          }
        }
      >
        <Provider {...stores}>
          <App />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
