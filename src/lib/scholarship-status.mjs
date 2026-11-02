// Editorial review dates are evidence dates, never build dates.
export const taipeiDate = (now = new Date()) => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit'
}).format(now);

export function scholarshipState(item, now = new Date(), english = false) {
  const labels = english
    ? { closed: 'This round has closed', stale: 'Recheck required', open: 'Open', tracking: 'Next round / track updates', scheduled: 'Not yet open', restricted: 'Existing applicants only' }
    : { closed: '本輪已截止', stale: '待複查', open: '開放中', tracking: '下一輪追蹤', scheduled: '尚未開放', restricted: '限已完成前階段者' };
  let code = item.reviewCode;
  const close = Date.parse(item.applicationClosesAt || '');
  const start = Date.parse(item.applicationOpensAt || '');
  const reviewed = item.statusReviewDate || item.verificationDate;
  const age = (Date.parse(taipeiDate(now)) - Date.parse(reviewed || '')) / 86400000;
  if (Number.isFinite(close) && now.getTime() >= close) code = 'closed';
  else if (Number.isFinite(Date.parse(item.reviewExpiresAt || '')) && now.getTime() >= Date.parse(item.reviewExpiresAt)) code = 'stale';
  else if (Number.isFinite(start) && now.getTime() < start) code = 'scheduled';
  else if (!code) code = /開放中/.test(item.status || '') ? 'open' : /截止/.test(item.status || '') ? 'closed' : 'tracking';
  if (['open', 'restricted', 'scheduled'].includes(code) && (!Number.isFinite(age) || age > 7)) code = 'stale';
  return { code, label: labels[code] || labels.stale, reviewed: reviewed || '', open: code === 'open' };
}

export function isDailyPick(item, now = new Date()) {
  return item.featuredDate === taipeiDate(now) && item.verificationDate === taipeiDate(now)
    && scholarshipState(item, now).open && String(item.eligibilityTW).includes('可申請')
    && Number.isFinite(Date.parse(item.featuredUntil)) && Date.parse(item.featuredUntil) > now.getTime();
}
