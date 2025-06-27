import { useEffect } from 'react';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import { initializeAuthStore } from './states/auth';

function App() {

  useEffect(()=>{
    initializeAuthStore();
  }, [])

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
