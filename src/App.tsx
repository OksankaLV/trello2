import './App.css';
import { Home } from './pages/Home/Home';
import { Board } from './pages/Board/Board';
import { HashRouter, Route, Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { CardModal } from './pages/Board/components/CardModal/CardModal';

/*const router = createBrowserRouter([
  {
    path: '/trello2/',
    element: <Home />,
  },
  {
    path: '/trello2/board/:board_id',
    element: <Board />,
  },
]);*/

function App() : JSX.Element{
  return (<>
    <HashRouter>
<Routes>
    <Route path="/" element={<Home />} />
        <Route path="/board/:board_id" element={<Board />} />
        <Route path="/board/:board_id/card/:card_id" element={<Board/>} />
</Routes>
</HashRouter>
</>
    /*<div>
      <ToastContainer position="top-center" autoClose={5000} rtl={false} />
      <RouterProvider router={router} />
    </div>*/
  );
}

export default App;
