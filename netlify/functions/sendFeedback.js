const axios = require('axios');

exports.handler = async function (event) {
  const sendInfo = JSON.parse(event.body);

  if (!sendInfo) {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'error' }),
    };
  }
  if (Object.values(sendInfo).length < 3) {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'error' }),
    };
  }
  const { name, email, message } = sendInfo;

  const { API_TELEGRAM_TOKEN, GROUP_TELEGRAM } = process.env;

  await axios.get(
    `https://api.telegram.org/bot${API_TELEGRAM_TOKEN}/sendMessage?text=${encodeURI(
      `Name: ${name}\nEmail: ${email}\nText: ${message}&chat_id=${GROUP_TELEGRAM}`
    )}`
  );
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'OK', status: 'ok' }),
  };
};
