import { describe, expect, it } from "vitest";
import { decodeQQBotThreadId, encodeQQBotThreadId } from "./thread-id";

describe("QQBot thread IDs", () => {
  it("round trips guild, group, and dm IDs", () => {
    const guild = {
      kind: "guild" as const,
      guildId: "guild123",
      channelId: "channel456",
      messageId: "m 1",
    };
    const group = { kind: "group" as const, groupOpenId: "group789", messageId: "m2" };
    const dm = { kind: "dm" as const, userOpenId: "user123", messageId: "m3" };
    const guildDm = {
      kind: "dm" as const,
      userOpenId: "user456",
      guildId: "guild789",
      messageId: "m4",
    };

    expect(encodeQQBotThreadId(guild)).toBe("qqbot:guild:guild123:channel456:bSAx");
    expect(encodeQQBotThreadId(group)).toBe("qqbot:group:group789:bTI");
    expect(encodeQQBotThreadId(dm)).toBe("qqbot:dm:user123:bTM");
    expect(encodeQQBotThreadId(guildDm)).toBe("qqbot:dm:user456:guild789:bTQ");

    expect(decodeQQBotThreadId(encodeQQBotThreadId(guild))).toEqual(guild);
    expect(decodeQQBotThreadId(encodeQQBotThreadId(group))).toEqual(group);
    expect(decodeQQBotThreadId(encodeQQBotThreadId(dm))).toEqual(dm);
    expect(decodeQQBotThreadId(encodeQQBotThreadId(guildDm))).toEqual(guildDm);
  });

  it("rejects invalid IDs", () => {
    expect(() => decodeQQBotThreadId("slack:C123")).toThrow(/Invalid QQBot/);
  });
});
