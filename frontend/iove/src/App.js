import './App.css'
import './login.css'
import Footer from './components/Footer';
import Header from './components/Header';
import Swipe from './components/Swipe';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Messages from './components/messages/Messages';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Profile from './components/profile/Profile';
import Login from './components/Login';
import Register from './components/Register';
import React from 'react';
import { generatePayload, getCookie } from './cookieUtils';
import WebSocketDemo from './components/messages/test';
import { useMediaQuery } from 'react-responsive'


function App() {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const location = useLocation()

  const viewportInfo = {
    portrait:isPortrait
  }

  const [loggedIn, setLoggedIn] = React.useState(sessionStorage.getItem("loggedIn") === 'true')
  const [basicUserInfo, setBasicUserInfo] = React.useState(
    sessionStorage.getItem("basicUserInfo") ? JSON.parse(sessionStorage.getItem("basicUserInfo")) : {id:null}
  )
  const [showChat, setShowChat] = React.useState(false)
  
  React.useEffect(() => {
    fetch('http://localhost:8000/api/',
    {
      credentials: 'include',
        method: 'GET',
        mode: 'cors',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
    })
  },[])

  React.useEffect(()=>{
    if (loggedIn) {
      fetch('http://localhost:8000/api/basic-info', generatePayload(getCookie('csrfcookie'))).then(response => {
        return response.json()
      }).then(info => {
        sessionStorage.setItem("basicUserInfo", JSON.stringify(info))
        setBasicUserInfo(info)
      })
    }
  },
  [loggedIn]
  )

  return (
    <div id='app'>
      <Routes location={location} key={location.pathname}>
        <Route path='/login' element={<Login viewport={viewportInfo} setLoggedIn={setLoggedIn}/>}/>
        {/* <Route path='/register'/> */}
      </Routes>
      {(location.pathname !== '/login' && location.pathname !== '/register') && <Header/>}
      <SwitchTransition>
        <CSSTransition key={location.key} classNames='route' timeout={300}>
          <Routes location={location} key={location.pathname}>
            <Route path='/register' element={<Register viewport={viewportInfo}/>}/>
            <Route path='/' element={
              loggedIn ? 
              <Swipe viewport={viewportInfo}/> 
              : <Navigate to='/login'/>
            }/>
            <Route path='/test' element={
              loggedIn ? 
              <WebSocketDemo viewport={viewportInfo}/> 
              : <Navigate to='/login'/>
            }/>
            <Route path='/messages' element={
              loggedIn ? 
              <Messages 
                viewport={viewportInfo} 
                userInfo={basicUserInfo}
                showChat={showChat}
                setShowChat={setShowChat}
              /> 
              : <Navigate to='/login'/>
            }/>
            <Route path='/profile' element={
              loggedIn ? 
              <Profile viewport={viewportInfo} id={basicUserInfo.id}/> 
              : <Navigate to='/login'/>
            }/>
          </Routes>
        </CSSTransition>
        </SwitchTransition>
      {/* <Swipe/> */}
      {(location.pathname !== '/login' && location.pathname !== '/register') && <Footer/>}
    </div>
  );

}

export default App;
