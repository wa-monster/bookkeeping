import React from 'react'
import YangHeader from './components/YangHeader'
import NoticePage from './components/NoticePage'
import './App.scss'
 
function App() {
  return (
    <div className="App">
      <YangHeader></YangHeader>
      <div className="main-content">
        <div className="bg-top"></div>
        <NoticePage className="notice-page"></NoticePage>
      </div>
    </div>
  );
}

export default App;
