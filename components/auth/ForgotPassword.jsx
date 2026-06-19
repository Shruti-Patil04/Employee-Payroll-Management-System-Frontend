import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    newPassword: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/forgot-password',
        formData
      )

      setMessage(response.data)
    } catch (err) {
      setError(
        err.response?.data ||
        'User does not exist'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3 className="text-center mb-4">
          Forgot Password
        </h3>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              className="form-control"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? 'Resetting...'
              : 'Reset Password'}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword