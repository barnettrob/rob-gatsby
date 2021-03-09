// /functions/marketo.js
exports.handler = async function(event, context, callback) {
  const fetch = require("node-fetch");
  const marketoHost = process.env.MARKETO_HOST;

  console.log("event", event.body);
  let token
  try {
    token = await fetch(`${marketoHost}/identity/oauth/token`, {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${process.env.MARKETO_CLIENT_ID}&client_secret=${process.env.MARKETO_CLIENT_SECRET}`,
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      },
    })
    .then(response => {
      //console.log("marketo functions response", response);
      return response.json();
    }).then(data => {
      // Work with JSON data (token response) here
      console.log("functions data", data);
    })
  }
  catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.message
      })
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(token)
  }
}