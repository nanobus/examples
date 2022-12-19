// This file needs to be generated from the apex.

export interface User {
  handle: string;
}

function options(method, body) {
  let opts: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
    },
    credentials: "include",
  };
  if (body) {
    opts.body = JSON.stringify(body);
    opts.headers["Content-Type"] = "application/json";
  }
  return opts;
}

function post(body) {
  return options("POST", body);
}

function deleteJot (jotID) {
  return options("DELETE", jotID);
}

function likeJot (jotID) {
  return options("GET", jotID);
}

function getFollows (handle) {
  return options("GET", handle);
}

function getFollowers (handle) {
  return options("GET", handle);
}

class Api {
  url: string;

  constructor(url) {
    this.url = url;
  }

  getFeed() {
    return fetch(`${this.url}/jots`, {
      credentials: "include",
    });
  }

  post(message) {
    // @ts-ignore
    return fetch(`${this.url}/jots`, post({ message }));
  }

  deleteJot(jotID) {
    // @ts-ignore
    return fetch(`${this.url}/jots/` + jotID, deleteJot({ jotID }));
  }

  likeJot(jotID) {
    // @ts-ignore
    return fetch(`${this.url}/jots/` + jotID + '/likes');
  }

  getFollows(handle) {
    // @ts-ignore
    return fetch(`${this.url}/users/` + handle + '/follows',getFollows({handle}));
  }

  getFollowers(handle) {
    // @ts-ignore
    return fetch(`${this.url}/users/` + handle + '/followers', getFollowers({handle}));
  }
}

export const api = new Api("http://localhost:8080/v1");
