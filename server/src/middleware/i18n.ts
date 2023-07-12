// 初始化 i18next
import i18next from "i18next";
import i18NexFsBackend from "i18next-fs-backend";
import i18NextHttpMiddleware, {LanguageDetector} from "i18next-http-middleware";
import path from "path";

export async function i18n() {

  const languageDetector = new LanguageDetector();

  await i18next
    .use(i18NexFsBackend)
    .use(languageDetector)
    .init({
      // debug: true,
      backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}.json'), // 指定语言文件路径
      },
      fallbackLng: 'en', // 默认语言
      preload: ['en', 'zh'], // 预加载的语言
      detection: {
        order: ['header'],
      }
    });

  return i18NextHttpMiddleware.handle(i18next);
}
