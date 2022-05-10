import { useState, useEffect } from 'react'
export default function Home() {
  const [list, setList] = useState([])
  useEffect(() => {
    fetch('/api/records').then(async res => {
      setList(await res.json())
    })
  }, [])
  return (
    <div>
      {JSON.stringify(list)}
    </div>
  )
}
