import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import Blog from "./Blog";

const mockHandler = jest.fn();
const likeHandler = jest.fn();

describe("<Blog />", () => {
  let container;

  const blog = {
    id: "654cf16b7570e6431abb6232",
    title: "Component testing is done with react-testing-library",
    url: "component.testing.com",
    author: "MySelf",
    likes: 10,
    user: {
      name: "TestUser",
    },
  };

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        handleBlogToggle={mockHandler}
        handleDelete={mockHandler}
        handleLike={likeHandler}
        key={blog.id}
      />
    ).container;
  });

  afterEach(() => {
    mockHandler.mockClear();
    likeHandler.mockClear();
  });

  test("displays only blog's title and author by default", () => {
    const blogTable = container.querySelector(".blog");

    expect(blogTable).not.toBeNull();

    const titleAuthor = container.querySelector(".blogTitleAuthor");
    const url = container.querySelector(".blogUrl");

    expect(titleAuthor).not.toBeNull();
    expect(url).toBeNull();
  });

  test("displays blog's url and likes when toggled", async () => {
    let url = container.querySelector(".blogUrl");
    let likes = container.querySelector(".blogLikes");

    expect(url).toBeNull();
    expect(likes).toBeNull();

    const user = userEvent.setup();
    const viewButton = container.querySelector(".blogViewButton");

    await user.click(viewButton);

    url = container.querySelector(".blogUrl");
    likes = container.querySelector(".blogLikes");

    expect(url).not.toBeNull();
    expect(likes).not.toBeNull();
  });

  test("like button is handled", async () => {
    const viewButton = container.querySelector(".blogViewButton");
    const user = userEvent.setup();

    await user.click(viewButton);

    const likeButton = container.querySelector(".blogLikeButton");

    expect(likeButton).not.toBeNull();

    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
