import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Homepage";
import GlobalStyle from "./Components/GlobalStyles"
import NavigationBar from "./Components/NavBar";


function App() {
  return (
    <BrowserRouter>
    <GlobalStyle />

    <NavigationBar />
    
    <Routes>
      <Route path="/" element={<Home />}  />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
