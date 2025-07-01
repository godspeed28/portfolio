const emailjs = require("@emailjs/nodejs");

exports.handler = async function (event, context) {
  console.log("Function triggered");

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const data = JSON.parse(event.body);
  console.log("Form Data:", data);
  console.log("EMAILJS_PUBLIC:", process.env.EMAILJS_PUBLIC);
  console.log("EMAILJS_PRIVATE:", process.env.EMAILJS_PRIVATE);

  try {
    await emailjs.send("service_m1s0aee", "template_2dqg7x5", data, {
      publicKey: process.env.EMAILJS_PUBLIC,
      privateKey: process.env.EMAILJS_PRIVATE,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("EmailJS Send Error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
