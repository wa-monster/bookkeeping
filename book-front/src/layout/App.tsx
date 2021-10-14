import React from 'react';
import YangHeader from './components/YangHeader'
import NoticePage from './components/NoticePage'

function App() {
  return (
    <div className="App">
      <YangHeader></YangHeader>
      <div className="bg-top"></div>
      <div className="bg-bottom"></div>
      <NoticePage></NoticePage>
    </div>
  );
}

export default App;
