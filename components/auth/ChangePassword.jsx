import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const ChangePassword = () => {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
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

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password must match')
      return
    }

    try {
      setLoading(true)

      await axios.post(
        'https://employee-management-system-backend-99hu.onrender.com/api/v1/auth/change-password',
        {
          username: user.username,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        }
      )

      setMessage('Password changed successfully')

      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (err) {
      setError(
        err.response?.data || 'Failed to change password'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h4>Change Password</h4>
        </div>

        <div className="card-body">
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
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                className="form-control"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword