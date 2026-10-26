import { peterProfile } from './peter-profile';
// Author-supplied titles are works, not independently confirmed publication records.
const authorListedBook = (id: string, title: string, group: string, details: string, manuscript = false) => ({
  id, title, group,
  status: manuscript ? '已核對書稿署名；出版資訊待補' : '作者提供書目；出版資訊待補',
  authorLabel: '陳祖豐 Peter Chen 著', details, isbn: null,
  sourceLabel: manuscript ? '資料依據：作者書目截圖與現有書稿版權頁' : '資料依據：作者提供的書目截圖',
  sourceUrl: null, sourceOrganization: '作者提供資料', evidenceLevel: 'D',
  schema: {
    '@type': 'Book', '@id': `https://globalednews.com/peter/books/#${id}`,
    name: title, author: peterProfile, inLanguage: 'zh-Hant-TW',
    creativeWorkStatus: '出版資訊待補'
  }
});
export const peterBooks = [
  authorListedBook('canada-university-2027', '2027 加拿大大學申請手冊', '國別大學申請手冊', '加拿大大學申請主題。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。'),
  authorListedBook('us-university-2027', '2027 美國大學申請手冊', '國別大學申請手冊', '美國大學申請主題。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。'),
  authorListedBook('uk-university-2027', '2027 英國大學申請手冊', '國別大學申請手冊', '英國大學申請主題。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。'),
  authorListedBook('australia-nz-university-2027', '2027 澳洲紐西蘭大學申請手冊', '國別大學申請手冊', '澳洲與紐西蘭大學申請主題。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。'),
  authorListedBook('world-universities-01-harvard', '我是如何申請上哈佛大學的？', '世界名校選擇與錄取實戰系列', '系列 01。現有書稿副標題涵蓋錄取者故事、申請準備與招生解析；版權頁列作者陳祖豐、出版者麗豐文化有限公司，ISBN 記載為「申請中」。實際發行資訊待補。', true),
  authorListedBook('world-universities-02-mit', '我在 MIT 學到了什麼', '世界名校選擇與錄取實戰系列', '系列 02。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。'),
  authorListedBook('world-universities-03-uk', '我是如何選擇英國大學的', '世界名校選擇與錄取實戰系列', '系列 03；現有書稿副標題為「除了世界排名，還能看什麼」。版權頁列作者陳祖豐、出版者麗豐文化有限公司，ISBN 記載為「申請中」。實際發行資訊待補。', true),
  authorListedBook('world-universities-04-canada', '如何選擇我最喜歡的加拿大大學', '世界名校選擇與錄取實戰系列', '系列 04。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。'),
  authorListedBook('world-universities-05-australia', '如何找到最適合的澳洲大學與未來發展', '世界名校選擇與錄取實戰系列', '系列 05。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。'),
  {
    id: 'ltu-ossd-2025',
    group: '國際教育專題與文章集',
    title: 'LTU OSSD 雙聯國際升學白皮書．2025',
    status: '國家圖書館書目列載',
    authorLabel: '陳祖豐 作',
    details: '初版；書目出版年月：2025 年 6 月；65 頁；平裝；出版者列為陳祖豐。',
    isbn: '9786260143138',
    sourceLabel: '國家圖書館 114 年 6 月新書書目，第 171 頁',
    sourceUrl: 'https://isbn.ncl.edu.tw/FCKEDITOR_UploadFiles/1752563403.pdf#page=171',
    sourceOrganization: '國家圖書館國際標準書號中心',
    evidenceLevel: 'A',
    schema: {
      '@type': 'Book', '@id': 'https://globalednews.com/peter/books/#ltu-ossd-2025',
      name: 'LTU OSSD 雙聯國際升學白皮書．2025', isbn: '9786260143138',
      author: peterProfile, bookEdition: '初版', numberOfPages: 65,
      bookFormat: 'https://schema.org/Paperback', inLanguage: 'zh-Hant-TW',
      citation: 'https://isbn.ncl.edu.tw/FCKEDITOR_UploadFiles/1752563403.pdf#page=171'
    }
  },
  {
    id: 'understanding-systems-volume-1',
    group: '國際教育專題與文章集',
    title: '看懂制度，選對世界｜Peter 的國際教育講座 第一集',
    status: '網站文章集',
    authorLabel: 'Peter 著',
    details: '本站收錄 50 篇文章，依英國、美國、加拿大、澳洲、新加坡與跨國比較分類。',
    isbn: null,
    sourceLabel: '閱讀第一集目錄與文章',
    sourceUrl: '/peter/volume-1/',
    sourceOrganization: '環球教育新聞網', evidenceLevel: 'D',
    schema: {
      '@type': 'CollectionPage', '@id': 'https://globalednews.com/peter/volume-1/#collection',
      name: '看懂制度，選對世界｜Peter 的國際教育講座 第一集',
      url: 'https://globalednews.com/peter/volume-1/', author: peterProfile, inLanguage: 'zh-Hant-TW'
    }
  },
  authorListedBook('junior-high-english-exam', '國中會考英文準備大全', '英語學習與考試準備', '國中會考英文準備主題。書名依作者提供目錄登錄；版本、出版者與 ISBN 待補。')
];
// No assumed ISBNs or publication dates. Add works only from identified records.
export const peterBooksVerifiedDate = '2026-10-26';
