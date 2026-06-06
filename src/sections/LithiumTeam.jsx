import React, { useEffect, useRef } from 'react';
import '../styles/LithiumTeam.css';

/* ─── Replace with your actual team data ─────────────── */
export const TEAM_DATA = [
  {
    dept: '',
    members: [
      { name: 'Roumik Ghosh',     role: '',       image: '/assets/team/roumik.webp' },
      { name: 'Ankit Das',   role: '',  image: '/assets/team/Ankit.webp' },
      { name: 'Surajit Sadhukhan',        role: '',       image: '/assets/team/sadhu.webp' },
      { name: 'Sankalan Pal',      role: '',       image: '/assets/team/sank.webp' },
      { name: 'Olivia Chowdhury',     role: '',       image: '/assets/team/olivia.webp' },
      { name: 'Sakshi Verma',   role: '',  image: '/assets/team/saksi.webp' },
      { name: 'Sagnik Roy Chowdhury',        role: '',       image: '/assets/team/saguda.webp'},
       { name: 'Tanisha Banerjee',   role: '',  image: '/assets/team/tanisha.webp' },
      { name: 'Parthib Mondal',      role: '',       image: '/assets/team/parthib.webp'},
      { name: 'Anwesha Dey',     role: '',       image: '/assets/team/aneswa.webp' },
      { name: 'Tanisa Naskar',      role: '',       image: '/assets/team/tanisa.webp' },
      { name: 'Surasree Majumder',        role: '',       image: '/assets/team/sura.webp'},
      { name: 'Pameli Saha',        role: '',       image: '/assets/team/pameli.webp' },
      { name: 'Monalisa Sen',        role: '',       image: '/assets/team/mona.webp' },
      { name: 'Puskar Nath',        role: '',       image: '/assets/team/puskar.webp' },   
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────── */
const initials = (name) =>
  name.split(' ').slice(0, 2).map((w) => w[0]).join('');

const totalMembers = TEAM_DATA.reduce((s, d) => s + d.members.length, 0);

/* ─── Ornament Divider ───────────────────────────────── */
const OrnamentDivider = () => (
  <div className="lt-ornament">
    <div className="lt-ornament-line" />
    <div className="lt-ornament-pip" />
    <div className="lt-ornament-diamond" />
    <div className="lt-ornament-pip" />
    <div className="lt-ornament-line" />
  </div>
);

/* ─── Member Card ────────────────────────────────────── */
const MemberCard = ({ person }) => {
  const [imgErr, setImgErr] = React.useState(false);
  return (
    <div className="lt-card">
      <div className="lt-corner lt-corner--tl" />
      <div className="lt-corner lt-corner--tr" />

      <div className="lt-photo-wrap">
        <div className="lt-photo-frame">
          {!imgErr && person.image ? (
            <img
              src={person.image}
              alt={person.name}
              className="lt-photo"
              onError={() => setImgErr(true)}
            />
          ) : (
            <div className="lt-initials">{initials(person.name)}</div>
          )}
        </div>
      </div>

      <div className="lt-name">{person.name}</div>
      <div className="lt-role">{person.role}</div>
      <div className="lt-bar" />
    </div>
  );
};

/* ─── Department Block ───────────────────────────────── */
const DeptBlock = ({ dept }) => (
  <div className="lt-dept">
    <div className="lt-dept-label">
      <span>{dept.dept}</span>
      <div className="lt-dept-rule" />
    </div>
    <div className="lt-grid">
      {dept.members.map((m, i) => (
        <MemberCard key={i} person={m} />
      ))}
    </div>
  </div>
);

/* ─── Main Section ───────────────────────────────────── */
const LithiumTeam = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting)
          sectionRef.current?.classList.add('lt-section--visible');
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" className="lt-section" ref={sectionRef}>
      <div className="lt-inner">

        {/* Header */}
        <header className="lt-header">
          <div className="lt-eyebrow">
            <div className="lt-eyebrow-rule" />
            <span className="lt-dot" />
            <span>Lithium · The Team</span>
            <span className="lt-dot" />
            <div className="lt-eyebrow-rule" />
          </div>


          <div className="lt-title">
            <span className="lt-title-text">Team LITHIUM</span>
          </div>

          <OrnamentDivider />
        </header>

        {/* Department galleries */}
        {TEAM_DATA.map((dept, i) => (
          <DeptBlock key={i} dept={dept} />
        ))}


        <OrnamentDivider />
      </div>
    </section>
  );
};

export default LithiumTeam;