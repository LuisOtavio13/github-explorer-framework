declare class GitLabCommitService {
    constructor(token: string);
    /**
     * Retrieves commits from a repository.
     * @param repo Name of the repository.
     */

    getCommits(repo: string): Promise<any>;
}

export = GitLabCommitService;
