function Licensing() {
  return (
    <div className="licensing-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      maxWidth: '1400px',
      margin: '0 auto',
      gap: '40px',
      color: 'white',
      backgroundColor: 'black'
    }}>
      <h1 style={{ fontSize: '2.5rem', textAlign: 'center' }}>Licensing & Partnership Options</h1>
      
      <div style={{
        display: 'flex',
        gap: '40px',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <section className="partnership-option" style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '600px',
          textAlign: 'center',
          padding: '30px',
          backgroundColor: '#111',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)'
        }}>
          <img 
            src="/othersiteimages/cat.PNG" 
            alt="Brand Partnership"
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover',
              border: '5px solid #FFD700',
              borderRadius: '15px',
              marginBottom: '20px'
            }}
          />
          <h2 style={{ fontSize: '2rem' }}>Brand Partnership</h2>
          <p style={{ fontSize: '1.5rem' }}>Want your brand to be part of Glimpse?</p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            fontSize: '1.1rem',
            margin: '30px 0'
          }}>
            <li>🎭 Create a custom character for your brand</li>
            <li>🗣️ Give it a unique voice and personality</li>
            <li>💼 Populate it with your business information</li>
            <li>📈 Let Glimpse handle your marketing at a fraction of the cost</li>
          </ul>
          <a 
            href="https://calendly.com/michael-glimpse/30min" 
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#FFD700',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginTop: '20px'
            }}
          >
            Become a Partner
          </a>
        </section>

        <section className="white-label-option" style={{
          flex: '1',
          minWidth: '300px',
          maxWidth: '600px',
          textAlign: 'center',
          padding: '30px',
          backgroundColor: '#111',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)'
        }}>
          <img 
            src="/othersiteimages/map.png" 
            alt="White Label Solution"
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover',
              border: '5px solid #FFD700',
              borderRadius: '15px',
              marginBottom: '20px'
            }}
          />
          <h2 style={{ fontSize: '2rem' }}>White-Label Solution</h2>
          <h3 style={{ fontSize: '1.5rem' }}>Have your own city? We can create a custom version app for you.</h3>
          <div className="features">
            <h4 style={{ fontSize: '1.2rem' }}>Features:</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              fontSize: '1.1rem',
              margin: '20px 0'
            }}>
              <li>🌆 Customized version for your city</li>
              <li>🎭 Your unique characters and branding</li>
              <li>⚙️ Custom structure and application</li>
              <li>🔮 Interactive augmented reality experience</li>
              <li>🏛️ Showcase local history and culture</li>
            </ul>
          </div>
          <a 
            href="https://calendly.com/michael-glimpse/30min" 
            className="cta-button"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              backgroundColor: '#FFD700',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginTop: '20px'
            }}
          >
            Schedule a Consultation
          </a>
        </section>
      </div>
    </div>
  );
}

export default Licensing;
