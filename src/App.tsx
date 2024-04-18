import './App.css';
import { Home } from './pages/Home/Home';
import { Board } from './pages/Board/Board';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/board/:board_id',
    element: <Board />,
  },
]);

function App() : JSX.Element{
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
