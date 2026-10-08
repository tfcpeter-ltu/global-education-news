// Structural checks supplement, never replace, a visual check of the public post.
export function facebookPhotoErrors(post, { requireSequence = true } = {}) {
 const errors = [];
 const time = value => value ? Date.parse(value) : NaN;
 const attachments = post?.photoAttachments || [];
 const nativePhoto = attachment => {
  try {
   const url = new URL(attachment.url);
   return /^(www\.)?facebook\.com$/.test(url.hostname) &&
    /^\/photo\/?$/.test(url.pathname) && /^\d+$/.test(attachment.id || '') &&
    url.searchParams.get('fbid') === attachment.id;
  } catch { return false; }
 };
 if (post?.mediaKind !== 'uploaded-photo' || post?.mediaStatus !== 'VERIFIED' ||
     Number(post?.imageCount) < 1 || !Number.isFinite(time(post?.mediaVerifiedAt)) ||
     !attachments.some(nativePhoto) || !post?.publicPhotoScreenshot)
  errors.push('require a native photo ID/permalink and a saved public screenshot; a post URL or link card is not photo evidence');
 if (requireSequence && (!Number.isFinite(time(post?.photoAttachedAt)) ||
     !Number.isFinite(time(post?.copyAddedAt)) ||
     time(post.photoAttachedAt) >= time(post.copyAddedAt) || !post?.photoReadyEvidence))
  errors.push('require observed photo-ready evidence before adding copy; never invent timestamps after publication');
 return errors;
}
