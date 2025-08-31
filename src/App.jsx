import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import MenuOverview from "./pages/MenuOverview";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./Middleware/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:restaurantId/:tableNumberId/menu/overview"
            element={
              <ProtectedRoute>
                <MenuOverview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/:restaurantId/:tableNumberId/menu"
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MenuProvider>
    </Router>
  );
};

export default App;
