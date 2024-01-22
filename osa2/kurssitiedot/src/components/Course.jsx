const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <div>
        <h1>{course.name}</h1>
        <ul>
          {course.parts.map(part => 
            <li key={part.id}>
                {part.name} {part.exercises}
            </li> 
          )}
        </ul>
        <p><strong>total of {total} exercises</strong></p>
      </div>
    )
  }

  export default Course