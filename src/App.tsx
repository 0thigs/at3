import { useState } from "react";
import { Layout } from "./components/Layout";
import { ClientsPage } from "./pages/ClientsPage";
import { ServicesPage } from "./pages/ServicesPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"clients" | "services">(
    "clients"
  );

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === "clients" ? <ClientsPage /> : <ServicesPage />}
    </Layout>
  );
}

export default App;
