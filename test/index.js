console.clear();
require('dotenv').config({ path: './spec/.env' })
const fs = require('fs');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const options = {
    accessToken: process.env.ACCESS_TOKEN,
    baseURL: process.env.BASE_URL,
    debug: false,
    applicationId: 9999,
};

const AcheiCorridas = require('../dist/src/index.js');
AcheiCorridas.Initialize(options);

const boot = async () => {
    acheiCorridas.Organizer.setWorkingEvent('corrida-97fm');

    try {
        const subscriptions = await acheiCorridas.addParam('limit', 5).Organizer.EventManager.Subscription.getSubscriptions();

        const sub = subscriptions[0];

        console.log('ANEXANDO ARQUIVO EM: ' + sub.barcode);

        const file = "/Users/rodrigobrun/Desktop/Teste.png";

        const upload = await acheiCorridas.Organizer.EventManager.Subscription.fsUploadAttachment(sub.barcode, file);
    } catch (e) {
        console.error(e);
    }
};

boot();