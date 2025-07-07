const { google } = require("googleapis")
const axios = require("axios")

const oauth2Client = new google.auth.OAuth2(
process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

const scopes = ['openid' , 'profile' , 'email']

function generateAuthUrl(state){
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state,
        prompt: 'consent'
    });
}

async function getTokens(code) {
    const response = await axios.post('https://oauth2.googleapis.com/token' , null ,{
        params:{
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code'
        },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
}

async function verifyIdToken(idToken) {
    const tiket = await oauth2Client.verifyIdToken({
        idToken,
        audience:process.env.GOOGLE_CLIENT_ID
    });
    return tiket.getPayload();
}

module.exports = {
  generateAuthUrl,
  getTokens,
  verifyIdToken
};