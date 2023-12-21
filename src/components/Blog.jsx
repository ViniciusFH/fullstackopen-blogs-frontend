import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleShowFullInfo = () => {
    setShowFullInfo(!showFullInfo);
  };

  return showFullInfo ? (
    <table style={blogStyle} className="blog">
      <tbody>
        <tr>
          <td className="blogTitleAuthor">
            {blog.title} {blog.author}{" "}
            <button onClick={() => toggleShowFullInfo()}>hide</button>
          </td>
        </tr>
        <tr>
          <td className="blogUrl">{blog.url}</td>
        </tr>
        <tr>
          <td className="blogLikes">
            likes {blog.likes}{" "}
            <button className="blogLikeButton" onClick={() => handleLike(blog)}>like</button>
          </td>
        </tr>
        <tr>
          <td>{blog.user.name}</td>
        </tr>
        {username === blog.user.username ? (<tr>
          <td>
            <button className="blogRemoveButton" onClick={() => handleDelete(blog)}>remove</button>
          </td>
        </tr>) : <></>}
      </tbody>
    </table>
  ) : (
    <table style={blogStyle} className="blog">
      <tbody>
        <tr>
          <td className="blogTitleAuthor">
            {blog.title} {blog.author}{" "}
            <button
              className="blogViewButton"
              onClick={() => toggleShowFullInfo()}
            >
              view
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Blog;
