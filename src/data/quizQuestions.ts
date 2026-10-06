import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 第 1 節: 中華飲食文化歷程與機能特性 (Slide 1-5)
  {
    id: 'q1',
    section: 'sec1_history',
    sectionName: '第1節 中華飲食文化之發展歷程',
    type: 'single',
    question: '中華飲食文化之烹飪用具與火的發展演進順序，下列何者正確？',
    options: [
      '火 ➔ 陶器、銅器 ➔ 石塊、板 ➔ 鐵器',
      '火 ➔ 石塊、板 ➔ 陶器、銅器 ➔ 鐵器',
      '火 ➔ 銅器 ➔ 陶器 ➔ 石塊、板 ➔ 鐵器',
      '石塊、板 ➔ 火 ➔ 鐵器 ➔ 陶器、銅器'
    ],
    correctAnswers: [1],
    explanation: '根據教材第3頁，中華飲食文化之發展順序為：火 ➔ 石塊、板 ➔ 陶器、銅器 ➔ 鐵器。',
    slideRef: '第 3 頁',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    section: 'sec1_history',
    sectionName: '第1節 中華飲食文化之發展歷程',
    type: 'single',
    question: '食物機能特性中，「維持生命之營養機能（如維生素、礦物質）」屬於下列哪一項機能？',
    options: [
      '一次機能特性',
      '二次機能特性',
      '三次機能特性',
      '四次機能特性'
    ],
    correctAnswers: [0],
    explanation: '一次機能特性指「維持生命之營養機能」，提供生存必需營養如維生素、礦物質；二次為嗜好機能（色香味），三次為生理調節機能，四次為文化機能。',
    slideRef: '第 3, 5 頁',
    difficulty: 'easy'
  },
  {
    id: 'q3',
    section: 'sec1_history',
    sectionName: '第1節 中華飲食文化之發展歷程',
    type: 'single',
    question: '賦予食物色、香、味、觸覺的感官機能，使人產生食慾與食感性，屬於食物的哪一項機能特性？',
    options: [
      '一次機能特性 (營養機能)',
      '二次機能特性 (嗜好機能)',
      '三次機能特性 (生理機能)',
      '四次機能特性 (文化機能)'
    ],
    correctAnswers: [1],
    explanation: '二次機能特性為「嗜好機能」，提供食感性，指賦予食物色、香、味、觸覺的感官機能。例如茶湯之鮮味、澀味、香氣與湯色。',
    slideRef: '第 3, 4, 5 頁',
    difficulty: 'easy'
  },
  {
    id: 'q4',
    section: 'sec1_history',
    sectionName: '第1節 中華飲食文化之發展歷程',
    type: 'single',
    question: '以茶葉成分為例，茶葉中的多元酚類（兒茶素）、咖啡因、抗氧化性及微量元素（如氟），主要發揮的是哪一種機能？',
    options: [
      '一級機能 (營養性)',
      '二級機能 (嗜好性)',
      '三級機能 (生理調節性)',
      '四級機能 (文化特色)'
    ],
    correctAnswers: [2],
    explanation: '兒茶素、咖啡因、抗氧化性、微量元素等屬於「三級機能（生理調節性）」，具備調節人體生理機能之特性。',
    slideRef: '第 5 頁',
    difficulty: 'medium'
  },
  {
    id: 'q5',
    section: 'sec1_history',
    sectionName: '第1節 中華飲食文化之發展歷程',
    type: 'single',
    question: '在「食品機能性之相關圖」中，一次、二次、三次與四次機能特性的共同交集核心要素為何？',
    options: [
      '精緻擺盤',
      '低卡低脂',
      '安全、衛生',
      '高性價比'
    ],
    correctAnswers: [2],
    explanation: '根據第4頁食品機能性文氏圖，位於所有機能特性最中央的核心交集為「安全衛生」。安全衛生是所有餐飲與食品機能的絕對基石。',
    slideRef: '第 4 頁',
    difficulty: 'easy'
  },
  {
    id: 'q6',
    section: 'sec1_history',
    sectionName: '第1節 中華飲食文化之發展歷程',
    type: 'tf',
    question: '「茶道、擂茶文化、茶歌」在茶葉機能性分類中，屬於三次機能（生理調節性）。',
    options: ['正確', '錯誤'],
    correctAnswers: [1],
    explanation: '錯誤！茶道、擂茶文化、茶歌屬於「四級機能（文化特色 / 文化機能）」，代表精神與文化底蘊，而非三次生理調節。',
    slideRef: '第 5 頁',
    difficulty: 'easy'
  },

  // 第 2 節: 中餐菜系 (Slide 6-12)
  {
    id: 'q7',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '在中國傳統飲食中，與山東魯菜並稱「國菜」，且為「宮廷第二大菜系」及南食兩大台柱之一的菜系是？',
    options: [
      '蘇菜 (淮揚菜，由蘇州、揚州、南京、鎮江四大菜構成)',
      '湘菜 (湖南菜，以長沙菜為代表)',
      '徽菜 (徽州菜系，以重油重色為代表)',
      '閩菜 (福建菜，以泉州廈門為代表)'
    ],
    correctAnswers: [0],
    explanation: '根據教材第7與第9頁，江蘇菜系（蘇菜，常稱為淮揚菜）由蘇州、揚州、南京、鎮江四大菜構成，為宮廷第二大菜系、南食兩大台柱之一，口味平淡鹹中帶甜，濃中帶淡，與魯菜並稱「國菜」。',
    slideRef: '第 7, 9 頁',
    difficulty: 'medium'
  },
  {
    id: 'q8',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '被譽為「八大菜系之首」、「北食代表」，由孔府、濟南、膠東風味組成，且以孔府風味為龍頭的菜系是？',
    options: [
      '川菜',
      '蘇菜',
      '魯菜',
      '徽菜'
    ],
    correctAnswers: [2],
    explanation: '魯菜（山東菜）為八大菜系之首、北食代表、世界三大菜園之一，與江蘇菜系並稱國菜，由孔府、濟南、膠東三風味組成，以孔府風味為龍頭。',
    slideRef: '第 7 頁',
    difficulty: 'easy'
  },
  {
    id: 'q9',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '孔府菜以曲阜菜為代表，其最具代表性的烹飪理念與特色名言是？',
    options: [
      '濃油赤醬，重糖色艷',
      '食不厭精，膾不厭細',
      '一辣二臘，色重油厚',
      '原汁原味，不加雕飾'
    ],
    correctAnswers: [1],
    explanation: '孔府菜講究「食不厭精，膾不厭細」，代表名菜有九轉大腸、糖醋黃河鯉魚、烤鴨等。',
    slideRef: '第 7 頁',
    difficulty: 'medium'
  },
  {
    id: 'q10',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '「魚香肉絲、宮保雞丁、夫妻肺片、麻婆豆腐」是哪一個菜系的經典代表名菜？該菜系亦為中國民間最大菜系。',
    options: [
      '粵菜',
      '川菜',
      '湘菜',
      '浙菜'
    ],
    correctAnswers: [1],
    explanation: '川菜以成都、重慶菜為代表，為中國民間最大菜系，特點是酸、甜、麻、辣香、油重、味濃，注重調味。',
    slideRef: '第 8 頁',
    difficulty: 'easy'
  },
  {
    id: 'q11',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '關於「粵菜」的敘述，下列何者「錯誤」？',
    options: [
      '由廣州、客家、潮汕三種地區風味組成',
      '是中國民間第二大菜系，世界各國中菜館多數以粵菜為主',
      '調味講究「五滋、六味」',
      '是北食的代表，調味以重油重色為首'
    ],
    correctAnswers: [3],
    explanation: '北食代表是「魯菜」，粵菜是南方廣東菜，以鮮美、五滋六味、海鮮港點著稱。',
    slideRef: '第 9 頁',
    difficulty: 'medium'
  },
  {
    id: 'q12',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '為南食兩大台柱之一、宮廷第二大菜系，由蘇州、揚州、南京、鎮江四大菜構成，特點是「濃中帶淡，鮮香酥爛，原汁原湯濃而不膩」的菜系是？',
    options: [
      '蘇菜 (淮揚菜)',
      '浙菜',
      '閩菜',
      '徽菜'
    ],
    correctAnswers: [0],
    explanation: '江蘇菜系（蘇菜，又稱淮揚菜）為南食兩大台柱之一、宮廷第二大菜系，口味平淡、鹹中帶甜，濃中帶淡。',
    slideRef: '第 9 頁',
    difficulty: 'medium'
  },
  {
    id: 'q13',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '以福州、泉州、廈門為代表，特點為「色調美觀、滋味清鮮」，且以「重刀工、湯菜眾多」著稱（名菜如佛跳牆）的菜系是？',
    options: [
      '湘菜',
      '閩菜',
      '徽菜',
      '滬菜'
    ],
    correctAnswers: [1],
    explanation: '閩菜（福建菜）以福州、泉州、廈門為代表，特點是色調美觀、滋味清鮮，烹調特色為「重刀工」且「湯菜眾多」，代表菜有炒螺片、佛跳牆。',
    slideRef: '第 10 頁',
    difficulty: 'easy'
  },
  {
    id: 'q14',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '以杭州菜為代表，水鄉盛產魚蝦，菜餚風味特點概括為「清、香、脆、嫩、爽、鮮」的是？',
    options: [
      '浙菜',
      '徽菜',
      '湘菜',
      '川菜'
    ],
    correctAnswers: [0],
    explanation: '浙菜以杭州菜為代表，特產魚蝦，風味特點為清、香、脆、嫩、爽、鮮六字。',
    slideRef: '第 10 頁',
    difficulty: 'easy'
  },
  {
    id: 'q15',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '湘菜（湖南菜）以長沙菜為代表，其最大的兩個核心特色是？',
    options: [
      '一是酸，二是甜',
      '一是辣，二是臘',
      '一是鮮，二是淡',
      '一是麻，二是苦'
    ],
    correctAnswers: [1],
    explanation: '湖南菜最大的特色「一是辣，二是臘」，特點是油重色濃，多以辣椒、燻臘為原料。',
    slideRef: '第 11 頁',
    difficulty: 'easy'
  },
  {
    id: 'q16',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'single',
    question: '關於「徽菜」的敘述，下列何者正確？',
    options: [
      '徽菜等同於整個安徽省的所有地方菜餚',
      '徽菜流行於徽州地區和浙江西部，選料樸實、講究火候、重油重色、保持原汁原味',
      '徽菜以生冷切片沾芥末為主要進食方式',
      '徽菜是北食代表，以曲阜菜為龍頭'
    ],
    correctAnswers: [1],
    explanation: '徽菜即徽州菜系，「不等同於安徽菜」，流行於徽州地區和浙江西部，選料樸實、講究火候、重油重色、味道醇厚、保持原汁原味。',
    slideRef: '第 11 頁',
    difficulty: 'medium'
  },
  {
    id: 'q17',
    section: 'sec2_cuisines',
    sectionName: '第2節 中餐菜系',
    type: 'multiple',
    question: '【複選題】下列關於地方菜系特色的配對，哪些是正確的？（請選出所有正確項目）',
    options: [
      '滬菜：湯鹵醇厚，濃油赤醬，糖重色艷，鹹淡適口',
      '臺菜：狹義指臺灣閩南料理，如西鹵白菜、生炒花枝、香菇肉羹湯',
      '客家菜：多油多鹹重口味，喜以加工芥菜入菜（如酸菜、梅乾菜）',
      '清真菜：對中國穆斯林飲食稱謂，忌食豬肉，以牛羊為主'
    ],
    correctAnswers: [0, 1, 2, 3],
    explanation: '四個選項敘述皆完全正確符合教材第12頁內容：滬菜濃油赤醬、臺菜閩南古早味、客家菜芥菜多鹹油、清真菜忌豬牛羊。',
    slideRef: '第 12 頁',
    difficulty: 'hard'
  },

  // 第 3 節: 各國料理簡介 (Slide 13-18)
  {
    id: 'q18',
    section: 'sec3_world',
    sectionName: '第3節 各國料理簡介',
    type: 'single',
    question: '西方烹飪中被尊稱為「西餐之母」，常見食材包括小牛肉、番茄、橄欖、乳酪及迷迭香、月桂葉、九層塔等香辛料的是哪一國料理？',
    options: [
      '法國菜',
      '英國菜',
      '義大利菜',
      '俄羅斯菜'
    ],
    correctAnswers: [2],
    explanation: '義大利菜被稱為「西餐之母」，使用小牛肉、番茄、橄欖、乳酪與大量香草，搭配各種醬汁義大利麵。',
    slideRef: '第 13 頁',
    difficulty: 'easy'
  },
  {
    id: 'q19',
    section: 'sec3_world',
    sectionName: '第3節 各國料理簡介',
    type: 'single',
    question: '法國料理中名揚世界的「法國料理三寶」是指哪三樣珍饈？',
    options: [
      '牛排、田螺、紅酒',
      '松露、鵝肝、魚子醬',
      '起司、牛油、鮮奶油',
      '麵包、洋蔥湯、生蠔'
    ],
    correctAnswers: [1],
    explanation: '教材第13頁明述，「松露、鵝肝、魚子醬」堪稱法國料理的三寶。佐料為酒，講究火候。',
    slideRef: '第 13 頁',
    difficulty: 'easy'
  },
  {
    id: 'q20',
    section: 'sec3_world',
    sectionName: '第3節 各國料理簡介',
    type: 'single',
    question: '下列各國飲食特色敘述，何者與教材內容「相符」？',
    options: [
      '英國菜：講究繁複烹調，熱量極低且以蔬菜為主',
      '德國：肉製品多為生冷直接切片沾芥末食用',
      '俄式西餐：選料極少，嚴格禁止冷食',
      '西班牙：最著名為生冷肉排沾沙拉醬'
    ],
    correctAnswers: [1],
    explanation: '教材第14頁指出：德國肉製品多為生冷直接切片沾芥末食用。英國菜特色為多脂、高熱量、喜好原味不喜繁複烹調；西班牙以海鮮飯著名；俄式注重冷食。',
    slideRef: '第 14 頁',
    difficulty: 'medium'
  },
  {
    id: 'q21',
    section: 'sec3_world',
    sectionName: '第3節 各國料理簡介',
    type: 'single',
    question: '在傳統日式餐桌擺設中，標準的位置配置通常是？',
    options: [
      '左邊放湯，右邊放飯',
      '左邊放飯，右邊放湯',
      '飯與湯皆放於右側',
      '飯與湯皆放於中間'
    ],
    correctAnswers: [1],
    explanation: '教材第16頁明確標註：常見的日式餐桌擺設為「左邊放飯，右邊放湯」。',
    slideRef: '第 16 頁',
    difficulty: 'medium'
  },
  {
    id: 'q22',
    section: 'sec3_world',
    sectionName: '第3節 各國料理簡介',
    type: 'single',
    question: '關於日本料理（和食）五大流派的對應，下列何者「錯誤」？',
    options: [
      '本膳料理：宮廷與武士階級禮儀，一人一膳，規矩繁多',
      '卓袱料理：長崎異國融合料理，圓桌共食，中西合璧',
      '懷石料理：最初為禪宗僧侶懷抱暖石度過空腹，配合茶道講究季節美學',
      '精進料理：民間宴席豪華聚會，大口飲酒且食用大量魚蝦'
    ],
    correctAnswers: [3],
    explanation: '精進料理是源自佛教寺廟的修行素食，「全素、不殺生、五辛皆無」，絕不吃肉魚與飲酒；民間社交飲酒豪華聚會的是「會席料理」。',
    slideRef: '第 16, 17 頁',
    difficulty: 'medium'
  },
  {
    id: 'q23',
    section: 'sec3_world',
    sectionName: '第3節 各國料理簡介',
    type: 'single',
    question: '關於「韓國料理」的敘述，下列何者正確？',
    options: [
      '口味以極度重油重鹹為主，不吃稻米',
      '韓國料理以清淡為主，除了熟食米飯外，常伴隨「熱湯」（熱湯是主菜），泡菜是常見飯饌',
      '泡菜屬於韓國的主菜，熱湯僅作為餐後甜點',
      '全餐嚴格禁止食用任何發酵蔬菜'
    ],
    correctAnswers: [1],
    explanation: '教材第15頁指出：韓國料理以清淡為主，稻米為主食，另外常伴隨熱湯（熱湯是主菜），韓國泡菜是常見的飯饌（小菜）。',
    slideRef: '第 15 頁',
    difficulty: 'easy'
  },
  {
    id: 'q24',
    section: 'sec3_world',
    sectionName: '第3節 各國料理簡介',
    type: 'single',
    question: '東南亞各國愛用的香料各具特色，其中「愛用羅望子、南薑粉、肉桂等顏色獨特香料醃肉」的是哪一個國家？',
    options: [
      '泰國',
      '馬來西亞',
      '越南',
      '緬甸'
    ],
    correctAnswers: [1],
    explanation: '教材第18頁：泰國愛用香菜、香茅、南薑等清香香料；馬來西亞愛用羅望子、南薑粉、肉桂醃肉；越南愛用九層塔、香茅。',
    slideRef: '第 18 頁',
    difficulty: 'medium'
  },

  // 第 4 節: 飲食新趨勢 (Slide 19-21)
  {
    id: 'q25',
    section: 'sec4_trends',
    sectionName: '第4節 飲食新趨勢',
    type: 'single',
    question: '台灣素食包裝食品法規中，「全素或純素」的法定內容定義為？',
    options: [
      '不含植物五辛之純植物性食物',
      '純植物性食物加蛋製品',
      '純植物性食物加奶製品',
      '可含植物五辛但不可含肉類'
    ],
    correctAnswers: [0],
    explanation: '全素或純素是指「不含植物五辛（蔥、蒜、韭、蕎及洋蔥）之純植物性食物」。',
    slideRef: '第 19 頁',
    difficulty: 'easy'
  },
  {
    id: 'q26',
    section: 'sec4_trends',
    sectionName: '第4節 飲食新趨勢',
    type: 'multiple',
    question: '【複選題】依據法規定義，「植物五辛」包含哪五種植物？（請全選出）',
    options: [
      '蔥',
      '蒜',
      '韭',
      '蕎',
      '洋蔥'
    ],
    correctAnswers: [0, 1, 2, 3, 4],
    explanation: '植物五辛嚴格定義為：蔥、蒜、韭、蕎、洋蔥，共五項！',
    slideRef: '第 19 頁',
    difficulty: 'medium'
  },
  {
    id: 'q27',
    section: 'sec4_trends',
    sectionName: '第4節 飲食新趨勢',
    type: 'single',
    question: '「慢食 (Slow Food)」運動是由哪一國人提出？其創立的主要目的為何？',
    options: [
      '法國人卡爾洛，目的是提倡米其林星級精緻飲食',
      '義大利人卡爾洛‧佩特里尼，目的是對抗日益盛行的速食文化',
      '英國人佩特里尼，目的是推廣油炸速食工業',
      '日本人佩特里尼，目的是推廣懷石料理禪宗文化'
    ],
    correctAnswers: [1],
    explanation: '慢食(slow food)是由義大利人卡爾洛‧佩特里尼(Carlo Petrini)提出，目的是對抗日益盛行的速食。',
    slideRef: '第 21 頁',
    difficulty: 'easy'
  },
  {
    id: 'q28',
    section: 'sec4_trends',
    sectionName: '第4節 飲食新趨勢',
    type: 'single',
    question: '何謂「生機飲食」？下列敘述何者完全符合其定義？',
    options: [
      '指所有食物皆必須生吃，絕不加熱烹煮',
      '指不吃經農藥、化學肥料、化學添加物及防腐處理或污染的食品',
      '指每天只吃肉類與油脂的高蛋白飲食',
      '指完全由工廠機器合成的營養補充劑'
    ],
    correctAnswers: [1],
    explanation: '生機飲食是指「不吃經農藥、化學肥料、化學添加物及防腐處理或污染的食品」。',
    slideRef: '第 21 頁',
    difficulty: 'easy'
  }
];

// 精選快速衝刺 10 題專用題庫 (含替換後之第 7 題)
export const QUICK_QUIZ_10_QUESTIONS: QuizQuestion[] = QUIZ_QUESTIONS.slice(0, 10);
