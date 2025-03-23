"use client"
const arabicDays = {
  Sunday: "الأحد",
  Monday: "الإثنين",
  Tuesday: "الثلاثاء",
  Wednesday: "الأربعاء",
  Thursday: "الخميس",
  Friday: "الجمعة",
  Saturday: "السبت",
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
    hour: ["hour", "hours"],
    day: ["day", "days"],
  },
  ar: {
    ago: "مضت",
    yesterday: "ليلة أمس",
    today: "اليوم",
    since: "منذ",
    hour: ["ساعة", "ساعات"],
    day: ["يوم", "أيام"],
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

export default function ConvertTime(timestamp, locale = "en", type = "general") {
  const now = new Date();
  const past = new Date(timestamp);

  const diffInMs = now - past;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  const lang = locale === "ar" ? "ar" : "en";

  // 🟢 **حالة `singleChat`** → دائمًا يعرض الوقت بصيغة `hh:mm am/pm`
  if (type === "singleChat") {
    return formatTime(past, lang);
  }

  // 🟡 **حالة `product`** (نفس نظام الشات لكن مع تعديلات الوقت)
  if (type === "product") {
    if (diffInHours < 24) {
      const unit =
        diffInHours === 1 ? timeUnits[lang].hour[0] : timeUnits[lang].hour[1];
      return `${timeUnits[lang].since} ${diffInHours} ${unit}`;
    }
    if (diffInDays === 1) return timeUnits[lang].yesterday;
    if (diffInDays < 7) {
      const unit =
        diffInDays === 1 ? timeUnits[lang].day[0] : timeUnits[lang].day[1];
      return `${timeUnits[lang].since} ${diffInDays} ${unit}`;
    }

    return past.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB");
  }

  // 🔵 **حالة `general`** (الطريقة القديمة `ago`)
  if (diffInDays === 0) return formatTime(past, lang);
  if (diffInDays === 1) return timeUnits[lang].yesterday;
  if (diffInDays < 7) {
    const dayName = past.toLocaleDateString("en-US", { weekday: "long" });
    return lang === "ar" ? arabicDays[dayName] : englishDays[dayName];
  }
  return past.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB");
}
