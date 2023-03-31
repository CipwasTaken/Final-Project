import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Homepage";
import GlobalStyle from "./Components/GlobalStyles"



function App() {
  return (
    <BrowserRouter>
    <GlobalStyle />

    <Routes>
      <Route path="/" element={<Home />}  />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
