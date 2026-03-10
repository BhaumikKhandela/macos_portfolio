import { useEffect, useMemo, useState } from "react";
import { ExternalLinkIcon, GitForkIcon, StarIcon } from "lucide-react";
import { WindowControls } from "../components";
import WindowWrapper from "../components/hoc/WindowWrapper";
import {
  fetchContributionData,
  fetchGitHubProfile,
  fetchPinnedRepos,
  type ContributionData,
  type GitHubProfile,
  type PinnedRepoResult,
} from "../lib/github";

const USERNAME = "BhaumikKhandela";

const FALLBACK_HEATMAP_ROWS = 7;
const FALLBACK_HEATMAP_COLUMNS = 53;
const TARGET_PINNED = ["ATHENA", "ROME", "Luc", "Luc-desktop"];

const normalizeRepoName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, "");

const GitHub = () => {
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
          fetchGitHubProfile(USERNAME),
          fetchPinnedRepos(USERNAME),
          fetchContributionData(USERNAME),
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
      return contributions.weeks;
    }

    return Array.from({ length: FALLBACK_HEATMAP_COLUMNS }, (_, weekIndex) =>
      Array.from({ length: FALLBACK_HEATMAP_ROWS }, (_, dayIndex) => ({
        date: `${weekIndex}-${dayIndex}`,
        count: 0,
        color: "#ebedf0",
      }))
    );
  }, [contributions]);

  const visiblePinnedRepos = useMemo(() => {
    if (!repos?.repos?.length) return [];

    const normalizedTargetOrder = TARGET_PINNED.map((name) =>
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
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2 className="font-semibold text-gray-600">github.com/{USERNAME}</h2>
      </div>

      <div className="github-content">
        <section className="github-profile-card">
          {profileLoading ? (
            <div className="animate-pulse flex gap-4 items-start">
              <div className="size-16 rounded-full bg-gray-200" />
              <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ) : profileError || !profile ? (
            <p className="text-sm text-red-500">{profileError}</p>
          ) : (
            <div className="flex gap-4 items-start">
              <img
                src={profile.avatarUrl}
                alt={`${profile.login} avatar`}
                className="size-16 rounded-full border border-gray-200"
              />
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-900">
                  {profile.name ?? profile.login}
                </p>
                <a
                  href={profile.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  @{profile.login}
                  <ExternalLinkIcon className="size-3.5" />
                </a>
                {profile.bio ? (
                  <p className="text-sm text-gray-600">{profile.bio}</p>
                ) : null}
                <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-1">
                  <span>{profile.publicRepos} repositories</span>
                  <span>{profile.followers} followers</span>
                  <span>{profile.following} following</span>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="github-section">
          <div className="github-section-header">
            <h3>Contribution activity</h3>
            {!contributionsLoading && contributions ? (
              <p>{contributions.total} contributions in the last year</p>
            ) : null}
          </div>
          {contributionsError ? (
            <p className="text-sm text-red-500">{contributionsError}</p>
          ) : (
            <div className="github-heatmap" aria-label="GitHub contributions heatmap">
              {heatmapGrid.map((week, weekIndex) => (
                <div className="github-heatmap-column" key={`week-${weekIndex}`}>
                  {week.map((day) => (
                    <span
                      key={day.date}
                      className="github-heatmap-day"
                      style={{ backgroundColor: day.color || "#ebedf0" }}
                      title={`${day.count} contribution${
                        day.count === 1 ? "" : "s"
                      } on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="github-section">
          <div className="github-section-header">
            <h3>Pinned projects</h3>
          </div>
          {reposError ? (
            <p className="text-sm text-red-500">{reposError}</p>
          ) : reposLoading ? (
            <div className="github-repos-grid">
              {Array.from({ length: 4 }).map((_, index) => (
                <article key={index} className="github-repo-card animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-4/5 mb-4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </article>
              ))}
            </div>
          ) : visiblePinnedRepos.length > 0 ? (
            <div className="github-repos-grid">
              {visiblePinnedRepos.map((repo) => (
                <article key={repo.url} className="github-repo-card">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-repo-title"
                  >
                    {repo.name}
                    <ExternalLinkIcon className="size-3.5" />
                  </a>
                  <p className="github-repo-description">
                    {repo.description ?? "No description provided."}
                  </p>
                  <div className="github-repo-meta">
                    <span>{repo.language ?? "N/A"}</span>
                    <span className="inline-flex items-center gap-1">
                      <StarIcon className="size-3.5" />
                      {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitForkIcon className="size-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Selected pinned projects are not available yet.
            </p>
          )}
        </section>
      </div>
    </>
  );
};

const GitHubWindow = WindowWrapper(GitHub, "photos");

export default GitHubWindow;
