import Router from './Components/Router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
    <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'white',
            color: '#444',
            border: '2px solid #FFC382',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          },
        }}
      />
     <Router></Router>
    </>
  )
}

export default App
