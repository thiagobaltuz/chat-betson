const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://hook.us2.make.com/SEU-WEBHOOK-AQUI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    console.error('Erro ao comunicar com BETson:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao comunicar com o BETson.' }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
};