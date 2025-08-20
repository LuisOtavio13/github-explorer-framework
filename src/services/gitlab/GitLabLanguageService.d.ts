declare class GitLabRepoService {
    constructor(token: string);
    /**
     * Retrieves a user's repositories.
     * @param username Name of the user.
     */

    getRepos(username: string): Promise<any>;
            /**
             * Retrieves information about a repository.
             * @param repo Name of the repository.
             */
    getRepo(repo: string): Promise<any>;
}

export = GitLabRepoService;