import React, { useEffect,useState } from 'react'
import YangHeader from './components/YangHeader'
import NoticePage from './components/NoticePage'
import './App.scss'
import myContext from 'src/utils/context'

function App() {
  const [List,setList] = useState({})
  useEffect(()=>{
    window.getData.getAllByYear();
    window.getDataSuccess= (res:allObjArr)=>{
      setList(res)
    }
  },[])
  return (
    <div className="App">
      <myContext.Provider value={{ List }}>
        <YangHeader></YangHeader>
        <div className="main-content">
          <div className="bg-top"></div>
          <NoticePage className="notice-page"></NoticePage>
        </div>
      </myContext.Provider>
    </div>
  );
}

export default App;
