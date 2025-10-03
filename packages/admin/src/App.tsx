import React from 'react';

const App = () => {
  console.log('App rendering...');
  
  // Test if React Admin imports work
  try {
    const ReactAdmin = require('react-admin');
    console.log('React Admin imported successfully:', Object.keys(ReactAdmin));
    
    const { Admin, Resource, ListGuesser } = ReactAdmin;
    const jsonServerProvider = require('ra-data-json-server').default;
    
    console.log('Creating dataProvider...');
    const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
    console.log('DataProvider created:', dataProvider);
    
    console.log('Rendering Admin component...');
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <h1 style={{ padding: '20px', margin: 0, background: '#1976d2', color: 'white' }}>
          React Admin Test
        </h1>
        <Admin 
          dataProvider={dataProvider}
          title="Test Admin"
        >
          <Resource name="users" list={ListGuesser} />
          <Resource name="posts" list={ListGuesser} />
        </Admin>
      </div>
    );
  } catch (error: any) {
    console.error('Error in App:', error);
    return (
      <div style={{ padding: '20px', background: '#ffebee', minHeight: '100vh' }}>
        <h1 style={{ color: '#d32f2f' }}>Error Loading React Admin</h1>
        <p><strong>Error:</strong> {error?.message || 'Unknown error'}</p>
        <p><strong>Stack:</strong></p>
        <pre style={{ background: '#fff', padding: '10px', overflow: 'auto' }}>
          {error?.stack || 'No stack trace available'}
        </pre>
      </div>
    );
  }
};

export default App;

