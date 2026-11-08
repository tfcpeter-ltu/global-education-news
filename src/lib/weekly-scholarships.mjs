import { scholarshipState, taipeiDate } from './scholarship-status.mjs';

// Publication dates select new entries; updated/review dates never make an old
// scholarship new again. The seven Taipei calendar days match the weekly feed.
export function weeklyScholarships(pages, reports, now = new Date()) {
  const end = taipeiDate(now);
  const start = new Date(Date.parse(`${end}T00:00:00Z`) - 6 * 86400000).toISOString().slice(0, 10);
  const evidence = new Map();
  for (const report of reports) {
    if (!report.date || report.date < start || report.date > end) continue;
    for (const added of report.scholarshipAdditions || []) {
      if (added.isNew === true && added.baselineAbsent === true && added.eligibleTaiwan === true
          && !report.scholarshipBaselineSlugs?.includes(added.slug)) evidence.set(added.slug, report.date);
    }
  }
  const seen = new Set();
  const items = pages.filter(item => {
    if (!item.slug || seen.has(item.slug) || !evidence.has(item.slug)) return false;
    const date = String(item.date || '').slice(0, 10);
    if (date < start || date > end || !date || !item.title || !item.description) return false;
    seen.add(item.slug);
    return true;
  }).map(item => ({ ...item, state: scholarshipState(item, now) }))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)) || a.slug.localeCompare(b.slug));
  return { start, end, items };
}

const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function scholarshipDigestHtml(digest) {
  const rows = digest.items.map(item => {
    const url = `https://globalednews.com/scholarships/items/${encodeURIComponent(item.slug)}/`;
    return `<li><p><strong>${escape(item.title)}</strong><br/>${escape(item.country)} · ${escape(item.level)} · 補助：${escape(item.funding)}<br/>${escape(item.description)}<br/>期限：${escape(item.deadline)}<br/>申請狀態：${escape(item.state.label)}；資格：${escape(item.eligibilityTW)}<br/><a href="${url}">查看獎學金詳情與官方來源 →</a></p></li>`;
  }).join('');
  return `<p>台灣國際獎學金｜本週新增（${digest.start} 至 ${digest.end}，台北日期）</p><p>本期彙整 ${digest.items.length} 個實際新增項目。這是免費開放、具公益性質的教育資訊整理；已截止、尚未開放或待複查項目會明確標示，申請前請核對官方條件。</p><ol>${rows}</ol><p><a href="https://globalednews.com/scholarships/">查看完整國際獎學金雷達 →</a></p>`;
}
