import type { NavId } from "@/config/site";

export type Lang = "kk" | "ru";
export const DEFAULT_LANG: Lang = "kk";
export const langs: Lang[] = ["kk", "ru"];
export const isLang = (value: unknown): value is Lang => value === "kk" || value === "ru";

type Stat = { value: string; label: string };

export type Dictionary = {
  meta: { title: string; description: string };
  a11y: {
    skip: string;
    mainNav: string;
    home: string;
    langSwitch: string;
    langNames: Record<Lang, string>;
    openMenu: string;
    closeMenu: string;
    callTo: string;
    newTab: string;
    logoAlt: string;
  };
  nav: Record<NavId, string>;
  langShort: Record<Lang, string>;
  call: string;
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    about: string;
    photoAlt: string;
    stats: [Stat, Stat, Stat, Stat];
    statsLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    text: string;
    photoAlt: string;
    videoLabel: string;
    facts: { age: Stat; language: Stat; hours: Stat; address: Stat };
  };
  groups: {
    eyebrow: string;
    title: string;
    countWord: string;
    facts: [string, string, string];
    note: string;
    button: string;
    buttonLabel: string;
    agesLabel: string;
  };
  meals: {
    eyebrow: string;
    title: string;
    text: string;
    timesLabel: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    text: string;
    textWithVideo: string;
    empty: string;
    more: string;
    less: string;
    photoAlt: (n: number) => string;
    open: (n: number) => string;
    videoLabel: (n: number) => string;
    openVideo: (n: number) => string;
    videoBadge: string;
    dialog: string;
    close: string;
    prev: string;
    next: string;
    counter: (n: number, total: number) => string;
  };
  documents: {
    title: string;
    text: string;
    textReady: string;
    soon: string;
    open: string;
  };
  contacts: {
    eyebrow: string;
    title: string;
    text: string;
    address: string;
    phone: string;
    hours: string;
    days: string;
    whatsapp: string;
    instagram: string;
    twoGis: string;
    mapTitle: string;
    mapSoon: string;
  };
  photoSoon: string;
  footer: { tagline: string; rights: string };
};

