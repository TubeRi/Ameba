import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 Not Found</h1>
      <h2>Puslapis kurio ieškote - neegzistuoja.</h2>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: '10px' }}>
          Sugrįžti atgal
        </button>
        <button onClick={() => navigate('/')}>
          Eiti į pradžią
        </button>
      </div>
    </div>
  )
}
