import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getChoseong } from 'es-hangul'; // es-hangul 라이브러리

// __dirname 대체 (ES 모듈에서 사용)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// 예시 검색어 데이터 (한글 포함)
const suggestions = [
  "사과", "오렌지", "바나나", "블루베리", "딸기", "복숭아", "포도", "키위", "체리", "레몬"
];

// EJS 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 정적 파일 (JavaScript 파일)
app.use(express.static(path.join(__dirname, 'public')));

// 검색 페이지
app.get('/', (req, res) => {
  res.render('search');
});

// 검색어 추천 API (한글 초성 및 전체 단어 비교)
app.get('/suggestions', (req, res) => {
  const query = req.query.q;
  const queryChoseong = getChoseong(query); // 검색어 초성 추출

  const filteredSuggestions = suggestions.filter(item => {
    const itemChoseong = getChoseong(item);  // 아이템 초성 추출

    // 검색어가 포함되거나, 초성이 일치하는 경우만 필터링
    return item.includes(query) || itemChoseong.startsWith(queryChoseong);
  });

  res.json(filteredSuggestions);
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
