// netlify/functions/getLanguages.js

const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const username = "godspeed28";
  const token = process.env.GITHUB_TOKEN;

  //   console.log("Token:", token ? "Exists" : "Missing");

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Token not configured" }),
    };
  }

  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!reposRes.ok) {
      return {
        statusCode: reposRes.status,
        body: JSON.stringify({ error: "Failed to fetch repos" }),
      };
    }

    const repos = await reposRes.json();

    const totalLanguages = {};

    for (const repo of repos) {
      const langUrl = repo.languages_url;
      const langRes = await fetch(langUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!langRes.ok) {
        continue; // skip if error
      }

      const langData = await langRes.json();

      for (const [lang, bytes] of Object.entries(langData)) {
        const safeLang = lang.replace(/[^a-zA-Z0-9]/g, "");
        totalLanguages[safeLang] = (totalLanguages[safeLang] || 0) + bytes;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(totalLanguages),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
