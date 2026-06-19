import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { employeeService } from '../../services/employeeService'
import { departmentService } from '../../services/departmentService'
import { jobRoleService } from '../../services/jobRoleService'
import LoadingSpinner from '../common/LoadingSpinner'
import { getErrorMessage, validateEmail, validatePhone } from '../../utils/helpers'

const EmployeeForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({

    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    hireDate: '',
    departmentId: '',
    jobId: '',
    leaveBalance: 20
  })

  const [departments, setDepartments] = useState([])
  const [jobRoles, setJobRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadFormData()
  }, [id])

  const loadFormData = async () => {
    try {
      setLoading(true)

      // Load departments and job roles
      const [departmentsData, jobRolesData] = await Promise.all([
        departmentService.getAllDepartments(),
        jobRoleService.getAllJobRoles()
      ])

      setDepartments(departmentsData)
      setJobRoles(jobRolesData)

      // If editing, load employee data
      if (isEdit) {
        const employee = await employeeService.getEmployeeById(id)
        setFormData({
          username: employee.username || '',
          email: employee.email || '',
          password: '',
          firstName: employee.firstName,
          lastName: employee.lastName,
          dateOfBirth: employee.dateOfBirth || '',
          phoneNumber: employee.phoneNumber || '',
          address: employee.address || '',
          hireDate: employee.hireDate,
          departmentId: employee.departmentId || '',
          jobId: employee.jobId || '',
          leaveBalance: employee.leaveBalance || 20
        })
      }
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {

  // Username validation
  // Username, Email, Password validation ONLY for Add Employee
if (!isEdit) {
  if (!formData.username?.trim()) {
    setError('Username is required')
    return false
  }

  if (formData.username.length < 3) {
    setError('Username must be at least 3 characters')
    return false
  }

  if (!formData.email?.trim()) {
    setError('Email is required')
    return false
  }

  if (!validateEmail(formData.email)) {
    setError('Please enter a valid email address')
    return false
  }

  if (!formData.password?.trim()) {
    setError('Password is required')
    return false
  }

  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters')
    return false
  }
}

  // First name validation
  if (!formData.firstName.trim()) {
    setError('First name is required')
    return false
  }

  if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
    setError('First name should contain only letters')
    return false
  }

  // Last name validation
  if (!formData.lastName.trim()) {
    setError('Last name is required')
    return false
  }

  if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
    setError('Last name should contain only letters')
    return false
  }

  // Phone validation
  if (!formData.phoneNumber.trim()) {
    setError('Phone number is required')
    return false
  }

  if (!validatePhone(formData.phoneNumber)) {
    setError('Phone number must be 10 digits')
    return false
  }

  // Address validation
  if (!formData.address.trim()) {
    setError('Address is required')
    return false
  }

  // Date of birth validation
  if (!formData.dateOfBirth) {
    setError('Date of birth is required')
    return false
  }

  // Hire date validation
  if (!formData.hireDate) {
    setError('Hire date is required')
    return false
  }

  // Department validation
  if (!formData.departmentId) {
    setError('Please select a department')
    return false
  }

  // Job role validation
  if (!formData.jobId) {
    setError('Please select a job role')
    return false
  }

  // Leave balance validation
  if (formData.leaveBalance < 0) {
    setError('Leave balance cannot be negative')
    return false
  }

  return true
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    try {
      setSubmitLoading(true)

      const submitData = {
  username: formData.username,
  email: formData.email,
  password: formData.password,
  firstName: formData.firstName,
  lastName: formData.lastName,
  dateOfBirth: formData.dateOfBirth || null,
  phoneNumber: formData.phoneNumber,
  address: formData.address,
  hireDate: formData.hireDate,
  departmentId: formData.departmentId || null,
  jobId: formData.jobId || null,
  leaveBalance: formData.leaveBalance
}

      if (isEdit) {
        await employeeService.updateEmployee(id, submitData)
      } else {
        await employeeService.createEmployee(submitData)
      }

      navigate('/employees')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSubmitLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading form data..." />
  }

  return (
    <div className="page-transition">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gradient">
          {isEdit ? 'Edit Employee' : 'Add New Employee'}
        </h1>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/employees')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to List
        </button>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-person-badge me-2"></i>
                Employee Information
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">


                 {!isEdit && (
  <>
    <div className="col-md-4">
      <label className="form-label">Username *</label>
      <input
        type="text"
        className="form-control"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Email *</label>
      <input
        type="email"
        className="form-control"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Password *</label>
      <input
        type="password"
        className="form-control"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
  </>
)} 

                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
  setFormData({
    ...formData,
    firstName: e.target.value.replace(/[^A-Za-z ]/g, '')
  })
}
                      required
                      disabled={submitLoading}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
  setFormData({
    ...formData,
    lastName: e.target.value.replace(/[^A-Za-z ]/g, '')
  })
}
                      required
                      disabled={submitLoading}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={submitLoading}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
  type="tel"
  className="form-control"
  id="phoneNumber"
  name="phoneNumber"
  value={formData.phoneNumber}
  onChange={(e) =>
    setFormData({
      ...formData,
      phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10)
    })
  }
  placeholder="Enter 10-digit phone number"
/>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={submitLoading}
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="hireDate" className="form-label">Hire Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      id="hireDate"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleChange}
                      required
                      disabled={submitLoading}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="leaveBalance" className="form-label">Leave Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      id="leaveBalance"
                      name="leaveBalance"
                      value={formData.leaveBalance}
                      onChange={handleChange}
                      min="0"
                      disabled={submitLoading}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="departmentId" className="form-label">Department</label>
                    <select
                      className="form-select"
                      id="departmentId"
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      disabled={submitLoading}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept.departmentId} value={dept.departmentId}>
                          {dept.departmentName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="jobId" className="form-label">Job Role</label>
                    <select
                      className="form-select"
                      id="jobId"
                      name="jobId"
                      value={formData.jobId}
                      onChange={handleChange}
                      disabled={submitLoading}
                    >
                      <option value="">Select Job Role</option>
                      {jobRoles.map((job) => (
                        <option key={job.jobId} value={job.jobId}>
                          {job.jobTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-top">
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitLoading}
                    >
                      {submitLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          {isEdit ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <>
                          <i className={`bi ${isEdit ? 'bi-check' : 'bi-plus'} me-2`}></i>
                          {isEdit ? 'Update Employee' : 'Create Employee'}
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => navigate('/employees')}
                      disabled={submitLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Instructions
              </h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Fields marked with * are required
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Phone number should be 10 digits
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Default leave balance is 20 days
                </li>
                <li className="mb-0">
                  <i className="bi bi-check-circle text-success me-2"></i>
                  Department and job role are optional
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForm