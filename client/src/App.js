import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPhoto, Registration, AddPhoto, Login } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          < Route path="/photos/:id" element={<FullPhoto />} />
          <Route path="/add-photo" element={<AddPhoto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>     
      </Container>
    </>
  );
}

export default App;