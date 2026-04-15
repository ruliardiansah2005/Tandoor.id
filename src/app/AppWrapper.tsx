import { AuthProvider } from "./contexts/AuthContext";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export function AppWrapper() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}