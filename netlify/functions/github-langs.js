const fetch = require("node-fetch");

exports.handler = async function () {
  const token = process.env.GITHUB_TOKEN;
  const username = "godspeed28";

  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": "netlify-function"
    }
  });

  const repos = await res.json();
  const totalLanguages = {};

  for (const repo of repos) {
    const langRes = await fetch(repo.languages_url, {
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "netlify-function"
      }
    });

    const langData = await langRes.json();

    for (const [lang, bytes] of Object.entries(langData)) {
      totalLanguages[lang] = (totalLanguages[lang] || 0) + bytes;
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(totalLanguages)
  };
};
