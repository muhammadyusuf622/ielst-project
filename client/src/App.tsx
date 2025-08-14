import { Route, Routes } from "react-router";
import { AccessPage, AdminPanel, HomePage, LoginPage, NotFoundPage, QuestionsPage } from "./pages";

function App() {

  return (
    <Routes>
      <Route index element={< AccessPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={< HomePage />} />
      <Route path="admin-panel" element={< AdminPanel />}/>
      <Route path="/question/:id" element={<QuestionsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
