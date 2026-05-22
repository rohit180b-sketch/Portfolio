import React, { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import './index.css'

const educationItems = [
  {
    year: '2024 - Present',
    title: 'B.Tech Computer Science (4th semester)',
    school: 'Example Institute of Technology',
    details: 'Focused on web development, data structures, and software design.',
  },
  {
    year: '2022 - 2024',
    title: 'Higher Secondary Certificate',
    school: 'Example Senior Secondary School',
    details: 'Completed Science stream with Mathematics, Physics and Biology.',
  },
  {
    year: '2020 - 2022',
    title: 'Secondary School Certificate',
    school: 'Example High School',
    details: 'Graduated with strong grades in science and technology subjects.',
  },
]

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Git', 'Responsive Design']

export default function App() {
  const typedRef = useRef(null)
  const [navActive, setNavActive] = useState(false)
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [usersError, setUsersError] = useState(null)
  const [city, setCity] = useState('New York')
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState(null)

  useEffect(() => {
    const options = {
      strings: ['Frontend Developer', 'Backend Developer', 'Blockchain Developer', 'Web Designer'],
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 1200,
      loop: true,
    }

    typedRef.current = new Typed('.multiple-text', options)

    const onScroll = () => setNavActive(false)
    window.addEventListener('scroll', onScroll)

    return () => {
      typedRef.current.destroy()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    async function loadUsers() {
      try {
        setUsersLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) throw new Error('Failed to load users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        setUsersError(error.message)
      } finally {
        setUsersLoading(false)
      }
    }

    loadUsers()
  }, [])

  useEffect(() => {
    fetchWeather(city)
  }, [])

  async function fetchWeather(query) {
    try {
      setWeatherLoading(true)
      setWeatherError(null)
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
      )
      const geoData = await geoResponse.json()
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found')
      }
      const { latitude, longitude, name, country } = geoData.results[0]
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      )
      const weatherData = await weatherResponse.json()
      setWeather({
        location: `${name}, ${country}`,
        temperature: weatherData.current_weather.temperature,
        windSpeed: weatherData.current_weather.windspeed,
        condition: weatherData.current_weather.weathercode,
        high: weatherData.daily.temperature_2m_max[0],
        low: weatherData.daily.temperature_2m_min[0],
      })
    } catch (error) {
      setWeatherError(error.message)
      setWeather(null)
    } finally {
      setWeatherLoading(false)
    }
  }

  function handleWeatherSubmit(event) {
    event.preventDefault()
    fetchWeather(city)
  }

  return (
    <div className="page-shell">
      <header className="header">
        <a href="#home" className="logo">Rohit Portfolio</a>
        <i
          className={`bx bx-menu ${navActive ? 'bx-x' : ''}`}
          id="menu-icon"
          onClick={() => setNavActive(!navActive)}
        ></i>
        <nav className={`navbar ${navActive ? 'active' : ''}`}>
          <a href="#home">Home</a>
          <a href="#education">Education</a>
          <a href="#skills">Skills</a>
          <a href="#weather">Weather</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Welcome!</p>
              <h1>Hi, I'm Rohit.</h1>
              <h2>I am a <span className="multiple-text"></span></h2>
              <p>
                I am a motivated B.Tech Computer Science student in my 4th semester.
                I enjoy building clean frontend experiences with React, CSS,
                and modern JavaScript.
              </p>
              <div className="hero-actions">
                <button className="btn" onClick={() => setCount(count + 1)}>
                  Click me ({count})
                </button>
                <a href="#skills" className="btn btn-secondary">View Skills</a>
              </div>
            </div>
            <div className="hero-card">
              <img src="/profile-pic1.jpg" alt="Profile" />
              <div className="bio-card">
                <h3>Bio</h3>
                <p>
                  I love solving problems with code and learning new frameworks.
                  In college, I work on web projects, practice backend APIs, and
                  experiment with small data science tools.
                </p>
                <p>
                  Outside of programming, I enjoy design, reading tech blogs, and
                  exploring new UI ideas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="education" id="education">
          <div className="section-heading">
            <h2>Education</h2>
            <p>Academic qualifications in descending order.</p>
          </div>
          <div className="timeline">
            {educationItems.map((item) => (
              <div key={item.year} className="timeline-item">
                <span className="timeline-date">{item.year}</span>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p className="school">{item.school}</p>
                  <p>{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="section-heading">
            <h2>Skills</h2>
            <p>Core skills and users loaded from the API.</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill} className="skill-chip">{skill}</div>
            ))}
          </div>
          <div className="users-panel">
            <h3>Users from JSONPlaceholder</h3>
            {usersLoading && <p>Loading users...</p>}
            {usersError && <p className="error">{usersError}</p>}
            {!usersLoading && !usersError && (
              <div className="user-grid">
                {users.slice(0, 6).map((user) => (
                  <div key={user.id} className="user-card">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <p>{user.website}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="weather" id="weather">
          <div className="section-heading">
            <h2>Weather</h2>
            <p>Search a city and view the current weather.</p>
          </div>
          <div className="weather-panel">
            <form className="weather-form" onSubmit={handleWeatherSubmit}>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="Enter city name"
              />
              <button type="submit" className="btn">Search</button>
            </form>
            <div className="weather-card">
              {weatherLoading && <p>Loading weather...</p>}
              {weatherError && <p className="error">{weatherError}</p>}
              {weather && (
                <>
                  <h3>{weather.location}</h3>
                  <div className="weather-values">
                    <div>
                      <span className="weather-label">Temp</span>
                      <strong>{weather.temperature}°C</strong>
                    </div>
                    <div>
                      <span className="weather-label">Max</span>
                      <strong>{weather.high}°C</strong>
                    </div>
                    <div>
                      <span className="weather-label">Min</span>
                      <strong>{weather.low}°C</strong>
                    </div>
                  </div>
                  <p>Wind speed: {weather.windSpeed} km/h</p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-heading">
            <h2>Contact</h2>
            <p>Dummy personal details for the portfolio contact section.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Email</h3>
              <a href="mailto:info@example.com">info@example.com</a>
            </div>
            <div className="contact-card">
              <h3>Facebook</h3>
              <a href="https://facebook.com/exampleprofile" target="_blank" rel="noreferrer">facebook.com/exampleprofile</a>
            </div>
            <div className="contact-card">
              <h3>Instagram</h3>
              <a href="https://instagram.com/exampleprofile" target="_blank" rel="noreferrer">instagram.com/exampleprofile</a>
            </div>
            <div className="contact-card">
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/exampleprofile" target="_blank" rel="noreferrer">linkedin.com/in/exampleprofile</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Rohit Ranjan Borah | Built with React and Vite</p>
      </footer>
    </div>
  )
}
