const express = require("express");
const router = express();
const { translate } = require("@vitalets/google-translate-api");
const { HttpProxyAgent } = require("http-proxy-agent");

router.post("/translator", async (req, res) => {
  const proxyServer = "http://103.155.62.158:8080";
  const agent = new HttpProxyAgent(proxyServer);

  const { currentLang, targetLang } = req.body;
  try {
    // console.log(currentLang, targetLang);
    const translation = await translate(currentLang, { to: targetLang, agent });
    res.json({translation: translation.text}).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

module.exports = router;
