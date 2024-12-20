import React from 'react';

function Careers() {
  const jobs = [
    {
      title: "Unity developer",
      icon: "🎮",
      requirements: [
        "Minimum of 3 years experience",
        "Passionate about pushing the boundaries of AR technologies."
      ]
    },
    {
      title: "Head of Artificial Intelligence",
      icon: "🧠",
      requirements: [
        "5+ years of experience in AI/MLiwLP and predictive models.",
        "Proven ability to lead and scale AI/ML teams and deploy scalable systems."
      ]
    },
    {
      title: "Head of Marketing",
      icon: "💼",
      requirements: [
        "5+ years of experience in digital marketing.",
        "Experience working with growth hacking strategies to build viral engagement."
      ]
    },
    {
      title: "Character Artist",
      icon: "👤",
      requirements: [
        "5+ years of experience designing and developing highly detailed and stylized characters for games or AR platforms.",
        "Strong portfolio demonstrating expertise in character modeling, rigging, and animation."
      ]
    }
  ];

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1400px',
      margin: '0 auto',
      color: 'white',
      backgroundColor: 'black'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto 3rem auto',
        textAlign: 'center'
      }}>
       
      </div>

      <h1 style={{ 
        fontSize: '2.5rem', 
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        Join Our Team
      </h1>

      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Interested applications should send their CV and a cover letter to:
        </h2>
        <a 
          href="mailto:michael@glimpse.wiki"
          style={{
            color: '#FFD700',
            fontSize: '1.3rem',
            textDecoration: 'none'
          }}
        >
          michael@glimpse.wiki
        </a>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        padding: '20px'
      }}>
        {jobs.map((job, index) => (
          <div key={index} style={{
            backgroundColor: '#111',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)',
            border: '1px solid #333'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '2rem' }}>{job.icon}</span>
              {job.title}
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0'
            }}>
              {job.requirements.map((req, reqIndex) => (
                <li key={reqIndex} style={{
                  marginBottom: '1rem',
                  lineHeight: '1.5',
                  fontSize: '1.1rem'
                }}>
                  • {req}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Careers; 