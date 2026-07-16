import assert from "node:assert/strict";
import test from "node:test";
import { decodeXml, parseFeed, toArticle } from "./update-briefing.mjs";

test("decodes XML and parses RSS items", () => {
  const xml = `<rss><channel><item><title><![CDATA[전력망 투자 확대 - 테스트일보]]></title><link>https://example.com/a</link><pubDate>Thu, 16 Jul 2026 01:00:00 GMT</pubDate><source>테스트일보</source></item></channel></rss>`;
  const [item] = parseFeed(xml, { category: "업무/관심 분야", country: "한국", language: "한국어" });
  assert.equal(item.title, "전력망 투자 확대");
  assert.equal(item.source, "테스트일보");
  assert.equal(item.url, "https://example.com/a");
  assert.equal(decodeXml("A &amp; B"), "A & B");
});

test("creates a complete article card", () => {
  const article = toArticle({
    title: "Grid investment expands",
    source: "Example",
    url: "https://example.com/grid",
    publishedAt: "2026-07-16",
    category: "국제 뉴스",
    country: "국제",
    language: "영어",
  });
  for (const key of ["facts", "context", "interpretation", "otherView", "implication", "question", "url"]) {
    assert.ok(article[key], `${key} must be present`);
  }
});

test("parses Atom entry links", () => {
  const xml = `<feed><entry><title>Power grid automation</title><link href="https://example.com/paper"/><published>2026-07-16T00:00:00Z</published></entry></feed>`;
  const [item] = parseFeed(xml, { category: "시야 확장", country: "국제 연구", language: "영어", source: "arXiv" });
  assert.equal(item.url, "https://example.com/paper");
  assert.equal(item.source, "arXiv");
});
