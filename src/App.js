import { useState,useEffect } from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navigation from "./Components/Navigation";
import {SearchPage, SearchPageRedirect} from "./Components/SeachPage";
import Home from "./Components/Home";
import PostPage from "./Components/PostPage";
import Explore from "./Components/Explore";

function App() {
  const [likeDb, setLikeDb] = useState([]);
  useEffect(() => {
    const likeDb = localStorage.getItem("likeDb");
    if (likeDb) {
      setLikeDb(JSON.parse(likeDb));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("likeDb", JSON.stringify(likeDb));
  }, [likeDb]);
  
  return (<>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/s/:searchKey" element={<SearchPageRedirect />} />
        <Route path="/s/:searchKey/:pageNo" element={<SearchPage likeDb={likeDb} setLikeDb={setLikeDb} />} />
        <Route path="/p/:postId" element={<PostPage likeDb={likeDb} setLikeDb={setLikeDb}  />} />
        <Route path="/explore" element={<Explore likeDb={likeDb} setLikeDb={setLikeDb} />} />
        {/* <Route exact path="/" component={SignIn} /> */}
        <Route path="*" element={
          <Navigate replace to="/" />
        }/>
      </Routes>
  </>);
}

export default App;