const kk: Dictionary = {
  meta: {
    title: "Golden Kids World — балабақша, Мамыр-4, 125",
    description:
      "Golden Kids World балабақшасы: 2–6 жастағы балалар, қазақ тілінде оқыту, 3 топ, күніне 5 мезгіл тамақтану. Жұмыс уақыты 07:30–18:30. Мекенжай: Мамыр-4, 125. Тел.: +7 747 177 06 66.",
  },
  a11y: {
    skip: "Негізгі мазмұнға өту",
    mainNav: "Негізгі мәзір",
    home: "Golden Kids World — басты бет",
    langSwitch: "Тілді таңдау",
    langNames: { kk: "Қазақ тілі", ru: "Орыс тілі" },
    openMenu: "Мәзірді ашу",
    closeMenu: "Мәзірді жабу",
    callTo: "Қоңырау шалу: +7 747 177 06 66",
    newTab: "(жаңа қойындыда ашылады)",
    logoAlt: "Golden Kids World логотипі",
  },
  nav: {
    home: "Басты бет",
    about: "Біз туралы",
    groups: "Топтар",
    meals: "Тамақтану",
    gallery: "Галерея",
    documents: "Құжаттар",
    contacts: "Байланыс",
  },
  langShort: { kk: "ҚАЗ", ru: "РУС" },
  call: "Қоңырау шалу",
  hero: {
    eyebrow: "Golden Kids World балабақшасы",
    title: "Бақытты балалық шақ осы жерден басталады",
    text: "2–6 жастағы балаларға арналған балабақша. Қазақ тілінде оқыту мен тәрбиелеу, 3 топ және күніне 5 мезгіл тамақтану.",
    about: "Біз туралы",
    photoAlt: "Golden Kids World балабақшасы",
    statsLabel: "Балабақша туралы қысқаша",
    stats: [
      { value: "2–6", label: "жас" },
      { value: "3", label: "топ" },
      { value: "5", label: "мезгіл тамақтану" },
      { value: "07:30–18:30", label: "жұмыс уақыты" },
    ],
  },
  about: {
    eyebrow: "Біз туралы",
    title: "Балаларға арналған жылы әрі қамқор орта",
    text: "Golden Kids World — 2 жастан 6 жасқа дейінгі балаларға арналған балабақша. Балаларды қазақ тілінде оқытамыз және тәрбиелейміз. Балабақша Мамыр-4, 125 мекенжайында орналасқан және 07:30-дан 18:30-ға дейін жұмыс істейді.",
    photoAlt: "Golden Kids World балабақшасы",
    videoLabel: "Golden Kids World балабақшасы туралы бейне",
    facts: {
      age: { label: "Балалардың жасы", value: "2–6 жас" },
      language: { label: "Оқыту тілі", value: "Қазақ тілі" },
      hours: { label: "Жұмыс уақыты", value: "07:30–18:30" },
      address: { label: "Мекенжай", value: "Мамыр-4, 125" },
    },
  },
  groups: {
    eyebrow: "Топтар",
    title: "Балабақшада 3 топ",
    countWord: "топ",
    facts: ["3 топ", "2–6 жастағы балалар", "Қазақ тілінде оқыту"],
    note: "Топтар мен қабылдау туралы ақпаратты телефон арқылы біле аласыз",
    button: "Нақтылау",
    buttonLabel: "Топтар мен қабылдау туралы нақтылау: +7 747 177 06 66 нөміріне қоңырау шалу",
    agesLabel: "Жасы",
  },
  meals: {
    eyebrow: "Тамақтану",
    title: "Күніне 5 мезгіл тамақтану",
    text: "Балабақшада балалар күніне бес мезгіл тамақтанады. Тамақтану туралы толығырақ ақпаратты телефон арқылы біле аласыз.",
    timesLabel: "Күніне 5 мезгіл",
  },
  gallery: {
    eyebrow: "Галерея",
    title: "Балабақша өмірінен",
    text: "Golden Kids World балабақшасының фотосуреттері.",
    textWithVideo: "Golden Kids World балабақшасының фотосуреттері мен бейнелері.",
    empty: "Фотосуреттер жақында қосылады",
    more: "Көбірек көрсету",
    less: "Жасыру",
    photoAlt: (n) => `Golden Kids World балабақшасы — ${n}-фото`,
    open: (n) => `${n}-фотоны үлкейтіп ашу`,
    videoLabel: (n) => `Golden Kids World балабақшасы — ${n}-бейне`,
    openVideo: (n) => `${n}-бейнені ашу`,
    videoBadge: "Бейне",
    dialog: "Фото және бейнені қарау",
    close: "Жабу",
    prev: "Алдыңғысы",
    next: "Келесісі",
    counter: (n, total) => `${n} / ${total}`,
  },
  documents: {
    title: "Құжаттар",
    text: "Балабақшаның құжаттары осы жерде жарияланады.",
    textReady: "Балабақшаның құжаттарымен онлайн таныса аласыз.",
    soon: "Жақында қолжетімді болады",
    open: "Құжаттарды қарау",
  },
  contacts: {
    eyebrow: "Байланыс",
    title: "Бізге хабарласыңыз",
    text: "Балабақша, топтар мен қабылдау туралы сұрақтарыңызға телефон арқылы жауап береміз.",
    address: "Мекенжай",
    phone: "Телефон",
    hours: "Жұмыс уақыты",
    days: "Жұмыс күндері",
    whatsapp: "WhatsApp-қа жазу",
    instagram: "Instagram",
    twoGis: "2ГИС-те ашу",
    mapTitle: "Golden Kids World картада",
    mapSoon: "Карта сілтемесі жақында қосылады",
  },
  photoSoon: "Фото жақында қосылады",
  footer: {
    tagline: "2–6 жастағы балаларға арналған балабақша",
    rights: "Барлық құқықтар қорғалған.",
  },
};

