const fetch = require('node-fetch');

exports.handler = async (event) => {
  const allowedOrigin = "680f9c84cfdea410f9bcce9e--chatbetson.netlify.app";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "OK",
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://hook.us2.make.com/ekeksc98m9z9ivlq61ssamro6wi8uahf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    console.error('Erro ao comunicar com BETson:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao comunicar com o BETson.' }),
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
};