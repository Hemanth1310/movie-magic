import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./views/Home";
import Header from "./components/ui/Header";
import ProtecterRoutes from "./middleware/auth/ProtecterRoutes";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <div className="min-h-screen bg-gray-50">
        <BrowserRouter>
          <div className="w-screen min-h-screen flex flex-col items-center mt-20">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtecterRoutes/>}>
                
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
