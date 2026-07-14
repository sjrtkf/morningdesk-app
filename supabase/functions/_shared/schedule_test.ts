import {
  dueReminders,
  scheduleMinute,
  seoulClock,
} from "../morningdesk-push/schedule.ts";

function equal(actual: unknown, expected: unknown, label: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `${label}: expected ${JSON.stringify(expected)}, got ${
        JSON.stringify(actual)
      }`,
    );
  }
}

Deno.test("parses valid schedule times", () => {
  equal(scheduleMinute("09:20"), 560, "09:20");
  equal(scheduleMinute("24:00"), null, "invalid hour");
  equal(scheduleMinute("09:70"), null, "invalid minute");
});

Deno.test("uses Asia/Seoul day and minute", () => {
  equal(seoulClock(new Date("2026-07-14T00:15:00Z")), {
    day: "2026-07-14",
    minute: 555,
  }, "Seoul clock");
});

Deno.test("returns lead, one-minute, and exact reminders without duplicates", () => {
  const state = {
    notifications: { enabled: true, popup: true, leadMinutes: 5 },
    schedule: [{ time: "09:20", title: "현장 확인", reminderBefore: 5 }],
  };
  equal(
    dueReminders(state, new Date("2026-07-14T00:15:00Z")).map((item) =>
      item.label
    ),
    ["5분 전"],
    "lead reminder",
  );
  equal(
    dueReminders(state, new Date("2026-07-14T00:19:00Z")).map((item) =>
      item.label
    ),
    ["1분 전"],
    "one-minute reminder",
  );
  equal(
    dueReminders(state, new Date("2026-07-14T00:20:00Z")).map((item) =>
      item.label
    ),
    ["지금"],
    "exact reminder",
  );

  const oneMinuteLead = {
    notifications: { enabled: true, popup: true, leadMinutes: 1 },
    schedule: [{ time: "09:20", title: "중복 방지" }],
  };
  equal(
    dueReminders(oneMinuteLead, new Date("2026-07-14T00:19:00Z")).length,
    1,
    "deduplicated one-minute lead",
  );
});

Deno.test("ignores disabled notifications", () => {
  const state = {
    notifications: { enabled: false, popup: true, leadMinutes: 5 },
    schedule: [{ time: "09:20", title: "보내지 않음" }],
  };
  equal(
    dueReminders(state, new Date("2026-07-14T00:15:00Z")),
    [],
    "disabled notifications",
  );
});
