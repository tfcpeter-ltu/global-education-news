export interface StoryImageInfo {
  url: string;
  alt: string;
  credit: string;
  source?: string;
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=1280`;

const rules: Array<{ test: RegExp; image: StoryImageInfo }> = [
  {
    test: /Graduate Visa|18 個月|2027.*英國/i,
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/University_college_London.jpg/1280px-University_college_London.jpg',
      alt: '英國倫敦大學學院校園，象徵英國高等教育與畢業生簽證政策',
      credit: '資料照片：Wikimedia Commons',
      source: 'https://commons.wikimedia.org/'
    }
  },
  {
    test: /返加注意|重新入境|Study Permit 不代表/i,
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/University_of_Toronto_campus_in_November_2023_1.jpg/1280px-University_of_Toronto_campus_in_November_2023_1.jpg',
      alt: '加拿大多倫多大學校園，象徵國際學生返加與就學',
      credit: '資料照片：Wikimedia Commons',
      source: 'https://commons.wikimedia.org/'
    }
  },
  {
    test: /澳洲留學生打工|最低工資|AUD 26\.44/i,
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Usydcampuspicture.jpg/1280px-Usydcampuspicture.jpg',
      alt: '澳洲雪梨大學校園，象徵國際學生在澳洲就學與工作',
      credit: '資料照片：Wikimedia Commons',
      source: 'https://commons.wikimedia.org/'
    }
  },
  {
    test: /香港大學|HKU|Non-JUPAS/i,
    image: {
      url: 'https://admissions.hku.hk/sites/default/files/styles/hkuad_lpm_1_1_image_mobile/public/2021-02/0419152830_DSC00399.jpg?itok=koKNSY4C',
      alt: '香港大學校園 University Street 的國際學生',
      credit: '圖片來源：The University of Hong Kong Admissions',
      source: 'https://admissions.hku.hk/apply/international-qualifications'
    }
  },
  {
    test: /北市115學年度25名|交換一年|交換學生計畫/i,
    image: {
      url: 'https://www-ws.gov.taipei/001/Upload/342/relpic/10162/9677666/993415d3-d5ca-4408-814b-78e7afd77a54.jpg',
      alt: '臺北市國際交換學生行前交流活動',
      credit: '圖片來源：臺北市政府教育局',
      source: 'https://www.doe.gov.taipei/News_Content.aspx?n=B3DDF0458F0FFC11&s=65148A20D36784FA&sms=72544237BBE4C5F6'
    }
  },
  {
    test: /歐盟獎學金|赴歐留學|Erasmus/i,
    image: {
      url: commons('Four students showing placard in Igreja de Santa Engrácia.jpg'),
      alt: '參與 Erasmus 國際交換的歐洲大學生',
      credit: '資料照片：Wikimedia Commons／ralmonline alm（CC BY 2.0）',
      source: 'https://commons.wikimedia.org/wiki/File:Four_students_showing_placard_in_Igreja_de_Santa_Engr%C3%A1cia.jpg'
    }
  },
  {
    test: /LTU OSSD|海外升學成果|工商時報/i,
    image: {
      url: commons('University graduation (Unsplash).jpg'),
      alt: '大學畢業典禮學生群像，象徵海外升學成果',
      credit: '資料照片：Wikimedia Commons／Faustin Tuyambaze（CC0）',
      source: 'https://commons.wikimedia.org/wiki/File:University_graduation_(Unsplash).jpg'
    }
  },
  {
    test: /加拿大留學財力|CAD 23,448|加拿大.*財力/i,
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/University_of_Toronto_campus_in_November_2023_1.jpg/1280px-University_of_Toronto_campus_in_November_2023_1.jpg',
      alt: '加拿大多倫多大學校園',
      credit: '資料照片：Wikimedia Commons',
      source: 'https://commons.wikimedia.org/'
    }
  },
  {
    test: /英國學生簽證|Sponsored Study|英國.*簽證/i,
    image: {
      url: commons('Four students showing placard in Igreja de Santa Engrácia.jpg'),
      alt: '國際學生群像，象徵英國國際招生與學生簽證',
      credit: '資料照片：Wikimedia Commons／ralmonline alm（CC BY 2.0）',
      source: 'https://commons.wikimedia.org/wiki/File:Four_students_showing_placard_in_Igreja_de_Santa_Engr%C3%A1cia.jpg'
    }
  },
  {
    test: /澳洲國際學生名額|29\.5萬|National Planning Level/i,
    image: {
      url: commons('University graduation (Unsplash).jpg'),
      alt: '國際大學生群像，象徵澳洲國際學生招生',
      credit: '資料照片：Wikimedia Commons／Faustin Tuyambaze（CC0）',
      source: 'https://commons.wikimedia.org/wiki/File:University_graduation_(Unsplash).jpg'
    }
  },
  {
    test: /CPT|F-1|美國.*實習/i,
    image: {
      url: commons('Royce Hall original.jpg'),
      alt: '美國加州大學洛杉磯分校 UCLA Royce Hall',
      credit: '資料照片：Wikimedia Commons／NativeForeigner',
      source: 'https://commons.wikimedia.org/wiki/File:Royce_Hall_original.jpg'
    }
  },
  {
    test: /2026留學政策正在收緊|四大目的地|美國、加拿大、英國、澳洲/i,
    image: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/University_Students.jpg/1280px-University_Students.jpg',
      alt: '大學學生校園生活，象徵國際教育與留學政策',
      credit: '資料照片：Wikimedia Commons',
      source: 'https://commons.wikimedia.org/'
    }
  }
];

const fallbackPool: StoryImageInfo[] = [
  {
    url: commons('Students in a classroom.jpg'),
    alt: '學生在教室中學習',
    credit: '資料照片：Wikimedia Commons',
    source: 'https://commons.wikimedia.org/'
  },
  {
    url: commons('University graduation (Unsplash).jpg'),
    alt: '大學畢業典禮',
    credit: '資料照片：Wikimedia Commons',
    source: 'https://commons.wikimedia.org/'
  },
  {
    url: commons('Royce Hall original.jpg'),
    alt: '大學校園建築',
    credit: '資料照片：Wikimedia Commons',
    source: 'https://commons.wikimedia.org/'
  },
  {
    url: commons('Four students showing placard in Igreja de Santa Engrácia.jpg'),
    alt: '國際交換學生',
    credit: '資料照片：Wikimedia Commons',
    source: 'https://commons.wikimedia.org/'
  }
];

const hash = (text: string) => Array.from(text).reduce((acc, char) => ((acc * 31) + char.charCodeAt(0)) >>> 0, 7);

export function getStoryImageInfo(story: any): StoryImageInfo {
  if (story?.image) {
    return {
      url: story.image,
      alt: story.imageAlt || `${story.title || story.category || '國際教育'}新聞圖片`,
      credit: story.imageCredit || '圖片來源：Global Education News',
      source: story.imageSource
    };
  }

  const haystack = `${story?.title || ''} ${story?.description || ''} ${story?.category || ''}`;
  const matched = rules.find((rule) => rule.test.test(haystack));
  if (matched) return matched.image;

  return fallbackPool[hash(haystack) % fallbackPool.length];
}
