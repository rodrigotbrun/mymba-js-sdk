console.clear();
require('dotenv').config({ path: '../.env' })

const options = {
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjRlYjFiMWI2ZTY3OGZlYzlhNDA1NDE4MzkwOTk4MzNmZGExN2E1YWEyYTA5ZGE3NmNhZWUxZTk4NzVhN2QxNzMwNzQxMDUxYWQ5NWY0ZDc5In0.eyJhdWQiOiI1NTU1IiwianRpIjoiNGViMWIxYjZlNjc4ZmVjOWE0MDU0MTgzOTA5OTgzM2ZkYTE3YTVhYTJhMDlkYTc2Y2FlZTFlOTg3NWE3ZDE3MzA3NDEwNTFhZDk1ZjRkNzkiLCJpYXQiOjE1Njk2OTg1NDQsIm5iZiI6MTU2OTY5ODU0NCwiZXhwIjoxNjAxMzIwOTQ0LCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.MjE6DxdoWh3Isz0HXFHULCgeFyVc_hYS5YOul32aLOBwQvPRut36AViCATSRWkdM-0A9dqY3vf6RRQYfjr4kwhSDA9CWMdb3a2kKc3CrdAO5vfCHDLHKArszMk11PQJudnGKpV25Zp1SwoPYjYO87B6Ci4ci58IvGjrJo1egO1cDeHFgsmI1hY1MuabiZ7tFCzXOov3yqiaQIdhi9BqdSGOoam6AuC43DEZHR_n0bQZdA_3o91O98wDH9pCb_DmVLwPO-pyghSKOxSFeygXg5qwob4ZVoJZo254_TIl2dhyrQtNnoSf2ztAKk5O2rigpbc2yxobV-uRtadnMkCL8o33GIxFVtzxb6sAdQ3wXLgLOjdyQIADAUMrNdcdSFeNECfZhzYdJLMNpbQ4kfc0X-7PepWQxwTr8HgD43BrLO6dAng1wJnkEIs1n6JQFiwo8sZuhbPDlQnxaOQyZq4jYnH3-Emr6mnfXu8T52re_FjPS4gP_uvyU7e09D15heVOi7zvQyWfK_KMTNa1MfJoM7YflfrYaqYdyNLifPmLkyDkPZYRIVoRH8MF2AvDGUrSWwax6U0HAcWRgLSFv8fbiKwKWNk7TJmU3SGiLUWnFekQlviniCRBhWDiGwNL-O3eAIUJaISTE96MSo734wtI5y3udfdtdWBpqH3UreUi-WxQ',
    baseURL: 'https://api.acheicorridas.com.br/',
    debug: false,
    applicationId: '5555',
};

const AcheiCorridas = require('../../dist/src/AcheiCorridas');
const acheiCorridas = new AcheiCorridas(options);

module.exports = acheiCorridas;