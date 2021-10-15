import React from 'react'
import YangHeader from './components/YangHeader'
import NoticePage from './components/NoticePage'
import './App.css'

function App() {
  return (
    <div className="App">
      <YangHeader></YangHeader>
      <div className="main-content">
        <div className="bg-top"></div>
        {/* <div className="notice-page">

        </div> */}
        <NoticePage className="notice-page"></NoticePage>
      </div>

    </div>
  );
}

export default App;
