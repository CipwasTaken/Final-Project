import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Homepage";
import GlobalStyle from "./Components/GlobalStyles"
import NavigationBar from "./Components/NavBar";
import BlogPage from "./Components/BlogPage";
import BlogPostPage from "./Components/Post";




function App() {
  return (
    <BrowserRouter>
    <GlobalStyle />

    <NavigationBar />

    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
