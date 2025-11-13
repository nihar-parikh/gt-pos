import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './modules/auth/login';
import { Inventory } from './modules/inventory';
import { setConfig } from './utils/initialize-db';

function App() {
  useEffect(() => {
    setConfig();
  }, []);
  // const [isReady, setIsReady] = useState(false);
  // const [isConfigured, setIsConfigured] = useState(
  //   !!localStorage.getItem('dbMode')
  // );

  // useEffect(() => {
  //   if (isConfigured) {
  //     console.log('Initializing DB...');
  //     initDb()
  //       .then(() => {
  //         console.log('DB initialized');
  //         setIsReady(true);
  //       })
  //       .catch((err) => {
  //         console.error('DB init failed', err);
  //       });
  //   }
  // }, [isConfigured]);

  // if (!isConfigured) {
  //   return (
  //     <SetupScreen
  //       onComplete={() => {
  //         setIsConfigured(true);
  //         window.location.reload();
  //       }}
  //     />
  //   );
  // }

  // if (!isReady) return <div>Loading DB...</div>;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  );
}

export default App;
