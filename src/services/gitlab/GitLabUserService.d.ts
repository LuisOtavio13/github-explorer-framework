declare class GitLabUserService {
    constructor(token: string);
    /**
     * Fetches information about a user.
     * @param username The username.
     */
    getUser(username: string): Promise<any>;
}

export = GitLabUserService;