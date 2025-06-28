const fetch = require('node-fetch');

exports.handler = async function () {
  const username = "godspeed28";
  const token = process.env.GITHUB_TOKEN;

  try {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos`, {
      headers: { Authorization: `token ${token}` }
    });

    const repos = await reposRes.json();
    const totalLanguages = {};

    for (const repo of repos) {
      const langRes = await fetch(repo.languages_url, {
        headers: { Authorization: `token ${token}` }
      });

      const langData = await langRes.json();

      for (const [lang, bytes] of Object.entries(langData)) {
        const safeLang = lang.replace(/[^a-zA-Z0-9]/g, "");
        totalLanguages[safeLang] = (totalLanguages[safeLang] || 0) + bytes;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(totalLanguages)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch GitHub data" })
    };
  }
};
