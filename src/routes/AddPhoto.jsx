import { useState } from "react";
import { json, useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = (e) => {
    e.preventDefault();

    const data = {
      imageUrl: `${imageUrl}`,
      captions: `${captions}`,
      createdAt: "2022-11-25T10:42:19.285Z",
      updatedAt: "2022-11-25T11:15:18.914Z",
      secret: `${secret}`,
    };

    fetch("https://gallery-app-server.vercel.app/photos", {
      method: "POST", // HTTP method
      headers: {
        // HTTP headers
        "Content-Type": "application/json" // type data yang dikirim
      },
      body: JSON.stringify(data), // data yang dikirim
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
         if(json.error){
          setError(json.error);
        }else{
          navigate("/photos");
        }
      })
      .catch(() => {
        setError(json.error);
      });
      };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
