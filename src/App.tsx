import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { MovieDetail } from "@/pages/MovieDetail";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/movie-show/" element={<Home />} />
                <Route path="/movie-show/movie/:movieId" element={<MovieDetail />} />
            </Routes>
        </Router>
    )
}

export default App