import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { 
  FileText, 
  Layers, 
  UtensilsCrossed, 
  Globe2, 
  Leaf, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';

export const KnowledgeBaseView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | '1' | '2' | '3' | '4'>('all');

  const handleSectionSwitch = (sec: 'all' | '1' | '2' | '3' | '4') => {
    soundManager.playClick();
    setActiveSection(sec);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            <FileText size={14} />
            <span>教材全書精華速查</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">第1章 導論 ‧ 知識綱要與對照表</h2>
          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            完整收錄簡報 21 頁投影片精要，包含一至四次機能特性、八大菜系特色表、和食五大流派及素食標示法規。
          </p>
        </div>
      </div>

      {/* Navigation Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        <button
          onClick={() => handleSectionSwitch('all')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeSection === 'all'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50'
          }`}
        >
          全覽所有單元
        </button>
        <button
          onClick={() => handleSectionSwitch('1')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeSection === '1'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50'
          }`}
        >
          第1節 中華飲食文化與機能
        </button>
        <button
          onClick={() => handleSectionSwitch('2')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeSection === '2'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50'
          }`}
        >
          第2節 中餐八大菜系
        </button>
        <button
          onClick={() => handleSectionSwitch('3')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeSection === '3'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50'
          }`}
        >
          第3節 各國料理 (西餐/日韓/東南亞)
        </button>
        <button
          onClick={() => handleSectionSwitch('4')}
          className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
            activeSection === '4'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-amber-50'
          }`}
        >
          第4節 飲食新趨勢 (素食/慢食/生機)
        </button>
      </div>

      {/* Section 1 */}
      {(activeSection === 'all' || activeSection === '1') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">第 1 節 中華飲食文化之發展歷程</h3>
              <p className="text-xs text-gray-500">烹飪器物演進、食物一至四次機能特性與安全衛生核心</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Evolution Pipeline */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
              <h4 className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                <Sparkles size={15} className="text-amber-600" />
                一、中華飲食文化之烹飪演進 (Slide 3)
              </h4>
              <div className="flex items-center justify-between text-xs font-bold text-gray-800 bg-white p-3 rounded-xl border border-amber-200">
                <span className="px-2.5 py-1 bg-amber-100 rounded text-amber-900">火</span>
                <span>➔</span>
                <span className="px-2.5 py-1 bg-amber-100 rounded text-amber-900">石塊、板</span>
                <span>➔</span>
                <span className="px-2.5 py-1 bg-amber-100 rounded text-amber-900">陶器、銅器</span>
                <span>➔</span>
                <span className="px-2.5 py-1 bg-amber-100 rounded text-amber-900">鐵器</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                由熟食火源、石板炙烤，到陶器銅器煮羹炊蒸，最終鐵器普及促進爆炒技藝繁榮。
              </p>
            </div>

            {/* Core Venn diagram concept */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
                <Check size={16} className="text-emerald-600" />
                食品機能性之共同交集核心 (Slide 4)
              </h4>
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-sm">
                  【 安全、衛生 】
                </span>
                <p className="text-xs text-gray-600 mt-2">
                  一次機能(營養)、二次機能(食感性)、三次機能(生理機能)、四次機能(文化機能)之最高共同核心！
                </p>
              </div>
            </div>
          </div>

          {/* Table: Four Functions with Tea example */}
          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">
              二、食物之機能特性與茶葉成分分類表 (Slide 3, 5)
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-amber-50/80 text-amber-950 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3.5">機能等級</th>
                    <th className="p-3.5">機能定義與特徵</th>
                    <th className="p-3.5">以茶葉為例之具體成份 / 展現</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-amber-50/30">
                    <td className="p-3.5 font-bold text-amber-900">一級機能 (營養機能)</td>
                    <td className="p-3.5">指「維持生命之營養機能」，提供生存基本營養</td>
                    <td className="p-3.5 font-medium">維生素、礦物質</td>
                  </tr>
                  <tr className="hover:bg-amber-50/30">
                    <td className="p-3.5 font-bold text-amber-900">二級機能 (嗜好機能)</td>
                    <td className="p-3.5">指「賦予食物色、香、味、觸覺的感官機能與食感性」</td>
                    <td className="p-3.5 font-medium">滋味 (鮮味、澀味、苦味)、香味、顏色 (不同醱酵程度造成茶湯顏色不同)</td>
                  </tr>
                  <tr className="hover:bg-amber-50/30">
                    <td className="p-3.5 font-bold text-amber-900">三級機能 (生理調節性)</td>
                    <td className="p-3.5">指「調節生理機能之特性」，增進健康、抗氧化</td>
                    <td className="p-3.5 font-medium">多元酚類 (兒茶素)、咖啡因、抗氧化性、微量元素 (如氟)</td>
                  </tr>
                  <tr className="hover:bg-amber-50/30">
                    <td className="p-3.5 font-bold text-amber-900">四級機能 (文化機能)</td>
                    <td className="p-3.5">精神涵養、社會儀禮與文化傳承象徵</td>
                    <td className="p-3.5 font-medium">茶道、客家擂茶文化、茶歌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Section 2 */}
      {(activeSection === 'all' || activeSection === '2') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">第 2 節 中餐菜系 (四大 / 八大 / 十大 / 其他地方菜)</h3>
              <p className="text-xs text-gray-500">選料、切配、烹飪等技藝體系 (Slide 6-12)</p>
            </div>
          </div>

          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 text-xs sm:text-sm text-gray-800 space-y-2">
            <div className="font-bold text-orange-950">菜系範疇概說：</div>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>四大菜系：</strong>黃河下游的魯菜(山東)、長江上游的川菜(四川)、珠江流域的粵菜(廣東、廣西東部)、長江下游的淮揚菜(江蘇)。</li>
              <li><strong>八大菜系：</strong>魯菜、川菜、粵菜、蘇(淮揚)菜、閩菜、浙菜、湘菜、徽菜。（一般餐飲界通稱以八大菜系為主）</li>
              <li><strong>十大菜系：</strong>八大菜系 ＋ 京菜(北京) ＋ 鄂菜(湖北)。</li>
            </ul>
          </div>

          {/* Major 8 Cuisines Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-amber-50/80 text-amber-950 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-3">菜系名稱</th>
                  <th className="p-3">代表風味 / 地域</th>
                  <th className="p-3">核心風格特點</th>
                  <th className="p-3">代表名菜</th>
                  <th className="p-3">特殊歷史與地位</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">魯菜 (山東)</td>
                  <td className="p-3">孔府、濟南、膠東 (以孔府為龍頭，曲阜菜為代表)</td>
                  <td className="p-3">調味重、純厚香濃，食不厭精膾不厭細</td>
                  <td className="p-3">九轉大腸、糖醋黃河鯉魚、烤鴨</td>
                  <td className="p-3 font-semibold text-orange-700">八大菜系之首、北食代表、世界三大菜園、與蘇菜並稱國菜</td>
                </tr>
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">川菜 (四川)</td>
                  <td className="p-3">以成都、重慶菜為代表</td>
                  <td className="p-3">酸、甜、麻、辣香、油重、味濃，注重調味</td>
                  <td className="p-3">魚香肉絲、宮保雞丁、夫妻肺片、麻婆豆腐、回鍋肉、東坡肘子</td>
                  <td className="p-3 font-semibold text-orange-700">最有特色之菜系、民間最大菜系</td>
                </tr>
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">粵菜 (廣東)</td>
                  <td className="p-3">廣州、客家、潮汕三種風味組成</td>
                  <td className="p-3">調味有五滋、六味，台灣以海鮮著稱</td>
                  <td className="p-3">港式點心 (港點)、燒臘、清蒸海鮮</td>
                  <td className="p-3 font-semibold text-orange-700">民間第二大菜系、世界各國中菜館多數以粵菜為主</td>
                </tr>
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">蘇菜 (江蘇)</td>
                  <td className="p-3">蘇州、揚州、南京、鎮江四大菜 (又稱淮揚菜)</td>
                  <td className="p-3">濃中帶淡，鮮香酥爛，原汁原湯濃而不膩，口味平淡鹹中帶甜</td>
                  <td className="p-3">清燉蟹粉獅子頭、大煮乾絲</td>
                  <td className="p-3 font-semibold text-orange-700">南食兩大台柱之一、宮廷第二大菜系、與魯菜並稱國菜</td>
                </tr>
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">閩菜 (福建)</td>
                  <td className="p-3">福州、泉州、廈門</td>
                  <td className="p-3">色調美觀、滋味清鮮、重刀工、湯菜眾多</td>
                  <td className="p-3">炒螺片、佛跳牆</td>
                  <td className="p-3">以精細刀工與豐富湯羹著稱</td>
                </tr>
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">浙菜 (浙江)</td>
                  <td className="p-3">以杭州菜為代表</td>
                  <td className="p-3">清、香、脆、嫩、爽、鮮六字訣</td>
                  <td className="p-3">龍井蝦仁、西湖醋魚</td>
                  <td className="p-3">水鄉盛產魚蝦</td>
                </tr>
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">湘菜 (湖南)</td>
                  <td className="p-3">以長沙菜為代表</td>
                  <td className="p-3">最大特色：「一是辣，二是臘」；油重色濃，多以辣椒燻臘為料</td>
                  <td className="p-3">剁椒魚頭、臘味合蒸</td>
                  <td className="p-3">善用酸辣燻臘香醇</td>
                </tr>
                <tr className="hover:bg-amber-50/30">
                  <td className="p-3 font-bold text-amber-900">徽菜 (徽州)</td>
                  <td className="p-3">流行徽州地區和浙江西部</td>
                  <td className="p-3">選料樸實、講究火候、重油重色、味道醇厚、保持原汁原味</td>
                  <td className="p-3">臭鱖魚、火腿燉甲魚</td>
                  <td className="p-3 font-semibold text-orange-700">不等同於安徽菜！與蘇南、浙菜較近</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Other Regional Cuisines Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <span className="font-bold text-xs text-amber-900 block mb-1">滬菜 (上海)</span>
              <p className="text-xs text-gray-600">湯鹵醇厚，濃油赤醬，糖重色艷，鹹淡適口，具家常風味。</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <span className="font-bold text-xs text-amber-900 block mb-1">臺菜 (臺灣)</span>
              <p className="text-xs text-gray-600">廣義為古早飲食，狹義指臺灣閩南料理，如西鹵白菜、生炒花枝、香菇肉羹湯。</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <span className="font-bold text-xs text-amber-900 block mb-1">客家菜</span>
              <p className="text-xs text-gray-600">多油多鹹重口味，喜以加工芥菜入菜(如酸菜、梅乾菜)，多蒸煮燜燉燒製。</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <span className="font-bold text-xs text-amber-900 block mb-1">清真菜</span>
              <p className="text-xs text-gray-600">中國穆斯林(回族、維吾爾等)飲食稱謂。忌食豬肉，以牛、羊為主(如烤全羊、涮羊肉)。</p>
            </div>
          </div>
        </section>
      )}

      {/* Section 3 */}
      {(activeSection === 'all' || activeSection === '3') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">第 3 節 各國料理簡介 (西餐 / 東北亞 / 東南亞)</h3>
              <p className="text-xs text-gray-500">西歐諸國特色、日本和食五大料理流派、韓餐與東南亞香料 (Slide 13-18)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <h4 className="font-bold text-sm text-amber-900">義大利菜 (西餐之母)</h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                食材包括小牛肉、番茄、橄欖、乳酪(起司)與大量的香辛料（如迷迭香、月桂葉、九層塔等）。使用多樣不同醬汁搭配義大利麵。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <h4 className="font-bold text-sm text-amber-900">法國菜 (料理三寶)</h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                特色為基本佐料為酒，講究火候。偏好牛肉、羊肉、田螺等。<strong>「松露、鵝肝、魚子醬」</strong>堪稱法國料理三寶！配料採用大量酒、牛油、鮮奶油、香料。
              </p>
            </div>
          </div>

          {/* Table: Japanese Cuisine 5 Schools */}
          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">
              日本和食五大料理流派對比表 (Slide 15-17)
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-blue-50/80 text-blue-950 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3">料理流派</th>
                    <th className="p-3">文化背景</th>
                    <th className="p-3">用餐形式</th>
                    <th className="p-3">核心特色與規格</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-blue-50/20">
                    <td className="p-3 font-bold text-blue-900">本膳料理</td>
                    <td className="p-3">宮廷與武士階級的禮儀、正式宴會</td>
                    <td className="p-3">一人一膳、規矩繁多</td>
                    <td className="p-3">正統階級禮儀。主盤七道菜、次膳五道菜、三膳三道菜。<strong>日式擺設：左邊放飯，右邊放湯</strong>。</td>
                  </tr>
                  <tr className="hover:bg-blue-50/20">
                    <td className="p-3 font-bold text-blue-900">卓袱料理</td>
                    <td className="p-3">長崎對外貿易產生的異國融合料理</td>
                    <td className="p-3">圓桌共食、中西合璧</td>
                    <td className="p-3">長崎、大皿、融合菜（指日本式的中國宴席菜）。</td>
                  </tr>
                  <tr className="hover:bg-blue-50/20">
                    <td className="p-3 font-bold text-blue-900">會席料理</td>
                    <td className="p-3">民間社交、應酬、飲酒聚會</td>
                    <td className="p-3">宴席、氣氛熱絡</td>
                    <td className="p-3">酒宴、豪華社交。本膳簡化為三菜一湯，最後提供飯、味噌湯及醬菜。</td>
                  </tr>
                  <tr className="hover:bg-blue-50/20">
                    <td className="p-3 font-bold text-blue-900">懷石料理</td>
                    <td className="p-3">茶道文化、追求禪意與季節美學</td>
                    <td className="p-3">配合茶道、精緻上品</td>
                    <td className="p-3">源自禪僧懷抱暖石度空腹，三菜一湯形式。茶道、季節感、精神美學。</td>
                  </tr>
                  <tr className="hover:bg-blue-50/20">
                    <td className="p-3 font-bold text-blue-900">精進料理</td>
                    <td className="p-3">佛教寺廟、修行與素食飲食</td>
                    <td className="p-3">寺院素齋</td>
                    <td className="p-3">全素、不殺生、五辛皆無（不使用肉類、魚類及蔥、蒜、韭等）。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <span className="font-bold text-gray-800">韓國料理特色 (Slide 15)：</span>
              <p className="text-gray-600">
                以清淡為主，稻米為普遍主食。常伴隨<strong>「熱湯」（熱湯是主菜）</strong>，韓國泡菜是常見的飯饌（小菜）。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <span className="font-bold text-gray-800">東南亞料理香料 (Slide 18)：</span>
              <p className="text-gray-600">
                泰國愛用清香的香菜、香茅、南薑；馬來西亞愛用獨特顏色的羅望子、南薑粉、肉桂醃肉；越南愛用九層塔、香茅入菜。
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 4 */}
      {(activeSection === 'all' || activeSection === '4') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">第 4 節 飲食新趨勢 (素食 / 速食 / 慢食 / 生機)</h3>
              <p className="text-xs text-gray-500">法定素食包裝名詞定義、植物五辛與永續飲食觀 (Slide 19-21)</p>
            </div>
          </div>

          {/* Vegetarian Packaging Regulations Table */}
          <div>
            <h4 className="font-bold text-sm text-gray-900 mb-2">
              素食包裝食品 5 大法定名詞定義表 (Slide 19)
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-emerald-50/80 text-emerald-950 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3.5">法規標示項目</th>
                    <th className="p-3.5">法定內容定義</th>
                    <th className="p-3.5">重要注意事項</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-emerald-50/20">
                    <td className="p-3.5 font-bold text-emerald-900">全素或純素</td>
                    <td className="p-3.5">不含植物五辛之純植物性食物</td>
                    <td className="p-3.5 font-medium text-red-600">植物五辛為：蔥、蒜、韭、蕎及洋蔥</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/20">
                    <td className="p-3.5 font-bold text-emerald-900">蛋素</td>
                    <td className="p-3.5">全素或純素及蛋製品</td>
                    <td className="p-3.5">不可含奶製品與五辛</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/20">
                    <td className="p-3.5 font-bold text-emerald-900">奶素</td>
                    <td className="p-3.5">全素或純素及奶製品</td>
                    <td className="p-3.5">不可含蛋製品與五辛</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/20">
                    <td className="p-3.5 font-bold text-emerald-900">奶蛋素</td>
                    <td className="p-3.5">全素或純素及奶蛋製品</td>
                    <td className="p-3.5">不可含植物五辛</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/20">
                    <td className="p-3.5 font-bold text-emerald-900">植物五辛素</td>
                    <td className="p-3.5">植物性之食物</td>
                    <td className="p-3.5">含奶或蛋者須於內容物名稱內詳細說明</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
              <span className="font-bold text-gray-900">速食 (Fast Food)</span>
              <p className="text-gray-600">亦稱快餐，通常是可以徒手拿取的食物，不需要使用餐具進食，大部分可以外帶或外賣。</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
              <span className="font-bold text-gray-900">慢食 (Slow Food)</span>
              <p className="text-gray-600">
                相對於速食文化所發展出的飲食文化，由<strong>義大利人卡爾洛‧佩特里尼 (Carlo Petrini)</strong> 提出，目的是對抗日益盛行的速食。
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
              <span className="font-bold text-gray-900">生機飲食 (Organic Diet)</span>
              <p className="text-gray-600">
                指不吃經農藥、化學肥料、化學添加物及防腐處理或污染的純淨食品。
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
