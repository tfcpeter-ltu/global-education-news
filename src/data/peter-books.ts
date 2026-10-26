import { peterProfile } from './peter-profile';
export const peterBooks = [
  {
    id: 'ltu-ossd-2025',
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
  }
];
// No assumed ISBNs or publication dates. Add works only from identified records.
export const peterBooksVerifiedDate = '2026-10-26';