const ru: Dictionary = {
  meta: {
    title: "Golden Kids World — детский сад, Мамыр-4, 125",
    description:
      "Детский сад Golden Kids World: дети от 2 до 6 лет, обучение на казахском языке, 3 группы, 5-разовое питание. Режим работы 07:30–18:30. Адрес: Мамыр-4, 125. Тел.: +7 747 177 06 66.",
  },
  a11y: {
    skip: "Перейти к содержанию",
    mainNav: "Основное меню",
    home: "Golden Kids World — главная",
    langSwitch: "Выбор языка",
    langNames: { kk: "Казахский язык", ru: "Русский язык" },
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    callTo: "Позвонить: +7 747 177 06 66",
    newTab: "(откроется в новой вкладке)",
    logoAlt: "Логотип Golden Kids World",
  },
  nav: {
    home: "Главная",
    about: "О садике",
    groups: "Группы",
    meals: "Питание",
    gallery: "Галерея",
    documents: "Документы",
    contacts: "Контакты",
  },
  langShort: { kk: "ҚАЗ", ru: "РУС" },
  call: "Позвонить",
  hero: {
    eyebrow: "Детский сад Golden Kids World",
    title: "Здесь начинается счастливое детство",
    text: "Детский сад для детей от 2 до 6 лет. Обучение и воспитание на казахском языке, 3 группы и 5-разовое питание.",
    about: "О садике",
    photoAlt: "Детский сад Golden Kids World",
    statsLabel: "Коротко о детском саде",
    stats: [
      { value: "2–6", label: "лет" },
      { value: "3", label: "группы" },
      { value: "5-разовое", label: "питание" },
      { value: "07:30–18:30", label: "режим работы" },
    ],
  },
  about: {
    eyebrow: "О садике",
    title: "Тёплая и заботливая среда для детей",
    text: "Golden Kids World — детский сад для детей от 2 до 6 лет. Обучение и воспитание ведутся на казахском языке. Сад находится по адресу Мамыр-4, 125 и работает с 07:30 до 18:30.",
    photoAlt: "Детский сад Golden Kids World",
    videoLabel: "Видео о детском саде Golden Kids World",
    facts: {
      age: { label: "Возраст детей", value: "2–6 лет" },
      language: { label: "Язык обучения", value: "Казахский" },
      hours: { label: "Режим работы", value: "07:30–18:30" },
      address: { label: "Адрес", value: "Мамыр-4, 125" },
    },
  },
  groups: {
    eyebrow: "Группы",
    title: "В детском саду 3 группы",
    countWord: "группы",
    facts: ["3 группы", "Дети от 2 до 6 лет", "Обучение на казахском языке"],
    note: "Информацию о группах и приёме можно уточнить по телефону",
    button: "Уточнить",
    buttonLabel: "Уточнить информацию о группах и приёме: позвонить по номеру +7 747 177 06 66",
    agesLabel: "Возраст",
  },
  meals: {
    eyebrow: "Питание",
    title: "5-разовое питание каждый день",
    text: "В детском саду дети питаются пять раз в день. Подробнее о питании можно узнать по телефону.",
    timesLabel: "5 раз в день",
  },
  gallery: {
    eyebrow: "Галерея",
    title: "Из жизни детского сада",
    text: "Фотографии детского сада Golden Kids World.",
    textWithVideo: "Фотографии и видео детского сада Golden Kids World.",
    empty: "Фотографии скоро появятся",
    more: "Показать больше",
    less: "Свернуть",
    photoAlt: (n) => `Детский сад Golden Kids World — фото ${n}`,
    open: (n) => `Открыть фото ${n} в полном размере`,
    videoLabel: (n) => `Детский сад Golden Kids World — видео ${n}`,
    openVideo: (n) => `Открыть видео ${n}`,
    videoBadge: "Видео",
    dialog: "Просмотр фото и видео",
    close: "Закрыть",
    prev: "Предыдущее",
    next: "Следующее",
    counter: (n, total) => `${n} / ${total}`,
  },
  documents: {
    title: "Документы",
    text: "Здесь будут опубликованы документы детского сада.",
    textReady: "С документами детского сада можно ознакомиться онлайн.",
    soon: "Скоро будет доступно",
    open: "Посмотреть документы",
  },
  contacts: {
    eyebrow: "Контакты",
    title: "Свяжитесь с нами",
    text: "Ответим на вопросы о детском саде, группах и приёме по телефону.",
    address: "Адрес",
    phone: "Телефон",
    hours: "Режим работы",
    days: "Рабочие дни",
    whatsapp: "Написать в WhatsApp",
    instagram: "Instagram",
    twoGis: "Открыть в 2ГИС",
    mapTitle: "Golden Kids World на карте",
    mapSoon: "Ссылка на карту скоро появится",
  },
  photoSoon: "Фото скоро появится",
  footer: {
    tagline: "Детский сад для детей от 2 до 6 лет",
    rights: "Все права защищены.",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { kk, ru };
