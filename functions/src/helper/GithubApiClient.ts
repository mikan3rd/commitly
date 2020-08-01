import * as fs from "fs";
import * as path from "path";
import * as os from "os";

import * as jwt from "jsonwebtoken";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import axios from "axios";

const GITHUB_ENV = functions.config().github;

const APP_ID = GITHUB_ENV.app_id;
const privateKeyFilePath = "github_app.pem";
const BaseUrl = "https://api.github.com";

type CommitResponseType = {
  sha: string;
  commit: { committer: { date: string }; message: string };
  committer: { id: number; login: string };
  stats: { additions: number; deletions: number; total: number };
  files: {
    filename: string;
    additions: number;
    deletions: number;
    changes: number;
    patch: string;
  }[];
};

export class GithubApiClient {
  appToken?: string;
  repositoryInstallationToken?: string;

  async setAppToken() {
    const bucket = admin.storage().bucket();
    const tempFilePath = path.join(os.tmpdir(), privateKeyFilePath);
    await bucket.file(`credentials/${privateKeyFilePath}`).download({ destination: tempFilePath });

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 10;
    const token = { iat, exp, iss: APP_ID };
    const privateKey = fs.readFileSync(tempFilePath);
    const appToken = jwt.sign(token, privateKey, { algorithm: "RS256" });

    this.appToken = appToken;
  }

  async setRepositoryInstallationToken(owner: string, repo: string) {
    const url = `${BaseUrl}/repos/${owner}/${repo}/installation`;
    const {
      data: { access_tokens_url },
    } = await axios.get(url, { headers: this.appHeader });

    const {
      data: { token },
    } = await axios.post(access_tokens_url, null, { headers: this.appHeader });

    this.repositoryInstallationToken = token;
  }

  async getCommit(owner: string, repo: string, commitId: string) {
    const url = `${BaseUrl}/repos/${owner}/${repo}/commits/${commitId}`;
    return await axios.get<CommitResponseType>(url, { headers: this.installationHeader });
  }

  private get appHeader() {
    if (!this.appToken) {
      throw Error("appToken required");
    }
    return {
      Authorization: `Bearer ${this.appToken}`,
      Accept: "application/vnd.github.machine-man-preview+json",
    };
  }

  private get installationHeader() {
    if (!this.repositoryInstallationToken) {
      throw Error("repositoryInstallationToken required");
    }
    return {
      Authorization: `Bearer ${this.repositoryInstallationToken}`,
      Accept: "application/vnd.github.machine-man-preview+json",
    };
  }
}
