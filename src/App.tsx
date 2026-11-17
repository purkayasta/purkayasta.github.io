import { ThemePicker } from "./components/ThemePicker";
import { DoomsdayCast } from "./components/DoomsdayCast";
import { useTheme } from "./hooks/useTheme";
import { ChristmasDecor } from "./components/ChristmasDecor";
import { SocialIcon } from "./components/SocialIcon";
import { useState } from "react";
import { SpaceWindow } from "./components/SpaceWindow";
import {
  profile,
  experience,
  projects,
  skills,
  writing,
  contact,
  education,
  certifications,
  interests,
} from "./data/portfolio";

export default function App() {
  const { theme, selectTheme } = useTheme();
  const christmas = theme === "christmas";
  const [allNotes, setAllNotes] = useState(false);
  const [firstName, ...lastName] = profile.name.split(" ");
  return (
    <main className={`portfolio ${theme}-edition`}>
      {christmas && <ChristmasDecor />}
      <ThemePicker theme={theme} onSelect={selectTheme} />
      <section className="intro">
        <SpaceWindow theme={theme} />
        <div className="intro-copy">
          <h1 className="intro-name">
            <strong>{firstName}</strong> {lastName.join(" ")}
          </h1>
          <p className="personal-line">{profile.title}</p>
          <div className="intro-details">
            <p className="intro-role">
              Senior Software Engineer · Object Data Inc. · New Jersey
            </p>
            <p className="intro-description">
              Nearly 9 years building cloud-native .NET, Azure, and useful AI.
              <br />
              Curious about the systems down here, and everything up there.
            </p>
            <nav className="intro-nav" aria-label="Portfolio sections">
              <a href="#projects">Work ↓</a>
              <a href="#experience">About ↓</a>
              <a href="#contact">Hello ↓</a>
            </nav>
          </div>
          <div className="socials">
            <a href={contact.github} target="_blank" rel="noreferrer">
              <SocialIcon name="github" /> GitHub ↗
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <SocialIcon name="linkedin" /> LinkedIn ↗
            </a>
            <a href={contact.email}>
              <SocialIcon name="email" /> Email ↗
            </a>
          </div>
        </div>
      </section>
      {theme === "doomsday" && <DoomsdayCast />}
      <section id="projects">
        <div className="section-heading">
          <h2>Things I’ve built</h2>
          <span>Selected projects</span>
        </div>
        {projects.map((project) => (
          <a
            className="project"
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <h3>
                {project.title} <span>↗</span>
              </h3>
              <p>{project.description}</p>
              <small>
                {project.tech.join(" · ")}
                {project.note ? ` / ${project.note}` : ""}
              </small>
            </div>
          </a>
        ))}
      </section>
      <section id="experience">
        <div className="section-heading">
          <h2>Along the way</h2>
          <span>Experience</span>
        </div>
        <ol className="career-timeline">
          {experience.map((job, i) => (
            <li
              className={`timeline-stop ${i === 0 ? "current-stop" : ""}`}
              key={job.company}
            >
              <span className="timeline-node" aria-hidden="true" />
              <p className="timeline-date">
                {job.period}
                {i === 0 && <span className="timeline-current">Now</span>}
              </p>
              <h3>
                {job.link ? (
                  <a href={job.link} target="_blank" rel="noreferrer">
                    {job.company} ↗
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              {job.location && (
                <p className="timeline-location">{job.location}</p>
              )}
              <ol className="role-timeline">
                {[...job.roles].reverse().map((role) => (
                  <li key={role.title}>
                    <details open>
                      <summary>
                        <span className="role-title">
                          {role.title}
                          <small>{role.period}</small>
                        </span>
                        <span className="role-expand" aria-hidden="true">
                          ＋
                        </span>
                      </summary>
                      <ul>
                        {role.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <div className="section-heading">
          <h2>The everyday toolkit</h2>
        </div>
        <div className="skills">
          {skills.map((group) => (
            <div key={group.genre}>
              <h3>{group.genre}</h3>
              <p>{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="writing">
        <div className="section-heading">
          <h2>Notes & curiosities</h2>
          <span>Writing</span>
        </div>
        {(allNotes ? writing : writing.slice(0, 4)).map((post) => (
          <a
            className="post"
            href={post.link}
            key={post.link}
            target="_blank"
            rel="noreferrer"
          >
            <span>{post.title} ↗</span>
            <small>{post.topic}</small>
          </a>
        ))}
        <button
          className="more-notes"
          onClick={() => setAllNotes(!allNotes)}
          aria-expanded={allNotes}
        >
          {allNotes ? "Fewer notes −" : `All ${writing.length} notes +`}
        </button>
      </section>
      <section className="footnotes">
        <div>
          <h2>Foundations</h2>
          {education.map((item) => (
            <p key={item.school}>
              {item.degree}
              <br />
              {item.school}
              <br />
              <small>{item.period}</small>
            </p>
          ))}
          <details>
            <summary>
              Certifications <span>＋</span>
            </summary>
            <ul>
              {certifications.map((cert) => (
                <li key={cert.title}>
                  <a href={cert.link} target="_blank" rel="noreferrer">
                    {cert.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
        <div>
          <h2>Off the clock</h2>
          <p>
            {interests.join(", ")}. A fascination with Earth, the solar system,
            and the Milky Way. And a little Silicon Valley humor.
          </p>
        </div>
      </section>
      <section id="contact" className="contact">
        <h2>Have something in mind?</h2>
        <p>Always happy to talk about interesting problems.</p>
        <a href={contact.email}>Say hello ↗</a>
      </section>
      <footer>
        <span>© {new Date().getFullYear()} Pritom Purkayasta</span>
        <span>Made on Earth.</span>
      </footer>
    </main>
  );
}
