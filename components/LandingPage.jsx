import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaUsers,
  FaMoneyCheckAlt,
  FaClipboardCheck,
  FaBuilding,
  FaUserShield,
  FaChartLine,
  FaCalendarCheck,
  FaArrowRight
} from 'react-icons/fa'

const LandingPage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <FaUsers size={35} />,
      title: 'Employee Management',
      desc:
        'Store employee records, profiles, departments and job roles efficiently.'
    },
    {
      icon: <FaMoneyCheckAlt size={35} />,
      title: 'Payroll Management',
      desc:
        'Generate payroll automatically using employee job roles and salaries.'
    },
    {
      icon: <FaClipboardCheck size={35} />,
      title: 'Attendance & Leave',
      desc:
        'Track attendance, leave requests and approvals in one place.'
    },
    {
      icon: <FaBuilding size={35} />,
      title: 'Department Handling',
      desc:
        'Organize departments and assign employees effectively.'
    }
  ]

  const workflow = [
    'Register/Login',
    'Manage Employees',
    'Assign Job Roles',
    'Generate Payroll',
    'Track Leave & Attendance'
  ]

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* HERO SECTION */}
      <section
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(135deg,#4F46E5 0%, #7C3AED 50%, #EC4899 100%)',
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            {/* LEFT */}
            <div className="col-lg-6">
              <span
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  padding: '10px 20px',
                  borderRadius: '40px',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Smart Employee Management Platform
              </span>

              <h1
                style={{
                  fontSize: '72px',
                  fontWeight: '800',
                  marginTop: '25px',
                  lineHeight: '1.1'
                }}
              >
                Employee <br />
                Management <br />
                System
              </h1>

              <p
                style={{
                  fontSize: '20px',
                  marginTop: '20px',
                  opacity: '0.92',
                  maxWidth: '550px'
                }}
              >
                A smart and professional platform to manage
                employees, payroll, attendance, departments
                and leave requests efficiently.
              </p>

              <div className="d-flex gap-3 mt-4 flex-wrap">
                <button
                  className="btn btn-light btn-lg px-5"
                  style={{
                    borderRadius: '15px',
                    fontWeight: '700'
                  }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </button>

                <button
                  className="btn btn-outline-light btn-lg px-5"
                  style={{
                    borderRadius: '15px',
                    borderWidth: '2px',
                    fontWeight: '700'
                  }}
                  onClick={() => navigate('/register')}
                >
                  Signup
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
                alt="management"
                className="img-fluid rounded-5 shadow-lg"
                style={{
                  maxHeight: '550px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="container py-5 my-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
              className="img-fluid rounded-5 shadow"
              alt="team"
            />
          </div>

          <div className="col-lg-6 mt-4 mt-lg-0">
            <h2
              style={{
                fontWeight: '800',
                fontSize: '48px'
              }}
            >
              Manage Workforce
              <br />
              Smarter & Faster
            </h2>

            <p
              className="text-muted mt-3"
              style={{ fontSize: '18px' }}
            >
              Employee Management System helps organizations
              streamline workforce management, salary
              processing, attendance tracking and leave
              approvals from a single platform.
            </p>

            <div className="mt-4">
              <div className="mb-3">
                ✅ Employee Profile Management
              </div>
              <div className="mb-3">
                ✅ Payroll Automation
              </div>
              <div className="mb-3">
                ✅ Attendance Tracking
              </div>
              <div className="mb-3">
                ✅ Leave Approval System
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          background: '#f8fafc',
          padding: '100px 0'
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2
              style={{
                fontWeight: '800',
                fontSize: '50px'
              }}
            >
              Powerful Features
            </h2>

            <p className="text-muted fs-5">
              Everything required to manage employees
              professionally.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div
                  className="card border-0 shadow-lg h-100 text-center p-4"
                  style={{
                    borderRadius: '30px',
                    transition: '0.3s ease'
                  }}
                >
                  <div
                    style={{
                      color: '#7C3AED',
                      marginBottom: '20px'
                    }}
                  >
                    {feature.icon}
                  </div>

                  <h5
                    style={{
                      fontWeight: '700'
                    }}
                  >
                    {feature.title}
                  </h5>

                  <p className="text-muted">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="container py-5 my-5">
        <div className="text-center mb-5">
          <h2
            style={{
              fontWeight: '800',
              fontSize: '50px'
            }}
          >
            How It Works
          </h2>
        </div>

        <div className="row g-4 justify-content-center">
          {workflow.map((step, index) => (
            <div className="col-md-2 text-center" key={index}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg,#4F46E5,#7C3AED)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 'auto',
                  fontWeight: '700',
                  fontSize: '24px'
                }}
              >
                {index + 1}
              </div>

              <h6 className="mt-3 fw-bold">
                {step}
              </h6>

              {index !== workflow.length - 1 && (
                <FaArrowRight
                  className="d-none d-md-inline"
                  style={{
                    marginTop: '10px',
                    color: '#7C3AED'
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        style={{
          background:
            'linear-gradient(135deg,#4F46E5,#7C3AED)',
          color: 'white',
          padding: '100px 0'
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2
              style={{
                fontWeight: '800',
                fontSize: '50px'
              }}
            >
              Why Choose Us?
            </h2>
          </div>

          <div className="row g-4">
            {[
              {
                icon: <FaUserShield size={35} />,
                title: 'Secure Access',
                desc:
                  'Protected role-based access for admin and employees.'
              },
              {
                icon: <FaChartLine size={35} />,
                title: 'Easy Management',
                desc:
                  'Simple dashboard to manage all activities.'
              },
              {
                icon: <FaCalendarCheck size={35} />,
                title: 'Save Time',
                desc:
                  'Automate payroll and leave management.'
              }
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="p-4 text-center h-100"
                  style={{
                    background:
                      'rgba(255,255,255,0.12)',
                    borderRadius: '25px',
                    backdropFilter: 'blur(15px)'
                  }}
                >
                  <div className="mb-3">
                    {item.icon}
                  </div>

                  <h4>{item.title}</h4>

                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="text-center py-5"
        style={{ background: '#f8fafc' }}
      >
        <h2
          style={{
            fontWeight: '800',
            fontSize: '48px'
          }}
        >
          Start Managing Employees Today
        </h2>

        <p className="text-muted fs-5 mt-3">
          Login or create an account to begin.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary btn-lg px-5"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          <button
            className="btn btn-outline-primary btn-lg px-5"
            onClick={() => navigate('/register')}
          >
            Signup
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: '#111827',
          color: 'white',
          textAlign: 'center',
          padding: '35px'
        }}
      >
        <h4>Employee Management System</h4>

        <p className="mb-0">
          Manage Employees • Payroll • Attendance • Leave
        </p>
      </footer>
    </div>
  )
}

export default LandingPage