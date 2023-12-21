import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";

const newBlogHandler = jest.fn();

const newBlog = {
  title: "New blog for testing",
  author: "New Author",
  url: "newblog.testing.com",
};

describe("<NewBlogForm />", () => {
  let container;

  beforeEach(() => {
    container = render(<NewBlogForm addNewBlog={newBlogHandler} />).container;
  });

  afterEach(() => {
    newBlogHandler.mockClear();
  });

  test("calls handler with title, url and author", async () => {
    const newBlogForm = container.querySelector(".newBlogForm");

    expect(newBlogForm).not.toBeNull();

    const titleInput = container.querySelector(".newBlogTitleInput");
    const authorInput = container.querySelector(".newBlogAuthorInput");
    const urlInput = container.querySelector(".newBlogUrlInput");

    const user = userEvent.setup();

    await user.type(titleInput, newBlog.title);
    await user.type(authorInput, newBlog.author);
    await user.type(urlInput, newBlog.url);

    const submitButton = container.querySelector(".newBlogSubmitButton");

    await user.click(submitButton);

    expect(newBlogHandler.mock.calls).toHaveLength(1);

    expect(newBlogHandler.mock.calls[0][0]).toEqual(newBlog);
  });
});
