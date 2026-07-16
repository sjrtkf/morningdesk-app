import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const ROOT = new URL("../", import.meta.url);
const SAMPLE_URL = new URL("data/sample-briefing.json", ROOT);
const OUTPUT_URL = new URL("data/live-briefing.json", ROOT);
const USER_AGENT = "MorningDesk/1.0 (+https://sjrtkf.github.io/morningdesk-app/)";

export function decodeXml(value = "") {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return decodeXml(match?.[1] || "");
}

function entryLink(block) {
  const rssLink = tag(block, "link");
  if (rssLink.startsWith("http")) return rssLink;
  const atomLink = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i);
  return decodeXml(atomLink?.[1] || "");
}

export function parseFeed(xml, feed) {
  const blocks = [
    ...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi),
    ...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi),
  ].map((match) => match[0]);

  return blocks.map((block) => {
    const rawTitle = tag(block, "title");
    const sourceTag = tag(block, "source");
    const split = rawTitle.match(/^(.*?)\s+-\s+([^–—]+)$/);
    const source = feed.source || sourceTag || split?.[2]?.trim() || "원문 출처";
    const title = split?.[1]?.trim() || rawTitle;
    const published = tag(block, "pubDate") || tag(block, "published") || tag(block, "updated");
    return {
      title,
      source,
      url: entryLink(block),
      publishedAt: published ? new Date(published).toISOString().slice(0, 10) : "",
      category: feed.category,
      country: feed.country,
      language: feed.language,
    };
  }).filter((item) => item.title && item.url.startsWith("http"));
}

function categoryCopy(category) {
  const copies = {
    "업무/관심 분야": {
      context: "전력·건설·설비·데이터센터 흐름은 견적, 자재, 공사 일정과 연결될 수 있어 원문 확인 가치가 있습니다.",
      implication: "현재 맡은 업무의 발주, 자재 수급, 전력 인입 또는 공사 일정에 영향이 있는지 확인할 후보입니다.",
      question: "이 소식이 실제 발주나 현장 일정으로 이어지는지 확인할 다음 자료는 무엇인가?",
    },
    "경제/사회": {
      context: "경제·정책 변화는 원가, 금리, 소비, 공공 발주 조건을 통해 현장 업무에 간접 영향을 줄 수 있습니다.",
      implication: "바로 결론내리기보다 실제 수치와 시행 시점, 국내 영향 범위를 확인할 필요가 있습니다.",
      question: "이 변화가 비용이나 거래처 의사결정에 영향을 주는 경로는 무엇인가?",
    },
    "기술/과학": {
      context: "새 기술은 발표 자체보다 비용, 신뢰성, 규제, 현장 적용 시점이 중요합니다.",
      implication: "업무 자동화나 설비 운영에 적용할 수 있는지 작은 검증 과제로 바꿔볼 만합니다.",
      question: "이 기술을 실제 업무에 쓰려면 가장 먼저 검증해야 할 조건은 무엇인가?",
    },
    "국제 뉴스": {
      context: "해외 정책과 산업 변화는 공급망, 원자재, 환율, 국내 제도 변화의 선행 신호가 될 수 있습니다.",
      implication: "국내 상황과 동일하다고 가정하지 말고 관련 국내 보도와 함께 비교해야 합니다.",
      question: "이 해외 흐름이 한국 시장과 내 업무에 전달되는 경로는 무엇인가?",
    },
    "시야 확장": {
      context: "연구 결과는 가능성을 보여주지만 실제 현장 조건과 정책에 그대로 적용되지는 않습니다.",
      implication: "기존 방식과 다른 가정을 발견하고 후속 자료를 찾는 출발점으로 활용합니다.",
      question: "이 연구의 가정 중 내 현장과 가장 다른 조건은 무엇인가?",
    },
  };
  return copies[category] || copies["시야 확장"];
}

