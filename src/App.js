import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import MainPage from "./pages/MainPage"
import GamePage from "./pages/GamePage";
import RoomPage from "./pages/RoomPage";
import WaitPage from "./pages/WaitPage";
import socket from "./servers/Socket";

function App() {

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/game" element={<GamePage/>}/>
          <Route path="/search" element={<RoomPage/>}/>
          <Route path="/room" element={<WaitPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
