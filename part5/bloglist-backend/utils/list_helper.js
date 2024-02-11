const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikesBlog = blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
  
    return {
      title: mostLikesBlog.title,
      author: mostLikesBlog.author,
      likes: mostLikesBlog.likes,
    }
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}