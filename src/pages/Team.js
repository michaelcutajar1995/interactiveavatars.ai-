import styled from 'styled-components';
import { FaLinkedin } from 'react-icons/fa';

const TeamContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const TeamHeader = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 4rem;
  color: white;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const TeamMember = styled.div`
  text-align: center;
`;

const MemberImage = styled.img`
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 5px solid #FFFFFF;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(255, 215, 0, 0.3);
  }
`;

const MemberName = styled.h2`
  font-size: 1.5rem;
  margin: 0.5rem 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const MemberTitle = styled.h3`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0.5rem 0;
`;

const MemberBio = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 1rem 0;
`;

const ClientSection = styled.div`
  margin-top: 4rem;
`;

const ClientHeader = styled.h2`
  margin-bottom: 2rem;
  color: white;
`;

const ClientLogos = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const ClientLogo = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 140px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 5px solid #FFFFFF;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const LinkedInIcon = styled.a`
  color: #FFD700;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  margin: 0 0.25rem;
  
  &:hover {
    transform: scale(1.1);
  }
`;

export const ClientLogoSection = () => (
  <ClientSection>
    <ClientHeader style={{ textAlign: 'center' }}>Our team has experience working with industry leaders:</ClientHeader>
    <ClientLogos>
      <ClientLogo>
        <img src="/companylogos/Apple-Logo.png" alt="Apple" />
      </ClientLogo>
      <ClientLogo>
        <img src="/companylogos/UBS.png" alt="UBS" />
      </ClientLogo>
      <ClientLogo>
        <img src="/companylogos/KPMG_logo.svg" alt="KPMG" />
      </ClientLogo>
      <ClientLogo>
        <img src="/companylogos/Forever-21-logo.png" alt="Forever 21" />
      </ClientLogo>
    </ClientLogos>
  </ClientSection>
);

function Team() {
  const teamMembers = [
    {
      name: "Michael Cutajar",
      title: "CEO and Founder",
      bio: "Chartered accountant with a passion for tech. Ex CEO of Metaverse Architect (shares sold).",
      image: "/teamimages/michaelcutajar.jpg",
      linkedin: "https://www.linkedin.com/in/michaelcutajar/"
    },
    {
      name: "Matt Hudson",
      title: "Head of AR",
      bio: "6 years experience working in the AR and VR scene, Unity expert.",
      image: "/teamimages/matthudson.png"
    },
    {
      name: "Landon Morrison",
      title: "Marketing and Growth assistant",
      bio: "Student of marketing and business.",
      image: "/teamimages/LandonMorrisonHeadshot.JPG",
      linkedin: "https://www.linkedin.com/in/landoncmorrison/"
    },
    {
      name: "Uman K",
      title: "Marketing",
      bio: "Over 5 years experience in marketing and growth.",
      image: "/teamimages/Uman.jpeg",
      linkedin: "https://www.linkedin.com/in/uman-k-a5b879257/",
      upwork: "https://www.upwork.com/freelancers/~012354244223442576"
    },
    {
      name: "Beka",
      title: "Marketing", 
      bio: "Marketing and growth assistant.",
      image: "/teamimages/beka.JPG",
      linkedin: "https://www.linkedin.com/in/bekarysmyrzakhan/"
    },
    {
      name: "Kyllian Le Borgne-Roperch",
      title: "Lead Developer",
      bio: "Part of Decentraland Security Advisory Board and DAO Committee for 5 years (handling 40M+ USD in crypto transactions), worked at the Decentraland Foundation.",
      image: "/teamimages/Kyllian.jpg",
      linkedin: "https://www.linkedin.com/in/kyllian-le-borgne-roperch-2b7011149/"
    }
  ];

  return (
    <TeamContainer>
      <TeamHeader>The Team</TeamHeader>
      
      <TeamGrid>
        {teamMembers.map((member, index) => (
          <TeamMember key={index}>
            <MemberImage src={member.image} alt={member.name} />
            <MemberName>
              {member.name}
              {member.linkedin && (
                <LinkedInIcon 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </LinkedInIcon>
              )}
              {member.upwork && (
                <LinkedInIcon 
                  href={member.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  U
                </LinkedInIcon>
              )}
            </MemberName>
            <MemberTitle>{member.title}</MemberTitle>
            <MemberBio>{member.bio}</MemberBio>
          </TeamMember>
        ))}
      </TeamGrid>
      <ClientLogoSection />
    </TeamContainer>
  );
}

export default Team;
  