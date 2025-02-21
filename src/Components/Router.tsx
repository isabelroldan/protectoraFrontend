import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';

function Router() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default Router
