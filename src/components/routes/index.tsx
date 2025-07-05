import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Chat } from '../chat';


export const Path = {
  CHATBOT: "/chat",
  CHAT: "/chat/:chat_id"
}

export const AuthorizedRoutes = () => {

  const routes = [
    {
      path: Path.CHATBOT,
      element: <Chat />
    },
    {
      path: Path.CHAT,
      element: <Chat />
    },
  ]

  return (
    <Suspense
      fallback={
        <Skeleton>
          <h1>This is loading screen</h1>
        </Skeleton>
      }
    >
      <Routes>
        {
          routes.map((route) =>
            <Route path={route.path} element={route.element} />
          )
        }
        <Route path="*" element={<Navigate to={Path.CHATBOT} />} />
      </Routes>
    </Suspense>
  )
}