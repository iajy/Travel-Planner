import { Route, Routes } from "react-router-dom";
import Switzerland from "./Components/Switzerland";
import FlightSearch from "./Components/Ticket";
import India from "./Components/India";
import London from "./Components/London";
import Hero from "./Components/Hero";
import MyItineary from "./Components/MyItineary";
import Admin from "./Components/Admin";
import OAuth2SuccessPage from "./Components/OAuth2SuccessPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />}></Route>
        <Route path="/oauth2-success" element={<OAuth2SuccessPage />} />

        <Route path="/london" element={<London></London>}></Route>
        {/* <Route path="/peru" element={<Peru></Peru>}></Route> */}
        <Route path="/india" element={<India></India>}></Route>
        {/* <Route path="/niagara" element={<Niagara></Niagara>}></Route> */}
        {/* <Route path="/brazil" element={<Brazil></Brazil>}></Route> */}
        <Route path="/myitineary" element={<MyItineary></MyItineary>}></Route>
        <Route path="/admin" element={<Admin />}></Route>

        <Route
          path="/switzerland"
          element={<Switzerland></Switzerland>}
        ></Route>
        <Route path="/ticket" element={<FlightSearch />}></Route>
      </Routes>
    </>
  );
}

export default App;
