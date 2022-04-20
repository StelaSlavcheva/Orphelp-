const host = 'http://localhost:3030';

const crudEndpoints = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
};

async function request(url, options) {

  try {
    const response = await fetch(host + url, options);

    if (response.ok == false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return response;
    }
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

function getOptions(method = "get", body) {
  const options = {
    method,
    headers: {},
  };

  if (body != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const token = sessionStorage.getItem("authToken");
  if (token != null) {
    options.headers["X-Authorization"] = token;
  }

  return options;
}

export async function get(url) {
  return await request(url, getOptions());
}

export async function post(url, data) {
  return await request(url, getOptions("post", data));
}
export async function put(url, data) {
  return await request(url, getOptions("put", data));
}
export async function del(url) {
  return await request(url, getOptions("delete"));
}

export async function login(email, password) {

  const result = await post(crudEndpoints.login, {
    email,
    password,
  });
  sessionStorage.setItem("email", result.email);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);
  return result;
}

export async function register(email, password) {

  const result = await post(crudEndpoints.register, { email, password });
  sessionStorage.setItem("email", result.email);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);
  return result;
}

export async function logout() {
  const result = await get(crudEndpoints.logout);
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userId");
  return result;
}
