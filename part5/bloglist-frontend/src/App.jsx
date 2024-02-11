import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [update, setUpdate] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          errorMessage={errorMessage}
        />
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedNoteappUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage('logout did not work')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }


  const blogForm = () => (
    <BlogForm blogs={blogs}
      setBlogs={setBlogs}
      setUpdate={setUpdate}
      setErrorMessage={setErrorMessage}
      user={user}
    />
  )

  if (user === null) {
    return (
      <div>
        {errorMessage && <div id='error'>{errorMessage}</div>}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      {errorMessage && <div id='error'>{errorMessage}</div>}
      <h2>blogs</h2>
      <p>{user.username} logged in
        <button onClick={handleLogout}> logout</button>
      </p>
      {blogForm()}
    </div>
  )
}

export default App