import React from 'react';
import '@testing-library/jest-dom/'
import {  render, fireEvent, act, waitFor } from '@testing-library/react'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

jest.mock('../services/blogs');

describe('<BlogForm />', () => {
  test('calls the addBlog function with the correct data when submitted', async() => {
    const setBlogs = jest.fn()
    const setUpdate = jest.fn()
    const setErrorMessage = jest.fn();
    const user = { }

    const component = render(
      <BlogForm blogs={[]} setBlogs={setBlogs} setUpdate={setUpdate} setErrorMessage={setErrorMessage} user={user} />
    )

 
    const titleInput = component.container.querySelector('input[placeholder="write title here"]');
    const authorInput = component.container.querySelector('input[placeholder="write author here"]');
    const urlInput = component.container.querySelector('input[placeholder="write url here"]');
    const form = component.container.querySelector('form');

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'new blog' } })
      fireEvent.change(authorInput, { target: { value: 'new author' } })
      fireEvent.change(urlInput, { target: { value: 'www.fff.com' } })
    })

    act(() => {
      fireEvent.submit(form);
    })

    await waitFor(() => {
      expect(blogService.create.mock.calls).toHaveLength(1)
      expect(blogService.create.mock.calls[0][0].title).toBe('new blog')
      expect(blogService.create.mock.calls[0][0].author).toBe('new author')
      expect(blogService.create.mock.calls[0][0].url).toBe('www.fff.com')
    })
  })
})