export function toArticle(item) {
  const copy = categoryCopy(item.category);
  const english = item.language === "영어";
  return {
    category: item.category,
    source: item.source,
    publishedAt: item.publishedAt || new Date().toISOString().slice(0, 10),
    country: item.country,
    language: item.language,
    topic: item.category,
    selectionReason: `${item.category} 최신 후보 · 원문 링크 확인 가능 · 스포츠·연예·가십 기본 제외`,
    originalTitle: item.title,
    cleanTitle: item.title,
    originalExcerpt: item.title,
    translation: english
      ? `영문 원문 후보입니다. 제목과 원문을 함께 보고, 수치·주체·시점을 직접 확인하세요. ${copy.implication}`
      : `${item.title}. ${copy.implication}`,
    plainSummary: `${item.source}가 이 주제의 최신 소식을 전했습니다. 자동 수집 단계에서는 과장된 결론을 붙이지 않고 원문 확인이 필요한 후보로 제시합니다.`,
    facts: `${item.source}가 “${item.title}” 관련 소식을 보도했습니다. 구체 수치와 적용 시점은 원문에서 확인해야 합니다.`,
    context: copy.context,
    interpretation: "자동 수집 결과이므로 제목만으로 사실관계나 영향을 확정하지 않습니다. 원문과 다른 출처를 함께 확인해야 합니다.",
    otherView: "같은 사건도 출처의 지역, 이해관계, 발표 주체에 따라 강조점이 달라질 수 있습니다.",
    implication: copy.implication,
    question: copy.question,
    opportunity: "원문 확인 후 실제 업무와 연결되는 신호라면 유익함으로 표시해 다음 선별에 반영할 수 있습니다.",
    url: item.url,
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "application/rss+xml, application/atom+xml, text/xml" },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}

export async function buildBriefing(fetcher = fetchText) {
  const sample = JSON.parse(await readFile(SAMPLE_URL, "utf8"));
  const feeds = [
    {
      url: "https://news.google.com/rss/search?q=%EC%A0%84%EB%A0%A5%20OR%20%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%84%BC%ED%84%B0%20OR%20%EA%B1%B4%EC%84%A4%20OR%20%EA%B3%B5%EA%B3%B5%EC%9E%85%EC%B0%B0%20when%3A2d&hl=ko&gl=KR&ceid=KR%3Ako",
      category: "업무/관심 분야", country: "한국", language: "한국어",
    },
    {
      url: "https://news.google.com/rss/search?q=%EA%B2%BD%EC%A0%9C%20OR%20%EC%82%B0%EC%97%85%20OR%20%EA%B8%88%EB%A6%AC%20when%3A2d&hl=ko&gl=KR&ceid=KR%3Ako",
      category: "경제/사회", country: "한국", language: "한국어",
    },
    {
      url: "https://news.google.com/rss/search?q=AI%20OR%20%EB%A1%9C%EB%B4%87%20OR%20%EB%B0%98%EB%8F%84%EC%B2%B4%20when%3A2d&hl=ko&gl=KR&ceid=KR%3Ako",
      category: "기술/과학", country: "한국", language: "한국어",
    },
    {
      url: "https://www.theguardian.com/world/rss",
      category: "국제 뉴스", country: "영국/국제", language: "영어", source: "The Guardian",
    },
    {
      url: "https://export.arxiv.org/api/query?search_query=ti%3A%22power%20grid%22%20OR%20ti%3A%22data%20center%22%20OR%20%28ti%3Aconstruction%20AND%20ti%3Aautomation%29&start=0&max_results=10&sortBy=submittedDate&sortOrder=descending",
      category: "시야 확장", country: "국제 연구", language: "영어", source: "arXiv",
    },
  ];

  const settled = await Promise.allSettled(feeds.map(async (feed) => parseFeed(await fetcher(feed.url), feed)));
  const successfulFeeds = settled.filter((item) => item.status === "fulfilled").length;
  if (successfulFeeds < 3) {
    throw new Error(`Only ${successfulFeeds}/${feeds.length} feeds responded; preserving the previous briefing.`);
  }
  const seen = new Set();
  const items = [];
  for (const result of settled) {
    if (result.status !== "fulfilled") continue;
    for (const item of result.value.slice(0, 2)) {
      const key = item.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
      if (!key || seen.has(key)) continue;
      seen.add(key);
      items.push(item);
    }
  }

  const articles = items.slice(0, 12).map(toArticle);
  if (articles.length < 5) {
    for (const article of sample.articles) {
      if (articles.length >= 5) break;
      if (!seen.has(article.cleanTitle.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""))) articles.push(article);
    }
  }

  return {
    ...sample,
    date: new Date().toISOString().slice(0, 10),
    generatedAt: new Date().toISOString(),
    automation: { source: "scheduled-rss", successfulFeeds, totalFeeds: feeds.length },
    articles,
  };
}

async function main() {
  const briefing = await buildBriefing();
  await writeFile(OUTPUT_URL, `${JSON.stringify(briefing, null, 2)}\n`, "utf8");
  console.log(`Updated ${briefing.articles.length} articles from ${briefing.automation.successfulFeeds}/${briefing.automation.totalFeeds} feeds.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
