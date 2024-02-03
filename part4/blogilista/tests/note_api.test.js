const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog');
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const initialBlogs = [
  {
    "title": "Kua",
    "author": "kser",
    "url": "www.kaserblog.fi",
    "likes": 5
  },
]

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs)
  await blogObject.save()
})

test('GET /api/blogs returns the correct number of blogs in JSON format', async () => {
  const response = await api.get('/api/blogs')
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(initialBlogs.length)
})


test('GET /api/blogs returns blogs with id is id not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined
})

test('GET /api/blogs returns blogs with undefined _id ', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]._id).toBe(undefined)
})

test('POST /api/blogs adds blog to the list ', async () => {
  const response = await api.post('/api/blogs').send(initialBlogs)
  expect(response.status).toBe(201)
  const blogsAfterPost = await Blog.find({});
  expect(blogsAfterPost).toHaveLength(2);
  const addedBlog = blogsAfterPost[0];
  expect(addedBlog.title).toBe(initialBlogs.title);
  expect(addedBlog.author).toBe(initialBlogs.author);
  expect(addedBlog.url).toBe(initialBlogs.url);
  expect(addedBlog.likes).toBe(initialBlogs.likes);
})

test('DELETE /api/blogs/:id deletes a blog', async () => {
  const blogsBefore = await Blog.find({})
  await supertest(app)
    .delete(`/api/blogs/${blogsBefore[0]._id}`)
    .expect(204);
  const blogsAfter = await Blog.find({})
  expect(blogsAfter).toHaveLength(0)
})

const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'akuapo',
      name: 'Kaapo Karppinen',
      password: 'kissa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('expected `username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})