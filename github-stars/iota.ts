// deno-lint-ignore-file no-unused-vars ban-unused-ignore
export * from "file:///Users/pkedy/go/src/github.com/nanobus/nanobus/config/ts/mod.ts";
import {
  Application,
  Authorization,
  callInterface,
  callProvider,
  CloudEvent,
  Entity,
  Flow,
  Handler,
  Handlers,
  Operations,
  Response,
  Step,
  toDataExpr
} from "file:///Users/pkedy/go/src/github.com/nanobus/nanobus/config/ts/mod.ts";

export const types = {
  StarEvent: "github.webhooks.v1::StarEvent" as Entity,
  Enterprise: "github.webhooks.v1::Enterprise" as Entity,
  GitHubApp: "github.webhooks.v1::GitHubApp" as Entity,
  Organization: "github.webhooks.v1::Organization" as Entity,
  Repository: "github.webhooks.v1::Repository" as Entity,
  Permissions: "github.webhooks.v1::Permissions" as Entity,
  License: "github.webhooks.v1::License" as Entity,
  User: "github.webhooks.v1::User" as Entity,
  Action: "github.webhooks.v1::Action" as Entity,
  MergeCommitTitle: "github.webhooks.v1::MergeCommitTitle" as Entity,
  MergeCommitMessage: "github.webhooks.v1::MergeCommitMessage" as Entity,
  CommitTitle: "github.webhooks.v1::CommitTitle" as Entity,
  CommitMessage: "github.webhooks.v1::CommitMessage" as Entity,
  Visibility: "github.webhooks.v1::Visibility" as Entity
};

export interface WebhooksOper {
  star?: Flow<StarEvent> | Step[];
}

export interface WebhooksAuth {
  star?: Authorization;
}

export const Webhooks = {
  $interface: "github.webhooks.v1.Webhooks",
  star: "github.webhooks.v1.Webhooks::star" as Handler,

  register(app: Application, iface: WebhooksOper): void {
    app.interface(Webhooks.$interface, (iface as unknown) as Operations);
  },

  authorize(app: Application, auths: WebhooksAuth): void {
    app.authorize(Webhooks.$interface, auths as Record<string, Authorization>);
  }
};

export const webhooksClient = {
  star(event: StarEvent): Response<unknown> {
    const dataExpr = `{
 "event": ${toDataExpr(event)}
}`;
    return callInterface(Webhooks.star, dataExpr) as Response<unknown>;
  }
};

export interface StarEvent {
  action: Action;
  enterprise?: Enterprise;
  installation?: GitHubApp;
  organization?: Organization;
  repository: Repository;
  sender: User;
  starred_at?: Date;
}

export interface Enterprise {
  id: number;
  slug: string;
  name: string;
  node_id: string;
  avatar_url?: string;
  description?: string;
  website_url?: string;
  html_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface GitHubApp {
  // Unique identifier of the GitHub app
  id: number;
  // The slug name of the GitHub app
  slug?: string;
  node_id: string;
  owner?: User;
  // The name of the GitHub app
  name: string;
  description?: string;
  external_url: string;
  html_url: string;
  created_at: Date;
  updated_at: Date;
  permissions: Map<string, string>;
  // The list of events for the GitHub app
  events: Array<string>;
  installations_count?: number;
  client_id?: string;
  client_secret?: string;
  webhook_secret?: string;
  pem?: string;
}

export interface Organization {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description?: string;
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  license?: License;
  forks: number;
  permissions: Permissions;
  owner: User;
  private: boolean;
  html_url: string;
  description?: string;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url?: string;
  hooks_url: string;
  svn_url: string;
  homepage?: string;
  language?: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template: boolean;
  topics: Array<string>;
  // Whether issues are enabled.
  has_issues: boolean;
  // Whether projects are enabled.
  has_projects: boolean;
  // Whether the wiki is enabled.
  has_wiki: boolean;
  has_pages: boolean;
  // Whether downloads are enabled.
  has_downloads: boolean;
  // Whether discussions are enabled.
  has_discussions: boolean;
  // Whether the repository is archived.
  archived: boolean;
  // Returns whether or not this repository disabled.
  disabled: boolean;
  visibility: Visibility;
  pushed_at?: Date;
  created_at?: Date;
  updated_at?: Date;
  // Whether to allow rebase merges for pull requests.
  allow_rebase_merge: boolean;
  template_repository?: Repository;
  temp_clone_token: string;
  // Whether to allow squash merges for pull requests.
  allow_squash_merge: boolean;
  // Whether to allow Auto-merge to be used on pull requests.
  allow_auto_merge: boolean;
  // Whether to delete head branches when pull requests are merged.
  delete_branch_on_merge: boolean;
  // Whether or not a pull request head branch that is behind its base branch can
  // always be updated even if it is not required to be up to date before merging.
  allow_update_branch: boolean;
  // Whether a squash merge commit can use the pull request title as default. **This
  // property has been deprecated. Please use `squash_merge_commit_title` instead.
  use_squash_pr_title_as_default: boolean;
  // The default value for a squash merge commit title:
  //
  // - `PR_TITLE` - default to the pull request's title. - `COMMIT_OR_PR_TITLE` -
  // default to the commit's title (if only one commit) or the pull request's title
  // (when more than one commit).
  squash_merge_commit_title: CommitTitle;
  // The default value for a squash merge commit message:
  //
  // - `PR_BODY` - default to the pull request's body. - `COMMIT_MESSAGES` - default
  // to the branch's commit messages. - `BLANK` - default to a blank commit message.
  squash_merge_commit_message: CommitMessage;
  // The default value for a merge commit title. - `PR_TITLE` - default to the pull
  // request's title. - `MERGE_MESSAGE` - default to the classic title for a merge
  // message (e.g., Merge pull request #123 from branch-name).
  merge_commit_title: MergeCommitTitle;
  // The default value for a merge commit message. - `PR_TITLE` - default to the pull
  // request's title. - `PR_BODY` - default to the pull request's body. - `BLANK` -
  // default to a blank commit message.
  merge_commit_message: MergeCommitMessage;
  // Whether to allow merge commits for pull requests.
  allow_merge_commit: boolean;
  allow_forking: boolean;
  // Whether to require contributors to sign off on web-based commits
  web_commit_signoff_required: boolean;
  subscribers_count: number;
  network_count: number;
  open_issues: number;
  watchers: number;
  master_branch: string;
  starred_at?: Date;
  // Whether anonymous git access is enabled for this repository
  anonymous_access_enabled: boolean;
}

export interface Permissions {
  admin: boolean;
  pull: boolean;
  triage: boolean;
  push: boolean;
  maintain: boolean;
}

export interface License {
  key: string;
  name: string;
  url?: string;
  spdx_id?: string;
  node_id: string;
  html_url: string;
}

export interface User {
  name?: string;
  email?: string;
  login?: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id?: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at: Date;
}

export enum Action {
  Created = 1,
  Deleted = 2
}

export enum MergeCommitTitle {
  Pr = 1,
  MergeMessage = 2
}

export enum MergeCommitMessage {
  PrBody = 1,
  PrTitle = 2,
  Blank = 3
}

export enum CommitTitle {
  Pr = 1,
  CommitOrPr = 2
}

export enum CommitMessage {
  Pr = 1,
  CommitMessages = 2,
  Blank = 3
}

export enum Visibility {
  Public = 1,
  Private = 2,
  Internal = 3
}

export const interfaces = {
  Webhooks
};
