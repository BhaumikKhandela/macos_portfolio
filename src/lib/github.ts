const GITHUB_API_BASE = "https://api.github.com";
const PINNED_REPOS_ENDPOINT = "https://gh-pinned-repos.egoist.dev";
const CONTRIBUTIONS_ENDPOINT = "https://github-contributions-api.deno.dev";
const CONTRIBUTIONS_FALLBACK_ENDPOINT =
  "https://github-contributions-api.jogruber.de/v4";

export type GitHubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  htmlUrl: string;
};

export type PinnedRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
};

export type PinnedRepoResult = {
  repos: PinnedRepo[];
  source: "pinned" | "featured";
};

export type ContributionDay = {
  date: string;
  count: number;
  color: string;
};

export type ContributionData = {
  total: number;
  weeks: ContributionDay[][];
};

type GitHubApiProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
};

type GitHubApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  archived: boolean;
  fork: boolean;
  pushed_at: string;
};

type PinnedApiRepo = {
  repo?: string;
  name?: string;
  description?: string | null;
  language?: string | null;
  stars?: number;
  forks?: number;
  link?: string;
};

type ContributionsApiDay = {
  color: string;
  contributionCount: number;
  date: string;
};

type ContributionsApiPayload = {
  contributions: ContributionsApiDay[][];
  totalContributions: number;
};

type ContributionsFallbackDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionsFallbackPayload = {
  total: {
    lastYear: number;
  };
  contributions: ContributionsFallbackDay[];
};

const FALLBACK_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }

  return (await response.json()) as T;
}

function chunkByWeek(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];

  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }

  return weeks;
}

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile> {
  const data = await fetchJson<GitHubApiProfile>(
    `${GITHUB_API_BASE}/users/${username}`
  );

  return {
    login: data.login,
    name: data.name,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
    htmlUrl: data.html_url,
  };
}

export async function fetchPinnedRepos(
  username: string,
  limit = 6
): Promise<PinnedRepoResult> {
  try {
    const pinned = await fetchJson<PinnedApiRepo[]>(
      `${PINNED_REPOS_ENDPOINT}/?username=${username}`
    );

    const repos = pinned
      .map((repo) => ({
        name: repo.repo ?? repo.name ?? "",
        description: repo.description ?? null,
        language: repo.language ?? null,
        stars: repo.stars ?? 0,
        forks: repo.forks ?? 0,
        url: repo.link ?? `https://github.com/${username}`,
      }))
      .filter((repo) => repo.name.length > 0)
      .slice(0, limit);

    if (repos.length > 0) {
      return { repos, source: "pinned" };
    }
  } catch {
    // Fall through to featured repos from official GitHub API.
  }

  const repos = await fetchJson<GitHubApiRepo[]>(
    `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`
  );

  const featured = repos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((left, right) => {
      const starsDiff = right.stargazers_count - left.stargazers_count;
      if (starsDiff !== 0) return starsDiff;

      return (
        new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime()
      );
    })
    .slice(0, limit)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
    }));

  return { repos: featured, source: "featured" };
}

export async function fetchContributionData(
  username: string
): Promise<ContributionData> {
  try {
    const primary = await fetchJson<ContributionsApiPayload>(
      `${CONTRIBUTIONS_ENDPOINT}/${username}.json`
    );

    const weeks = primary.contributions.map((week) =>
      week.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        color: day.color,
      }))
    );

    return {
      total: primary.totalContributions,
      weeks,
    };
  } catch {
    const fallback = await fetchJson<ContributionsFallbackPayload>(
      `${CONTRIBUTIONS_FALLBACK_ENDPOINT}/${username}?y=last`
    );

    const days: ContributionDay[] = fallback.contributions.map((day) => ({
      date: day.date,
      count: day.count,
      color: FALLBACK_COLORS[Math.max(0, Math.min(4, day.level))],
    }));

    return {
      total: fallback.total.lastYear,
      weeks: chunkByWeek(days),
    };
  }
}
