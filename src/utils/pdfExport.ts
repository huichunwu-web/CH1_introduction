import { StudentProfile, QuizResult } from '../types';

export function openPrintCertificate(result: QuizResult) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('請允許開啟彈出視窗以預覽並列印 PDF 成績單！');
    return;
  }

  const dateStr = result.date || new Date().toLocaleString('zh-TW');
  const percentage = Math.round((result.correctCount / result.totalQuestions) * 100);
  
  let grade = 'A+';
  let gradeColor = '#16a34a';
  let comment = '卓越出眾！對食物製備各章節知識點掌握極為紮實，展現專業餐飲從業者之素養。';
  if (percentage < 60) {
    grade = 'C';
    gradeColor = '#dc2626';
    comment = '尚有進步空間。建議針對錯誤章節之字卡加強複習，特別是菜系特色與食物機能定義。';
  } else if (percentage < 75) {
    grade = 'B';
    gradeColor = '#ea580c';
    comment = '基礎良好！建議多留意各國料理細節與素食五辛法規定義，複習後可挑戰滿分。';
  } else if (percentage < 90) {
    grade = 'A';
    gradeColor = '#2563eb';
    comment = '成績優良！能通曉各菜系與飲食文化精隨，具備良好之專業常識。';
  }

  const html = `
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>食物製備課程測驗成績單 - ${result.studentProfile.name || '學生'}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm;
    }
    * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Microsoft JhengHei", sans-serif;
    }
    body {
      background-color: #f8fafc;
      color: #1e293b;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 2px solid #cbd5e1;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    .header {
      text-align: center;
      border-bottom: 2px dashed #e2e8f0;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    .header h1 {
      margin: 0 0 8px 0;
      font-size: 26px;
      color: #0f172a;
      letter-spacing: 1px;
    }
    .header p {
      margin: 4px 0;
      color: #64748b;
      font-size: 14px;
    }
    .student-badge {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      background: #f1f5f9;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 28px;
    }
    .student-item {
      font-size: 14px;
    }
    .student-item .label {
      color: #64748b;
      display: block;
      font-size: 12px;
      margin-bottom: 2px;
    }
    .student-item .value {
      font-weight: 700;
      color: #0f172a;
    }
    .score-summary {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 24px;
      border-radius: 14px;
      margin-bottom: 30px;
      border: 1px solid #cbd5e1;
    }
    .score-box {
      text-align: center;
    }
    .score-num {
      font-size: 48px;
      font-weight: 900;
      line-height: 1;
      color: ${gradeColor};
    }
    .grade-badge {
      display: inline-block;
      font-size: 32px;
      font-weight: 900;
      color: ${gradeColor};
      border: 3px solid ${gradeColor};
      padding: 6px 20px;
      border-radius: 9999px;
    }
    .section-breakdown {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 14px;
      color: #334155;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      font-size: 13.5px;
    }
    th, td {
      border: 1px solid #e2e8f0;
      padding: 10px 14px;
      text-align: left;
    }
    th {
      background-color: #f8fafc;
      font-weight: 600;
      color: #475569;
    }
    .progress-bar {
      height: 8px;
      background: #e2e8f0;
      border-radius: 9999px;
      overflow: hidden;
      margin-top: 4px;
    }
    .progress-fill {
      height: 100%;
      background: #3b82f6;
      border-radius: 9999px;
    }
    .commentary-box {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      padding: 14px 18px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 30px;
      font-size: 14px;
      color: #166534;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
      margin-top: 20px;
      font-size: 12px;
      color: #94a3b8;
    }
    .seal-box {
      text-align: center;
      border: 2px dashed #94a3b8;
      padding: 12px 24px;
      border-radius: 8px;
      color: #64748b;
    }
    .no-print-bar {
      position: fixed;
      top: 15px;
      right: 15px;
      display: flex;
      gap: 10px;
      z-index: 100;
    }
    .btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .btn-secondary {
      background: #64748b;
    }
    @media print {
      body {
        padding: 0;
        background: transparent;
      }
      .container {
        box-shadow: none;
        border: none;
        padding: 0;
      }
      .no-print-bar {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <button class="btn" onclick="window.print()">🖨️ 立即列印 / 存為 PDF</button>
    <button class="btn btn-secondary" onclick="window.close()">關閉視窗</button>
  </div>

  <div class="container">
    <div class="header">
      <h1>食物製備 (Food Preparation) 課程測驗成績證明書</h1>
      <p>餐飲工作者必備的基本常識 ‧ 第一章 導論 測驗評定報告</p>
      <p style="font-size: 12px; color: #94a3b8; margin-top: 6px;">證書識別碼: FP-${Date.now().toString(36).toUpperCase()}</p>
    </div>

    <div class="student-badge">
      <div class="student-item">
        <span class="label">學生學號</span>
        <span class="value">${result.studentProfile.studentId || '未填寫'}</span>
      </div>
      <div class="student-item">
        <span class="label">學生姓名</span>
        <span class="value">${result.studentProfile.name || '訪客學員'}</span>
      </div>
      <div class="student-item">
        <span class="label">修習科系 / 班級</span>
        <span class="value">${result.studentProfile.department || '餐飲管理科'} ${result.studentProfile.classGroup || ''}</span>
      </div>
      <div class="student-item">
        <span class="label">完成測驗時間</span>
        <span class="value">${dateStr}</span>
      </div>
    </div>

    <div class="score-summary">
      <div class="score-box">
        <div style="font-size: 14px; color: #64748b; margin-bottom: 6px;">測驗綜合成績</div>
        <div class="score-num">${result.score}<span style="font-size: 22px; color: #64748b;">分</span></div>
        <div style="font-size: 13px; color: #64748b; margin-top: 4px;">總題數 ${result.totalQuestions} 題 / 答對 ${result.correctCount} 題</div>
      </div>
      <div class="score-box">
        <div style="font-size: 14px; color: #64748b; margin-bottom: 6px;">評定等第</div>
        <div class="grade-badge">${grade}</div>
      </div>
      <div class="score-box">
        <div style="font-size: 14px; color: #64748b; margin-bottom: 6px;">答對命中率</div>
        <div style="font-size: 32px; font-weight: 800; color: #0f172a;">${percentage}%</div>
        <div style="font-size: 12px; color: #64748b;">作答耗時 ${Math.floor(result.timeSpentSeconds / 60)} 分 ${result.timeSpentSeconds % 60} 秒</div>
      </div>
    </div>

    <div class="commentary-box">
      <strong>評語建議：</strong> ${comment}
    </div>

    <div class="section-breakdown">
      <div class="section-title">📊 各章節知識單元答題成效分析</div>
      <table>
        <thead>
          <tr>
            <th style="width: 45%;">課程章節單元</th>
            <th style="width: 20%; text-align: center;">答對 / 總題數</th>
            <th style="width: 15%; text-align: center;">正確率</th>
            <th style="width: 20%;">精熟指標</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>第1節 中華飲食文化歷程與機能特性</strong><br><small style="color: #64748b;">火石陶銅鐵演進、一~四次機能、安全衛生核心</small></td>
            <td style="text-align: center;">${result.sectionScores.sec1_history.correct} / ${result.sectionScores.sec1_history.total}</td>
            <td style="text-align: center;">${result.sectionScores.sec1_history.total > 0 ? Math.round((result.sectionScores.sec1_history.correct / result.sectionScores.sec1_history.total) * 100) : 0}%</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${result.sectionScores.sec1_history.total > 0 ? (result.sectionScores.sec1_history.correct / result.sectionScores.sec1_history.total) * 100 : 0}%;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>第2節 中餐菜系 (四大/八大/地方菜)</strong><br><small style="color: #64748b;">魯川粵蘇閩浙湘徽、滬菜、臺菜、客家、清真菜</small></td>
            <td style="text-align: center;">${result.sectionScores.sec2_cuisines.correct} / ${result.sectionScores.sec2_cuisines.total}</td>
            <td style="text-align: center;">${result.sectionScores.sec2_cuisines.total > 0 ? Math.round((result.sectionScores.sec2_cuisines.correct / result.sectionScores.sec2_cuisines.total) * 100) : 0}%</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${result.sectionScores.sec2_cuisines.total > 0 ? (result.sectionScores.sec2_cuisines.correct / result.sectionScores.sec2_cuisines.total) * 100 : 0}%;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>第3節 各國料理簡介 (西餐/東北亞/東南亞)</strong><br><small style="color: #64748b;">義法英德西、和食五大流派(本膳卓袱會席懷石精進)、韓餐泡菜熱湯、東南亞香料</small></td>
            <td style="text-align: center;">${result.sectionScores.sec3_world.correct} / ${result.sectionScores.sec3_world.total}</td>
            <td style="text-align: center;">${result.sectionScores.sec3_world.total > 0 ? Math.round((result.sectionScores.sec3_world.correct / result.sectionScores.sec3_world.total) * 100) : 0}%</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${result.sectionScores.sec3_world.total > 0 ? (result.sectionScores.sec3_world.correct / result.sectionScores.sec3_world.total) * 100 : 0}%;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>第4節 飲食新趨勢 (素食/速食/慢食/生機)</strong><br><small style="color: #64748b;">素食五大標示法規、植物五辛定義、慢食佩特里尼、生機無污染</small></td>
            <td style="text-align: center;">${result.sectionScores.sec4_trends.correct} / ${result.sectionScores.sec4_trends.total}</td>
            <td style="text-align: center;">${result.sectionScores.sec4_trends.total > 0 ? Math.round((result.sectionScores.sec4_trends.correct / result.sectionScores.sec4_trends.total) * 100) : 0}%</td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${result.sectionScores.sec4_trends.total > 0 ? (result.sectionScores.sec4_trends.correct / result.sectionScores.sec4_trends.total) * 100 : 0}%;"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer">
      <div>
        <p style="margin: 0 0 4px 0;">教務簽署：食物製備學科教研組</p>
        <p style="margin: 0;">本成績單經由數位學習評測系統自動生成認證，列印或存儲即具效力。</p>
      </div>
      <div class="seal-box">
        【 餐飲管理學科 】<br>
        成績查驗專用章
      </div>
    </div>
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
