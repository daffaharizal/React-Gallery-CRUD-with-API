import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
      method: "PATCH",
      headers: {
        // HTTP headers
        "Content-Type": "application/json" // type data yang dikirim
      },
      body: JSON.stringify({
        imageUrl: imageUrl,
        captions: captions,
        createdAt: "2022-11-25T10:25:50.394Z",
        updatedAt: "2022-11-28T04:31:16.956Z",
      })
    })
      .then( () => {
        console.log("selesai");
        navigate("/photos")
      })
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://gallery-app-server.vercel.app/photos/${id}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setImageUrl(json.imageUrl);
        setCaptions(json.captions);
        setLoading(false);
      })

  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
