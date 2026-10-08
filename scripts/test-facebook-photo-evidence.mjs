import assert from 'node:assert/strict';
import { facebookPhotoErrors } from './facebook-photo-evidence.mjs';
const good = {mediaKind:'uploaded-photo',mediaStatus:'VERIFIED',imageCount:1,
 mediaVerifiedAt:'2026-10-09T01:03:00Z',publicPhotoScreenshot:'proof.png',
 photoAttachments:[{id:'123',url:'https://www.facebook.com/photo/?fbid=123'}],
 photoAttachedAt:'2026-10-09T01:00:00Z',copyAddedAt:'2026-10-09T01:01:00Z',photoReadyEvidence:'thumbnail-ready.png'};
assert.deepEqual(facebookPhotoErrors(good),[]);
assert.ok(facebookPhotoErrors({...good,photoAttachments:[{id:'123',url:'https://www.facebook.com/posts/123'}]}).length);
assert.ok(facebookPhotoErrors({...good,photoAttachments:[{id:'456',url:'https://www.facebook.com/photo/?fbid=123'}]}).length);
assert.ok(facebookPhotoErrors({...good,photoAttachments:[{id:'123',url:'https://www.facebook.com.evil.test/photo/?fbid=123'}]}).length);
assert.ok(facebookPhotoErrors({...good,photoAttachedAt:good.copyAddedAt}).length);
assert.ok(facebookPhotoErrors({...good,copyAddedAt:null}).length);
assert.ok(facebookPhotoErrors({...good,mediaKind:'link-preview'}).length);
assert.ok(facebookPhotoErrors({...good,publicPhotoScreenshot:null}).length);
console.log('Facebook photo evidence regressions passed');
