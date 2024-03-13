import React, { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    console.log('FROM CONTENT')
  }, [])
  return (
    <div>App</div>
  )
}

export default App