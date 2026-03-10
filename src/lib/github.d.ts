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
export declare function fetchGitHubProfile(username: string): Promise<GitHubProfile>;
export declare function fetchPinnedRepos(username: string, limit?: number): Promise<PinnedRepoResult>;
export declare function fetchContributionData(username: string): Promise<ContributionData>;
