import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCard from './DashboardCard'
import LoadingSpinner from '../common/LoadingSpinner'
import { employeeService } from '../../services/employeeService'
import { leaveService } from '../../services/leaveService'
import { payrollService } from '../../services/payrollService'
import { formatDate, getErrorMessage } from '../../utils/helpers'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    recentPayrolls: 0,
    activeEmployees: 0
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [aiWelcomeMessage, setAiWelcomeMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [chartData, setChartData] = useState({
  departmentWise: {},
  leaveStatus: {},
  payrollStatus: {},
  recentEmployees: []
})
  const navigate = useNavigate()

  const employeeChartData = {
  labels: ['Total Employees', 'Active Employees'],
  datasets: [
    {
      label: 'Employees',
      data: [
        dashboardData.totalEmployees || 0,
        dashboardData.activeEmployees || 0
      ],
      backgroundColor: [
        '#4e73df',
        '#1cc88a'
      ],
      borderRadius: 5
    }
  ]
}

const leaveChartData = {
  labels: ['Pending Leaves', 'Payrolls'],
  datasets: [
    {
      label: 'Overview',
      data: [
        dashboardData.pendingLeaves || 0,
        dashboardData.recentPayrolls || 0
      ],
      backgroundColor: [
        '#f39c12',
        '#28a745'
      ],
      borderWidth: 1
    }
  ]
}

const departmentChartData = {
  labels: Object.keys(chartData.departmentWise),
  datasets: [{
    label: 'Employees',
    data: Object.values(chartData.departmentWise),
    backgroundColor: '#4e73df'
  }]
}

const payrollChartData = {
  labels: Object.keys(chartData.payrollStatus),
  datasets: [{
    data: Object.values(chartData.payrollStatus),
    backgroundColor: Object.keys(chartData.payrollStatus).map(status => {
      switch (status) {
        case 'PAID':
          return '#28a745' // green

        case 'PENDING':
          return '#ffc107' // yellow

        case 'PROCESSED':
          return '#007bff' // blue

        default:
          return '#6c757d'
      }
    })
  }]
}

const leaveStatusChartData = {
  labels: Object.keys(chartData.leaveStatus),
  datasets: [{
    data: Object.values(chartData.leaveStatus),
    backgroundColor: Object.keys(chartData.leaveStatus).map(status => {
      switch (status) {
        case 'APPROVED':
          return '#28a745'

        case 'PENDING':
          return '#ffc107'

        case 'REJECTED':
          return '#dc3545'

        default:
          return '#6c757d'
      }
    })
  }]
}

  useEffect(() => {
    loadDashboardData()
    fetchAIWelcome()
  }, [])

  const fetchAIWelcome = async () => {
  try {
const response = await fetch('http://localhost:8080/api/v1/auth/welcome-message', {      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'text/plain'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Raw response:', text);
    
    if (response.ok) {
      setAiWelcomeMessage(text);
    } else {
      throw new Error(`HTTP ${response.status}: ${text}`);
    }
  } catch (error) {
    console.error('Failed to fetch AI message:', error);
    // Fallback message based on time of day
    const hour = new Date().getHours();
    let greeting = "Good day!";
    if (hour < 12) greeting = "Good morning!";
    else if (hour < 17) greeting = "Good afternoon!";
    else greeting = "Good evening!";
    
    setAiWelcomeMessage(`${greeting} Ready to make today productive?`);
  }
};

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const employees =
  await employeeService.getAllEmployees()

const pendingLeaves =
  await leaveService
    .getAllLeaveRequests()
    .catch(() => [])

const payrolls =
  await payrollService
    .getAllPayrolls()
    .catch(() => [])

      
console.log("Payrolls", payrolls)
console.log("Leaves", pendingLeaves)

  const departmentWise = {}

employees.forEach(emp => {

  const deptName =
    emp.departmentName || 'Unknown'

  departmentWise[deptName] =
    (departmentWise[deptName] || 0) + 1
})

const payrollStatus = {
  PAID: 0,
  PENDING: 0,
  PROCESSED: 0
}

payrolls.forEach(payroll => {
  const status =
    (payroll.status || 'PENDING')
      .toUpperCase()

  payrollStatus[status] =
    (payrollStatus[status] || 0) + 1
})

const leaveStatus = {
  APPROVED: 0,
  PENDING: 0,
  REJECTED: 0
}

pendingLeaves.forEach(leave => {
  const status =
    (leave.status || 'PENDING')
      .toUpperCase()

  leaveStatus[status] =
    (leaveStatus[status] || 0) + 1
})

setChartData({
  departmentWise,
  payrollStatus,
  leaveStatus,
  recentEmployees: employees.slice(0, 5)
})

      

      setDashboardData({
        totalEmployees: employees.length,
        pendingLeaves: pendingLeaves.filter(
  leave => leave.status?.toUpperCase() === 'PENDING'
).length,
        recentPayrolls: payrolls.filter(p => 
          new Date(p.generatedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length,
        activeEmployees: employees.filter(e => e.leaveBalance > 0).length
      })

      // Mock recent activities (you can replace with actual data)
      setRecentActivities([
        { id: 1, type: 'leave', message: 'New leave request submitted', time: new Date() },
        { id: 2, type: 'payroll', message: 'Payroll processed for March', time: new Date() },
        { id: 3, type: 'employee', message: 'New employee onboarded', time: new Date() }
      ])

    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button className="btn btn-link p-0 ms-2" onClick={loadDashboardData}>
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="page-transition">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0 text-gradient">Admin Dashboard</h1>
        <div className="text-muted">
          <i className="bi bi-calendar3 me-2"></i>
          {formatDate(new Date())}
        </div>
      </div>

      {aiWelcomeMessage && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-info border-0" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <div className="d-flex align-items-center">
                <i className="bi bi-robot me-3" style={{ fontSize: '1.5rem' }}></i>
                <div>
                  <h6 className="mb-1">🤖 AI Assistant</h6>
                  <p className="mb-0">{aiWelcomeMessage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <DashboardCard
            title="Total Employees"
            value={dashboardData.totalEmployees}
            icon="bi-people-fill"
            color="primary"
            onClick={() => navigate('/employees')}
            subtitle="Working Employees"
          />
        </div>
        <div className="col-md-3">
          <DashboardCard
            title="Pending Leaves"
            value={dashboardData.pendingLeaves}
            icon="bi-calendar-check"
            color="warning"
            onClick={() => navigate('/leaves/approval')}
            subtitle="Awaiting approval"
          />
        </div>
        <div className="col-md-3">
          <DashboardCard
            title="Recent Payrolls"
            value={dashboardData.recentPayrolls}
            icon="bi-cash-stack"
            color="success"
            onClick={() => navigate('/payroll')}
            subtitle="Last 30 days"
          />
        </div>
        <div className="col-md-3">
          <DashboardCard
            title="Active Employees"
            value={dashboardData.activeEmployees}
            icon="bi-person-check"
            color="info"
            subtitle="With leave balance"
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <button 
                    className="btn btn-outline-primary w-100 p-3"
                    onClick={() => navigate('/employees/new')}
                  >
                    <i className="bi bi-person-plus-fill fs-4 d-block mb-2"></i>
                    Add New Employee
                  </button>
                </div>
                <div className="col-md-6">
                  <button 
                    className="btn btn-outline-success w-100 p-3"
                    onClick={() => navigate('/payroll/new')}
                  >
                    <i className="bi bi-cash-stack fs-4 d-block mb-2"></i>
                    Generate Payroll
                  </button>
                </div>
                <div className="col-md-6">
                  <button 
                    className="btn btn-outline-warning w-100 p-3"
                    onClick={() => navigate('/leaves/approval')}
                  >
                    <i className="bi bi-check-circle fs-4 d-block mb-2"></i>
                    Approve Leaves
                  </button>
                </div>
                <div className="col-md-6">
                  <button 
                    className="btn btn-outline-info w-100 p-3"
                    onClick={() => navigate('/departments/new')}
                  >
                    <i className="bi bi-building-add fs-4 d-block mb-2"></i>
                    Add Department
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      <div className="row g-4 mt-2">
  <div className="col-lg-6">
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          <i className="bi bi-bar-chart-fill me-2"></i>
          Employee Statistics
        </h5>
      </div>
      <div className="card-body">
        <Bar data={employeeChartData} />
      </div>
    </div>
  </div>

  <div className="col-lg-6">
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">
          <i className="bi bi-pie-chart-fill me-2"></i>
          Leave & Payroll Overview
        </h5>
      </div>
      <div className="card-body">
        <Pie
  data={leaveChartData}
  options={{
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }}
/>
      </div>
    </div>
  </div>
</div>

<div className="row g-4 mt-3">

  <div className="col-lg-6">
    <div className="card">
      <div className="card-header">
        Department Wise Employees
      </div>
      <div className="card-body">
        <Bar data={departmentChartData} />
      </div>
    </div>
  </div>

  <div className="col-lg-3">
    <div className="card">
      <div className="card-header">
        Payroll Status
      </div>
      <div className="card-body">
        <Pie data={payrollChartData} />
      </div>
    </div>
  </div>

  <div className="col-lg-3">
    <div className="card">
      <div className="card-header">
        Leave Status
      </div>
      <div className="card-body">
        <Pie data={leaveStatusChartData} />
      </div>
    </div>
  </div>

</div>
    </div>
  )
}

export default AdminDashboard