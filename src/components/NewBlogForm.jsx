import { useState } from "react";
import PropTypes from "prop-types";

const NewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await addNewBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form className="newBlogForm" onSubmit={handleSubmit}>
        <div>
          title:
          <input
            className="newBlogTitleInput"
            value={title}
            required={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:
          <input
            className="newBlogAuthorInput"
            value={author}
            required={true}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            className="newBlogUrlInput"
            value={url}
            required={true}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <button className="newBlogSubmitButton" type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
