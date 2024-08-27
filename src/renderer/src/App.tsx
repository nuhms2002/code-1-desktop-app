import React, { useEffect } from 'react';
//import { ipcRenderer } from 'electron';
import DataTable from './components/DataTable';

function App(): JSX.Element {
  const { ipcRenderer } = window.electron;

  useEffect(() => {
    async function getAppPath() {
      const appPath = await ipcRenderer.invoke('get-app-path');
      console.log('App Path:', appPath);
    }

    getAppPath();
  }, []);

  return (
    <>
      <h1>Code1Database</h1>
      <div className="table-container">
        <DataTable />
      </div>
    </>
  );
}

export default App;