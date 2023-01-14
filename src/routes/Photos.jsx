import { axios } from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const deletePhoto = (id) => {
  //   fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
  //     method: "DELETE",
  //   }).then(() => setPhotos(photos.filter(photo => {
  //     console.log(`${photo.id} - ${id}`)
  //     return photo.id !== id;
  //   })))
  // };

  const deletePhoto = (id) => {
    fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
      method: "DELETE",
    })
    .then(() => setPhotos(photos.filter(photo => photo.id !== id
    )))
  };

  useEffect(() => {
    setLoading(true);
    
    fetch(`https://gallery-app-server.vercel.app/photos?_sort=id&_order=${sort}&q=${search}`)
      .then((res) => res.json())
      .then((data) => {
      setPhotos(data);
      setLoading(false);
      })
      .catch((error) => setError(error))
    

  }, [sort, submited]);

  useEffect(() => {
    setLoading(true);

    fetch("https://gallery-app-server.vercel.app/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => setError(error))
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc" className='text-8xl'>Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{padding: "10px"}}
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <div key={photo.id}>
                  <h1>{photo.id}</h1>
                  <Card photo={photo} deletePhoto={deletePhoto} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
