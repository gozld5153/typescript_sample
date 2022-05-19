import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { light } from "./theme";

import Login from "./pages/oauth/Login";
import Error from "./pages/Error";
import Kakao from "./pages/oauth/Kakao";
function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={light}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Login />} />
            {/* {persist.kakao.user_info !== null ? ( */}
            {/* <Route path="/main/*" element={<Main />} /> */}
            {/* ) : null} */}
            <Route path="/kakao" element={<Kakao />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
