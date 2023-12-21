import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import * as blogService from "./services/blogs";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [successNotification, setSuccessNotification] = useState(true);
  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((data) => setSortedBlogs(data));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const showNotification = (message, success) => {
    setNotificationMessage(message);
    setSuccessNotification(success);

    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const handleLogout = (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
  };

  const addNewBlog = async (newBlog) => {
    try {
      newBlog = await blogService.createNew(newBlog);

      setBlogs(blogs.concat(newBlog));
      blogFormRef.current.toggleVisibility();

      showNotification(
        `A new blog ${newBlog.title} by ${newBlog.author} added`,
        true
      );
    } catch (error) {
      showNotification("An error ocurred", false);
    }
  };

  const handleLike = async (blog) => {
    const updatedBlog = await blogService.addLike(blog);
    const updatedBlogs = [...blogs];

    updatedBlogs.forEach((blog, i) => {
      if (blog.id === updatedBlog.id) {
        updatedBlogs[i] = updatedBlog;
      }
    });

    setSortedBlogs(updatedBlogs);
  };

  const setSortedBlogs = (blogsToSort) => {
    blogsToSort.sort((a, b) => b.likes - a.likes);
    setBlogs(blogsToSort);
  };

  const handleDelete = async (blog) => {
    confirm(`Remove blog ${blog.title} by ${blog.author}`);

    try {
      await blogService.deleteOne(blog.id);
      removeBlog(blog.id);
      showNotification(`Removed blog ${blog.title} by ${blog.author}`, true);
    } catch (error) {
      showNotification(`Failed removing blog ${blog.title}`, false);
    }
  };

  const removeBlog = (id) => {
    const updatedBlogs = blogs.filter((b) => b.id !== id);
    setBlogs(updatedBlogs);
  };

  return (
    <div>
      <Notification
        message={notificationMessage}
        success={successNotification}
      />
      {user === null ? (
        <LoginForm setUser={setUser} showNotification={showNotification} />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable
            buttonLabel="new blog"
            exitLabel="cancel"
            ref={blogFormRef}
          >
            <NewBlogForm
              addNewBlog={addNewBlog}
              showNotification={showNotification}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              username={user.username}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
