import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent} from '@testing-library/react'
import Blog from './Blog'


const blog = {
    title: 'Meincraft',
    author: 'Aatu',
    url: 'www.menkumpf.com',
    user: '1258693',
    likes: 2,
    user: {
        name: 'Hutler'
    }
  }

test('renders title', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Meincraft')
})

test('url, likes and user will be shown', () => {
    const div = render(<Blog blog={blog} />)
    const viewButton = div.getByText('view')
    fireEvent.click(viewButton)
    expect(div.container).toHaveTextContent(blog.url)
    expect(div.container).toHaveTextContent(`likes ${blog.likes}`)
    expect(div.container).toHaveTextContent(blog.user.name)
  })
