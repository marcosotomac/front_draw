import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import { routes } from "@/config/routes";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function AppRoutes() {
  const element = useRoutes(routes);

  return element;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-background flex flex-col">
          <AppRoutes />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
