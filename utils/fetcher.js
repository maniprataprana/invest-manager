//const localStorageKey = "__portfoliotoken__";
function fetcher(endpoint, { body, ...customConfig } = {}) {
  //const token = window.localStorage.getItem(localStorageKey);
  const headers = { "content-type": "application/json" };
  //   if (token) {
  //     headers.Authorization = `Bearer ${token}`;
  //   }
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  console.log(config);
  return window.fetch(`${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      //logout();
      // window.location.assign(window.location);
      return;
    }
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}

// function logout() {
//   window.localStorage.removeItem(localStorageKey);
// }

export default fetcher;
