import './App.css';
import { Home } from './pages/Home/Home';
import { Board } from './pages/Board/Board';
import { CardModalId } from './pages/Board/components/CardModal/CardModalId';
import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ToastContainer } from 'react-toastify';


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
      <ToastContainer position="top-center" autoClose={5000} rtl={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:board_id" element={<Board />} />
        <Route path="/board/:board_id/card/:card_id" element={<CardModalId />}/>
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
