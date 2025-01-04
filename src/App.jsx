import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <MenuProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </MenuProvider>
  );
};

export default App;
