// Uso: node render.js <adsDir> <outDir> <modo: stills|video|image> [conceptos] [formatos] [tiempos]
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');
const ffmpeg = require('ffmpeg-static');

const [adsDir, outDir, mode, cArg = 'A,B,C', fArg = '916,45,11', tArg = '1.5,3.5,6.5,9'] = process.argv.slice(2);
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const H = { '916': 1920, '45': 1350, '11': 1080 };
const FPS = 30, DUR = 10;
const NAMES = { A: 'respuesta-2s', B: 'filtra-posibles-ventas', C: 'cero-perdidas' };

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: EDGE, headless: true, args: ['--allow-file-access-from-files', '--hide-scrollbars'] });
  for (const c of cArg.split(',')) for (const f of fArg.split(',')) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: H[f], deviceScaleFactor: 1 });
    const url = 'file:///' + path.join(adsDir, 'ads.html').replace(/\\/g, '/') + `?c=${c}&f=${f}` + (mode === 'image' ? '&static=1' : '');
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.ready);
    const stage = await page.$('#stage');
    const tag = f === '916' ? '9x16' : f === '45' ? '4x5' : '1x1';
    if (mode === 'stills') {
      for (const t of tArg.split(',').map(Number)) {
        await page.evaluate(t => window.render(t), t);
        await stage.screenshot({ path: path.join(outDir, `${c}_${tag}_t${t}.png`) });
      }
    } else if (mode === 'image') {
      await page.evaluate(() => window.render(7.2));
      await stage.screenshot({ path: path.join(outDir, `LEMARJ_${NAMES[c]}_${tag}.png`) });
    } else {
      const out = path.join(outDir, `LEMARJ_${NAMES[c]}_${tag}.mp4`);
      const ff = spawn(ffmpeg, ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-movflags', '+faststart', out], { stdio: ['pipe', 'ignore', 'pipe'] });
      let err = ''; ff.stderr.on('data', d => err += d);
      for (let i = 0; i < FPS * DUR; i++) {
        await page.evaluate(t => window.render(t), i / FPS);
        const buf = await stage.screenshot({ type: 'jpeg', quality: 95 });
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      }
      ff.stdin.end();
      const code = await new Promise(r => ff.on('close', r));
      console.log(code === 0 ? 'OK ' + out : 'FALLO ' + out + '\n' + err.slice(-800));
    }
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
