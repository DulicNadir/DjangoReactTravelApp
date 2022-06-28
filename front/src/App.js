import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Profil from './components/Profil';
import Agencije from './components/Agencije';
import Agencija from './components/Agencija';
import Student from './components/Student';
import NotFound from './components/NotFound';
import Putovanja from './components/Putovanja';
import Putovanje from './components/Putovanje';
import UserPutovanja from './components/UserPutovanja';
import Home from './components/Home';
import BasicMenu from './components/DropdownMenu';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './themes';
import CustomizedSwitches from './components/Switch';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;
function App() {
  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <CustomizedSwitches themeToggler={themeToggler} />
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/profil' element={<Profil />} />
            <Route exact path='/agencije' element={<Agencije />} />
            <Route exact path='/agencija' element={<Agencija />} />
            <Route exact path='/student' element={<Student />} />
            <Route exact path='/putovanja' element={<Putovanja />} />
            <Route exact path='/putovanje' element={<Putovanje />} />
            <Route exact path='/mojaputovanja' element={<UserPutovanja />} />
            <Route exact path='/dropdown' element={<BasicMenu />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
