import { useEffect, useMemo, useState } from "react";
import { blogPosts, socials, techStack, locations } from "../constants";
import {
  fetchContributionData,
  fetchGitHubProfile,
  fetchPinnedRepos,
  type ContributionData,
  type GitHubProfile,
  type PinnedRepoResult,
} from "../lib/github";

type MobileAppKey =
  | "home"
  | "projects"
  | "skills"
  | "github"
  | "contact"
  | "resume"
  | "about";

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const GITHUB_USERNAME = "BhaumikKhandela";
const MOBILE_HEATMAP_ROWS = 7;
const MOBILE_HEATMAP_COLUMNS = 32;
const MOBILE_TARGET_PINNED = ["ATHENA", "ROME", "Luc", "Luc-desktop"] as const;

const normalizeRepoName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const MobileProjectsApp = () => (
  <div className="mobile-app-screen">
    <div className="mobile-safari-search">
      <span className="mobile-safari-dot" />
      <input
        type="text"
        placeholder="Search or enter website name"
        readOnly
      />
    </div>
    <div className="space-y-3">
      {blogPosts.map((post) => (
        <article key={post.id} className="mobile-safari-card">
          <div className="mobile-safari-thumb">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="mobile-safari-body">
            <p className="mobile-safari-title">{post.title}</p>
            <p className="mobile-safari-meta">{post.date}</p>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-safari-link"
            >
              Open
            </a>
          </div>
        </article>
      ))}
    </div>
  </div>
);

