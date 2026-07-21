import type { ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import {
  koAnswer,
  koChecklist,
  koDefinition,
  koreanEditorialAuthor,
  koreanImagePath,
  koreanTechnicalReviewer,
  koTable,
  koText
} from "./ko-content-helpers";

const publishedAt = "2026-07-21T11:00:00.000Z";

type CoreProfile = {
  path: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  audience: string;
  purpose: string;
  decision: string;
};

const coreProfiles: Record<string, CoreProfile> = {
  home: {
    path: "/ko",
    title: "상업용 헬스기구 제조업체 | PowerBaseFit",
    h1: "한국 B2B 구매자를 위한 상업용 헬스기구 제조",
    description: "덤벨, 원판, 범퍼 플레이트, 랙과 벤치를 공급하는 B2B 제조사입니다. 한국 수입업체·유통업체를 위한 OEM, 품질 검사와 수출 포장을 안내합니다.",
    keyword: "헬스기구 제조업체",
    audience: "헬스장 운영자, 수입업체, 피트니스 장비 유통사와 자체 브랜드 담당자",
    purpose: "제품을 많이 나열하는 대신 제조 범위, 확인 가능한 품질 절차, 맞춤 제작과 견적 준비 방법을 한 번에 파악하게 합니다.",
    decision: "제품군과 예상 수량, 한국 도착지, 브랜드 적용 여부를 먼저 정하면 비교 가능한 견적과 샘플 계획을 만들 수 있습니다."
  },
  "products-hub": {
    path: "/ko/products",
    title: "상업용 헬스장 기구 도매 제품 | PowerBaseFit",
    h1: "상업용 헬스장과 유통사를 위한 피트니스 장비",
    description: "덤벨, 웨이트 원판, 랙, 벤치와 액세서리를 사용 환경·소재·구매 조건별로 비교하고 한국 수입·유통 프로젝트의 B2B 견적을 준비할 수 있습니다.",
    keyword: "상업용 헬스장 기구",
    audience: "신규 헬스장 프로젝트, 장비 교체를 계획하는 운영사, 도매 유통사와 수입업체",
    purpose: "제품 카테고리를 운동 목적뿐 아니라 공간, 사용 빈도, 유지관리, 포장 중량과 재주문 관점으로 분류합니다.",
    decision: "한 개 모델의 단가보다 전체 SKU 구성, 중량 구간, 예비 수량, 팔레트와 도착 원가를 함께 비교해야 합니다."
  },
  "dumbbells-category": {
    path: "/ko/products/dumbbells",
    title: "상업용 덤벨 도매·OEM | 덤벨 제조업체",
    h1: "헬스장용 덤벨 세트와 OEM 공급",
    description: "고무 육각 덤벨, 라운드 덤벨, PU·TPU·CPU·주철 덤벨의 차이, 중량 구성, QC, 로고와 수출 포장 선택을 한국 B2B 구매 기준으로 안내합니다.",
    keyword: "덤벨 제조업체",
    audience: "프리웨이트존을 구성하는 헬스장, 덤벨 세트를 판매하는 유통사와 자체 브랜드",
    purpose: "형태와 코팅의 외관 비교를 넘어 그립, 중량 공차, 헤드 고정, 랙 호환성과 교체 운영을 설명합니다.",
    decision: "가벼운 구간의 중복 수량, 최대 중량, kg 표기, 랙 길이와 코팅 수준을 먼저 확정해야 세트 비용을 정확히 계산할 수 있습니다."
  },
  "weight-plates-category": {
    path: "/ko/products/weight-plates",
    title: "웨이트 원판·범퍼 플레이트 도매 | OEM 제조사",
    h1: "상업용 웨이트 원판과 범퍼 플레이트 공급",
    description: "고무·CPU·주철 원판과 범퍼 플레이트를 홀 규격, 두께, 중량 공차, 드롭 사용, 인서트, 수출 포장과 OEM 조건으로 비교합니다.",
    keyword: "웨이트 플레이트 제조사",
    audience: "바벨 존과 역도 구역을 설계하는 헬스장, 원판을 수입·유통하는 전문 바이어",
    purpose: "같은 표시 중량이라도 용도, 두께, 중심 인서트, 바닥 조건과 반복 충격에 따라 선택이 달라지는 이유를 보여 줍니다.",
    decision: "바 홀, 목표 중량, 한 바에 필요한 적재 폭, 낙하 허용 여부와 보관 방식을 기준으로 SKU를 정해야 합니다."
  },
  "racks-benches-category": {
    path: "/ko/products/racks-benches",
    title: "상업용 파워랙·스미스머신·벤치 공급 | B2B",
    h1: "헬스장 프로젝트용 랙, 스미스머신과 벤치",
    description: "공간 치수, 동선, 하중 조건, 케이블 구성, 조립, 수출 포장과 유지관리를 기준으로 상업용 랙과 벤치의 B2B 공급 조건을 검토합니다.",
    keyword: "상업용 파워랙 공급업체",
    audience: "신규 센터 설계사, 헬스장 체인, 프로젝트 유통사와 조립·설치 책임자",
    purpose: "카탈로그 사진만으로 확인하기 어려운 설치 면적, 천장 높이, 안전 간격, 부품 식별과 현장 조립 정보를 정리합니다.",
    decision: "평면도, 통로, 바벨 동작 범위, 바닥 고정, 전원 여부와 반입 경로를 장비 선정 전에 검토해야 합니다."
  },
  "gym-accessories-category": {
    path: "/ko/products/gym-accessories",
    title: "헬스장 액세서리 도매·OEM | B2B 공급",
    h1: "상업용 헬스장 액세서리와 케틀벨 공급",
    description: "케틀벨, 케이블 핸들, 매트와 트레이닝 액세서리를 소재, 그립, 포장, 진열, OEM 로고와 한국 유통사의 재주문 관점에서 검토합니다.",
    keyword: "헬스장 액세서리 도매",
    audience: "제품 구색을 넓히는 피트니스 유통사, 센터 운영사와 자체 브랜드",
    purpose: "소형 제품은 SKU가 많아질수록 포장, 라벨, 누락 방지와 재주문 데이터가 중요하다는 점을 구매 구조에 반영합니다.",
    decision: "제품별 판매 단위, 색상, 중량, 세트 구성, 개별 포장과 마스터 카톤 수량을 먼저 표준화해야 합니다."
  },
  factory: {
    path: "/ko/factory",
    title: "헬스기구 공장과 품질 검사 과정 | PowerBaseFit",
    h1: "상업용 피트니스 장비 생산과 품질 관리",
    description: "원자재 확인부터 가공, 표면 처리, 조립, 중량 검사, 수출 포장과 출하 전 확인까지 실제 상업용 피트니스 장비 제조 주문의 관리 흐름을 설명합니다.",
    keyword: "헬스기구 공장",
    audience: "중국 제조 파트너를 검증하는 한국 수입업체, 브랜드와 프로젝트 구매 담당자",
    purpose: "공장 규모를 홍보하는 대신 주문 사양이 생산 현장과 검사 기록으로 어떻게 연결되는지 보여 줍니다.",
    decision: "샘플 승인, 검사 기준, 변경 통지와 출하 승인 책임을 발주 전에 문서로 정해야 공급 리스크를 줄일 수 있습니다."
  },
  "oem-private-label": {
    path: "/ko/oem-private-label",
    title: "OEM 헬스기구·자체 브랜드 제작 | PowerBaseFit",
    h1: "한국 브랜드를 위한 OEM·ODM 피트니스 장비",
    description: "로고, 중량 표기, 색상, 금형, 라벨과 포장을 맞춤 제작하는 과정과 MOQ, 샘플 승인, QC, 양산 준비 정보를 제공합니다.",
    keyword: "OEM 헬스기구",
    audience: "자체 브랜드를 시작하거나 기존 제품군을 확장하는 한국 유통사와 피트니스 브랜드",
    purpose: "OEM과 ODM의 책임 범위, 비용이 발생하는 변경, 샘플이 확인해야 할 항목과 브랜드 파일 준비 방법을 구분합니다.",
    decision: "목표 고객, 기준 모델, 예상 수량, 로고 파일, 색상 기준과 포장 언어가 준비되면 실현 가능성과 MOQ를 빠르게 검토할 수 있습니다."
  },
  "blog-index": {
    path: "/ko/blog",
    title: "헬스기구 수입·구매 가이드 | 한국 B2B 바이어",
    h1: "피트니스 장비 수입과 공급업체 평가 가이드",
    description: "한국 수입업체와 유통사를 위한 제조사 검증, MOQ, OEM, 제품 비교, QC, 포장, 도착 원가와 출하 전 검사 자료입니다.",
    keyword: "헬스기구 수입 가이드",
    audience: "처음 수입을 준비하는 사업자와 기존 공급망을 개선하는 구매·품질 담당자",
    purpose: "검색 단계의 질문을 견적 요청서, 샘플 확인표, 검사 기준과 도착 원가 계산에 바로 사용할 수 있는 판단 도구로 바꿉니다.",
    decision: "제품 질문과 거래 질문을 분리하고, 숫자의 단위·적용 SKU·확정 상태를 기록하면 공급업체 비교가 쉬워집니다."
  },
  projects: {
    path: "/ko/projects",
    title: "상업용 헬스장 구성 사례와 장비 배치 참고 | PowerBaseFit",
    h1: "실제 이미지로 확인하는 상업용 헬스장 장비 구성",
    description: "PowerBaseFit가 기존 사이트에서 공개한 실제 덤벨·원판·랙 구성 이미지를 바탕으로 동선, 보관, 중량 구성과 B2B 견적 준비 기준을 확인하세요.",
    keyword: "헬스장 장비 구성 사례",
    audience: "한국의 헬스장 운영사, 유통사, 수입업체와 공간별 장비 목록을 준비하는 프로젝트 구매자",
    purpose: "실제 공개 이미지에서 제품 조합과 배치 논리를 읽고 공간, 사용자, 중량 범위와 보관 요구를 견적 정보로 전환합니다.",
    decision: "이미지는 고객 성과나 건축 인증을 주장하는 자료가 아닙니다. 구매자는 현장 치수와 안전 요건을 현지 전문가와 확인하고 장비 사양을 별도로 승인해야 합니다."
  },
  contact: {
    path: "/ko/contact",
    title: "상업용 헬스기구 B2B 견적 문의 | PowerBaseFit",
    h1: "한국 수입·유통 프로젝트 견적 요청",
    description: "필요 제품, 수량, 중량 구성, 로고, 수출 포장, 한국 도착지와 희망 일정을 보내 상업용 피트니스 장비의 비교 가능한 B2B 견적을 요청하세요.",
    keyword: "헬스기구 견적 문의",
    audience: "헬스장 프로젝트, 수입 유통, 도매 또는 자체 브랜드 발주를 준비하는 담당자",
    purpose: "단순 연락처가 아니라 제품과 물류 조건을 빠짐없이 전달해 재질문과 잘못된 가격 비교를 줄이는 입력 양식을 제공합니다.",
    decision: "SKU별 수량, 맞춤 범위, 도착 항구 또는 도시, 희망 납기와 구매 단계가 있으면 우선 검토가 정확해집니다."
  },
  "rubber-hex-dumbbell-manufacturer": {
    path: "/ko/manufacturer/rubber-hex-dumbbell",
    title: "고무 육각 덤벨 제조업체 | OEM·도매 공급",
    h1: "한국 유통사를 위한 고무 육각 덤벨 제조 공급",
    description: "2.5–50kg 고무 육각 덤벨 세트의 그립, 중량 공차, 헤드 고정, 냄새·표면 확인, OEM 로고와 수출 포장을 검토합니다.",
    keyword: "고무 육각 덤벨 제조업체",
    audience: "대량 세트와 반복 주문을 검토하는 덤벨 유통사, 체인 헬스장과 자체 브랜드",
    purpose: "단일 제품 소개보다 공장 직접 거래에서 확인해야 할 샘플, 양산, 검사, 포장과 재주문 기준을 중심으로 설명합니다.",
    decision: "중량 구간과 수량, 그립 형태, 고무 표면, 표시 방식과 포장 단위를 명확히 하면 공급 조건을 비교할 수 있습니다."
  }
};

type ProductProfile = {
  slug: string;
  name: string;
  keyword: string;
  material: string;
  range: string;
  use: string;
  buyer: string;
  decision: string;
  process: string;
  qc: string;
  compare: string;
  packaging: string;
  customization: string;
  sourceImage?: string;
};

const productProfiles: Record<string, ProductProfile> = {
  "rubber-hex-dumbbell": { slug: "dumbbells/rubber-hex-dumbbell", name: "고무 육각 덤벨", keyword: "고무 육각 덤벨 도매", material: "주철 또는 금속 헤드, 고무 코팅, 금속 그립으로 구성되며 실제 구성은 승인 사양을 따릅니다.", range: "2.5–50kg, 2.5kg 단위", use: "상업용 헬스장의 프리웨이트존, PT 스튜디오, 호텔 피트니스와 유통용 세트", buyer: "굴러가지 않는 형태와 관리가 쉬운 입문·중량 세트를 원하는 운영사 및 유통사", decision: "육각면 정렬, 그립 직경, 헤드 고정, 고무 표면과 랙 간격을 함께 봐야 합니다.", process: "헤드 형상 준비, 중량 보정, 그립 결합, 고무 성형 또는 코팅, 표면 정리와 표시 작업 순서가 핵심입니다.", qc: "표시 중량 대비 실측값, 좌우 균형, 그립 흔들림, 육각면 안정성, 고무 들뜸과 외관을 확인합니다.", compare: "라운드 덤벨보다 바닥에서 굴러가는 위험이 적고 동작 전환에 편하지만 같은 중량에서 헤드 폭과 랙 점유 길이가 다를 수 있습니다.", packaging: "한 쌍 또는 단품 기준의 보호재와 중량 라벨을 정하고, 무거운 카톤의 들림과 파손을 고려해 팔레트 하중을 분산합니다.", customization: "양각·음각 또는 인쇄 로고, kg 표시, 색상 포인트와 카톤 라벨을 주문 사양에 따라 검토합니다.", sourceImage: "/assets/products/dumbbells/catalog-v2/hex-dumbbell-kg.webp" },
  "rubber-round-dumbbell": { slug: "dumbbells/rubber-round-dumbbell", name: "고무 라운드 덤벨", keyword: "상업용 라운드 덤벨", material: "원형 금속 헤드에 고무 표면과 금속 그립을 적용하는 구성이며 결합 방식은 모델별로 확인합니다.", range: "2.5–100kg, 2.5kg 단위", use: "고중량 구간이 필요한 대형 헬스장, 보디빌딩 시설과 프리미엄 덤벨 존", buyer: "통일된 원형 외관과 넓은 중량 범위를 중시하는 체인점, 전문 센터와 유통사", decision: "헤드 직경 증가, 랙 받침 형태, 바닥 이동 방지와 고중량 취급 안전을 먼저 검토합니다.", process: "금속 코어 중량 조정, 중심축 결합, 원형 표면 성형, 로고·중량 표시와 최종 균형 검사가 중요합니다.", qc: "원형도, 좌우 헤드 간격, 중심 정렬, 고중량 그립 결합, 코팅 가장자리와 실측 중량을 검사합니다.", compare: "육각형보다 연속적인 외관과 고중량 확장이 쉽지만 평평한 바닥에서 굴러갈 수 있어 전용 랙과 운영 규칙이 필요합니다.", packaging: "헤드끼리 마찰하지 않도록 분리하고, 중량별 카톤 식별과 팔레트 적층 순서를 packing list에 연결합니다.", customization: "엔드 로고, 중량 숫자, 표면 색상과 kg/lb 표시를 브랜드 가이드에 맞춰 샘플로 확인합니다.", sourceImage: "/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-main.avif" },
  "pu-dumbbell": { slug: "dumbbells/pu-dumbbell", name: "PU 덤벨", keyword: "PU 덤벨 제조업체", material: "금속 코어와 그립 외부에 폴리우레탄 표면을 적용하는 프리미엄 상업용 구성입니다.", range: "2.5–50kg, 2.5kg 단위", use: "외관 유지와 브랜드 표현이 중요한 프리미엄 헬스장, 호텔, 쇼룸과 전문 유통", buyer: "표면 촉감, 색상 일관성, 마킹 선명도와 장기 재주문 외관을 중시하는 브랜드", decision: "PU라는 명칭만 비교하지 말고 경도, 색상 기준, 표면 결함 허용 수준과 결합 구조를 문서화해야 합니다.", process: "코어 준비와 표면 전처리, PU 성형, 냉각, 트리밍, 마킹과 조립 후 안정화 조건을 관리합니다.", qc: "표면 기포·흐름 자국, 색상 편차, 로고 위치, 모서리 충격, 그립 결합과 중량 편차를 확인합니다.", compare: "고무 덤벨보다 프리미엄 외관과 색상 구현에 유리할 수 있지만 사양과 생산 조건에 따라 비용과 MOQ가 달라집니다.", packaging: "광택과 모서리가 눌리지 않도록 개별 보호하고, 장거리 운송 중 표면 접촉과 카톤 변형을 줄이는 내부 구조를 사용합니다.", customization: "다색 로고, 몰드 마킹, 지정 색상과 브랜드 카톤은 파일·색상 기준·승인 샘플을 기준으로 생산합니다.", sourceImage: "/assets/products/dumbbells/catalog-v2/pu-dumbbell-kg.webp" },
  "cpu-dumbbell": { slug: "dumbbells/cpu-dumbbell", name: "CPU 덤벨", keyword: "CPU 덤벨 도매", material: "금속 내부 구조와 CPU 표면, 금속 그립을 조합한 상업용 덤벨입니다.", range: "2.5–50kg, 2.5kg 단위", use: "반복 사용이 많은 회원제 헬스장, 체인 운영과 자체 브랜드 라인", buyer: "표면 내구성과 로고 표현, 대량 세트의 배치 일관성을 동시에 평가하는 구매자", decision: "CPU 표면의 경도, 마감, 냄새, 색상과 내부 결합 사양을 샘플에서 분리해 확인해야 합니다.", process: "코어 계량, 그립 결합, 표면 성형, 후경화, 트리밍, 마킹과 완제품 안정화가 주요 단계입니다.", qc: "실측 중량, 헤드 대칭, 표면 기포와 변형, 로고 깊이, 그립 토크와 낙하 후 이상 여부를 계획에 맞춰 검사합니다.", compare: "PU·TPU·고무와 이름만 비교하기보다 실제 샘플의 경도, 표면 복원, 색상, 비용과 주문 조건을 같은 기준으로 평가합니다.", packaging: "표면 눌림과 이염을 방지하는 분리 포장, 중량별 라벨, 카톤 총중량과 팔레트 배치를 확인합니다.", customization: "헤드 형상, 로고, 중량 표기, 지정 색상과 소매·수출 포장을 MOQ 및 금형 조건과 함께 검토합니다.", sourceImage: "/assets/products/dumbbells/catalog-v2/cpu-dumbbell-kg.webp" },
  "tpu-dumbbell": { slug: "dumbbells/tpu-dumbbell", name: "TPU 덤벨", keyword: "TPU 덤벨 공급업체", material: "금속 코어와 열가소성 폴리우레탄 표면, 금속 그립을 사용하는 제품군입니다.", range: "2.5–70kg, 2.5kg 단위", use: "넓은 중량 구간, 반복 사용과 브랜드 색상을 함께 요구하는 상업용 시설", buyer: "재주문 시 색상과 외형, 고중량 범위, 포장 효율을 중요하게 보는 유통사", decision: "TPU 등급, 표면 두께, 금형 형상, 그립과 헤드의 구조를 실제 견적 사양으로 고정해야 합니다.", process: "금속 부품 준비, 인서트 배치, TPU 성형, 냉각 수축 관리, 트리밍과 표시 후 조립 상태를 점검합니다.", qc: "수축에 따른 형상 차이, 표면 자국, 색상, 중량, 중심 정렬과 반복 취급 후 결합 상태를 확인합니다.", compare: "CPU나 PU와 외관이 비슷해 보여도 가공 조건과 촉감, 경도, 원가 구조가 다르므로 이름만으로 등급을 판단하지 않습니다.", packaging: "고중량 SKU가 아래쪽에 배치되도록 팔레트를 설계하고, 제품 간 마찰과 그립 돌출부 충격을 줄입니다.", customization: "색상, 로고, 숫자 배치와 포장 인쇄를 샘플 승인서에 연결하고 재주문 기준 샘플을 보관합니다.", sourceImage: "/assets/products/dumbbells/catalog-v2/tpu-dumbbell-kg.webp" },
  "cast-iron-dumbbell": { slug: "dumbbells/cast-iron-dumbbell", name: "주철 덤벨", keyword: "주철 덤벨 도매", material: "주철 헤드 또는 일체형 주철 구조와 보호 마감으로 구성되며 모델별 표면 처리를 확인합니다.", range: "2.5–100kg, 2.5kg 단위", use: "강한 질감과 넓은 중량 범위를 원하는 근력 시설, 도매 유통과 고중량 존", buyer: "재료 구조, 녹 방지 마감, 표시 내구성과 고중량 물류를 중시하는 구매자", decision: "주조 표면, 기공, 모서리, 방청 마감, 손잡이 촉감과 중량 보정 방식을 확인해야 합니다.", process: "주조, 게이트와 표면 정리, 중량 보정, 가공, 방청·도장, 조립과 표시 공정이 제품 품질을 좌우합니다.", qc: "주조 결함, 균열, 날카로운 부분, 코팅 누락, 녹 방지 상태, 실측 중량과 그립 대칭을 검사합니다.", compare: "코팅 덤벨보다 소재 구조가 단순하고 강한 인상을 주지만 충격 소음, 바닥 보호와 방청 관리 계획이 더 중요합니다.", packaging: "금속끼리 부딪히지 않도록 분리하고 방습, 긁힘 방지, 카톤 중량 제한과 컨테이너 내 하중 분산을 관리합니다.", customization: "주조 로고, 양각 중량, 도장 색상과 라벨을 검토하되 신규 금형과 기존 금형의 MOQ·비용을 구분합니다.", sourceImage: "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-main.webp" },
  "chrome-dumbbell": { slug: "dumbbells/chrome-dumbbell", name: "크롬 덤벨", keyword: "크롬 덤벨 세트", material: "금속 본체에 크롬 계열 표면 마감을 적용한 덤벨로 광택과 가공 품질이 외관을 결정합니다.", range: "kg 또는 lb 구성은 프로젝트별 확정", use: "호텔, 부티크 스튜디오, 프리미엄 피트니스와 전시 중심의 제품 라인", buyer: "정교한 외관, 손잡이 가공, 진열 통일성과 표면 보호를 중시하는 프로젝트 구매자", decision: "광택만 보지 말고 도금 전 표면, 마감 두께, 모서리, 손자국 관리와 랙 접촉부 보호를 확인합니다.", process: "금속 가공과 연마, 세척, 표면 처리, 마감 검사, 표시와 보호 포장이 연속적으로 관리되어야 합니다.", qc: "핀홀, 얼룩, 스크래치, 색조 차이, 날카로운 모서리, 그립 가공과 중량 표시를 조명 조건에서 확인합니다.", compare: "고무나 우레탄 덤벨보다 금속 외관이 두드러지지만 바닥 충격과 표면 흠집에 대한 운영·보관 관리가 필요합니다.", packaging: "각 제품을 부드러운 보호재로 감싸고 금속면 접촉을 차단하며, 습기와 카톤 내부 움직임을 줄입니다.", customization: "엔드캡, 레이저 마킹, 로고 플레이트와 포장 디자인을 검토하고 표면 처리에 적합한 방법을 선택합니다.", sourceImage: "/assets/products/dumbbells/chrome/chrome-dumbbell-main.avif" },
  "product:dumbbells:adjustable-dumbbell-kg": { slug: "dumbbells/adjustable-dumbbell", name: "조절식 덤벨", keyword: "조절식 덤벨 공급업체", material: "중량 모듈, 선택 장치, 손잡이, 외부 하우징과 받침대로 구성되며 선택 구조는 승인 모델에 따라 달라집니다.", range: "24 kg / 40 kg 옵션", use: "홈짐 상품군, 온라인·오프라인 피트니스 유통과 작은 트레이닝 공간", buyer: "한 개 SKU의 공간 효율, 작동 신뢰성, 패키지와 사용 안내를 함께 평가하는 브랜드와 유통사", decision: "모든 중량 위치의 선택, 모듈 고정, 표시와 실제 구성, 받침대에서의 꺼냄·복귀를 반복 확인합니다.", process: "중량 부품과 하우징 생산, 선택 장치 조립, 손잡이 결합, 받침대 맞춤, 전 구간 작동 검사와 포장으로 이어집니다.", qc: "선택 장치 이동, 모듈 유지, 각 위치 중량, 손잡이, 표시, 받침대 안정성과 반복 전환 후 상태를 검사합니다.", compare: "고정 덤벨 세트보다 공간과 SKU를 줄이지만 이동 부품, 사용 설명과 부품 대응이 추가되므로 판매 채널과 운영 방식을 함께 봅니다.", packaging: "본체와 받침대를 고정하고 선택 장치를 충격에서 보호하며, 개별 택배 유통을 고려한 카톤과 사용 안내를 확인합니다.", customization: "로고, 색상, 중량 표시, 한국어 안내와 패키지를 검토할 수 있으며 내부 장치 변경은 별도 개발과 검증이 필요합니다.", sourceImage: "/assets/products/dumbbells/catalog-v2/adjustable-dumbbell-kg.webp" },
  "rubber-bumper-plate": { slug: "weight-plates/rubber-bumper-plate", name: "고무 범퍼 플레이트", keyword: "범퍼 플레이트 도매", material: "고무 바디와 금속 중심 인서트로 구성되며 배합과 성형 구조는 주문 모델별로 확인합니다.", range: "kg 또는 lb 중량 구성은 견적 사양으로 확정", use: "역도, 기능성 트레이닝, 크로스트레이닝과 낙하가 허용된 플랫폼", buyer: "반복 낙하, 바 적재 폭, 소음과 바닥 보호를 고려하는 상업용 시설과 유통사", decision: "직경, 두께, 중심 홀, 인서트 고정, 중량 공차와 반발 특성을 함께 평가해야 합니다.", process: "고무 원료 준비, 인서트 전처리와 배치, 압축 성형, 경화, 트리밍, 중량 보정과 표시가 핵심입니다.", qc: "중량, 직경과 두께, 홀 치수, 인서트 흔들림, 표면 결함과 정의된 조건의 반복 낙하 후 상태를 확인합니다.", compare: "일반 고무 원판보다 낙하 사용을 전제로 설계되지만 모든 바닥과 모든 높이에서 무제한 낙하가 가능한 것은 아닙니다.", packaging: "인서트와 표면이 긁히지 않게 분리하고 중량별 식별, 팔레트 밴딩과 총중량 표시를 관리합니다.", customization: "로고, 중량 글자, 색상 효과, kg/lb와 포장을 배합·금형·인쇄 조건에 맞춰 승인합니다.", sourceImage: "/assets/products/weight-plates/catalog/rubber-bumper-plate.webp" },
  "cpu-bumper-plate": { slug: "weight-plates/cpu-bumper-plate", name: "CPU 범퍼 플레이트", keyword: "CPU 범퍼 플레이트", material: "CPU 표면과 강철 중심 인서트를 조합한 범퍼 플레이트 제품군입니다.", range: "kg 또는 lb 구성은 프로젝트별 확정", use: "브랜드 외관과 반복 훈련을 함께 고려하는 헬스장, 스튜디오와 유통 라인", buyer: "표면 마감, 컬러, 인서트 정렬과 배치 일관성을 중시하는 자체 브랜드", decision: "CPU라는 재료명 외에 두께, 경도, 중심 구조, 실제 낙하 기준과 중량 공차를 확인해야 합니다.", process: "인서트 준비, 원료 계량, 성형과 경화, 중심 정렬, 표면 정리, 표시와 완제품 안정화가 필요합니다.", qc: "표면 기포, 변형, 인서트 동심도, 홀 치수, 중량과 반복 충격 후 분리·균열 여부를 검사합니다.", compare: "고무 범퍼와 비용·촉감·색상·경도·MOQ가 다를 수 있으므로 동일한 중량과 사용 조건의 샘플로 비교합니다.", packaging: "표면 눌림과 인서트 접촉을 막는 분리재를 사용하고, 팔레트당 중량과 적층 높이를 운송 조건에 맞춥니다.", customization: "지정 색상, 로고, 중량 숫자와 패키지를 샘플 승인 기준에 넣고 재주문 색상 기준을 보관합니다.", sourceImage: "/assets/products/weight-plates/catalog/cpu-bumper-plate.webp" },
  "product:plates:rubber-competition-bumper-plate": { slug: "weight-plates/competition-bumper-plate", name: "컴피티션 범퍼 플레이트", keyword: "컴피티션 범퍼 플레이트", material: "고무 바디, 정밀한 중심 부품과 모델별 조립 구조로 구성되는 경기형 제품군입니다.", range: "중량·색상 체계는 승인된 제품 사양 기준", use: "정밀한 세트 구성과 바 적재 효율을 중시하는 역도 시설, 전문 트레이닝 센터", buyer: "표시 중량 신뢰성, 두께, 중심 부품과 제품 간 일관성을 우선하는 전문 구매자", decision: "'competition' 명칭보다 실제 치수, 공차, 색상 체계, 드롭 테스트와 적용 기준을 문서로 확인합니다.", process: "소재 계량, 중심 부품 가공과 결합, 성형, 중량 보정, 표면 마감과 개별 식별이 중요합니다.", qc: "중량 공차, 외경, 두께, 홀 치수, 동심도와 세트 간 차이를 계측하고 충격 후 중심부를 확인합니다.", compare: "트레이닝 범퍼보다 얇고 정밀한 구성을 목표로 할 수 있지만 모델별 데이터가 우선이며 명칭만으로 성능을 보장하지 않습니다.", packaging: "중심 부품과 모서리를 보호하고 색상·중량별로 쉽게 검수할 수 있도록 카톤과 팔레트 라벨을 구성합니다.", customization: "로고와 중량 표시는 가독성, 마찰과 반복 충격을 고려해 방식과 위치를 샘플에서 승인합니다." },
  "rubber-olympic-plate": { slug: "weight-plates/rubber-olympic-plate", name: "고무 올림픽 원판", keyword: "고무 올림픽 원판", material: "금속 원판 또는 코어에 고무 코팅과 중심 인서트를 적용하는 제품군입니다.", range: "모델별 중량 세트와 올림픽 규격 중심 홀", use: "벤치프레스, 스쿼트, 머신과 일반 근력 운동용 바벨 구역", buyer: "낙하용 범퍼보다 공간 효율과 손쉬운 취급을 원하는 헬스장 및 유통사", decision: "중심 홀, 두께, 손잡이 유무, 고무 표면, 바 슬리브와 장비 호환성을 확인합니다.", process: "코어 준비, 가공과 중량 조정, 고무 코팅 또는 성형, 인서트 결합, 트리밍과 표시를 진행합니다.", qc: "홀 치수, 평면도, 중량, 코팅 들뜸, 인서트 회전, 표면 냄새와 마킹 상태를 검사합니다.", compare: "범퍼보다 같은 중량에서 얇을 수 있지만 반복 낙하 용도로 가정해서는 안 되며 시설 규칙과 바닥 조건을 구분합니다.", packaging: "평면끼리 마찰하지 않도록 보호하고 카톤 손잡이와 밴딩이 실제 중량을 견디는지 확인합니다.", customization: "고무 색상, 로고, 중량 숫자, 그립 형상과 카톤 표시를 주문량과 금형 가능성에 맞춰 검토합니다.", sourceImage: "/assets/products/weight-plates/catalog/rubber-olympic-plate.webp" },
  "cast-iron-weight-plate": { slug: "weight-plates/cast-iron-weight-plate", name: "주철 웨이트 원판", keyword: "주철 원판 도매", material: "주철 본체와 도장 또는 보호 표면으로 구성되며 손잡이와 표시 형상은 모델별로 다릅니다.", range: "kg/lb 세트와 홀 규격은 주문 모델 기준", use: "일반 근력 운동, 플레이트 로드 머신, 전통적인 프리웨이트 구역", buyer: "가격 구조, 얇은 적재, 내구성, 방청과 도매 구색을 고려하는 유통사", decision: "주조 품질, 홀 가공, 모서리, 도장 부착, 실측 중량과 방청 포장을 확인해야 합니다.", process: "주조, 샷 또는 표면 정리, 홀 가공, 중량 보정, 도장·건조와 표시가 주요 공정입니다.", qc: "균열과 기공, 날카로운 모서리, 홀 치수, 흔들림, 도장 누락, 녹 흔적과 실측 중량을 확인합니다.", compare: "고무 코팅 원판보다 단순하고 얇은 구성이 가능하지만 소음, 바닥 보호와 습도 관리 부담이 큽니다.", packaging: "방습재와 표면 분리재를 적용하고 무거운 원판이 카톤을 뚫지 않도록 바닥 보강과 팔레트 하중을 설계합니다.", customization: "양각 브랜드, 중량 표시, 표면 색상과 포장 라벨을 검토하며 신규 주조 형상의 금형 비용을 별도 확인합니다.", sourceImage: "/assets/products/weight-plates/cast-iron/cast-iron-weight-plate-main.avif" },
  "cpu-grip-plate": { slug: "weight-plates/cpu-grip-plate", name: "CPU 그립 원판", keyword: "CPU 그립 원판", material: "CPU 표면, 금속 코어와 중심 인서트, 손잡이 개구부를 결합한 원판입니다.", range: "중량 세트와 홀 규격은 프로젝트별 승인", use: "회원이 원판을 자주 이동하는 상업용 헬스장, 머신과 바벨 혼합 구역", buyer: "취급 편의, 표면 내구성, 브랜드 외관과 재주문 일관성을 중시하는 운영사", decision: "그립 개구부 크기, 가장자리 두께, 홀 정렬, 장갑 사용과 랙 간섭을 실제 샘플로 확인합니다.", process: "금속 코어 준비, 인서트와 그립 영역 배치, CPU 성형, 트리밍, 표시와 홀 마감이 중요합니다.", qc: "손잡이 가장자리, 표면 기포, 인서트 동심도, 평면도, 중량과 반복 이동 후 표면 상태를 검사합니다.", compare: "일반 원판보다 이동이 편하지만 그립 구조가 두께와 외경에 영향을 줄 수 있어 바 적재량을 함께 계산합니다.", packaging: "그립 부분에 포장재가 끼이거나 눌리지 않게 보호하고, 중량별 카톤 라벨과 팔레트 순서를 통일합니다.", customization: "그립 형상, 색상, 로고와 숫자 배치를 금형 가능성, MOQ와 승인 샘플에 따라 정합니다.", sourceImage: "/assets/products/weight-plates/catalog/cpu-grip-plate.webp" },
  "product:racks:power-rack-functional-trainer": { slug: "racks-benches/power-rack-functional-trainer", name: "파워랙 기능성 트레이너", keyword: "파워랙 기능성 트레이너", material: "강철 프레임, 조절 홀, 케이블·풀리, 웨이트 시스템과 부속품으로 구성됩니다.", range: "프레임 치수와 스택 구성은 모델·프로젝트별 확인", use: "한 공간에서 바벨과 케이블 운동을 운영하는 상업용 헬스장과 PT 스튜디오", buyer: "면적 대비 운동 기능, 설치 동선과 부품 관리를 함께 평가하는 프로젝트 구매자", decision: "전체 외형, 운동 시 필요 공간, 천장 높이, 케이블 비율, 하중 조건과 바닥 고정을 확인합니다.", process: "파이프 절단과 용접, 홀 가공, 표면 처리, 풀리 조립, 케이블 배선, 기능 시험과 분해 포장이 이어집니다.", qc: "프레임 치수, 용접, 코팅, 홀 정렬, 케이블 이동, 풀리 소음, 스토퍼와 부품 수량을 조립 상태에서 검사합니다.", compare: "독립 파워랙과 케이블 머신 두 대보다 공간을 줄일 수 있지만 동시 사용자 수와 한 기능의 정지가 전체 운영에 미치는 영향을 봐야 합니다.", packaging: "긴 프레임과 작은 하드웨어를 분리 식별하고 조립 순서, 카톤 번호, 보호재와 팔레트 고정을 계획합니다.", customization: "프레임 색상, 로고 플레이트, 액세서리, 스토리지와 포장 표시를 프로젝트 레이아웃에 맞춰 검토합니다." },
  "product:racks:smith-machine": { slug: "racks-benches/smith-machine", name: "상업용 스미스머신", keyword: "상업용 스미스머신", material: "강철 프레임, 가이드 시스템, 바, 안전 장치와 중량 보관 부품으로 구성됩니다.", range: "치수, 이동 범위와 적재 조건은 해당 모델 사양 기준", use: "스쿼트와 프레스 동작에 고정된 이동 경로를 제공하는 상업용 근력 구역", buyer: "안전 장치, 가이드 감각, 설치 안정성과 유지보수 부품을 중시하는 운영사", decision: "가이드 각도와 이동, 시작 저항, 안전 걸쇠, 최대 사용 범위와 벤치 배치를 확인해야 합니다.", process: "프레임 가공과 용접, 가이드 정렬, 표면 마감, 슬라이더·안전 장치 조립, 작동 시험과 포장을 진행합니다.", qc: "좌우 평행, 전 구간 이동, 걸쇠 체결, 비정상 소음, 용접과 코팅, 볼트 체결과 부품 목록을 확인합니다.", compare: "자유 중량 랙보다 이동 경로가 제한되어 접근성이 높을 수 있지만 운동 목적과 사용자 교육에 따라 독립 랙도 함께 필요합니다.", packaging: "가이드 표면과 긴 프레임을 충격·변형에서 보호하고, 설치에 필요한 하드웨어를 단계별 봉투와 목록으로 관리합니다.", customization: "프레임 색상, 로고, 웨이트 보관, 안전 장치와 액세서리를 검토하되 구조 변경은 별도 기술 확인이 필요합니다." },
  "product:racks:commercial-adjustable-bench": { slug: "racks-benches/commercial-adjustable-bench", name: "상업용 조절 벤치", keyword: "상업용 조절 벤치", material: "강철 프레임, 조절 링크, 패드, 커버, 이동 바퀴와 손잡이로 구성됩니다.", range: "등받이·시트 각도와 전체 치수는 모델별 사양 기준", use: "덤벨, 랙, 케이블과 함께 사용하는 상업용 프리웨이트 구역", buyer: "빠른 각도 조절, 흔들림, 패드 내구성과 이동 편의성을 중시하는 헬스장", decision: "각도 단계, 평면 높이, 패드 간격, 발 위치, 랙 안쪽 호환성과 이동 동선을 확인합니다.", process: "프레임 절단·용접, 조절 구멍 가공, 표면 처리, 패드 제작, 조립과 각도·하중 기능 시험을 진행합니다.", qc: "프레임 평면, 조절핀 체결, 좌우 흔들림, 패드 밀도와 봉제, 바퀴 이동, 마감과 하드웨어를 검사합니다.", compare: "고정 벤치보다 운동 범위가 넓지만 조절 구조와 패드가 더 많아 일상 점검과 교체 부품 관리가 중요합니다.", packaging: "패드 눌림과 프레임 스크래치를 분리 보호하고, 일부 조립 상태와 현장 조립 시간을 프로젝트 일정에 반영합니다.", customization: "프레임·패드 색상, 자수 또는 로고, 손잡이와 포장 라벨을 브랜드 가이드에 맞춰 검토합니다." },
  "product:accessories:cast-iron-kettlebell": { slug: "gym-accessories/cast-iron-kettlebell", name: "주철 케틀벨", keyword: "주철 케틀벨 도매", material: "주철 일체형 또는 모델별 구성에 도장·코팅과 중량 표시를 적용합니다.", range: "중량 구성은 제품 라인과 주문 계획에 따라 확정", use: "기능성 트레이닝, 그룹 수업, PT 스튜디오와 헬스장 액세서리 구역", buyer: "그립 공간, 바닥 안정성, 표면과 세트 색상 체계를 중요하게 보는 유통사", decision: "핸들 직경과 공간, 바닥 평면, 주조 표면, 중량 표기와 가벼운·무거운 구간의 형상 변화를 확인합니다.", process: "주조, 게이트 정리, 핸들 연마, 중량 보정, 표면 처리, 표시와 바닥 안정성 확인을 진행합니다.", qc: "핸들의 날카로운 부분과 기공, 바닥 흔들림, 표면 누락, 실측 중량과 표시 가독성을 검사합니다.", compare: "비닐 코팅 또는 컴피티션형 케틀벨과 핸들 크기, 외형 변화, 바닥 보호와 가격 구조가 다릅니다.", packaging: "핸들과 바닥이 카톤을 손상하지 않게 지지하고, 중량 라벨과 세트별 팔레트 순서를 명확히 합니다.", customization: "중량별 색상 링, 로고, 양각·인쇄 표시와 포장 라벨을 주문 수량과 표면 방식에 맞춰 검토합니다." }
};

type GuideProfile = {
  slug: string;
  title: string;
  h1: string;
  keyword: string;
  intent: string;
  problem: string;
  method: string;
  evidence: string;
  risk: string;
  outcome: string;
};

const guideProfiles: Record<string, GuideProfile> = {
  "factory-guide": { slug: "choose-chinese-fitness-equipment-manufacturer", title: "중국 헬스기구 제조사 선택 방법", h1: "중국 헬스기구 제조사를 검증하는 방법", keyword: "중국 헬스기구 제조사", intent: "공급업체 검증", problem: "웹사이트 사진과 빠른 견적만으로는 실제 공정 통제, 외주 범위와 변경 관리 능력을 판단하기 어렵습니다.", method: "대표 SKU 하나를 골라 원자재, 가공, 표면 처리, 조립, 검사와 포장까지 추적하고 담당자와 기록을 확인합니다.", evidence: "승인 샘플, 공정 흐름, 검사 양식, 계측 도구, 부적합 처리와 최근 주문에 연결된 포장 자료가 유용합니다.", risk: "공장 규모나 인증 이름을 제품 사양 준수의 대체 증거로 사용하면 실제 주문의 변동을 놓칠 수 있습니다.", outcome: "같은 RFQ와 증거 목록으로 후보를 비교하고 시험 주문의 중단 기준까지 정할 수 있습니다." },
  "import-guide": { slug: "import-fitness-equipment-from-china-to-korea", title: "중국 헬스기구 한국 수입 가이드", h1: "중국에서 헬스기구를 한국으로 수입할 때 확인할 사항", keyword: "헬스기구 수입", intent: "수입 절차 계획", problem: "제품 가격만 확인하면 운임, 관세·세금, 검사, 보관, 국내 운송과 파손 비용이 뒤늦게 추가됩니다.", method: "수입자 역할, HS 분류 검토, 제품·포장 명세, Incoterm, 출발·도착 비용과 필요한 국내 확인 사항을 순서대로 정리합니다.", evidence: "상업송장, packing list, 제품 사양, 원산지 관련 자료, 운송 견적과 출하 전 검사 보고서를 같은 버전으로 관리합니다.", risk: "일반적인 온라인 구매 정보와 사업자 수입 요건을 혼동하거나 규정 확인을 제조사에게 전부 맡기면 책임 공백이 생깁니다.", outcome: "SKU별 도착 원가와 일정의 불확실성을 표시한 수입 계획을 만들 수 있습니다." },
  "moq-guide": { slug: "fitness-equipment-moq-guide", title: "헬스기구 MOQ와 혼합 주문 가이드", h1: "피트니스 장비 MOQ는 어떻게 결정되는가", keyword: "헬스기구 MOQ", intent: "최소 주문 수량 협상", problem: "MOQ 한 숫자는 소재, 금형, 색상, 로고, 포장과 생산 전환 비용이 다른 여러 SKU를 설명하지 못합니다.", method: "표준 제품, 맞춤 색상, 신규 로고, 신규 금형을 분리하고 SKU별 최소량과 전체 주문 최소 조건을 각각 요청합니다.", evidence: "원자재 배치, 생산 라인 전환, 인쇄 판, 카톤 수량, 샘플 비용과 잔여 자재 처리 조건을 확인합니다.", risk: "낮은 MOQ만 선택하면 단가, 색상 편차, 남은 포장재, 재주문 조건과 품질 확인 비용이 더 커질 수 있습니다.", outcome: "초기 시장 테스트와 안정적인 재주문을 모두 고려한 혼합 컨테이너 구성을 협상할 수 있습니다." },
  "oem-vs-odm-guide": { slug: "oem-vs-odm-fitness-equipment", title: "피트니스 장비 OEM과 ODM 차이", h1: "OEM과 ODM 중 어떤 방식이 피트니스 브랜드에 맞는가", keyword: "OEM ODM 헬스기구", intent: "개발 모델 선택", problem: "두 용어를 로고 부착 여부로만 구분하면 설계 책임, 금형 소유, 시험, 변경 승인과 지식재산 범위가 불명확해집니다.", method: "누가 요구사항을 만들고 누가 설계를 보유하며 누가 부품과 시험 방법을 승인하는지 업무 항목별로 구분합니다.", evidence: "제품 사양서, 도면, BOM 수준의 합의, 샘플 버전, artwork, 변경 기록과 금형·파일 소유 조건이 필요합니다.", risk: "ODM을 완전한 무책임 구매로 이해하거나 OEM을 단순 로고 작업으로 축소하면 일정과 비용 분쟁이 발생합니다.", outcome: "출시 속도, 차별화, 투자, 통제 수준에 맞는 개발 경로와 계약 질문을 정할 수 있습니다." },
  "private-label-guide": { slug: "private-label-fitness-equipment-korea", title: "자체 브랜드 헬스기구 제작 가이드", h1: "한국 시장용 자체 브랜드 피트니스 장비를 만드는 과정", keyword: "자체 브랜드 헬스기구", intent: "브랜드 제품 개발", problem: "로고가 적용된 제품만 준비하고 한글 표시, SKU 체계, 카톤, 설명 자료와 재주문 기준을 늦게 결정하면 출시가 지연됩니다.", method: "목표 고객, 가격대, 핵심 제품, 브랜드 파일, 색상, 표시 언어, 포장 단위와 판매 채널을 하나의 출시 브리프로 만듭니다.", evidence: "벡터 로고, 색상 기준, 제품별 artwork, 라벨 정보, 승인 샘플, 촬영 기준과 최종 packing list가 필요합니다.", risk: "제품마다 다른 방식으로 브랜드를 적용하면 라인 전체의 통일성과 재주문 일관성이 무너질 수 있습니다.", outcome: "샘플부터 첫 양산과 재주문까지 동일한 브랜드 자산과 승인 기록을 유지할 수 있습니다." },
  "dumbbells-guide": { slug: "choose-commercial-gym-dumbbells", title: "상업용 헬스장 덤벨 선택 가이드", h1: "헬스장용 덤벨 세트를 선택하는 방법", keyword: "상업용 덤벨 세트", intent: "제품 구성 선택", problem: "최대 중량과 소재만 정하면 실제 회원 수요, 가벼운 구간 중복, 랙 길이와 교체 운영을 놓치기 쉽습니다.", method: "시간대별 사용자, 운동 유형과 사용 빈도를 바탕으로 중량 간격, 동일 중량 수량, 최대 중량과 랙 위치를 설계합니다.", evidence: "평면도, 회원 구성, 기존 사용 데이터, 제품 치수, 그립과 헤드 형상, 랙 수용 수량을 비교합니다.", risk: "모든 중량을 한 쌍씩 주문하면 인기 구간 대기와 사용하지 않는 고중량 재고가 동시에 생길 수 있습니다.", outcome: "공간과 예산 안에서 실제 이용률이 높은 덤벨 세트와 예비 수량을 계획할 수 있습니다." },
  "plates-guide": { slug: "weight-plates-vs-bumper-plates", title: "웨이트 원판과 범퍼 플레이트 비교", h1: "헬스장에는 일반 원판과 범퍼 플레이트 중 무엇이 필요한가", keyword: "원판 범퍼 플레이트 차이", intent: "제품 유형 비교", problem: "두 제품을 소재 이름으로만 비교하면 낙하, 바 적재 폭, 플랫폼, 소음과 운동 프로그램의 차이를 반영하지 못합니다.", method: "각 구역의 바벨 동작, 낙하 허용, 바닥, 최대 적재, 보관과 사용자 행동을 기준으로 필요한 원판 유형을 배치합니다.", evidence: "외경, 두께, 홀 치수, 중량 공차, 인서트, 사용 제한과 낙하 시험 조건을 같은 표에서 확인합니다.", risk: "일반 고무 원판을 범퍼처럼 사용하거나 범퍼의 두께를 계산하지 않으면 제품·바닥 손상과 적재 부족이 생깁니다.", outcome: "역도존, 머신존과 일반 근력존에 맞는 혼합 원판 구성을 만들 수 있습니다." },
  "plate-materials-b2b": { slug: "rubber-pu-cpu-cast-iron-plate-materials", title: "고무·PU·CPU·주철 원판 소재 비교", h1: "상업용 웨이트 원판 소재를 비교하는 기준", keyword: "웨이트 원판 소재 비교", intent: "소재 선택", problem: "소재 명칭은 외관과 가격의 단서일 뿐 실제 경도, 두께, 냄새, 충격, 색상과 재주문 품질을 보장하지 않습니다.", method: "동일 중량과 사용 조건에서 코어, 표면, 인서트, 두께, 마킹, 청소와 샘플의 실제 촉감을 비교합니다.", evidence: "소재 사양, 샘플, 중량·치수 측정, 표면 결함 기준, 색상 기준과 생산 배치 기록이 필요합니다.", risk: "서로 다른 공급사의 재료 이름을 동일 등급으로 간주하면 기대 수명과 비용 비교가 왜곡됩니다.", outcome: "시설 등급, 판매 가격과 유지관리 계획에 맞는 소재 조합을 선택할 수 있습니다." },
  "export-packaging-free-weights": { slug: "export-packaging-dumbbells-weight-plates-korea", title: "덤벨·원판 수출 포장과 팔레트 설계", h1: "무거운 피트니스 장비의 수출 포장을 검토하는 방법", keyword: "헬스기구 수출 포장", intent: "물류 손상 예방", problem: "무거운 제품은 외관이 작아도 카톤 바닥, 밴딩, 팔레트와 컨테이너 하중 집중으로 파손되기 쉽습니다.", method: "제품 보호, 개별 포장, 카톤 총중량, 취급 방향, 팔레트 적층과 컨테이너 고정을 하나의 시스템으로 설계합니다.", evidence: "포장 사양, 카톤 치수와 중량, 낙하·적층 확인, 팔레트 사진, 라벨, packing list와 적입 계획이 필요합니다.", risk: "샘플 포장만 승인하고 실제 팔레트 적층을 확인하지 않으면 장거리 운송 중 눌림, 밴딩 파손과 식별 오류가 생깁니다.", outcome: "손상 원인을 제품, 카톤, 팔레트 또는 취급 단계로 추적할 수 있는 포장 기준을 만들 수 있습니다." },
  "pre-shipment-inspection-free-weights": { slug: "pre-shipment-inspection-fitness-equipment", title: "헬스기구 출하 전 검사 체크리스트", h1: "덤벨과 원판 출하 전 검사는 어떻게 진행하는가", keyword: "헬스기구 출하 전 검사", intent: "선적 승인", problem: "검사 당일에 항목을 정하면 샘플링, 결함 등급, 측정 방법과 불합격 처리에 대한 합의가 없습니다.", method: "검사 가능 수량, 무작위 샘플, 승인 샘플, 치수·중량·기능·외관·포장 기준과 선적 결정권자를 사전에 정합니다.", evidence: "PO, 최신 사양, artwork, 결함 분류, 측정 기록, 사진, 카톤·팔레트 확인과 시정조치 결과가 필요합니다.", risk: "검사 보고서가 많은 사진만 포함하고 SKU와 기준을 연결하지 않으면 합격 판단을 재현할 수 없습니다.", outcome: "불합격을 선적 전에 처리하고 승인·보류·재검사의 조건을 명확히 할 수 있습니다." },
  "bumper-manufacturing-guide": { slug: "how-bumper-plates-are-made", title: "범퍼 플레이트 제조 공정 가이드", h1: "범퍼 플레이트는 어떤 공정으로 만들어지는가", keyword: "범퍼 플레이트 제조 공정", intent: "제조 방식과 품질 포인트 이해", problem: "완제품 사진만 보면 고무 배합, 중심 인서트 준비, 성형, 경화, 중량 보정과 공정 중 검사 차이를 판단하기 어렵습니다.", method: "원료 준비부터 인서트, 금형, 성형·경화, 트리밍, 마킹, 중량·치수 검사와 포장까지 단계별 입력과 결과를 추적합니다.", evidence: "해당 모델의 공정 흐름, 소재 배치 기록, 금형과 인서트 자료, 중량·치수 측정, 표면·중심부 사진과 시험 조건이 필요합니다.", risk: "재생고무 또는 특정 성형 방식에 대한 일반론만으로 실제 모델의 내구성과 냄새를 단정하면 제품별 배합과 공정 차이를 놓칩니다.", outcome: "RFQ와 공장 검증에서 어떤 단계의 자료를 요청하고 어떤 결함을 양산 전에 차단할지 정할 수 있습니다." },
  "dumbbell-weighing-guide": { slug: "how-dumbbells-are-weighed-in-factory", title: "덤벨 중량 측정과 공차 관리", h1: "공장에서 덤벨 무게는 어떻게 측정하고 관리하는가", keyword: "덤벨 중량 공차 검사", intent: "중량 정확성과 검사 방법 이해", problem: "표시 중량 한 번 측정만으로는 저울 상태, 단위, 한 개와 한 쌍, 샘플링, 중량별 공차와 보정 방법을 알 수 없습니다.", method: "교정 또는 확인된 저울, 영점, 단위와 측정 위치를 정하고 중량 구간별 무작위 샘플과 결과 분포를 기록합니다.", evidence: "저울 식별과 확인 기록, SKU별 목표와 허용 범위, 원시 측정값, 샘플 수, 보정·격리 기록과 표시 사진이 필요합니다.", risk: "가장 가벼운 한 제품이나 전시 샘플만 측정하면 고중량, 다른 금형과 양산 배치의 편차를 대표하지 못합니다.", outcome: "구매 사양에 측정 방법과 허용 범위를 넣고 출하 검사와 재주문 배치 비교에 같은 기준을 사용할 수 있습니다." },
  "commercial-free-weight-rfq": { slug: "commercial-free-weight-rfq-checklist-korea", title: "상업용 프리웨이트 RFQ 체크리스트", h1: "덤벨과 원판 견적 요청서를 정확하게 만드는 방법", keyword: "프리웨이트 견적 요청서", intent: "비교 가능한 RFQ 작성", problem: "제품 링크와 총수량만 보내면 공급사마다 소재, 중량 구성, 로고, 포장과 거래 범위를 다르게 가정해 가격을 비교할 수 없습니다.", method: "SKU, 단위, 수량, 소재, 치수, 중량 공차, 표시, 포장, 검사, 목적지와 Incoterm을 행 단위로 작성하고 미확정 항목을 표시합니다.", evidence: "제품 표, 참조 이미지, 브랜드 파일, 목표 일정, 도착지, 포장 조건과 공급사별 예외 목록이 필요합니다.", risk: "견적을 받은 뒤 사양을 채우면 낮은 초기 가격이 샘플, 포장과 맞춤 비용으로 계속 바뀌어 후보 평가가 왜곡됩니다.", outcome: "후보 공급사의 가격, 예외, MOQ와 리드타임을 같은 기준으로 비교할 수 있습니다." },
  "custom-logo-free-weights": { slug: "custom-logo-dumbbells-weight-plates", title: "덤벨과 원판 로고 맞춤 제작 가이드", h1: "프리웨이트 제품에 자체 브랜드 로고를 적용하는 방법", keyword: "덤벨 로고 커스텀", intent: "브랜드 표시 방식 선택", problem: "로고 파일만 보내면 재료, 표면, 마찰, 금형, 색상, 크기와 중량별 가독성에 맞지 않는 적용 방식이 선택될 수 있습니다.", method: "제품 표면과 생산 공정에 따라 몰드, 인쇄, 레이저, 플레이트 또는 라벨 가능성을 비교하고 실제 샘플에서 위치와 내구성을 승인합니다.", evidence: "벡터 파일, 색상 기준, 크기·위치 도면, 중량별 artwork, 샘플 사진, 마찰·접촉 조건과 포장 시 보호 방법이 필요합니다.", risk: "한 중량에서 승인한 로고를 크기 조정 없이 전체 라인에 적용하면 작은 제품의 가독성과 큰 제품의 비례가 달라질 수 있습니다.", outcome: "제품군 전체에서 일관된 브랜드 표시와 재주문 가능한 artwork 체계를 만들 수 있습니다." },
  "free-weight-reorder-batch-consistency": { slug: "free-weight-reorder-batch-consistency-korea", title: "프리웨이트 재주문과 배치 일관성 관리", h1: "덤벨과 원판 재주문 시 이전 배치와 일관성을 확인하는 방법", keyword: "덤벨 재주문 배치 일관성", intent: "재주문 품질 관리", problem: "제품 이름과 색상만 반복하면 소재 배합, 금형, 로고, 중량 표시, 포장과 부품 공급처의 작은 변경을 발견하기 어렵습니다.", method: "첫 주문의 승인 샘플, 실측값, artwork, 포장, 검사 보고서와 현장 피드백을 기준선으로 만들고 재주문 전 변경 질문을 보냅니다.", evidence: "이전 PO와 사양, 샘플 코드, 색상 기준, 로트 측정값, 변경 통지, 새 첫 제품과 비교 사진이 필요합니다.", risk: "새 로트가 허용 공차 안이라는 이유만으로 이전 로트와의 시각·조립 차이를 무시하면 교체 판매와 세트 확장에서 문제가 생깁니다.", outcome: "합리적인 허용 범위 안에서 장기 변화를 추적하고 필요한 경우 새 샘플이나 추가 검사를 요청할 수 있습니다." },
  "landed-cost-free-weights": { slug: "landed-cost-wholesale-free-weights-korea", title: "도매 프리웨이트 한국 도착 원가 계산", h1: "덤벨과 원판의 한국 도착 원가를 계산하는 방법", keyword: "프리웨이트 도착 원가", intent: "수입 총비용 비교", problem: "제품 단가만 비교하면 맞춤, 포장, 운송, 보험, 통관, 세금, 국내 운송, 창고와 파손 대응이 빠져 주문별 수익성이 왜곡됩니다.", method: "SKU별 제품비와 일회성 비용을 분리하고 Incoterm 경계에 따라 출발지, 국제 운송과 한국 도착 이후 비용을 순서대로 배치합니다.", evidence: "제품 견적, 포장 치수·중량, 팔레트와 적입 계획, 운송 견적, 분류 검토, 국내 취급비와 환율 기준이 필요합니다.", risk: "서로 다른 Incoterm 또는 포장 밀도의 견적을 단가만 비교하면 가장 저렴해 보인 공급사가 총비용에서 불리할 수 있습니다.", outcome: "낮음·기준·높음 시나리오로 주문량, 판매 가격과 운임 변동 위험을 검토할 수 있습니다." },
  "oem-sample-approval-free-weights": { slug: "oem-free-weight-sample-approval-korea", title: "OEM 프리웨이트 샘플 승인 절차", h1: "덤벨과 원판 OEM 샘플을 승인하는 방법", keyword: "OEM 헬스기구 샘플 승인", intent: "양산 기준 확정", problem: "샘플을 단순히 마음에 든다고 승인하면 소재, 무게, 치수, 로고, 색상과 포장 중 무엇이 양산 기준인지 명확하지 않습니다.", method: "샘플 코드와 버전을 만들고 기능, 실측, 외관, artwork, 포장 항목을 합격·수정·미확정으로 나눠 기록합니다.", evidence: "제품 사양, 원시 측정값, 표면·로고 사진, 색상 기준, 수정 목록, 서명 또는 승인 기록과 보관 샘플이 필요합니다.", risk: "판매용 골든 샘플과 실제 양산 공정이 다르거나 조건부 수정이 확인되지 않으면 양산품과 승인 기대가 달라질 수 있습니다.", outcome: "공장, 구매, 품질과 브랜드 팀이 같은 기준으로 첫 제품과 양산 로트를 판정할 수 있습니다." },
  "commercial-dumbbell-set-planning": { slug: "plan-commercial-dumbbell-set-korea", title: "상업용 덤벨 세트 구성 가이드", h1: "헬스장 이용률에 맞춰 덤벨 중량과 수량을 계획하는 방법", keyword: "상업용 덤벨 세트 구성", intent: "중량 범위와 수량 계획", problem: "모든 중량을 한 쌍씩 주문하면 인기 중량은 부족하고 고중량은 사용되지 않으며 랙과 예산이 비효율적으로 배분될 수 있습니다.", method: "사용자 수, 프로그램, 피크 시간, 중량별 예상 회전, 간격, 최대 중량과 랙 수용량을 연결해 기본 세트와 중복 세트를 구분합니다.", evidence: "회원과 프로그램 가정, 기존 이용 데이터, 덤벨 치수, 랙 길이, 바닥 면적, 중량별 가격과 교체 계획이 필요합니다.", risk: "경쟁 시설의 세트를 그대로 복사하면 회원 구성, 트레이너 운영과 공간 차이 때문에 실제 이용률과 맞지 않을 수 있습니다.", outcome: "예산 안에서 인기 구간의 대기를 줄이고 확장·교체 가능한 중량 구성을 만들 수 있습니다." },
  "training-vs-competition-bumper-plates": { slug: "training-vs-competition-bumper-plates-korea", title: "트레이닝 범퍼와 컴피티션 범퍼 비교", h1: "트레이닝용과 컴피티션 범퍼 플레이트를 선택하는 기준", keyword: "트레이닝 컴피티션 범퍼 차이", intent: "범퍼 플레이트 등급 비교", problem: "제품 이름과 색상만 보면 두께, 중량 공차, 중심 구조, 반발, 바 적재량과 가격 차이가 시설에 실제로 필요한지 판단하기 어렵습니다.", method: "동일 중량의 치수와 측정값, 인서트, 사용 조건, 드롭 시험, 바 적재 폭과 중량별 구매 수량을 같은 표에서 비교합니다.", evidence: "모델 데이터, 승인 샘플, 중량·두께·홀 측정, 중심부 사진, 시험 조건, 포장과 재주문 기준이 필요합니다.", risk: "컴피티션 명칭을 공식 인증 또는 모든 사용 환경에서 더 긴 수명과 동일하게 이해하면 불필요한 비용과 잘못된 기대가 생깁니다.", outcome: "역도 구역, 기능성 트레이닝과 일반 헬스장에 필요한 수준을 나눠 예산과 바 적재 효율을 맞출 수 있습니다." }
};

const imageFallback: Record<string, string> = {
  "rubber-hex-dumbbell": "/assets/products/dumbbells/catalog-v2/hex-dumbbell-kg.webp",
  "rubber-round-dumbbell": "/assets/products/dumbbells/classic-rubber-round/classic-rubber-round-dumbbell-main.avif",
  "pu-dumbbell": "/assets/products/dumbbells/catalog-v2/pu-dumbbell-kg.webp",
  "cpu-dumbbell": "/assets/products/dumbbells/catalog-v2/cpu-dumbbell-kg.webp",
  "tpu-dumbbell": "/assets/products/dumbbells/catalog-v2/tpu-dumbbell-kg.webp",
  "cast-iron-dumbbell": "/assets/products/dumbbells/cast-iron/cast-iron-dumbbell-main.webp",
  "chrome-dumbbell": "/assets/products/dumbbells/chrome/chrome-dumbbell-main.avif",
  "rubber-bumper-plate": "/assets/products/weight-plates/catalog/rubber-bumper-plate.webp",
  "cpu-bumper-plate": "/assets/products/weight-plates/catalog/cpu-bumper-plate.webp",
  "rubber-olympic-plate": "/assets/products/weight-plates/catalog/rubber-olympic-plate.webp",
  "cast-iron-weight-plate": "/assets/products/weight-plates/cast-iron/cast-iron-weight-plate-main.avif",
  "cpu-grip-plate": "/assets/products/weight-plates/catalog/cpu-grip-plate.webp"
};

function base(version: Omit<LocalizedContentVersion, "locale" | "translationStatus" | "reviewStatus" | "publishStatus" | "canonicalData" | "hreflangData" | "updatedAt" | "publishedAt" | "version">): LocalizedContentVersion {
  return {
    ...version,
    locale: "ko",
    translationStatus: "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: publishedAt,
    publishedAt,
    version: 1
  };
}

function imagesFor(entity: ContentEntity, slug: string, label: string, type: "product" | "guide" | "core"): LocalizedImage[] {
  const product = productProfiles[entity.id];
  const source = product?.sourceImage ?? entity.versions.en?.images[0]?.src ?? imageFallback[entity.id] ?? "/assets/factory.webp";
  const support = entity.id === "projects"
    ? ["/assets/projects/project-hero-desktop.avif", "/assets/projects/commercial-dumbbell-rack-zone.avif", "/assets/projects/round-dumbbell-gym-zone.avif"]
    : type === "product"
    ? [source, entity.id.includes("plate") ? "/assets/factory-process/plate-surface-treatment.webp" : "/assets/dumbbell-production.webp", "/assets/factory-cases/packaging-area-pbf.webp"]
    : [source, "/assets/factory-process/dumbbell-material.webp", "/assets/factory-cases/container-shipping-pbf.webp"];
  return support.map((src, index) => ({
    id: `ko-image-${index + 1}`,
    src: koreanImagePath(src, slug, index),
    alt: index === 0 ? `${label} 실제 제품 또는 제조 현장` : index === 1 ? `${label} 생산 공정과 품질 확인` : `${label} 수출 포장과 출하 준비`,
    caption: index === 0 ? "PowerBaseFit가 보유한 실제 제품 또는 공장 이미지입니다." : index === 1 ? "주문 사양은 생산 단계의 확인 항목과 연결됩니다." : "포장과 식별은 무거운 피트니스 장비의 운송 품질에 직접 영향을 줍니다."
  }));
}

function commonFaq(subject: string) {
  return [
    { id: "faq-moq", question: `${subject}의 MOQ는 얼마인가요?`, answer: "MOQ는 모델, 중량별 수량, 소재, 색상, 로고와 포장에 따라 달라집니다. 필요한 SKU와 예상 수량을 보내면 표준 제품 최소 조건과 맞춤 제작 최소 조건을 분리해 확인합니다." },
    { id: "faq-sample", question: "양산 전에 샘플을 확인해야 하나요?", answer: "소재, 치수, 기능, 표면, 색상, 로고 또는 포장이 구매 결정에 영향을 준다면 샘플 승인을 권장합니다. 샘플 번호와 승인·수정 항목을 기록해야 양산 기준으로 사용할 수 있습니다." },
    { id: "faq-qc", question: "품질 검사는 어떤 단계에서 진행되나요?", answer: "주문별 검사 계획에 따라 입고 소재, 공정 중 주요 치수와 결합 상태, 완제품의 중량·기능·외관·표시, 그리고 포장과 수량을 확인합니다. 적용 항목과 샘플링은 발주 전에 합의합니다." },
    { id: "faq-oem", question: "한국 브랜드 로고와 포장을 적용할 수 있나요?", answer: "제품 구조와 주문량이 맞으면 로고, 중량 표기, 색상, 라벨과 카톤을 검토할 수 있습니다. 벡터 파일, 색상 기준, 위치, 방법과 내구성 요구를 샘플에서 승인합니다." },
    { id: "faq-quote", question: "정확한 견적을 받으려면 무엇을 보내야 하나요?", answer: "제품 또는 참고 모델, SKU별 수량, 사용 환경, 맞춤 범위, 포장 단위, 한국 도착지, 희망 Incoterm과 목표 일정을 보내 주세요. 미확정 항목은 질문으로 표시해 함께 정리할 수 있습니다." }
  ];
}

function coreVersion(entity: ContentEntity, profile: CoreProfile): LocalizedContentVersion {
  const slug = profile.path === "/ko" ? "home" : profile.path.split("/").filter(Boolean).slice(1).join("-");
  const images = imagesFor(entity, slug, profile.h1, "core");
  const body = [
    koAnswer("quick-answer", "핵심 안내", `${profile.keyword}를 찾는 한국 B2B 구매자는 제품 사진과 단가만 비교해서는 안 됩니다. ${profile.purpose} ${profile.decision}`),
    koDefinition("definition", profile.keyword, `${profile.keyword}는 최종 소비자에게 한 개 제품을 판매하는 검색이 아니라 제품 사양, 생산 능력, 품질 기준, MOQ, 맞춤 제작, 포장과 수입 조건을 함께 검토하는 기업 구매 주제입니다.`),
    koText("audience", "누구를 위한 정보인가", `${profile.audience}에게 필요한 정보로 구성했습니다. 구매자는 사용 환경과 판매 채널을 먼저 설명하고 제조사는 가능한 구성, 제한 조건, 확인 방법과 비용 발생 항목을 분리해 답해야 합니다.`, "헬스장 운영자는 공간과 사용 빈도, 유통사는 SKU와 재주문, 브랜드는 외관과 배치 일관성, 수입업체는 포장·서류·도착 원가를 우선합니다. 같은 제품이라도 의사결정 기준이 다르므로 요청서에 구매자 역할을 표시합니다."),
    koTable("decision-table", "B2B 구매 판단표", ["검토 영역", "확인할 질문", "필요한 근거"], [["제품", "어떤 환경에서 누가 사용하는가", "모델·소재·치수·중량 구성"], ["생산", "어떤 공정과 변경 위험이 있는가", "공정 흐름·샘플·변경 기록"], ["품질", "무엇을 어떤 방법으로 합격 처리하는가", "검사 기준·측정값·사진"], ["브랜드", "로고와 포장을 어떻게 재현하는가", "artwork·색상 기준·승인 샘플"], ["물류", "한국 도착까지 어떤 비용과 책임이 있는가", "카톤·팔레트·Incoterm·packing list"]]),
    koText("workflow", "견적에서 출하까지의 흐름", "첫 단계는 제품명보다 사용 목적, 중량 또는 치수 범위, 수량, 맞춤 제작, 도착지와 목표 일정을 정리하는 것입니다. 제조 가능 여부를 확인한 뒤 샘플의 목적과 승인 항목을 정하고, 승인된 버전을 발주서와 검사 계획에 연결합니다.", "양산 중에는 원자재와 주요 공정의 변동을 확인하고 완제품 검사에서 SKU, 중량, 치수, 기능, 외관, 로고와 포장을 점검합니다. 출하 전에는 카톤 수량, 팔레트, 총중량과 서류가 실제 화물과 일치하는지 확인합니다."),
    koText("local-market", "한국 구매자가 특히 확인할 항목", "한국어 라벨이나 카톤이 필요한지, kg 표기와 제품 코드가 판매·창고 시스템에 맞는지, 국내 설치 또는 조립 책임이 누구에게 있는지 정합니다. 사업자 수입과 제품별 적용 요건은 수입자가 최신 공식 자료와 전문 자문을 통해 확인해야 합니다.", "중국 공급사와 소통할 때는 모호한 '좋은 품질' 대신 허용 치수, 중량 공차, 외관 결함, 기능 시험과 포장 기준을 사용합니다. 모든 숫자에는 단위, 적용 SKU와 문서 버전을 표시합니다."),
    koChecklist("buyer-checklist", "구매 전 체크리스트", ["구매자 유형과 사용 환경을 설명했는가", "SKU별 수량과 단위를 구분했는가", "필수 사양과 선호 사양을 나눴는가", "샘플의 승인 목적과 책임자를 정했는가", "로고·색상·라벨 파일을 준비했는가", "검사 기준과 불합격 처리를 합의했는가", "카톤·팔레트·Incoterm을 확인했는가", "재주문 기준 자료를 보관할 계획이 있는가"]),
    koText("first-party", "PowerBaseFit의 제조 주문 관리 관점", "PowerBaseFit는 견적의 제품명과 양산품의 사양이 분리되지 않도록 SKU, 샘플, artwork, 검사와 포장 정보를 연결하는 방식을 사용합니다. 맞춤 요청은 가능 여부만 답하는 것이 아니라 MOQ, 추가 비용, 샘플과 납기에 미치는 영향을 함께 확인합니다.", "구매자가 비교 가능한 정보를 보내면 기술 검토도 빨라집니다. 미확정 항목은 임의로 채우기보다 질문 목록으로 남기고, 양산 시작 전에 적용 버전을 확인하는 것이 장기적인 공급 안정성에 유리합니다.")
  ];
  if (entity.id === "contact") body.push({ id: "inquiry-form", type: "custom", heading: "프로젝트 정보 보내기", content: "필수 연락처와 현재 확정된 프로젝트 정보를 입력해 주세요. 미확정 항목은 비워 두거나 메시지에 질문으로 남길 수 있습니다.", data: { component: "inquiry-form" } });
  return base({
    slug,
    publicPath: profile.path,
    title: profile.title,
    description: profile.description,
    h1: profile.h1,
    body,
    faq: commonFaq(profile.keyword),
    author: koreanEditorialAuthor,
    reviewedBy: koreanTechnicalReviewer,
    schemaData: {
      brand: "PowerBaseFit",
      manufacturer: "PowerBaseFit",
      category: "상업용 피트니스 장비 B2B",
      specifications: [{ name: "주요 검색 주제", value: profile.keyword }, { name: "대상", value: profile.audience }],
      breadcrumbs: profile.path === "/ko" ? [{ name: "홈", path: "/ko" }] : [{ name: "홈", path: "/ko" }, { name: profile.h1, path: profile.path }],
      extra: { primaryKeyword: profile.keyword, searchIntent: "상업 조사 및 견적 준비" }
    },
    images,
    internalLinks: [
      { targetContentId: "products-hub", label: "상업용 제품 살펴보기" },
      { targetContentId: "factory", label: "생산과 품질 관리 확인" },
      { targetContentId: "oem-private-label", label: "OEM·자체 브랜드 안내" },
      { targetContentId: "contact", label: "한국 B2B 견적 요청" }
    ]
  });
}

function productVersion(entity: ContentEntity, profile: ProductProfile): LocalizedContentVersion {
  const path = `/ko/products/${profile.slug}`;
  const images = imagesFor(entity, profile.slug.replaceAll("/", "-"), profile.name, "product");
  const sourceSpecs = entity.versions.en?.schemaData.specifications ?? [];
  const specs = sourceSpecs.length ? sourceSpecs.map((item) => ({ name: item.name, value: item.value })) : [
    { name: "제품", value: profile.name }, { name: "구성 범위", value: profile.range }, { name: "소재", value: profile.material }
  ];
  const body = [
    koAnswer("quick-answer", "빠른 답변", `${profile.name}은 ${profile.use}에 적합하도록 검토하는 상업용 제품입니다. 핵심은 제품명보다 ${profile.decision} 한국 B2B 주문에서는 중량 또는 치수 구성, 수량, 로고, 포장과 검사 기준을 같은 사양서에 연결해야 합니다.`),
    koDefinition("definition", profile.name, `${profile.name}은 ${profile.material} 주요 사용자는 ${profile.buyer}입니다. 실제 공급 사양은 승인된 견적서, 샘플과 발주 문서에 표시된 모델을 기준으로 합니다.`),
    koText("positioning", "제품 포지셔닝과 사용 환경", `${profile.use}에서 장비는 여러 사용자가 반복적으로 취급하므로 외관만으로는 적합성을 판단할 수 없습니다. 사용 빈도, 바닥과 랙, 주변 장비, 청소 방식, 사용자의 숙련도와 운영자의 교체 계획을 함께 확인해야 합니다.`, `${profile.buyer}라면 첫 주문의 단가뿐 아니라 SKU별 회전, 세트 완성도, 예비 수량과 재주문 시 동일한 외관을 유지할 수 있는지도 평가해야 합니다. 샘플은 실제 사용 환경과 가까운 조건에서 확인합니다.`),
    koText("material", "소재와 구조를 확인하는 방법", profile.material, `소재 이름이 같아도 등급, 두께, 경도, 표면 처리, 내부 구조와 공정 조건은 다를 수 있습니다. 공급업체에게 소재명만 묻지 말고 적용 부위, 목적, 확인 방법과 변경 가능성을 질문합니다. ${profile.compare}`, "제품 사양서에는 보이는 표면과 내부 핵심 부품을 구분해 기록합니다. 재질 변경, 색상 변경, 금형 수정 또는 부품 공급사 변경이 있을 때 구매자에게 언제 통지하는지도 확인합니다."),
    koTable("specifications", "기술 사양 확인표", ["항목", "현재 확인 내용", "발주 전 확인"], [["제품", profile.name, "모델 코드와 도면 버전"], ["구성 범위", profile.range, "SKU별 수량과 표시 단위"], ["소재", profile.material, "적용 부위와 승인 샘플"], ["사용 환경", profile.use, "바닥·랙·장비 호환"], ["맞춤 제작", profile.customization, "MOQ·비용·샘플·납기"]], "표의 값은 제품군 안내이며 최종 주문 사양은 서면 견적과 승인 자료를 기준으로 합니다."),
    koText("manufacturing", "제조 공정에서 확인할 지점", profile.process, "공정의 이름보다 각 단계에서 어떤 특성이 결정되는지 확인하는 것이 중요합니다. 원자재와 부품의 입고 상태, 첫 제품 확인, 공정 중 측정, 표면 마감과 조립 후 기능을 주문 사양의 항목과 연결합니다.", "PowerBaseFit의 제조 주문 검토에서는 제품 코드와 샘플 버전이 생산 지시, 검사표와 포장 표시에서 일치하는지 확인합니다. 생산 중 변경이 필요하면 적용 수량, 기능·외관 영향과 재확인 방법을 양산 계속 전에 정리해야 합니다."),
    koText("quality", "품질 검사와 합격 기준", profile.qc, "검사 계획에는 대상 SKU, 샘플 수, 측정 도구, 허용 범위, 외관 조건과 불합격 처리 방법이 포함되어야 합니다. 사진은 제품 코드와 측정값을 함께 보여 줄 때 판단 근거가 됩니다.", "완제품 검사만으로 모든 공정 문제를 되돌릴 수는 없습니다. 첫 제품과 공정 중 검사는 큰 편차를 조기에 막고, 출하 전 검사는 완료된 로트의 수량·품질·포장을 확인합니다. 세 단계의 목적을 구분합니다."),
    koTable("comparison", "구매 비교표", ["비교 기준", profile.name, "대안 검토 질문"], [["사용 목적", profile.use, "낙하·이동·조절 등 실제 행동은 무엇인가"], ["핵심 판단", profile.decision, "샘플에서 어떤 차이를 볼 것인가"], ["소재", profile.material, "동일 명칭의 실제 등급이 같은가"], ["운영", profile.compare, "청소·보관·교체 부담은 어떤가"], ["공급", "MOQ와 리드타임은 구성별 확인", "재주문 시 같은 버전을 유지할 수 있는가"]]),
    koText("weight-size", "중량·치수와 세트 구성", `안내 가능한 구성 범위는 ${profile.range}입니다. 그러나 구매자는 전체 범위가 아니라 실제 판매 또는 운영에 필요한 SKU와 수량을 결정해야 합니다. 각 숫자에는 kg 또는 lb, 제품 한 개 또는 한 쌍, 포장 단위를 표시합니다.`, "가벼운 구간은 동시 사용자가 많아 중복 수량이 필요할 수 있고, 무거운 구간은 사용 빈도보다 전문성·브랜드 포지셔닝이 중요할 수 있습니다. 제품 치수는 랙, 바, 통로와 카톤에 영향을 주므로 중량표와 별도로 관리합니다."),
    koText("packaging", "포장, 운송과 한국 도착 준비", profile.packaging, "카톤 하나의 순중량과 총중량, 제품 수량, 치수, 취급 방향과 중량 라벨을 확인합니다. 팔레트는 단순히 카톤을 모으는 것이 아니라 하중 집중, 적층 높이, 밴딩, 모서리 보호와 지게차 작업을 고려해야 합니다.", "상업송장과 packing list의 SKU·수량·중량이 실제 화물과 맞아야 합니다. 한국 수입자가 필요한 분류, 표시와 적용 요건을 확인하고 제조사는 요청된 제품·포장 자료를 정확한 버전으로 제공해야 합니다."),
    koText("oem", "OEM·ODM과 브랜드 맞춤", profile.customization, "로고 적용 방법은 표면과 형상에 따라 달라집니다. 벡터 artwork, 크기, 위치, 색상, 읽는 방향, 내구성 요구와 승인 방법을 정하고, 제품 사진뿐 아니라 실제 샘플에서 확인합니다.", "신규 금형이나 복잡한 색상은 표준 로고보다 MOQ, 비용과 일정에 더 큰 영향을 줄 수 있습니다. 표준 제품에 브랜드를 적용하는 OEM과 구조를 변경하는 개발 업무를 구분해 견적을 요청하면 책임과 일정이 명확해집니다."),
    koText("procurement", "B2B 견적과 공급업체 비교", `견적 요청서에는 ${profile.keyword}, SKU별 수량, ${profile.range}, 사용 환경, 맞춤 항목, 포장, 한국 도착지와 목표 일정을 넣습니다. 공급업체가 각 항목에 대해 충족, 대안 또는 확인 필요로 답하도록 하면 숨은 차이를 찾기 쉽습니다.`, "단가를 비교할 때는 샘플, 금형, 로고, 개별 포장, 카톤, 팔레트, 검사와 운송 범위가 포함되어 있는지 확인합니다. 통화, 견적 유효기간, Incoterm과 지정 장소가 다르면 같은 조건으로 환산한 뒤 판단합니다."),
    koChecklist("checklist", `${profile.name} 구매 체크리스트`, ["사용 환경과 목표 고객을 정의했다", "SKU별 중량·치수·수량을 표로 만들었다", "소재와 내부 구조를 구분했다", "승인 샘플의 목적을 정했다", "중량·치수·기능·외관 검사 기준이 있다", "로고·색상·포장 artwork 버전을 관리한다", "카톤과 팔레트 중량을 확인했다", "Incoterm과 한국 도착지를 표시했다", "변경 통지와 재주문 기준을 합의했다", "불합격 로트의 처리 절차를 정했다"]),
    koText("experience", "제조 현장에서 자주 발견되는 정보 누락", `PowerBaseFit가 ${profile.name} 문의를 검토할 때 가장 먼저 확인하는 것은 제품 이름보다 구성과 용도입니다. kg와 lb, 한 개와 한 쌍, 표준 색상과 지정 색상, 일반 포장과 브랜드 포장이 섞이면 가격과 수량이 달라질 수 있습니다.`, "샘플 승인 후에도 artwork, 표면, 중량표 또는 카톤이 변경되면 새 버전으로 관리해야 합니다. 첫 주문의 검사 자료와 기준 샘플을 보관하면 후속 로트에서 발생하는 작은 변화를 더 빠르게 확인할 수 있습니다.")
  ];
  return base({
    slug: profile.slug.split("/").at(-1) ?? profile.slug,
    publicPath: path,
    title: `${profile.name} 제조·도매 공급 | PowerBaseFit`,
    description: `${profile.keyword}: ${profile.range}, 소재, 제조 공정, QC, 수출 포장, OEM 로고와 한국 B2B 견적 준비 방법을 확인하세요.`,
    h1: `${profile.name} 상업용 B2B 공급`,
    body,
    faq: commonFaq(profile.name),
    author: koreanEditorialAuthor,
    reviewedBy: koreanTechnicalReviewer,
    schemaData: {
      sku: entity.versions.en?.schemaData.sku ?? `PBF-${entity.id.replace(/[^a-z0-9]+/gi, "-").toUpperCase()}`,
      brand: "PowerBaseFit",
      manufacturer: "PowerBaseFit",
      material: profile.material,
      category: profile.slug.split("/")[0] === "dumbbells" ? "상업용 덤벨" : profile.slug.split("/")[0] === "weight-plates" ? "웨이트 원판" : profile.slug.split("/")[0] === "racks-benches" ? "랙 및 벤치" : "피트니스 액세서리",
      specifications: specs,
      breadcrumbs: [{ name: "홈", path: "/ko" }, { name: "제품", path: "/ko/products" }, { name: profile.name, path }],
      extra: { primaryKeyword: profile.keyword, searchIntent: "상업용 제품 평가 및 견적 요청" }
    },
    images,
    internalLinks: [
      { targetContentId: profile.slug.startsWith("dumbbells/") ? "dumbbells-category" : profile.slug.startsWith("weight-plates/") ? "weight-plates-category" : profile.slug.startsWith("racks-benches/") ? "racks-benches-category" : "gym-accessories-category", label: "관련 제품군 비교" },
      { targetContentId: "factory", label: "생산 및 품질 관리" },
      { targetContentId: "oem-private-label", label: "OEM·브랜드 맞춤 제작" },
      { targetContentId: "contact", label: "한국 B2B 견적 문의" }
    ]
  });
}

function guideVersion(entity: ContentEntity, profile: GuideProfile): LocalizedContentVersion {
  const path = `/ko/blog/${profile.slug}`;
  const images = imagesFor(entity, profile.slug, profile.h1, "guide");
  const body = [
    koAnswer("quick-answer", "빠른 답변", `${profile.keyword}의 핵심은 하나의 공급업체 주장이나 최저 가격을 찾는 것이 아니라 같은 요구사항에 대해 비교 가능한 근거를 모으는 것입니다. ${profile.method} 그 결과 ${profile.outcome}`),
    koDefinition("definition", profile.keyword, `${profile.keyword}는 ${profile.intent} 단계에서 제품, 공급자, 품질, 비용과 책임을 문서화하는 B2B 구매 업무입니다. 검색 정보는 출발점이며 최종 결정은 해당 제품과 주문 버전에 연결된 자료를 기준으로 합니다.`),
    koText("problem", "왜 이 문제가 중요한가", profile.problem, "한국 구매자는 최종 판매와 국내 운영에 대한 책임을 고려해야 하므로 제조사의 가능하다는 답변을 제품 사양, 확인 방법, 제출 자료와 일정으로 바꿔야 합니다. 확인되지 않은 내용은 사실처럼 채우지 말고 질문과 가정으로 구분합니다.", `가장 큰 위험은 ${profile.risk} 이 문제는 주문이 작을 때 보이지 않다가 양산, 선적 또는 재주문에서 비용과 일정 문제로 나타날 수 있습니다.`),
    koTable("decision-map", "의사결정 구조", ["단계", "핵심 질문", "기록할 결과"], [["요구 정의", "누가 어디서 무엇을 사용하는가", "사용 환경·SKU·수량"], ["공급 검증", "누가 어떤 공정을 통제하는가", "담당자·공정·외주 범위"], ["샘플", "무엇을 승인하는가", "버전·측정값·수정 항목"], ["양산 QC", "어떤 편차를 허용하는가", "방법·샘플링·한계"], ["출하", "무엇이 선적 승인을 결정하는가", "검사·포장·서류·책임"]]),
    koText("method", "실행 방법", profile.method, "먼저 필수 조건, 선호 조건과 아직 결정되지 않은 항목을 나눕니다. 같은 RFQ를 후보 공급사에 보내고 각 줄에 충족, 대안 또는 질문으로 답하게 합니다. 구두 합의는 회의 후 문서에 반영하고 적용 버전을 표시합니다.", "제품별로 가장 위험한 한 항목을 선택해 샘플 또는 공정 자료로 검증합니다. 같은 제품군이라는 이유로 다른 SKU의 시험 결과를 그대로 적용하지 말고 소재, 금형, 부품과 공정이 실제로 같은지 확인합니다."),
    koText("korea", "한국 시장과 수입 업무에서의 적용", "사업자 수입은 개인의 해외 구매와 다르게 제품 분류, 신고, 세금, 표시, 안전 또는 기타 적용 요건을 검토해야 할 수 있습니다. 구체적인 의무는 제품과 거래 구조에 따라 달라지므로 한국의 최신 공식 정보와 통관·규제 전문가를 통해 수입자가 확인합니다.", "제조사는 상업송장, packing list, 제품 사양, 원산지 관련 정보와 구매자가 요청한 시험·표시 자료를 정확한 제품 버전으로 제공해야 합니다. 자료의 존재만 보지 말고 모델명, 날짜와 적용 범위가 실제 주문과 맞는지 확인합니다."),
    koText("evidence", "요청해야 할 근거", profile.evidence, "자료를 받을 때는 최신성, 적용 제품, 작성자와 원본 위치를 확인합니다. 일반 공장 소개 자료와 해당 주문의 증거를 구분하고, 숫자에는 단위와 측정 조건을 붙입니다.", "사진은 유용하지만 단독으로는 공정 안정성이나 합격 여부를 증명하지 않습니다. 제품 코드, 샘플 번호, 계측값, 검사 기준과 날짜가 함께 있을 때 구매 결정과 재주문 비교에 사용할 수 있습니다."),
    koTable("supplier-comparison", "공급업체 비교표", ["항목", "공급업체 A/B에 동일하게 질문", "판단 기준"], [["제품", "적용 모델과 표준·맞춤 범위", "요구사항과의 일치"], ["생산", "내부 공정과 외주 공정", "통제 책임과 변경 통지"], ["품질", "검사 단계·도구·샘플링", "재현 가능한 합격 기준"], ["거래", "MOQ·단가·일회성 비용", "같은 범위의 총비용"], ["물류", "포장·Incoterm·리드타임", "한국 도착까지의 책임"]]),
    koText("sample", "샘플 승인 설계", "샘플을 단순히 예쁘거나 사용 가능한 제품으로 평가하지 않습니다. 소재, 치수, 중량, 기능, 표면, 색상, 로고, 라벨과 포장 중 무엇을 승인하는지 목록을 만들고 각 결과를 합격, 수정 또는 추가 확인으로 기록합니다.", "승인된 샘플이 양산과 완전히 같은 공정인지, 금형·소재·색상이 동일한지 확인합니다. 조건부 승인은 수정 완료를 확인할 책임자와 방법이 있어야 하며, 샘플 번호와 사진을 발주 문서에 연결합니다."),
    koText("quality", "품질 계획과 불합격 처리", "검사 기준은 양산 완료 후에 만드는 것이 아니라 견적과 샘플 단계에서 시작합니다. 요구 항목, 방법, 도구, 샘플 수, 허용 범위, 증거와 승인자를 정하고 치명·중·경미 결함의 의미를 제품 사용과 계약에 맞춥니다.", "결과가 기준을 벗어나면 격리, 전수 선별, 재작업, 교체 또는 재검사 중 어떤 조치를 취할지 정합니다. 보고서에는 제품 코드, 로트, 검사 수량과 결론의 이유가 있어야 현장에 없던 사람도 판단을 재현할 수 있습니다."),
    koText("cost", "가격과 도착 원가 비교", "제품 단가, 맞춤 비용, 샘플·금형, 개별 포장, 카톤, 팔레트, 검사, 국제 운송, 보험, 통관, 세금, 국내 운송, 창고와 예상 손상 비용을 분리합니다. 확정값과 추정값을 구분하고 환율과 유효기간을 표시합니다.", "SKU별 순중량, 총중량과 부피가 운송 방식과 컨테이너 활용률에 미치는 영향을 계산합니다. 낮은 단가가 더 무거운 포장, 낮은 적재 효율 또는 높은 불량 위험 때문에 도착 원가에서 불리할 수 있습니다."),
    koText("packaging", "포장과 선적 준비", "덤벨과 원판처럼 밀도가 높은 제품은 작은 카톤에도 큰 하중이 걸립니다. 내부 분리, 카톤 바닥, 테이프·밴딩, 모서리, 팔레트 적층과 컨테이너 고정을 실제 총중량에 맞춰 검토합니다.", "packing list는 카톤 번호, SKU, 수량, 순중량·총중량과 치수를 반영해야 합니다. 무작위 카톤을 열어 내용과 라벨을 대조하고 팔레트 사진이 촬영된 시점과 선적 상태가 같은지 확인합니다."),
    koText("first-party", "제조 현장에서 얻은 실무 관점", `PowerBaseFit가 ${profile.keyword} 관련 문의를 검토할 때 반복되는 문제는 큰 기술 부족보다 작은 정보 불일치입니다. kg와 lb, 한 개와 한 쌍, 표준 색상과 지정 색상, 로고 포함 여부, 카톤 단위가 문서마다 다르면 자재와 견적이 잘못 연결될 수 있습니다.`, "따라서 영업 답변, 기술 확인, 샘플, PO, QC와 packing list가 같은 제품 코드와 버전을 사용하도록 관리합니다. 변경은 숨기지 않고 기능·외관·비용·납기에 미치는 영향을 확인한 뒤 승인 여부를 기록합니다."),
    koChecklist("checklist", "구매자 체크리스트", ["목표 고객과 사용 환경을 한 문장으로 정의한다", "SKU별 요구사항·수량·단위를 표로 만든다", "필수와 선호 조건을 구분한다", "공급사의 내부·외주 공정 범위를 확인한다", "샘플의 승인 항목과 버전을 기록한다", "검사 방법·샘플링·한계를 합의한다", "로고와 포장 artwork를 제품 코드에 연결한다", "가격에 포함·제외된 범위를 확인한다", "카톤·팔레트·Incoterm을 비교한다", "변경 통지와 재주문 자료를 보관한다"]),
    koText("questions", "공급업체에 보낼 질문", `${profile.keyword}에 필요한 정보 중 아직 미확정인 것은 무엇인지, 표준 구성과 맞춤 구성은 어디서 나뉘는지, 가격과 리드타임이 어떤 가정을 바탕으로 하는지 질문합니다. 기술 답변의 담당자와 이를 확인할 수 있는 자료도 요청합니다.`, "샘플, 자재 구매, 양산, 출하 전 검사와 선적의 각 단계에서 누가 시작을 승인하는지 정합니다. 빠른 '가능' 답변보다 조건, 예외와 중단 기준이 있는 답변이 실제 프로젝트 관리에 유용합니다."),
    koText("scenario", "낮음·기준·높음 시나리오", "수량, 운임, 환율, 판매 속도 또는 불량·손상률 중 가장 불확실한 변수를 골라 세 가지 시나리오로 계산합니다. 계산 과정을 보여 주고 어떤 값이 공급사 확인, 운송사 견적 또는 구매자의 추정인지 표시합니다.", "결론이 작은 변화에도 뒤집힌다면 단일 숫자로 결정하지 말고 추가 샘플, 더 명확한 포장 데이터 또는 단계적 주문으로 불확실성을 줄입니다. 안정적인 결정은 가장 낙관적인 값보다 변화에 견디는 구조를 가집니다."),
    koText("topic-deep-dive", `${profile.intent}을 위한 심층 검토`, `${profile.problem} 이 문장을 실제 프로젝트의 문제 정의로 사용하려면 제품명, 담당 부서, 목표 날짜와 현재 알고 있는 사실을 추가합니다. 그 다음 ${profile.method} 각 단계가 끝날 때 얻어야 하는 산출물과 다음 결정을 명시하면 자료 수집이 목적 없이 길어지는 것을 막을 수 있습니다.`, `${profile.evidence} 이 근거들은 한 번에 모두 받을 필요는 없지만, 가격 확정 전·샘플 승인 전·양산 전·선적 전 중 언제 필요한지 정해야 합니다. 공급업체가 자료를 제공하지 못한다면 단순 감점보다 그 자료가 없을 때 생기는 위험, 대체 확인 방법과 구매자가 감수할 범위를 기록합니다.`, `${profile.risk} 따라서 반대 가정도 시험합니다. 공급사가 설명한 조건이 달라졌을 때 기능, 외관, 비용, 일정 또는 국내 판매에 어떤 영향이 있는지 묻고, 영향이 큰 항목에는 서면 변경 승인과 재검사를 요구합니다.`),
    koText("implementation-plan", "30일 실행 계획과 책임 배분", `첫 주에는 ${profile.keyword}와 관련된 기존 자료를 모아 사실, 추정, 미확정 질문으로 나눕니다. 구매 담당자는 SKU와 수량, 영업 담당자는 고객·가격대, 기술 담당자는 사양, 물류 담당자는 카톤·운송, 품질 담당자는 검사 기준을 작성합니다. 한 사람이 모든 칸을 임의로 채우지 않습니다.`, "둘째 주에는 동일한 RFQ를 후보 공급사에 보내고 답변의 완전성보다 일관성을 확인합니다. 셋째 주에는 가장 중요한 차이를 샘플, 영상 회의, 측정 자료 또는 제3자 검사 계획으로 검증합니다. 넷째 주에는 제품 범위, 비용, 리드타임과 남은 위험을 한 페이지에 정리해 진행·수정·중단을 결정합니다.", `${profile.outcome} 결정 후에는 근거와 적용 버전을 주문 폴더에 보관합니다. 담당자가 바뀌어도 왜 이 공급사와 사양을 선택했는지 설명할 수 있어야 하며, 다음 주문에서는 첫 프로젝트의 가정과 실제 결과를 비교해 체크리스트를 업데이트합니다.`),
    koText("reorder", "재주문과 배치 일관성", "승인 사양, 샘플, artwork, 검사 보고서, 포장 지시와 첫 로트의 실제 측정값을 보관합니다. 판매 후 발견된 손상, 조립 시간, 표면 변화, 회원 피드백과 교체 사유를 SKU와 배치에 연결합니다.", "재주문 전에 소재, 금형, 부품, 색상, 외주 공정과 포장이 변경되었는지 확인합니다. 새 로트의 첫 제품을 허용 범위뿐 아니라 이전 로트 데이터와도 비교하면 허용 범위 안에서 진행되는 장기적인 변화를 발견할 수 있습니다."),
    koText("conclusion", "실행 결론", `${profile.outcome} 이를 위해 오늘 할 일은 요구사항 표를 만들고 가장 큰 미확정 위험 세 가지를 질문으로 바꾸는 것입니다. 모든 문제를 한 번에 해결하려 하지 말고 다음 의사결정을 내리는 데 필요한 증거부터 요청합니다.`, "PowerBaseFit에 문의할 때 제품 또는 참고 링크, SKU별 수량, 사용 환경, 맞춤 범위, 한국 도착지와 일정을 보내면 제조 가능성, 샘플, MOQ, QC와 포장에 영향을 주는 항목을 구분해 검토할 수 있습니다.")
  ];
  return base({
    slug: profile.slug,
    publicPath: path,
    title: `${profile.title} | PowerBaseFit B2B 가이드`,
    description: `${profile.keyword} 실무 가이드: 비교표, 샘플, 품질 검사, 포장, 비용, 공급업체 질문과 한국 B2B 구매 체크리스트를 확인하세요.`,
    h1: profile.h1,
    body,
    faq: [
      { id: "faq-start", question: `${profile.keyword}에서 가장 먼저 할 일은 무엇인가요?`, answer: "구매 목적, 사용자, 환경, SKU와 수량을 정의하고 필수 조건과 아직 미확정인 조건을 구분하는 것입니다. 그 다음 동일한 요구사항으로 후보 공급사에 질문해야 합니다." },
      { id: "faq-proof", question: "공급업체의 답변은 어떻게 검증하나요?", answer: "해당 제품 코드와 주문 버전에 연결된 샘플, 공정 자료, 측정값, 검사 보고서와 포장 자료를 요청합니다. 일반 소개 자료와 실제 주문의 근거를 구분합니다." },
      { id: "faq-sample", question: "샘플 하나로 양산 품질을 판단할 수 있나요?", answer: "샘플은 기준 버전과 설계 적합성을 확인하지만 양산 전체를 보장하지는 않습니다. 첫 제품, 공정 중 확인과 출하 전 로트 검사가 함께 필요합니다." },
      { id: "faq-price", question: "가장 낮은 단가의 공급업체를 선택해도 되나요?", answer: "같은 제품 사양, 맞춤 범위, 검사, 포장과 Incoterm인지 먼저 맞춰야 합니다. 누락 비용과 도착 원가, 공급 안정성을 포함해야 실질적인 비교가 됩니다." },
      { id: "faq-korea", question: "한국 수입 요건은 제조사가 확인하나요?", answer: "제조사는 요청 자료를 제공하지만 한국 내 수입·판매에 적용되는 의무의 확인 책임은 수입자와 관련 사업자에게 있습니다. 제품별 최신 공식 정보와 전문 자문을 확인하세요." }
    ],
    author: koreanEditorialAuthor,
    reviewedBy: koreanTechnicalReviewer,
    schemaData: {
      brand: "PowerBaseFit",
      manufacturer: "PowerBaseFit",
      category: "피트니스 장비 B2B 구매 가이드",
      specifications: [{ name: "주제", value: profile.keyword }, { name: "검색 의도", value: profile.intent }],
      breadcrumbs: [{ name: "홈", path: "/ko" }, { name: "구매 가이드", path: "/ko/blog" }, { name: profile.h1, path }],
      extra: { primaryKeyword: profile.keyword, searchIntent: profile.intent }
    },
    images,
    internalLinks: [
      { targetContentId: "products-hub", label: "상업용 제품 확인" },
      { targetContentId: "factory", label: "공장과 품질 관리" },
      { targetContentId: "oem-private-label", label: "OEM·자체 브랜드 제작" },
      { targetContentId: "contact", label: "프로젝트 견적 문의" }
    ]
  });
}

function versionFor(entity: ContentEntity): LocalizedContentVersion | undefined {
  const core = coreProfiles[entity.id];
  if (core) return coreVersion(entity, core);
  const product = productProfiles[entity.id];
  if (product) return productVersion(entity, product);
  const guide = guideProfiles[entity.id];
  if (guide) return guideVersion(entity, guide);
  return undefined;
}

export function withKoreanLocalization(manifest: ContentManifest): ContentManifest {
  const entities = manifest.entities.map((entity) => {
    const version = versionFor(entity);
    if (!version) return entity;
    if (entity.versions.ko) throw new Error(`Korean localization duplicates ${entity.id}`);
    return { ...entity, versions: { ...entity.versions, ko: version } };
  });
  return { ...manifest, entities };
}
