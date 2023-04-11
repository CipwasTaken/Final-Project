import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Homepage";
import GlobalStyle from "./Components/GlobalStyles"
import NavigationBar from "./Components/NavBar";
import BlogPage from "./Components/BlogPage";
import BlogPostPage from "./Components/Post";
import AdminPage from "./Components/AdminPage";
import { useContext } from "react";
import { UserContext } from "./Components/UserContext";




function App() {
  const {isAdmin} = useContext(UserContext)
  return (
    <BrowserRouter>
    <GlobalStyle />

    <NavigationBar />

    <Routes>
      <Route path="/" element={<Home />}  />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      {isAdmin ? (
          <Route path="/admin" element={<AdminPage />} />
        ) : (
          <Route path="/admin" element={<Home />} />
        )} 
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