const MobileSkillsApp = () => (
  <div className="mobile-app-screen">
    <div className="mobile-skills">
      {techStack.map(({ category, items }) => (
        <section key={category} className="mobile-skills-card">
          <p className="mobile-skills-category">{category}</p>
          <ul className="mobile-skills-list">
            {items.map((item) => (
              <li key={item} className="mobile-skills-pill">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </div>
);

const MobileGitHubApp = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [repos, setRepos] = useState<PinnedRepoResult | null>(null);
  const [reposError, setReposError] = useState<string | null>(null);
  const [reposLoading, setReposLoading] = useState(true);

  const [contributions, setContributions] = useState<ContributionData | null>(null);
  const [contributionsError, setContributionsError] = useState<string | null>(null);
  const [contributionsLoading, setContributionsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setProfileLoading(true);
      setReposLoading(true);
      setContributionsLoading(true);

      const [profileResult, reposResult, contributionsResult] =
        await Promise.allSettled([
          fetchGitHubProfile(GITHUB_USERNAME),
          fetchPinnedRepos(GITHUB_USERNAME),
          fetchContributionData(GITHUB_USERNAME),
        ]);

      if (!isMounted) return;

      if (profileResult.status === "fulfilled") {
        setProfile(profileResult.value);
        setProfileError(null);
      } else {
        setProfileError("Could not load profile details right now.");
      }
      setProfileLoading(false);

      if (reposResult.status === "fulfilled") {
        setRepos(reposResult.value);
        setReposError(null);
      } else {
        setReposError("Could not load pinned projects.");
      }
      setReposLoading(false);

      if (contributionsResult.status === "fulfilled") {
        setContributions(contributionsResult.value);
        setContributionsError(null);
      } else {
        setContributionsError("Could not load contribution activity.");
      }
      setContributionsLoading(false);
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  const heatmapGrid = useMemo(() => {
    if (contributions?.weeks?.length) {
      const weeks = contributions.weeks;
      return weeks.slice(Math.max(0, weeks.length - MOBILE_HEATMAP_COLUMNS));
    }

    return Array.from({ length: MOBILE_HEATMAP_COLUMNS }, (_, weekIndex) =>
      Array.from({ length: MOBILE_HEATMAP_ROWS }, (_, dayIndex) => ({
        date: `${weekIndex}-${dayIndex}`,
        count: 0,
        color: "#ebedf0",
      }))
    );
  }, [contributions]);

  const visiblePinnedRepos = useMemo(() => {
    if (!repos?.repos?.length) return [];

    const normalizedTargetOrder = MOBILE_TARGET_PINNED.map((name) =>
      normalizeRepoName(name)
    );
    const allowed = new Set<string>(normalizedTargetOrder);

    return repos.repos
      .filter((repo) => allowed.has(normalizeRepoName(repo.name)))
      .sort(
        (left, right) =>
          normalizedTargetOrder.indexOf(normalizeRepoName(left.name)) -
          normalizedTargetOrder.indexOf(normalizeRepoName(right.name))
      );
  }, [repos]);

  return (
    <div className="mobile-app-screen">
      <section className="mobile-github-card">
        {profileLoading ? (
          <div className="mobile-github-header">
            <div className="mobile-github-avatar" />
            <div className="space-y-1 flex-1">
              <div className="h-3 rounded bg-slate-200 w-1/2" />
              <div className="h-2 rounded bg-slate-200 w-2/3" />
            </div>
          </div>
        ) : profileError || !profile ? (
          <p className="text-xs text-red-500">{profileError}</p>
        ) : (
          <>
            <div className="mobile-github-header">
              <img
                src={profile.avatarUrl}
                alt={profile.login}
                className="mobile-github-avatar-img"
              />
              <div>
                <p className="mobile-github-username">
                  {profile.name ?? profile.login}
                </p>
                <p className="mobile-github-text">@{profile.login}</p>
              </div>
            </div>
            {profile.bio ? (
              <p className="mobile-github-text mt-1">{profile.bio}</p>
            ) : null}
            <a
              href={profile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-github-button"
            >
              Open GitHub
            </a>
          </>
        )}
      </section>

      <section className="mobile-github-card">
        <p className="mobile-github-section-title">Pinned</p>
        {reposError ? (
          <p className="text-xs text-red-500 mt-1">{reposError}</p>
        ) : reposLoading ? (
          <div className="mobile-github-list">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="mobile-github-pin-skeleton" />
            ))}
          </div>
        ) : visiblePinnedRepos.length > 0 ? (
          <div className="mobile-github-list">
            {visiblePinnedRepos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-github-pin-card"
              >
                <div>
                  <p className="mobile-github-pin-title">{repo.name}</p>
                  {repo.description ? (
                    <p className="mobile-github-pin-desc">{repo.description}</p>
                  ) : null}
                  <p className="mobile-github-pin-meta">
                    {repo.language ?? "TypeScript"} · ★ {repo.stars}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 mt-1">
            No pinned repositories found.
          </p>
        )}
      </section>

      <section className="mobile-github-card">
        <div className="flex items-center justify-between mb-2">
          <p className="mobile-github-section-title">Contributions</p>
          {!contributionsLoading && contributions ? (
            <p className="mobile-github-contrib-summary">
              {contributions.total} in the last year
            </p>
          ) : null}
        </div>
        {contributionsError ? (
          <p className="text-xs text-red-500">{contributionsError}</p>
        ) : (
          <div className="mobile-github-heatmap">
            {heatmapGrid.map((week, weekIndex) => (
              <div
                className="mobile-github-heatmap-column"
                key={`week-${weekIndex}`}
              >
                {week.map((day) => (
                  <span
                    key={day.date}
                    className="mobile-github-heatmap-day"
                    style={{ backgroundColor: day.color || "#ebedf0" }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const MobileContactApp = () => {
  const email = "contact@bhaumikkhandela02@gmail.com";
  const github = socials.find((s) => s.text.toLowerCase().includes("github"));
  const twitter = socials.find((s) => s.text.toLowerCase().includes("twitter"));
  const linkedin = socials.find((s) => s.text.toLowerCase().includes("linkedin"));

  return (
    <div className="mobile-app-screen">
      <div className="mobile-contact-header">
        <div className="mobile-contact-avatar">B</div>
        <p className="mobile-contact-name">Bhaumik Khandela</p>
        <p className="mobile-contact-note">
          Available for projects and collaborations.
        </p>
      </div>

      <div className="mobile-contact-list">
        <a href={`mailto:${email}`} className="mobile-contact-row">
          <div>
            <p className="mobile-contact-row-label">Email</p>
            <p className="mobile-contact-row-value">{email}</p>
          </div>
        </a>

        {github && (
          <a href={github.link} target="_blank" rel="noopener noreferrer" className="mobile-contact-row">
            <div>
              <p className="mobile-contact-row-label">GitHub</p>
              <p className="mobile-contact-row-value">{github.text}</p>
            </div>
          </a>
        )}

        {twitter && (
          <a href={twitter.link} target="_blank" rel="noopener noreferrer" className="mobile-contact-row">
            <div>
              <p className="mobile-contact-row-label">X (Twitter)</p>
              <p className="mobile-contact-row-value">{twitter.text}</p>
            </div>
          </a>
        )}

        {linkedin && (
          <a href={linkedin.link} target="_blank" rel="noopener noreferrer" className="mobile-contact-row">
            <div>
              <p className="mobile-contact-row-label">LinkedIn</p>
              <p className="mobile-contact-row-value">{linkedin.text}</p>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};

const MobileResumeApp = () => (
  <div className="mobile-app-screen">
    <div className="mobile-resume-card">
      <p className="mobile-resume-title">Resume.pdf</p>
      <p className="mobile-resume-text">
        View or share my latest resume as a PDF.
      </p>
      <a
        href="/files/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-resume-button"
      >
        Open Resume
      </a>
    </div>
  </div>
);

const MobileAboutApp = () => {
  const aboutFolder = locations.about.children.find((c) => c.fileType === "txt");
  const description = Array.isArray(aboutFolder?.description)
    ? aboutFolder?.description
    : [];

  return (
    <div className="mobile-app-screen">
      <article className="mobile-notes">
        <header className="mobile-notes-header">
          <p className="mobile-notes-subtitle">About</p>
          <h1 className="mobile-notes-title">
            {aboutFolder?.subtitle ?? "About me"}
          </h1>
          <p className="mobile-notes-tags">#developer  #fullstack  #ai</p>
        </header>
        <section className="mobile-notes-body">
          {description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </section>
        <footer className="mobile-notes-toolbar">
          <span className="mobile-notes-dot" />
          <span className="mobile-notes-dot" />
          <span className="mobile-notes-dot" />
        </footer>
      </article>
    </div>
  );
};

const MobileShell = () => {
  const [activeApp, setActiveApp] = useState<MobileAppKey>("home");

  const apps: { key: MobileAppKey; label: string; icon: string }[] = [
    { key: "projects", label: "Projects", icon: "/images/safari.png" },
    { key: "skills", label: "Skills", icon: "/images/terminal.png" },
    { key: "github", label: "GitHub", icon: "/images/github.png" },
    { key: "contact", label: "Contact", icon: "/images/contact.png" },
    { key: "resume", label: "Resume", icon: "/images/resume.png" },
    { key: "about", label: "About", icon: "/images/apple-notes.png" },
  ];

  const renderContent = () => {
    switch (activeApp) {
      case "projects":
        return <MobileProjectsApp />;
      case "skills":
        return <MobileSkillsApp />;
      case "github":
        return <MobileGitHubApp />;
      case "contact":
        return <MobileContactApp />;
      case "resume":
        return <MobileResumeApp />;
      case "about":
        return <MobileAboutApp />;
      case "home":
      default:
        return (
          <div className="flex-1 flex items-end">
            <div className="mobile-home-grid">
              {apps.map((app) => (
                <button
                  key={app.key}
                  type="button"
                  className="mobile-app-icon"
                  onClick={() => setActiveApp(app.key)}
                >
                  <div className="mobile-app-icon-inner">
                    <img
                      src={app.icon}
                      alt={app.label}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="mobile-app-label">
                    {app.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  const showBack = activeApp !== "home";
  const headerTitle =
    activeApp === "home"
      ? "Bhaumik's iPhone"
      : apps.find((app) => app.key === activeApp)?.label ?? "Back";

  return (
    <section id="mobile-shell" className="sm:hidden">
      <div className="mobile-status-bar">
        <span className="text-[11px]">{formatTime()}</span>
        <div className="flex items-center gap-1 text-[10px] text-slate-700">
          <span className="inline-block w-2 h-2 rounded-full bg-slate-200" />
          <span className="inline-block w-3 h-2 rounded-sm border border-slate-200" />
        </div>
      </div>

      {activeApp === "home" ? (
        <div className="mobile-widget">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-500">Portfolio</p>
            <p className="text-base font-semibold text-slate-900">
              Bhaumik Khandela
            </p>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <button
              type="button"
              className="mobile-widget-pill"
              onClick={() => setActiveApp("projects")}
            >
              Projects
            </button>
            <button
              type="button"
              className="mobile-widget-pill"
              onClick={() => setActiveApp("contact")}
            >
              Contact
            </button>
            <button
              type="button"
              className="mobile-widget-pill"
              onClick={() => setActiveApp("resume")}
            >
              Resume
            </button>
          </div>
        </div>
      ) : (
        <header className="mobile-app-header">
          {showBack ? (
            <button
              type="button"
              className="text-xs text-sky-300"
              onClick={() => setActiveApp("home")}
            >
              &lt; Home
            </button>
          ) : (
            <span />
          )}
          <h1 className="text-sm font-semibold text-slate-900 text-center flex-1">
            {headerTitle}
          </h1>
          <span className="w-6" />
        </header>
      )}

      <main className="mobile-shell-main">{renderContent()}</main>

      <div className="mobile-home-indicator" />
    </section>
  );
};

export default MobileShell;

