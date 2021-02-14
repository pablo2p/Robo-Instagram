require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');

  /* Aguarda os conteúdos serem exibidos */
  await page.waitForSelector('[name="username"]');

  // Preenche os dados
  await page.type('[name="username"]', process.env.INSTAGRAM_EMAIL);
  await page.type('[name="password"]', process.env.INSTAGRAM_PASSWORD);

  // Entrar na conta
  await page.click('[type="submit"]');

  /* Aguardar aba de notificações ser exibida */
  await page.waitForSelector('.aOOlW.bIiDR');

  // Fechar painel de notificações
  await page.click('.aOOlW.bIiDR');

  /* Função de seguir usuários sugestivos instagram (30) */
  await page.goto(
    'https://www.instagram.com/explore/people/suggested/?hl=pt-br'
  );

  await page.waitForSelector('.sqdOP.L3NKy.y3zKF');

  const awaitTime = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getTime = (event) => {
    return awaitTime(10000).then((_) => event);
  };

  const seguirUser = async (_) => {
    for (let i = 0; i < 25; i++) {
      await getTime(page.click('.sqdOP.L3NKy.y3zKF'));
    }
  };

  await seguirUser();
})();
