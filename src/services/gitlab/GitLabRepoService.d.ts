declare class GitLabRepoService {
    constructor(token: string);
    /**
     * Searches for repositories of a user.
     * @param username Name of the user.
     */
    getRepos(username: string): Promise<any>;
    /**
     * Fetches information about a repository.
     * @param repo Name of the repository.
     */
    getRepo(repo: string): Promise<any>;
}

export = GitLabRepoService;