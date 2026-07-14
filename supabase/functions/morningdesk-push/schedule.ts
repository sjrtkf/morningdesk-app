export type DueReminder = {
  day: string;
  key: string;
  title: string;
  label: string;
};

export function seoulClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now).reduce<Record<string, string>>((result, part) => {
    if (part.type !== "literal") result[part.type] = part.value;
    return result;
  }, {});
  return {
    day: `${parts.year}-${parts.month}-${parts.day}`,
    minute: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

export function scheduleMinute(value: unknown) {
  const match = String(value || "").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  return hour >= 0 && hour < 24 && minute >= 0 && minute < 60
    ? hour * 60 + minute
    : null;
}

export function dueReminders(state: Record<string, unknown>, now = new Date()) {
  const notifications = state.notifications as
    | Record<string, unknown>
    | undefined;
  if (!notifications?.enabled || notifications.popup === false) return [];
  const schedule = Array.isArray(state.schedule)
    ? state.schedule as Record<string, unknown>[]
    : [];
  const clock = seoulClock(now);
  const defaultLead = Math.max(
    1,
    Math.min(120, Number(notifications.leadMinutes || 5)),
  );
  const due: DueReminder[] = [];
  schedule.forEach((item, index) => {
    const eventMinute = scheduleMinute(item.time);
    const title = String(item.title || "일정").trim().slice(0, 120);
    if (eventMinute === null || !title) return;
    const lead = Math.max(
      1,
      Math.min(120, Number(item.reminderBefore || defaultLead)),
    );
    const reminders = [
      { offset: lead, label: `${lead}분 전` },
      { offset: 1, label: "1분 전" },
      { offset: 0, label: "지금" },
    ].filter((item, reminderIndex, list) =>
      list.findIndex((candidate) => candidate.offset === item.offset) ===
        reminderIndex
    );
    reminders.forEach((reminder) => {
      if (eventMinute - reminder.offset !== clock.minute) return;
      due.push({
        day: clock.day,
        key: `${clock.day}|${index}|${item.time}|${title}|${reminder.offset}`,
        title,
        label: reminder.label,
      });
    });
  });
  return due;
}
