import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import EditPhoto from "./routes/EditPhoto";
import Home from "./routes/Home";
import Photos from "./routes/Photos";
import AddPhoto from "./routes/AddPhoto";
import NotFound from "./routes/NotFound";
import "./index.css";

const App = () => {
   return (
      <div>
         <div className="navbar text-cyan-500">
            <div className="studentInfo"></div>
            <Link to="/">Home</Link>
            <Link to="/photos">My Photos</Link>
            <Link to="/add">Add Photo</Link>
         </div>

         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photos">
               <Route index element={<Photos />} />
               <Route path=":id" element={<EditPhoto />} />
            </Route>
            <Route path="/add" element={<AddPhoto />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </div>
   );
};

export default App;
