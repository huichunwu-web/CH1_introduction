import React, { useState, useMemo } from 'react';
import { CourseSection, Flashcard } from '../types';
import { FLASHCARDS_DATA, COURSE_SECTIONS } from '../data/courseData';
import { soundManager } from '../utils/audio';
import { 
  RotateCw, 
  Volume2, 
  CheckCircle, 
  HelpCircle, 
  Shuffle, 
  Search, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';

interface FlashcardsViewProps {
  onStartQuizWithSection?: (section?: CourseSection) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ onStartQuizWithSection }) => {
  const [selectedSection, setSelectedSection] = useState<CourseSection | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => new Set());
  const [cardsOrder, setCardsOrder] = useState<Flashcard[]>(FLASHCARDS_DATA);
  const [filterMastery, setFilterMastery] = useState<'all' | 'mastered' | 'unmastered'>('all');

  // Filter cards
  const filteredCards = useMemo(() => {
    return cardsOrder.filter((card) => {
      const matchSection = selectedSection === 'all' || card.section === selectedSection;
      const matchQuery = 
        !searchQuery ||
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.frontContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.backDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const isMastered = masteredIds.has(card.id);
      const matchMastery = 
        filterMastery === 'all' ||
        (filterMastery === 'mastered' && isMastered) ||
        (filterMastery === 'unmastered' && !isMastered);

      return matchSection && matchQuery && matchMastery;
    });
  }, [cardsOrder, selectedSection, searchQuery, filterMastery, masteredIds]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    soundManager.playFlip();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    soundManager.playFlip();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleFlip = () => {
    soundManager.playFlip();
    setIsFlipped((prev) => !prev);
  };

  const toggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playClick();
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleShuffle = () => {
    soundManager.playClick();
    const shuffled = [...cardsOrder].sort(() => Math.random() - 0.5);
    setCardsOrder(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Text to Speech
  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-TW';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const masteredCount = useMemo(() => {
    return cardsOrder.filter(c => masteredIds.has(c.id)).length;
  }, [cardsOrder, masteredIds]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-xs mb-2">
              <Sparkles size={13} />
              <span>智能記憶卡複習庫</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">食物製備 ‧ 關鍵考點字卡</h2>
            <p className="text-amber-100 text-sm mt-1">
              收錄第一章導論完整 25 組核心觀念，支援點擊翻轉、語音朗讀與掌握度標記
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 self-start md:self-auto">
            <div className="text-center px-3 border-r border-white/20">
              <div className="text-2xl font-black">{cardsOrder.length}</div>
              <div className="text-[11px] text-amber-100">總卡片數</div>
            </div>
            <div className="text-center px-3 border-r border-white/20">
              <div className="text-2xl font-black text-emerald-200">{masteredCount}</div>
              <div className="text-[11px] text-amber-100">已熟記</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-amber-200">
                {Math.round((masteredCount / cardsOrder.length) * 100)}%
              </div>
              <div className="text-[11px] text-amber-100">熟練進度</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="bg-white rounded-xl p-4 border border-amber-100 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Section Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedSection('all');
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedSection === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-50'
              }`}
            >
              全部章節 ({cardsOrder.length})
            </button>
            {COURSE_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSection(sec.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedSection === sec.id
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-50'
                }`}
              >
                {sec.name.split(' ')[0]} ({sec.count})
              </button>
            ))}
          </div>

          {/* View Mode Toggle & Shuffle */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              title="隨機洗牌卡片順序"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer"
            >
              <Shuffle size={14} />
              <span>隨機洗牌</span>
            </button>

            <div className="flex border border-gray-200 rounded-lg overflow-hidden text-xs">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('single');
                }}
                className={`px-3 py-1.5 font-medium cursor-pointer ${
                  viewMode === 'single' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600'
                }`}
              >
                單卡專注
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setViewMode('grid');
                }}
                className={`px-3 py-1.5 font-medium cursor-pointer ${
                  viewMode === 'grid' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600'
                }`}
              >
                矩陣清單
              </button>
            </div>
          </div>
        </div>

        {/* Second Row: Search & Mastery Status Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-100">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="搜尋考點 (如: 魯菜、兒茶素、五辛)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <span className="text-gray-500 flex items-center gap-1 font-medium">
              <Filter size={13} /> 狀態：
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                setFilterMastery('all');
              }}
              className={`px-2.5 py-1 rounded-md cursor-pointer ${
                filterMastery === 'all' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              全部 ({cardsOrder.length})
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setFilterMastery('mastered');
              }}
              className={`px-2.5 py-1 rounded-md cursor-pointer ${
                filterMastery === 'mastered' ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              已熟記 ({masteredCount})
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setFilterMastery('unmastered');
              }}
              className={`px-2.5 py-1 rounded-md cursor-pointer ${
                filterMastery === 'unmastered' ? 'bg-orange-100 text-orange-900 font-bold' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              待加強 ({cardsOrder.length - masteredCount})
            </button>
          </div>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 text-gray-500">
          <BookOpen className="mx-auto mb-3 text-gray-400" size={40} />
          <p className="text-base font-semibold">找不到符合條件的字卡</p>
          <p className="text-xs text-gray-400 mt-1">請嘗試更換搜尋關鍵字或切換篩選分類</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSection('all');
              setFilterMastery('all');
            }}
            className="mt-4 px-4 py-1.5 text-xs bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer"
          >
            重設篩選
          </button>
        </div>
      ) : viewMode === 'single' ? (
        /* Single Card Focused Carousel Mode */
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500 px-2 font-medium">
            <span>
              第 <strong className="text-amber-700 font-mono text-sm">{currentIndex + 1}</strong> / {filteredCards.length} 張卡片
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                {currentCard.sectionName}
              </span>
              <button
                onClick={(e) => toggleMastered(currentCard.id, e)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                  masteredIds.has(currentCard.id)
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <CheckCircle size={14} className={masteredIds.has(currentCard.id) ? 'text-emerald-600' : 'text-gray-400'} />
                <span>{masteredIds.has(currentCard.id) ? '已熟記' : '標記為已熟記'}</span>
              </button>
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={handleFlip}
            className="relative h-96 w-full cursor-pointer perspective group select-none"
          >
            <div
              className={`w-full h-full duration-500 rounded-3xl transition-transform transform-style-preserve-3d shadow-lg border border-amber-200/80 ${
                isFlipped ? 'rotate-y-180 bg-gradient-to-br from-amber-50 to-orange-50' : 'bg-white'
              }`}
            >
              {/* Card Front */}
              <div
                className={`absolute inset-0 w-full h-full backface-hidden p-8 flex flex-col justify-between rounded-3xl ${
                  isFlipped ? 'hidden' : 'flex'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {currentCard.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => handleSpeak(currentCard.frontContent, e)}
                    title="朗讀問題"
                    className="p-2 rounded-full hover:bg-amber-100 text-amber-700 transition-colors"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>

                <div className="my-auto text-center px-4 space-y-4">
                  <span className="text-xs uppercase tracking-wider text-amber-600 font-bold block">
                    {currentCard.title}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
                    {currentCard.frontContent}
                  </h3>
                  {currentCard.subtitle && (
                    <p className="text-xs text-gray-400">{currentCard.subtitle}</p>
                  )}
                </div>

                <div className="text-center pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-amber-700/80 font-medium">
                  <RotateCw size={14} className="animate-spin-slow" />
                  <span>點擊卡片任何處翻轉查看解答與解析</span>
                </div>
              </div>

              {/* Card Back */}
              <div
                className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-8 flex flex-col justify-between rounded-3xl ${
                  isFlipped ? 'flex' : 'hidden'
                }`}
              >
                <div className="flex items-start justify-between border-b border-amber-200/60 pb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      標準解答 ‧ {currentCard.title}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 mt-0.5">
                      {currentCard.backDefinition}
                    </h4>
                  </div>
                  <button
                    onClick={(e) => handleSpeak(`${currentCard.title}。${currentCard.backDefinition}`, e)}
                    title="朗讀解答"
                    className="p-2 rounded-full hover:bg-amber-200/60 text-amber-800 transition-colors"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>

                <div className="space-y-3 py-2 overflow-y-auto max-h-48 text-left text-xs sm:text-sm">
                  <div>
                    <h5 className="font-bold text-gray-800 text-xs mb-1.5 flex items-center gap-1">
                      <Sparkles size={12} className="text-amber-600" /> 重點筆記要訣：
                    </h5>
                    <ul className="space-y-1 text-gray-700 pl-4 list-disc marker:text-amber-500">
                      {currentCard.keyPoints.map((kp, idx) => (
                        <li key={idx} className="leading-relaxed">{kp}</li>
                      ))}
                    </ul>
                  </div>

                  {currentCard.mnemonic && (
                    <div className="p-2.5 rounded-lg bg-amber-100/70 border border-amber-300 text-amber-950 text-xs font-medium flex items-center gap-2">
                      <span className="font-bold px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px]">
                        記憶口訣
                      </span>
                      <span>{currentCard.mnemonic}</span>
                    </div>
                  )}
                </div>

                <div className="text-center pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-gray-500">
                  <span className="text-[11px] text-gray-400">點擊再次翻回正面</span>
                  <button
                    onClick={(e) => toggleMastered(currentCard.id, e)}
                    className="text-amber-800 font-semibold hover:underline flex items-center gap-1"
                  >
                    {masteredIds.has(currentCard.id) ? '✓ 已加入熟記清單' : '+ 標記已掌握'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-xs hover:bg-amber-50 text-gray-700 font-medium text-sm cursor-pointer transition-colors"
            >
              <ChevronLeft size={18} />
              <span>上一張</span>
            </button>

            <button
              onClick={handleFlip}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold text-sm shadow-sm hover:from-amber-700 hover:to-orange-600 cursor-pointer transition-all"
            >
              <RotateCw size={16} />
              <span>{isFlipped ? '翻回問題' : '查看答案'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-xs hover:bg-amber-50 text-gray-700 font-medium text-sm cursor-pointer transition-colors"
            >
              <span>下一張</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        /* Grid Matrix Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card, idx) => {
            const isMastered = masteredIds.has(card.id);
            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl border border-amber-100 hover:border-amber-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      #{idx + 1} ‧ {card.sectionName.split(' ')[0]}
                    </span>
                    <button
                      onClick={(e) => toggleMastered(card.id, e)}
                      className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                        isMastered
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                      }`}
                      title={isMastered ? '已熟記' : '標記為熟記'}
                    >
                      <CheckCircle size={16} />
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 mb-3 font-medium">
                    {card.frontContent}
                  </p>

                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100 text-xs text-amber-950 space-y-1.5">
                    <div className="font-bold text-amber-900">核心答案：</div>
                    <p className="leading-snug">{card.backDefinition}</p>
                    {card.mnemonic && (
                      <div className="text-[11px] text-amber-800 pt-1 border-t border-amber-200/60 font-semibold">
                        💡 口訣：{card.mnemonic}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {card.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSpeak(`${card.title}。${card.backDefinition}`)}
                    className="p-1 text-gray-400 hover:text-amber-700 rounded hover:bg-amber-50"
                    title="朗讀"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
