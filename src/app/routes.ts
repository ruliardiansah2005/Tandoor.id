import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { PlantHealth } from "./pages/PlantHealth";
import { FarmPlanning } from "./pages/FarmPlanning";
import { StockManagement } from "./pages/StockManagement";
import { Marketplace } from "./pages/Marketplace";
import { Profile } from "./pages/Profile";
import { AdvertiserLanding } from "./pages/AdvertiserLanding";
import { AdvertiserDashboard } from "./pages/AdvertiserDashboard";
import { Supplies } from "./pages/Supplies";
import { SurveyService } from "./pages/SurveyService";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "dashboard", Component: Dashboard },
      { path: "plant-health", Component: PlantHealth },
      { path: "farm-planning", Component: FarmPlanning },
      { path: "stock-management", Component: StockManagement },
      { path: "marketplace", Component: Marketplace },
      { path: "supplies", Component: Supplies },
      { path: "survey", Component: SurveyService },
      { path: "profile", Component: Profile },
      { path: "advertiser", Component: AdvertiserLanding },
      { path: "advertiser-dashboard", Component: AdvertiserDashboard },
    ],
  },
]);