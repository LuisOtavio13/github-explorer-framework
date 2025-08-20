declare class GitLabContributionService {
    constructor(token: string);
   /**
 * Retrieves a user's contributions.
 * @param username Name of the user.
 */

    getContributions(username: string): Promise<any>;
}

export = GitLabContributionService;