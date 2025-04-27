"use client";
const arabicDays = {
  Sunday: "الأحد",
  Monday: "الإثنين",
  Tuesday: "الثلاثاء",
  Wednesday: "الأربعاء",
  Thursday: "الخميس",
  Friday: "الجمعة",
  Saturday: "السبت",
};

const arabicMonths = {
  January: "يناير",
  February: "فبراير",
  March: "مارس",
  April: "أبريل",
  May: "مايو",
  June: "يونيو",
  July: "يوليو",
  August: "أغسطس",
  September: "سبتمبر",
  October: "أكتوبر",
  November: "نوفمبر",
  December: "ديسمبر",
};

const englishDays = {
  Sunday: "Sunday",
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
};

const timeUnits = {
  en: {
    ago: "ago",
    yesterday: "Yesterday",
    today: "Today",
    since: "since",
    second: ["second", "seconds"],
    minute: ["minute", "minutes"],
    hour: ["hour", "hours"],
    day: ["day", "days"],
    week: ["week", "weeks"],
    month: ["month", "months"],
    year: ["year", "years"],
    at: "at",
    on: "on",
    in: "in",
  },
  ar: {
    ago: "مضت",
    yesterday: "ليلة أمس",
    today: "اليوم",
    since: "منذ",
    second: ["ثانية", "ثانيتين", "ثوان"],
    minute: ["دقيقة", "دقيقتين", "دقائق"],
    hour: ["ساعة", "ساعتين", "ساعات"],
    day: ["يوم", "يومين", "أيام"],
    week: ["أسبوع", "أسبوعين", "أسابيع"],
    month: ["شهر", "شهرين", "أشهر"],
    year: ["سنة", "سنتين", "سنوات"],
    at: "الساعة",
    on: "في",
    in: "في",
  },
};

const formatTime = (date, locale) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = date.toLocaleTimeString(
    locale === "ar" ? "ar-EG" : "en-US",
    options
  );

  if (locale === "ar") {
    return formattedTime.replace("AM", "صباحًا").replace("PM", "مساءً");
  }

  return formattedTime;
};

const formatDate = (date, locale, withYear = false) => {
  const day = date.getDate();
  const month = date.toLocaleString(locale === "ar" ? "ar-EG" : "en-US", {
    month: "long",
  });
  const year = date.getFullYear();

  if (locale === "ar") {
    return withYear ? `${day} ${month} ${year}` : `${day} ${month}`;
  }

  return withYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
};

const timeAgo = (value, unit, lang) => {
  const t = timeUnits[lang];

  if (value === 0) {
    return lang === "ar" ? "الآن" : "now";
  }

  if (lang === "ar") {
    if (value === 1) {
      return `${t.since} ${unit[0]}`;
    } else if (value === 2) {
      return `${t.since} ${unit[1]}`;
    } else if (value > 2 && value <= 10) {
      return `${t.since} ${value} ${unit[2]}`;
    } else {
      return `${t.since} ${value} ${unit[2]}`;
    }
  } else {
    // الإنجليزية (ابق كما هي)
    return `${t.since} ${value} ${value === 1 ? unit[0] : unit[1]}`;
  }
};

export default function ConvertTime(
  timestamp,
  locale = "en",
  type = "general"
) {
  const now = new Date();
  const past = new Date(timestamp);
  const lang = locale === "ar" ? "ar" : "en";
  const t = timeUnits[lang];

  const diffInMs = now - past;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  // Common time ago formatter

  switch (type) {
    case "product":
      if (diffInSeconds < 60) return timeAgo(diffInSeconds, t.second, lang);
      if (diffInMinutes < 60) return timeAgo(diffInMinutes, t.minute, lang);
      if (diffInHours < 24) return timeAgo(diffInHours, t.hour, lang);
      if (diffInDays < 7) return timeAgo(diffInDays, t.day, lang);
      if (diffInWeeks < 4) return timeAgo(diffInWeeks, t.week, lang);
      if (diffInMonths < 12) return timeAgo(diffInMonths, t.month, lang);
      return timeAgo(diffInYears, t.year, lang);

    case "post":
      if (diffInHours < 24) {
        if (diffInMinutes < 60) {
          return timeAgo(diffInMinutes, t.minute, lang);
        }
        return timeAgo(diffInHours, t.hour, lang);
      }
      if (diffInDays === 1) {
        return `${t.yesterday} ${t.at} ${formatTime(past, lang)}`;
      }
      if (diffInDays < 7) {
        const dayName = past.toLocaleDateString("en-US", { weekday: "long" });
        const day = lang === "ar" ? arabicDays[dayName] : englishDays[dayName];
        return `${day} ${t.at} ${formatTime(past, lang)}`;
      }
      if (diffInYears < 1) {
        return `${formatDate(past, lang)} ${t.at} ${formatTime(past, lang)}`;
      }
      return `${formatDate(past, lang, true)} ${t.at} ${formatTime(
        past,
        lang
      )}`;

    case "general":
      const dayName = past.toLocaleDateString("en-US", { weekday: "long" });
      const day = lang === "ar" ? arabicDays[dayName] : englishDays[dayName];
      return `${day} ${formatDate(past, lang, true)} ${t.in} ${formatTime(
        past,
        lang
      )}`;

    case "chat":
      if (diffInDays === 0) return formatTime(past, lang);
      if (diffInDays === 1) return t.yesterday;
      return past.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
        year: diffInYears >= 1 ? "numeric" : undefined,
        month: "numeric",
        day: "numeric",
      });

    default:
      return past.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB");
  }
}
