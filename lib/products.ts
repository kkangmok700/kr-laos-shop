export type Product = {
  id: string;
  name: { ko: string; lo: string };
  brand: string;
  category: "skincare" | "makeup" | "mask" | "perfume" | "haircare" | "bodycare";
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  badge?: "sale" | "new" | "best";
  description: { ko: string; lo: string };
  options?: { ko: string; lo: string }[];
};

export const products: Product[] = [
  {
    id: "p1",
    name: { ko: "글로우 비타민 세럼 30ml", lo: "ເຊຣັມວິຕາມິນ Glow 30ml" },
    brand: "SEOUL LAB",
    category: "skincare",
    price: 32000,
    originalPrice: 45000,
    image:
      "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=800&q=80",
    badge: "best",
    description: {
      ko: "비타민 C 20% 함유, 광채 피부를 위한 데일리 세럼",
      lo: "ມີວິຕາມິນ C 20% ສຳລັບຜິວສົດໃສປະຈຳວັນ",
    },
    options: [
      { ko: "단품 30ml", lo: "ດຽວ 30ml" },
      { ko: "리필 50ml", lo: "ຣີຟິວ 50ml" },
    ],
  },
  {
    id: "p2",
    name: { ko: "데일리 수분 크림 80ml", lo: "ຄຣີມຄວາມຊຸ່ມ Daily 80ml" },
    brand: "HANBOM",
    category: "skincare",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    badge: "new",
    description: {
      ko: "건조한 피부를 위한 24시간 보습 크림",
      lo: "ຄຣີມຮັກສາຄວາມຊຸ່ມ 24 ຊົ່ວໂມງ ສຳລັບຜິວແຫ້ງ",
    },
  },
  {
    id: "p3",
    name: { ko: "벨벳 매트 립스틱", lo: "ລິບສະຕິກ Velvet Matte" },
    brand: "ROUGE K",
    category: "makeup",
    price: 18000,
    originalPrice: 24000,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    badge: "sale",
    description: {
      ko: "발색력 좋고 가벼운 텍스처의 매트 립스틱",
      lo: "ລິບສະຕິກ Matte ສີສົດໃສ ນ້ຳໜັກເບົາ",
    },
    options: [
      { ko: "01 Rose", lo: "01 ສີຊົມພູ" },
      { ko: "02 Coral", lo: "02 ສີຄໍຣອລ" },
      { ko: "03 Brick", lo: "03 ສີອິດ" },
    ],
  },
  {
    id: "p4",
    name: { ko: "프레쉬 마스크팩 10매", lo: "ມາສ໌ສ໌ Fresh 10 ແຜ່ນ" },
    brand: "DEW",
    category: "mask",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    badge: "best",
    description: {
      ko: "녹차 추출물 함유, 진정 효과 마스크팩",
      lo: "ມາສ໌ສ໌ສະກັດຊາຂຽວ ຊ່ວຍສະຫງົບຜິວ",
    },
  },
  {
    id: "p5",
    name: { ko: "쿠션 파운데이션", lo: "ຄຸດຊັນ Foundation" },
    brand: "POREFIT",
    category: "makeup",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1599733589046-833caccbbd03?w=800&q=80",
    description: {
      ko: "SPF50+ 자외선 차단 쿠션 파운데이션",
      lo: "ຄຸດຊັນ Foundation ກັນແດດ SPF50+",
    },
    options: [
      { ko: "21호 Light", lo: "21 Light" },
      { ko: "23호 Natural", lo: "23 Natural" },
    ],
  },
  {
    id: "p6",
    name: { ko: "플로럴 오 드 퍼퓸 50ml", lo: "ນ້ຳຫອມ Floral 50ml" },
    brand: "BLOOM",
    category: "perfume",
    price: 65000,
    originalPrice: 80000,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
    badge: "sale",
    description: {
      ko: "장미와 자스민 향이 어우러진 우아한 향수",
      lo: "ນ້ຳຫອມຫລູຫລາ ກິ່ນກຸຫລາບ ແລະ ມະລິ",
    },
  },
  {
    id: "p7",
    name: { ko: "케라틴 헤어 에센스", lo: "ເອສເຊັນບຳລຸງຜົມ Keratin" },
    brand: "HAIRO",
    category: "haircare",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?w=800&q=80",
    description: {
      ko: "손상모 집중 케어 헤어 에센스",
      lo: "ເອສເຊັນບຳລຸງຜົມເສຍຫາຍແບບເຂັ້ມຂຸ້ນ",
    },
  },
  {
    id: "p8",
    name: { ko: "바디 모이스처 로션 300ml", lo: "ໂລຊັນຮ່າງກາຍ 300ml" },
    brand: "SOFTBODY",
    category: "bodycare",
    price: 19000,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    badge: "new",
    description: {
      ko: "시어버터 함유 데일리 바디 로션",
      lo: "ໂລຊັນຮ່າງກາຍປະຈຳວັນ ມີ Shea Butter",
    },
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
