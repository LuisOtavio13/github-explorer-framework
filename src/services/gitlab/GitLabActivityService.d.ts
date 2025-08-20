declare class GitLabActivityService {
    constructor(token: string);
    /**
     * Retrieves user activities on GitLab.
     * @param username Name of the user.
     */

    getUserActivity(username: string): Promise<any>;
}

export = GitLabActivityService;