import { Promise } from "es6-promise";
import * as fetch from "node-fetch";

export declare interface BotOwner {
  id: string;
  name: string;
}

export declare interface Bot {
  id: string;
  name: string;
  tag: string;
  prefix: string;
  upvotes: number;
  serverCount?: number;
  verified: boolean;
  avatar?: string;
  tags?: Array<string>;
  ShortDescription?: string;
  LongDescription?: string;
  owner: BotOwner;
}

declare interface options {
  baseURL?: string = "https://blackerz.herokuapp.com";
  AuthorizationV1?: string = null;
}

declare interface editData {
  prefix?: string;
  tags?: Array<string>;
  shortDescription?: string;
  longDescription?: string;
}

export declare interface APIResponse {
  sucess?: boolean;
  warns?: Array<string>;
  error?: string;
}

/**
 * Get bot data
 * @param {string|number} id - Bot id
 * @returns {Promise<Bot>}
 */
export function botData<T>(id: (number | string)): Promise<Bot>;

/**
 * Authorizing requests
 * @param {string} Auth - Authorization V1, obtain from blackerz website profile page
 * @param {string|number?} authorID - Optional, Owner user ID
 * @returns {undefined}
 */
export function Authorize(Auth: string, authorID?: (string | number));

export class bot {
  /**
   * Create bot class
   * @param id Bot user id from discord
   * @param option any options
   */
  constructor(id: (number | string), option?: options);
  botData(): Bot;
  edit(data: editData = {}): Promise<APIResponse>;
  checkVote(userId: (string | number)): Promise<boolean>;
  middleware(key?: (string | number)): Function;
}

export class webhook {
  constructor(key: string);
  middleware(key?: string = this.key);
}
