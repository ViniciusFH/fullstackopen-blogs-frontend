import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAll = async () => {
  const { data } = await axios.get(baseUrl, {
    headers: { Authorization: token },
  })

  return data
}

export const createNew = async (newBlog) => {
  const { data } = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
  })

  return data
}

export const addLike = async (blog) => {
  blog.likes++
  delete blog.user

  const { data } = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: token },
  })

  return data
}

export const deleteOne = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
}
