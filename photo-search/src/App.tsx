import { useState } from "react";
import { Spinner, Row, Col } from "reactstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const UNSPLASH_API_KEY = "mWsRenYflPTH1nxSPpyAHIwJTG1hNEAwcagT2uY9xMQ";
const UNSPLASH_API_URL = "https://api.unsplash.com";

interface Image {
  id: string;
  urls: {
    regular: string;
  };
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  const getPictures = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${UNSPLASH_API_URL}/search/photos?query=${searchValue}&client_id=${UNSPLASH_API_KEY}`
      );
      const imageData = await response.json();
      setImages(imageData.results);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App container">
      <h1 className="mt-4">Liquidise Photo Search</h1>
      <div className="search-container mt-4">
        <Row className="justify-content-center mb-1">
          <Col md="4">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a picture"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
          <Col md="2">
            <button
              className="btn btn-primary btn-block"
              type="button"
              onClick={getPictures}
            >
              Search
            </button>
          </Col>
        </Row>
      </div>
      <div className="image-list mt-4">
        {loading ? (
          <div
            style={{
              display: "block",
              padding: 50,
              textAlign: "center",
            }}
          >
            <Spinner style={{ width: "2rem", height: "2rem" }} />
          </div>
        ) : (
          <div className="image-list mt-4">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="10px">
                {images.map((image) => (
                  <div key={image.id} className="masonry-item">
                    <img src={image.urls.regular} alt="Unsplash" />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
