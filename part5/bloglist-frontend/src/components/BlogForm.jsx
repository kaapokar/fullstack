import Blog from './Blog'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useState, useEffect, useRef } from 'react'

const BlogForm = ({ blogs, setBlogs, setUpdate, setErrorMessage, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const noteFormRef = useRef()

  const addBlog = async (event) => {
    noteFormRef.current.toggleVisibility()
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setUpdate(true)
      setErrorMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('adding a blog did not happen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <div className='formDiv'>
      <Togglable buttonLabel="new Blog" ref={noteFormRef}>
        <div>
          <h2>Create a new blog</h2>
          <form onSubmit={addBlog}>
            <div>
                            title:
              <input
                id='title'
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                placeholder='write title here'
              />
            </div>
            <div>
                            author:
              <input
                id='author'
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
                placeholder='write author here'
              />
            </div>
            <div>
                            url:
              <input
                id='url'
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
                placeholder='write url here'
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      </Togglable>
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} setUpdate={setUpdate} user={user} />
        ))}
    </div>
  )
}

export default BlogForm