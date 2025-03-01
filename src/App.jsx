import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MenuProvider } from "./context/MenuContext";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import MenuOverview from "./pages/MenuOverview";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./Middleware/ProtectedRoute";

const App = () => {
  return (
    <MenuProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/:restaurantId/menu/overview"
            element={<MenuOverview />}
          />
          <Route path="/:restaurantId/menu" element={<MenuPage />} />
          {/* <Route
            path="/:restaurantId/menu/overview"
            element={
              <ProtectedRoute>
                <MenuOverview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/:restaurantId/menu"
            element={
              <ProtectedRoute>
                <MenuPage />
              </ProtectedRoute>
            }
          /> */}

          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<NotFound />} />
        </Routes>
      </Router>
    </MenuProvider>
  );
};

export default App;
