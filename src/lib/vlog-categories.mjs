// Explicit grouping survives new daily imports; source type and topic stay independent.
export const vlogGroup = video => video.vlogGroup === 'tour' || video.topic === '遊學體驗' ? 'tour' : 'study';
