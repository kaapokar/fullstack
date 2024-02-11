import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [formVisible, setFormVisible] = useState(false)

  const likeBlog = async () => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/blogs/${blog.id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      })

      if (response.ok) {
        setLikes(likes + 1)
      } else {
        console.error('Liking failed')
      }
    } catch (error) {
      console.error('Error', error)
    }
  }

  const remove = async event => {
    event.preventDefault()
    if (blog.user.id === user.id && window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.setToken(user.token)
        await blogService.remove(blog.id, user.token)
      } catch (error) {
        console.error('Error deleting', error)
      }
    }
  }

  return (
    <div className="blog">
      {blog.title}
      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'hide' : 'view'}
      </button>
      {formVisible && (
        <div>
          {blog.url}
          <div className="like">
            likes {likes}{' '}
            <button id='likeButton' onClick={likeBlog}>like</button>
          </div>
          {blog.user.name}
          <div>
          {blog.user.username === user.username && (
              <button id='deleteButton' onClick={remove}>remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
