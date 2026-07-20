import { dumbbellProducts } from "../../app/products/dumbbells/productData";
import { weightPlateProducts } from "../../app/products/weight-plates/productData";
import { racksBenchesProducts } from "../../app/products/racks-benches/productData";
import { gymAccessoryProducts } from "../../app/products/gym-accessories/productData";
import type { LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { viAnswer, viChecklist, viDefinition, vietnameseEditorialAuthor, vietnameseImagePath, vietnameseTechnicalReviewer, viTable, viText } from "./vi-content-helpers";

type ProductSource = { slug: string; name: string; range: string; type: string; image: string; gallery?: string[] };
type CategoryKey = "dumbbells" | "plates" | "racks" | "accessories";
export type VietnameseProductProfile = { source: ProductSource; category: CategoryKey; viSlug: string; name: string; keyword: string; index: number };
type Entry = [string, string, string, string];

const dumbbells: Entry[] = [
  ["twelve-sided-steel-dumbbell","ta-tay-thep-muoi-hai-canh","Tạ tay thép mười hai cạnh","nhà sản xuất tạ tay thép chuyên nghiệp"],
  ["cast-iron-dumbbell","ta-tay-gang","Tạ tay gang","tạ tay gang bán buôn"],
  ["chrome-dumbbell","ta-tay-ma-crom","Tạ tay mạ crôm","nhà sản xuất tạ tay mạ crôm"],
  ["classic-rubber-round-dumbbell","ta-tay-tron-boc-cao-su","Tạ tay tròn bọc cao su","nhà cung cấp tạ tay tròn cao su"],
  ["cpu-dumbbell-kg","ta-tay-cpu","Tạ tay CPU","nhà sản xuất tạ tay CPU"],
  ["cpu-square-dumbbell-kg","ta-tay-cpu-vuong","Tạ tay CPU vuông","tạ tay CPU vuông bán buôn"],
  ["adjustable-dumbbell-kg","ta-tay-dieu-chinh","Tạ tay điều chỉnh","nhà cung cấp tạ tay điều chỉnh"],
  ["cpu-heavy-dumbbell-kg","ta-tay-cpu-hang-nang","Tạ tay CPU hạng nặng","tạ tay hạng nặng cho phòng gym"],
  ["hex-dumbbell-kg","ta-tay-luc-giac-boc-cao-su","Tạ tay lục giác bọc cao su","nhà sản xuất tạ tay lục giác cao su"],
  ["neoprene-dumbbell-kg","ta-tay-boc-neoprene","Tạ tay bọc neoprene","tạ tay neoprene bán buôn"],
  ["pu-dumbbell-kg","ta-tay-polyurethane","Tạ tay polyurethane","nhà sản xuất tạ tay PU"],
  ["sus304-dumbbell-kg","ta-tay-inox-sus304","Tạ tay inox SUS304","nhà sản xuất tạ tay inox"],
  ["tpu-dumbbell-kg","ta-tay-tpu","Tạ tay TPU","nhà sản xuất tạ tay TPU"],
  ["tpu-round-dumbbell-kg","ta-tay-tpu-tron","Tạ tay TPU tròn","tạ tay TPU tròn bán buôn"],
  ["tpu-small-dumbbell-kg","ta-tay-tpu-nho","Tạ tay TPU cỡ nhỏ","tạ tay TPU nhẹ bán buôn"],
  ["selectorized-adjustable-dumbbell-kg","ta-tay-dieu-chinh-nut-chon","Tạ tay điều chỉnh bằng nút chọn","nhà cung cấp tạ tay điều chỉnh selector"],
  ["cpu-hexagonal-dumbbell-kg","ta-tay-luc-giac-cpu","Tạ tay lục giác CPU","nhà sản xuất tạ tay lục giác CPU"],
  ["cpu-compact-dumbbell","ta-tay-cpu-nho-gon","Tạ tay CPU nhỏ gọn","tạ tay CPU nhỏ gọn"],
  ["cpu-twelve-sided-dumbbell","ta-tay-cpu-muoi-hai-canh","Tạ tay CPU mười hai cạnh","tạ tay CPU mười hai cạnh"],
  ["cpu-hexagonal-dumbbell-wide","ta-tay-luc-giac-cpu-ban-rong","Tạ tay lục giác CPU bản rộng","tạ tay CPU lục giác bản rộng"],
  ["cpu-dumbbell-full-range","bo-ta-tay-cpu-day-du","Bộ tạ tay CPU đầy đủ","bộ tạ tay CPU cho phòng gym"]
];

const plates: Entry[] = [
  ["cpu-bumper-plate","banh-ta-bumper-cpu","Bánh tạ bumper CPU","nhà sản xuất bánh tạ bumper CPU"],
  ["cpu-color-bumper-plate","banh-ta-bumper-cpu-mau","Bánh tạ bumper CPU màu","bánh tạ bumper màu bán buôn"],
  ["rubber-weight-plate","banh-ta-boc-cao-su","Bánh tạ bọc cao su","nhà sản xuất bánh tạ cao su"],
  ["rubber-barbell-plate","banh-ta-olympic-cao-su-co-tay-cam","Bánh tạ Olympic cao su có tay cầm","bánh tạ Olympic cao su bán buôn"],
  ["full-rubber-barbell-plate","banh-ta-olympic-toan-cao-su","Bánh tạ Olympic toàn cao su","nhà cung cấp bánh tạ toàn cao su"],
  ["black-competition-plate","banh-ta-thi-dau-mau-den","Bánh tạ thi đấu màu đen","bánh tạ thi đấu cử tạ"],
  ["solid-steel-barbell-plate","banh-ta-olympic-thep-dac","Bánh tạ Olympic thép đặc","nhà sản xuất bánh tạ thép đặc"],
  ["custom-solid-steel-barbell-plate","banh-ta-thep-dac-tuy-chinh","Bánh tạ thép đặc tùy chỉnh","bánh tạ thép thương hiệu riêng"],
  ["heavy-solid-steel-plate","banh-ta-thep-dac-hang-nang","Bánh tạ thép đặc hạng nặng","nhà cung cấp bánh tạ thép hạng nặng"],
  ["gold-steel-barbell-plate","banh-ta-olympic-thep-mau-vang","Bánh tạ Olympic thép màu vàng","nhà sản xuất bánh tạ Olympic màu vàng"],
  ["rubber-competition-bumper-plate","banh-ta-bumper-cao-su-thi-dau","Bánh tạ bumper cao su thi đấu","bánh tạ bumper thi đấu bán buôn"],
  ["cast-iron-weight-plate","banh-ta-gang","Bánh tạ gang","bánh tạ gang bán buôn"],
  ["seven-hole-cast-iron-plate","banh-ta-gang-bay-lo-cam","Bánh tạ gang bảy lỗ cầm","bánh tạ gang có tay cầm"],
  ["spray-weight-plate","banh-ta-son-phu","Bánh tạ sơn phủ","bánh tạ sơn bán buôn"],
  ["tpu-olympic-plate","banh-ta-olympic-tpu","Bánh tạ Olympic TPU","nhà sản xuất bánh tạ Olympic TPU"],
  ["star-tpu-plate","banh-ta-tpu-hinh-sao","Bánh tạ TPU hình sao","bánh tạ TPU tùy chỉnh"],
  ["cpu-grip-plate","banh-ta-cpu-co-tay-cam","Bánh tạ CPU có tay cầm","nhà sản xuất bánh tạ CPU tay cầm"],
  ["pu-grip-plate","banh-ta-pu-co-tay-cam","Bánh tạ PU có tay cầm","bánh tạ PU tay cầm bán buôn"],
  ["pu-color-plate","banh-ta-pu-mau","Bánh tạ PU màu","nhà cung cấp bánh tạ PU màu"],
  ["cpu-mini-bumper-plate","banh-ta-bumper-cpu-mini","Bánh tạ bumper CPU mini","bánh tạ bumper mini bán buôn"],
  ["rubber-olympic-plate","banh-ta-olympic-boc-cao-su","Bánh tạ Olympic bọc cao su","nhà sản xuất bánh tạ Olympic cao su"],
  ["pu-plate-set","bo-banh-ta-polyurethane","Bộ bánh tạ polyurethane","bộ bánh tạ PU bán buôn"],
  ["rubber-bumper-plate","banh-ta-bumper-cao-su","Bánh tạ bumper cao su","nhà sản xuất bánh tạ bumper cao su"],
  ["four-grip-cpu-plate","banh-ta-cpu-bon-tay-cam","Bánh tạ CPU bốn tay cầm","bánh tạ CPU bốn tay cầm"]
];

const racks: Entry[] = [
  ["private-home-gym-rack-system","he-thong-khung-tap-phong-gym-rieng","Hệ thống khung tập cho phòng gym riêng","nhà sản xuất khung home gym tùy chỉnh"],
  ["power-rack-functional-trainer","power-rack-kem-functional-trainer","Power rack kèm functional trainer","nhà sản xuất power rack functional trainer"],
  ["home-gym-functional-trainer","functional-trainer-home-gym","Functional trainer cho home gym","nhà cung cấp máy tập đa năng home gym"],
  ["compact-cable-power-rack","power-rack-cap-keo-nho-gon","Power rack cáp kéo nhỏ gọn","power rack cáp kéo nhỏ gọn"],
  ["dual-pulley-smith-rack","smith-rack-ro-roc-doi","Smith rack ròng rọc đôi","nhà sản xuất smith rack ròng rọc đôi"],
  ["custom-home-gym-rack","khung-home-gym-tuy-chinh","Khung home gym tùy chỉnh","khung home gym đặt theo yêu cầu"],
  ["storage-functional-trainer","functional-trainer-co-luu-tru","Functional trainer có lưu trữ","functional trainer tích hợp lưu trữ"],
  ["cable-crossover-functional-trainer","functional-trainer-cable-crossover","Functional trainer cable crossover","nhà sản xuất cable crossover chuyên nghiệp"],
  ["adjustable-weight-bench","ghe-tap-ta-dieu-chinh","Ghế tập tạ điều chỉnh","nhà sản xuất ghế tập điều chỉnh"],
  ["smith-squat-frame","khung-squat-smith","Khung squat Smith","nhà cung cấp khung squat Smith"],
  ["half-frame-squat-rack","half-rack-squat","Half rack squat","nhà sản xuất half rack chuyên nghiệp"],
  ["cable-cross-functional-trainer","functional-trainer-cable-cross","Functional trainer cable cross","functional trainer cable cross bán buôn"],
  ["six-column-functional-trainer","functional-trainer-sau-tru","Functional trainer sáu trụ","máy tập đa năng sáu trụ"],
  ["cable-crossover-machine","may-cable-crossover","Máy cable crossover","nhà sản xuất máy cable crossover"],
  ["full-frame-squat-rack","power-rack-khung-day-du","Power rack khung đầy đủ","nhà sản xuất power rack khung đầy đủ"],
  ["eight-column-training-rack","khung-tap-tam-tru","Khung tập tám trụ","khung tập tám trụ chuyên nghiệp"],
  ["wall-mounted-functional-trainer","functional-trainer-gan-tuong","Functional trainer gắn tường","nhà sản xuất máy cáp gắn tường"],
  ["smith-cable-crossover-machine","smith-machine-cable-crossover","Smith machine cable crossover","nhà sản xuất smith machine cable crossover"],
  ["floor-plate-cable-crossover","cable-crossover-de-san","Cable crossover đế sàn","cable crossover tự đứng"],
  ["smith-machine","smith-machine-chuyen-nghiep","Smith machine chuyên nghiệp","nhà sản xuất smith machine chuyên nghiệp"],
  ["wall-folding-functional-trainer","functional-trainer-gan-tuong-gap-gon","Functional trainer gắn tường gấp gọn","máy cáp gắn tường gấp gọn"],
  ["incline-flat-decline-bench","ghe-tap-doc-ngang-am","Ghế tập dốc, ngang và âm","nhà sản xuất ghế tập đa góc"],
  ["commercial-adjustable-bench","ghe-dieu-chinh-phong-gym","Ghế điều chỉnh cho phòng gym","ghế tập thương mại bán buôn"],
  ["heavy-duty-adjustable-bench","ghe-dieu-chinh-hang-nang","Ghế điều chỉnh hạng nặng","ghế tập heavy duty"],
  ["compact-adjustable-bench","ghe-dieu-chinh-nho-gon","Ghế điều chỉnh nhỏ gọn","ghế điều chỉnh nhỏ gọn chuyên nghiệp"],
  ["three-in-one-smith-functional-trainer","smith-functional-trainer-ba-trong-mot","Smith functional trainer 3 trong 1","smith functional trainer 3 trong 1"],
  ["smith-dual-pulley-trainer","smith-machine-ro-roc-doi","Smith machine ròng rọc đôi","nhà sản xuất smith machine ròng rọc đôi"],
  ["olympic-bench-plate-storage","ghe-olympic-co-gia-banh-ta","Ghế Olympic có giá bánh tạ","ghế Olympic chuyên nghiệp"],
  ["multi-jungle-functional-trainer","tram-tap-multi-jungle","Trạm tập multi-jungle","nhà sản xuất trạm multi-jungle"],
  ["single-station-functional-trainer","functional-trainer-mot-tram","Functional trainer một trạm","máy tập đa năng một người"],
  ["three-station-functional-trainer","functional-trainer-ba-tram","Functional trainer ba trạm","máy tập đa năng ba trạm"],
  ["five-station-functional-trainer","functional-trainer-nam-tram","Functional trainer năm trạm","máy tập đa năng năm trạm"],
  ["multi-jungle-training-system","he-thong-tap-multi-jungle","Hệ thống tập multi-jungle","nhà sản xuất hệ thống multi-jungle"]
];

const accessories: Entry[] = [
  ["vinyl-kettlebell","ta-am-boc-vinyl","Tạ ấm bọc vinyl","tạ ấm vinyl bán buôn"],
  ["cast-iron-kettlebell","ta-am-gang","Tạ ấm gang","nhà sản xuất tạ ấm gang"],
  ["competition-kettlebell","ta-am-thi-dau","Tạ ấm thi đấu","tạ ấm thi đấu bán buôn"],
  ["six-side-cable-handle","tay-cam-cap-sau-canh","Tay cầm cáp sáu cạnh","nhà sản xuất tay cầm cáp"],
  ["tetragonal-cable-handle","tay-cam-cap-bon-canh","Tay cầm cáp bốn cạnh","tay cầm cáp bán buôn"],
  ["rubber-coated-gym-handle-sets","bo-tay-cam-gym-boc-cao-su","Bộ tay cầm gym bọc cao su","bộ tay cầm gym bán buôn"],
  ["aluminum-gym-handles","tay-cam-gym-nhom","Tay cầm gym bằng nhôm","nhà sản xuất tay cầm cáp nhôm"],
  ["solid-steel-gym-handles","tay-cam-gym-thep-dac","Tay cầm gym thép đặc","tay cầm thép bán buôn"],
  ["lat-pulldown-handles","tay-cam-keo-xo","Tay cầm kéo xô","tay cầm kéo xô bán buôn"],
  ["v-handle-attachments","tay-cam-chu-v","Tay cầm chữ V","nhà cung cấp tay cầm chữ V"],
  ["straight-bar-cable-attachments","thanh-keo-cap-thang","Thanh kéo cáp thẳng","thanh kéo cáp bán buôn"],
  ["triceps-rope-handles","day-thung-keo-tay-sau","Dây thừng kéo tay sau","dây thừng triceps bán buôn"],
  ["cable-machine-attachments","phu-kien-may-keo-cap","Phụ kiện máy kéo cáp","phụ kiện máy kéo cáp bán buôn"],
  ["tpe-yoga-mat","tham-yoga-tpe","Thảm yoga TPE","thảm yoga TPE bán buôn"],
  ["vipr-training-tube","ong-tap-vipr","Ống tập ViPR","ống tập ViPR bán buôn"],
  ["yoga-ball","bong-yoga","Bóng yoga","bóng yoga bán buôn"],
  ["bosu-ball","bong-thang-bang-nua-tron","Bóng thăng bằng nửa tròn","balance trainer bán buôn"],
  ["aerobic-step","buc-tap-aerobic-chuyen-nghiep","Bục tập aerobic chuyên nghiệp","bục aerobic bán buôn"],
  ["compact-aerobic-step","buc-tap-aerobic-nho-gon","Bục tập aerobic nhỏ gọn","bục aerobic nhỏ gọn bán buôn"]
];

const categoryMeta = {
  dumbbells: { root: "/vi/san-pham/ta-tay", label: "Tạ tay", type: "tạ tay", categoryId: "dumbbells-category" },
  plates: { root: "/vi/san-pham/banh-ta", label: "Bánh tạ", type: "bánh tạ", categoryId: "weight-plates-category" },
  racks: { root: "/vi/san-pham/khung-ghe-tap", label: "Khung và ghế tập", type: "thiết bị tập", categoryId: "racks-benches-category" },
  accessories: { root: "/vi/san-pham/phu-kien-gym", label: "Phụ kiện gym", type: "phụ kiện", categoryId: "gym-accessories-category" }
} as const;

function makeProfiles(source: ProductSource[], category: CategoryKey, entries: Entry[]) {
  const map = new Map(entries.map(([slug, viSlug, name, keyword]) => [slug, { viSlug, name, keyword }]));
  return source.flatMap((product, index) => { const item = map.get(product.slug); return item ? [{ source: product, category, ...item, index }] : []; });
}

export const vietnameseProductProfiles: VietnameseProductProfile[] = [
  ...makeProfiles(dumbbellProducts, "dumbbells", dumbbells), ...makeProfiles(weightPlateProducts, "plates", plates),
  ...makeProfiles(racksBenchesProducts, "racks", racks), ...makeProfiles(gymAccessoryProducts, "accessories", accessories)
];

function rangeText(profile: VietnameseProductProfile) {
  const values = profile.source.range.match(/[0-9][0-9., x×/-]*(?:kg|lb|mm|cm)?/gi)?.join(", ");
  return values ? `${values}. Dải trọng lượng, bước nhảy và dung sai cuối cùng phải ghi trong bảng thông số được hai bên duyệt.` : "Tải trọng, kích thước và cấu hình được xác nhận theo đúng mã hàng trong yêu cầu báo giá.";
}

function materialText(profile: VietnameseProductProfile) {
  const key = `${profile.source.slug} ${profile.name}`.toLowerCase();
  if (/cast-iron|gang/.test(key)) return "Lõi hoặc thân gang theo cấu tạo của mã hàng; cần kiểm soát khối lượng, rỗ bề mặt, cạnh, lớp sơn hoặc lớp bọc và khả năng lắp ghép.";
  if (/steel|sus304|thép|inox/.test(key)) return "Thép hoặc inox theo mẫu; độ phẳng, cạnh, mối nối, bề mặt và phương án chống ăn mòn được ghi rõ thay vì chỉ mô tả chung là kim loại cao cấp.";
  if (/polyurethane|pu-/.test(key)) return "Polyurethane trên lõi phù hợp; màu, độ cứng, độ bóng, độ bám và dấu trọng lượng cần được duyệt trên mẫu vật lý.";
  if (/tpu/.test(key)) return "TPU được tạo hình trên kết cấu phù hợp; lô nguyên liệu, điều kiện ép, liên kết và vùng tiếp xúc là những điểm cần theo dõi.";
  if (/cpu/.test(key)) return "Elastomer CPU đúc trên lõi hoặc kết cấu của sản phẩm; công thức, màu, liên kết, ký hiệu và độ hoàn thiện phải khớp mẫu đã duyệt.";
  if (/rubber|cao-su|bumper/.test(key)) return "Cao su hoặc elastomer trên lõi quy định; người mua nên đánh giá mùi, độ cứng, bề mặt, liên kết và sai lệch màu trên mẫu thật.";
  if (profile.category === "racks") return "Khung dùng ống và tấm thép, mối hàn, bulông và sơn tĩnh điện; phiên bản dùng cáp còn có ròng rọc, cáp, bạc đạn và bộ phận dẫn hướng.";
  return "Vật liệu, cấu tạo, kích thước và bề mặt phải gắn với mã hàng cụ thể. Tên vật liệu không thay thế cho tiêu chí nghiệm thu có thể đo được.";
}

const positioning = [
  "Mã này phù hợp khi nhà phân phối cần một cấu hình dễ giải thích, dễ lập bộ và có khả năng đặt lại theo cùng tiêu chuẩn.",
  "Đối với phòng gym thương mại, giá trị của mã hàng nằm ở khả năng chịu tần suất sử dụng, vệ sinh và kiểm tra hằng ngày, không chỉ ở hình thức ban đầu.",
  "Thương hiệu riêng nên xem sản phẩm này như một phần của danh mục đồng bộ về màu, logo, nhãn và bao bì, thay vì một SKU tách rời.",
  "Nhà nhập khẩu nên đánh giá mã này theo chi phí đến kho, mật độ đóng hàng và rủi ro hư hỏng trong vận chuyển đường dài.",
  "Dự án phòng gym cần đối chiếu sản phẩm với diện tích, luồng di chuyển, khu lưu trữ và nhóm người dùng trước khi chốt số lượng.",
  "Mã hàng có thể đóng vai trò sản phẩm chủ lực hoặc lựa chọn nâng cấp; vị trí trong danh mục quyết định mức tồn kho và kế hoạch tái đặt hàng.",
  "Khi bán qua đại lý, thông tin nhận diện thùng, hướng dẫn kiểm tra khi nhận và phụ tùng liên quan quan trọng không kém giá xuất xưởng.",
  "Với chuỗi phòng tập, tính nhất quán giữa các lô và khả năng thay thế từng đơn vị cần được xác nhận ngay từ đơn hàng đầu tiên.",
  "Người mua B2B nên so sánh bằng cùng một cấu hình và tiêu chí, vì hai báo giá có tên sản phẩm giống nhau vẫn có thể khác vật liệu hoặc phạm vi kiểm tra.",
  "Sản phẩm này phù hợp cho yêu cầu OEM khi logo, màu và bao bì được xác định bằng tệp duyệt và mẫu giới hạn rõ ràng.",
  "Trước khi chọn, cần tách yêu cầu của người tập, đơn vị vận hành và bộ phận logistics để tránh tối ưu một yếu tố nhưng làm tăng chi phí yếu tố khác.",
  "Đơn hàng thử nên đại diện cho biến thể có rủi ro cao, giúp kiểm tra cả sản phẩm, nhãn và phương án đóng gói trước khi mở rộng số lượng."
  ,"Với hợp đồng theo dự án, mã này nên có người chịu trách nhiệm duyệt riêng cho thông số, nhận diện và logistics để một thay đổi không bị phê duyệt thiếu góc nhìn."
];

const applicationAngles = [
  "Hãy mô tả số người sử dụng, số giờ vận hành, mặt sàn, cách lưu trữ và tần suất vệ sinh. Các dữ liệu này giúp chọn đúng cấu tạo.",
  "Đặt sản phẩm vào quy trình sử dụng thực tế: lấy ra, tập luyện, trả về vị trí, vệ sinh và kiểm tra. Điểm bất tiện nhỏ có thể trở thành chi phí lớn khi lặp lại mỗi ngày.",
  "Cần kiểm tra khả năng kết hợp với thiết bị hiện có, gồm kích thước, khoảng trống, vị trí cất giữ và giao diện sử dụng.",
  "Phòng gym, nhà phân phối và thương hiệu riêng có tiêu chí khác nhau; hồ sơ mua hàng nên nêu rõ kênh bán và mức sử dụng dự kiến.",
  "Với nhiều chi nhánh, nên chuẩn hóa mã hàng, phiên bản, màu và cách đánh dấu để giảm nhầm lẫn khi bổ sung hoặc bảo trì.",
  "Không nên dùng ảnh catalog làm tiêu chí duy nhất. Mẫu thật và dữ liệu đo mới cho biết sản phẩm có phù hợp với vận hành hay không.",
  "Nếu dự án có nhiều biến thể, hãy nhóm theo mức rủi ro để xác định mẫu nào cần kiểm tra kỹ và mẫu nào có thể xác nhận bằng hồ sơ.",
  "Kế hoạch mua phải tính cả không gian nhận hàng, mở kiện, lắp đặt hoặc sắp xếp, không chỉ diện tích sử dụng cuối cùng."
  ,"Nếu sản phẩm được bán cho nhiều phân khúc, hãy giữ cấu hình nền ổn định và tách option; điều này giúp báo giá, tồn kho và truyền thông không bị lẫn."
];

const qcAngles = [
  "Với mã có nhiều mức kg, hãy chia mẫu theo nhóm nhẹ, trung bình và nặng; ghi số khuôn hoặc ca sản xuất để nhận biết sai lệch có tập trung hay không.",
  "Nếu bề mặt là yếu tố bán hàng chính, cần có mẫu giới hạn cho vết, chênh màu và độ bóng; đánh giá dưới cùng ánh sáng và khoảng cách quan sát.",
  "Sản phẩm có chi tiết lắp ghép cần kiểm tra cả kích thước từng phần và thao tác sau lắp; một kích thước đạt riêng lẻ chưa chắc tạo thành cụm hoạt động tốt.",
  "Đơn hàng nhiều màu nên lấy mẫu theo từng màu và vị trí trong lô. Kết quả cân hoặc kích thước cần nối với đúng mã màu, không gộp thành một số trung bình.",
  "Với sản phẩm chịu tải lặp lại, kiểm tra ban đầu phải kết hợp quan sát điểm nối sau thao tác thử đã thống nhất; ghi rõ tải và số chu kỳ nếu có.",
  "Mã hàng bán theo bộ cần kiểm tra tính đầy đủ và khả năng nhận diện từng chi tiết. Một bộ thiếu phụ kiện là lỗi chức năng dù từng sản phẩm chính đạt.",
  "Đối với hàng có logo, QC tách lỗi vị trí, kích thước, màu và độ bám. Artwork đúng không chứng minh việc chuyển lên bề mặt đã đúng.",
  "Sản phẩm cồng kềnh nên được kiểm tra lắp thử trước khi tháo đóng kiện; chụp mã linh kiện và vị trí để hỗ trợ người nhận kiểm tra lại.",
  "Khi dung sai có ảnh hưởng tương thích, đo nhiều hướng và ghi dụng cụ. Chỉ báo đạt/không đạt mà thiếu số đo sẽ khó điều tra khi có khiếu nại.",
  "Lô tái đặt cần so với mẫu lưu và báo cáo lô trước, đồng thời xác nhận thay đổi vật liệu hoặc quy trình trước khi lấy mẫu cuối.",
  "Nếu sản phẩm có vùng người dùng thường xuyên chạm vào, kiểm tra cạnh, độ nhám và độ sạch ở đúng vùng đó thay vì chỉ xem mặt trưng bày.",
  "Đơn thử nên đặt tiêu chí giống đơn thương mại; hạ chuẩn vì số lượng nhỏ sẽ làm mất giá trị của bước thử nghiệm."
  ,"Đối với sản phẩm có nhiều điểm điều chỉnh, QC cần ghi từng vị trí và thao tác khóa; kiểm tra một vị trí thuận lợi không đại diện toàn bộ phạm vi."
  ,"Khi cùng mã được sản xuất bằng nhiều khuôn hoặc line, báo cáo phải ghi nguồn của từng mẫu để phát hiện chênh lệch hệ thống thay vì gộp kết quả."
];

const logisticsAngles = [
  "Hãy tính trọng lượng mỗi thùng theo khả năng bốc dỡ tại kho Việt Nam và giới hạn pallet, không chỉ tối đa hóa khối lượng trong container.",
  "Nếu hàng đi qua nhiều điểm trung chuyển, tăng bảo vệ cạnh và khóa chuyển động trong thùng; nhãn phải đọc được khi pallet còn nguyên.",
  "Bộ nhiều SKU cần quy tắc mã thùng và màu nhãn để kho đối chiếu packing list mà không mở toàn bộ kiện.",
  "Sản phẩm có bề mặt dễ xước cần lớp ngăn không phản ứng với lớp phủ; thử sau thời gian tiếp xúc thay vì chỉ đóng rồi mở ngay.",
  "Với hàng nặng theo cặp, phân bố khối lượng trong thùng và trên pallet phải cân bằng để tránh méo carton hoặc lệch khi nâng.",
  "Thiết bị dài hoặc tháo rời cần sơ đồ linh kiện, túi bulông có mã và điểm kiểm đếm; phụ kiện nhỏ không nên để tự do trong kiện lớn.",
  "Đơn hàng thương hiệu riêng phải kiểm tra cả mặt ngoài thùng, barcode, nhãn nhập khẩu dự kiến và sự khớp giữa mã thùng với sản phẩm.",
  "Nếu nhận hàng tại kho hạn chế xe nâng, packing plan phải tính cách dỡ và kích thước pallet; giải pháp tốt trên cảng có thể khó tại kho cuối.",
  "Khi ghép nhiều nhóm sản phẩm, cần mô phỏng cách xếp để tránh hàng nặng đè lên phụ kiện nhẹ hoặc bề mặt hoàn thiện.",
  "Đối với đơn tái đặt, giữ quy cách thùng ổn định giúp kho và đại lý dự báo không gian; thay đổi phải báo trước cùng kích thước mới.",
  "Ảnh đóng container nên thể hiện số container, hàng rào chặn và vị trí cuối, hỗ trợ điều tra nếu pallet dịch chuyển trong hành trình.",
  "Mẫu bao bì cần được duyệt với đúng trọng lượng thực; dùng sản phẩm nhẹ để thử thùng cho phiên bản nặng không phản ánh rủi ro."
  ,"Nếu sản phẩm có phụ tùng thay thế, đóng riêng theo mã và ghi trên packing list; không trộn phụ tùng với bộ lắp đặt vì kho khó xác nhận số lượng."
  ,"Với hàng có mùi vật liệu mới, thông gió và vật liệu bao gói cần được xem xét; bọc kín quá sớm có thể làm trải nghiệm mở kiện kém hơn."
  ,"Nếu container gồm nhiều điểm giao, thứ tự xếp phải theo kế hoạch dỡ; kiện của điểm đầu không nên bị khóa sau hàng của điểm cuối."
];

const quoteAngles = [
  "Yêu cầu tách giá theo mức trọng lượng và số lượng để biết SKU nào chi phối ngân sách; ghi rõ giá có gồm logo, nhãn và pallet hay không.",
  "Nếu có nhiều phương án vật liệu, xin báo thành các option trên cùng số lượng. Điều này cho thấy chênh lệch thật mà không trộn thay đổi cấu hình.",
  "Đối với dự án theo mặt bằng, gửi cả danh sách ưu tiên và giới hạn không gian; nhà sản xuất có thể cảnh báo cấu hình không phù hợp trước khi báo.",
  "Nhà phân phối nên nêu số lượng đơn đầu và dự kiến tái đặt riêng. MOQ của lô thử có thể khác lịch sản xuất dài hạn.",
  "Thương hiệu riêng cần khóa artwork và bao bì trước giá cuối; thay đổi số màu hoặc vị trí logo có thể làm thay đổi công đoạn.",
  "Với bộ nhiều chi tiết, báo giá cần có danh sách thành phần và số lượng trong mỗi bộ để tránh khác biệt phạm vi giữa nhà cung cấp.",
  "Hãy yêu cầu thời gian cho mẫu, duyệt mẫu và sản xuất tách biệt. Một lead time tổng không cho biết bước nào bị ảnh hưởng khi sửa.",
  "Nếu dự kiến kiểm định bên thứ ba, đưa yêu cầu vào RFQ để nhà máy bố trí thời điểm, khu vực lấy mẫu và mở kiện.",
  "Đơn hàng nặng cần packing estimate ngay ở vòng báo giá; thiếu gross weight và CBM sẽ làm phép tính đến kho thiếu cơ sở.",
  "Khi so Incoterm, ghi chính xác cảng hoặc địa điểm; FOB, CIF và DDP không thể so nếu phạm vi và trách nhiệm chưa rõ.",
  "Đối với sản phẩm cần lắp đặt, xác nhận báo giá có gồm dụng cụ, hướng dẫn, phụ tùng ban đầu và hỗ trợ kỹ thuật nào.",
  "Đơn thử phải nêu tiêu chí chuyển sang đơn lớn. Nếu mẫu đạt nhưng giá thương mại dựa trên cấu hình khác, thử nghiệm không còn tương đương."
  ,"Nếu báo giá có phụ kiện tùy chọn, ghi trạng thái bắt buộc hay lựa chọn và số lượng kèm theo; tên bộ sản phẩm giống nhau có thể che khác biệt này."
  ,"Đối với đơn có nhiều đơn vị kg và lb, yêu cầu bảng mã riêng và quy tắc làm tròn; không chuyển đổi bằng miệng khi đã phát hành artwork."
  ,"Nếu người mua cung cấp mẫu đối chiếu, báo giá phải nêu những điểm có thể sao theo và những điểm cần thay đổi vì quy trình hoặc quyền sở hữu."
  ,"Khi sản phẩm có lựa chọn phụ tùng, hãy báo giá bộ ban đầu và bộ thay thế riêng để người mua tính tồn kho bảo trì ngay từ đầu."
];

const positionAngles = [
  (p: VietnameseProductProfile)=>[`${p.name} được xây dựng như một mã hàng ổn định trong danh mục. Người mua chỉ chọn biến thể phục vụ nhu cầu đã xác định và liên kết số lượng với nhóm người dùng hoặc kênh bán.`,`Dải ${p.source.range} là điểm tham khảo; đơn vị, bước tăng, kích thước và dung sai từng SKU nằm trong bản duyệt.`],
  (p: VietnameseProductProfile)=>[`Giá trị mua ${p.name} đến từ khả năng lặp lại giữa mẫu, lô đầu và đơn tái đặt. Đặc tính chức năng và thẩm mỹ được tách riêng để một sửa màu không che vấn đề cấu tạo.`,`Nhà phân phối chuẩn bị dữ liệu cho kho và đại lý; phòng gym chuyển cùng dữ liệu thành yêu cầu lưu trữ, vệ sinh và thay thế.`],
  (p: VietnameseProductProfile)=>[`${p.name} phải có vai trò rõ trong tồn kho: sản phẩm chủ lực, bổ sung hay lựa chọn nâng cấp. Đơn đầu ưu tiên mã có nhu cầu, sau đó mở rộng theo vòng quay và phản hồi.`,`Báo giá tách sản phẩm, tùy chỉnh, mẫu và bao bì để chi phí khởi tạo không bị hiểu nhầm là giá lặp lại của từng chiếc.`],
  (p: VietnameseProductProfile)=>[`Việc chọn ${p.name} bắt đầu từ ràng buộc khó thay đổi nhất như giao diện, diện tích, tải, chức năng hoặc đóng gói. Màu và logo được xem xét sau.`,`Một bảng ngắn có số đo giúp so sánh tốt hơn danh sách tính từ. Mỗi giá trị thiếu cần một giả định hoặc câu trả lời riêng.`],
  (p: VietnameseProductProfile)=>[`${p.name} được đánh giá trong cả chu kỳ đặt hàng, sản xuất, vận chuyển, nhận, sử dụng và tái đặt. Lợi thế giá ban đầu có thể mất nếu kiểm nhận hoặc bảo trì phức tạp.`,`Người phụ trách mua, kho và vận hành cùng thống nhất tiêu chí trước mẫu để tránh mỗi bộ phận đánh giá theo một chuẩn khác.`],
  (p: VietnameseProductProfile)=>[`Với thương hiệu riêng, ${p.name} cần nhận diện bằng tỷ lệ, bề mặt, ký hiệu, màu và bao bì chứ không chỉ logo. Nhà máy phải lặp lại được hệ thống này giữa biến thể.`,`Người mua lưu mẫu và tham chiếu vật liệu; mỗi đơn tái đặt xác nhận phiên bản cùng mọi thay đổi có thể ảnh hưởng hình thức hoặc sử dụng.`],
  (p: VietnameseProductProfile)=>[`${p.name} phải được so với sản phẩm có cùng chức năng, không chỉ ảnh giống nhau. Cấu tạo, giao diện, kích thước và giới hạn sử dụng tạo cơ sở so nhà cung cấp.`,`Nếu có phương án thay thế, báo riêng ảnh hưởng đến MOQ, thời gian, QC và bao bì; chỉ đưa vào đơn sau phê duyệt bằng văn bản.`],
  (p: VietnameseProductProfile)=>[`Trong dự án nhiều địa điểm, ${p.name} cần được nhận diện và kiểm nhận theo cùng cách ở mọi kho. Nhãn, carton và hướng dẫn phải phục vụ người chưa tham gia trao đổi với nhà máy.`,`Phân bổ kiện theo điểm đến được duyệt trước khi xếp hàng, giảm mở thùng, phân loại và dán nhãn lại tại Việt Nam.`],
  (p: VietnameseProductProfile)=>[`${p.name} có thể phục vụ phòng gym, nhà thầu hoặc nhà phân phối nhưng mỗi nhóm chấp nhận đánh đổi khác nhau về sử dụng, tiến độ, dải SKU và bao bì.`,`Brief phải nêu nhóm ưu tiên để cấu hình không cố đáp ứng mọi tình huống rồi trở nên đắt hoặc thiếu tập trung.`],
  (p: VietnameseProductProfile)=>[`Tổng chi phí sở hữu ${p.name} gồm vệ sinh, kiểm tra, thay thế, không gian và thời gian nhận hàng. Các yếu tố này được xem trước khi chọn vật liệu hoặc hoàn thiện.`,`Thông tin chưa rõ phải trở thành giả định trong báo giá; trước PO, giả định được xác nhận, sửa hoặc giữ như giới hạn đã biết.`],
  (p: VietnameseProductProfile)=>[`${p.name} nằm trong bảng BOM ghi số lượng từng biến thể và tổng số lượng. Cách tách này giúp hiểu MOQ của vật liệu, công đoạn và carton.`,`Kế hoạch tái đặt được trao đổi từ đầu vì có thể ảnh hưởng tồn linh kiện, bảo quản khuôn, tệp logo và lịch sản xuất.`],
  (p: VietnameseProductProfile)=>[`Sai lệch của ${p.name} được chia thành lỗi chức năng, lỗi ảnh hưởng bán hàng và lỗi thẩm mỹ chấp nhận được. Mỗi nhóm có hành động dừng, sửa, phân loại hoặc theo dõi.`,`Phân cấp này giúp kiểm định tập trung vào rủi ro, thay vì quyết định theo tổng số quan sát không có trọng số.`],
  (p: VietnameseProductProfile)=>[`${p.name} nên có tiêu chí riêng cho lần mua đầu và lần tái đặt. Lần đầu xác minh cấu hình; lần sau kiểm tra tính nhất quán và thay đổi.`,`Hồ sơ duyệt phải đủ để một nhân sự mới có thể đọc, lấy mẫu và đi đến cùng kết luận mà không phụ thuộc trao đổi miệng.`]
] as const;

function differentiationText(profile: VietnameseProductProfile): [string,string] {
  const key=profile.source.slug;
  if(key.includes("adjustable"))return[`${profile.name} gom nhiều mức tải trong cơ cấu điều chỉnh. Cần thử mọi vị trí, khả năng khóa, đế, thao tác sai có thể dự đoán và phụ tùng, không chỉ mức lớn nhất.`,`Quan sát độ rơ, tiếng động, căn chỉnh và thao tác lấy đặt lại sau nhiều lần; quy trình bảo trì phải phù hợp kênh bán.`];
  if(profile.category==="dumbbells"&&/hex|square|twelve/.test(key))return[`${profile.name} dùng hình học chống lăn, ảnh hưởng bài tập sàn và giá đỡ. Đo đầu tạ ở nhiều mức kg vì tỷ lệ có thể thay đổi theo trọng lượng.`,`Liên kết đầu với tay cầm, góc cạnh, độ bám và ký hiệu vẫn là điểm chính; hình chống lăn không bù được sai cân hoặc lắp ghép yếu.`];
  if(profile.category==="dumbbells"&&key.includes("round"))return[`${profile.name} tạo dãy tròn đồng đều trên giá phù hợp. Khu tập phải hạn chế lăn ngoài giá và chừa đủ chiều sâu cho đầu lớn nhất.`,`So đường kính, bề rộng, căn tâm và màu ở mức nhẹ, trung bình, nặng vì chênh tỷ lệ dễ thấy trên cả dãy.`];
  if(profile.category==="dumbbells")return[`${profile.name} cần cân bằng giữa đầu tạ, tay cầm, khối lượng và bề mặt. Tay cầm phải nhất quán trong dải và liên kết được kiểm tra trên nhiều mức.`,`Nhà phân phối quan tâm số SKU, carton và tái đặt; phòng gym quan tâm giá đỡ, vệ sinh, vòng quay và cảm giác cầm.`];
  if(key.includes("competition")&&key.includes("bumper"))return[`${profile.name} yêu cầu mô tả chính xác hơn về đường kính, độ dày, khối lượng, vòng chèn và nhận diện. Từ thi đấu không tự tạo chứng nhận nếu thiếu bằng chứng cho mã hàng.`,`Kiểm tra nhiều mức vì bánh nhẹ và nặng có cấu tạo khác; theo dõi vòng chèn, liên kết, màu và độ đọc ký hiệu riêng.`];
  if(key.includes("bumper"))return[`${profile.name} dành cho khu có khả năng đặt hoặc thả thanh trong điều kiện xác định. Nền, độ cao, tần suất, đường kính và độ dày phải tương thích.`,`Đánh giá không gian trên thanh, vòng chèn, khối lượng và phản ứng vật liệu sau phép thử; phiên bản nhẹ cần chú ý ổn định.`];
  if(profile.category==="plates"&&/steel|cast-iron/.test(key))return[`${profile.name} có thân kim loại gọn. Kiểm tra đúc hoặc gia công, cạnh, độ phẳng, bảo vệ bề mặt, lỗ tâm và nguy cơ gỉ khi lớp phủ hỏng.`,`Độ mỏng giúp nạp thêm tải nhưng tăng tiếp xúc kim loại; sàn, giá và quy tắc không thả phải được xác định.`];
  if(profile.category==="plates")return[`${profile.name} là giao diện giữa thanh, giá và người dùng. Lỗ tâm, độ phẳng, độ dày, tay cầm và ký hiệu ảnh hưởng thao tác hằng ngày.`,`Với dải màu hoặc lớp bọc, so nhiều mức và nhiều lô về màu, liên kết, cạnh và tiếp xúc với giá lưu trữ.`];
  if(profile.category==="racks"&&key.includes("bench"))return[`${profile.name} được đánh giá qua góc, ổn định, khóa, tay kéo, bánh xe, đệm và khả năng kết hợp rack. Vùng tập lớn hơn kích thước khung.`,`Thử từng vị trí, kiểm tra chốt, trục, độ rơ, mối hàn và đệm; đóng kiện phải bảo vệ riêng khung và nệm.`];
  if(profile.category==="racks"&&key.includes("smith"))return[`${profile.name} dùng thanh dẫn hướng cần thẳng trên toàn hành trình. Kiểm tra ray, chặn, móc, an toàn, vị trí nạp tạ và hệ cáp nếu có.`,`Lắp đặt ảnh hưởng trực tiếp chức năng; hướng dẫn, bulông có mã, độ thẳng đứng và kiểm tra mặt bằng quan trọng như bề mặt sơn.`];
  if(profile.category==="racks"&&key.includes("wall"))return[`${profile.name} phụ thuộc kết cấu tường, loại neo, độ phẳng, lối thi công và vùng chuyển động. Chuyên gia tại công trình phải xác nhận trước lắp.`,`Kiện cần đánh mã giá đỡ, spacer và phần cứng; sau lắp kiểm tra căn chỉnh, hành trình, khoảng trống và khả năng bảo trì.`];
  if(profile.category==="racks"&&/functional|cable|jungle/.test(key))return[`${profile.name} được lập theo người dùng đồng thời, đường cáp, điều chỉnh, phụ kiện và vùng hoạt động. Kích thước phủ bì không phải toàn bộ không gian vận hành.`,`Kiểm tra ròng rọc, cáp, đầu cáp, dẫn hướng, chốt và điểm neo; trạm nhiều vị trí cần thử đồng thời và kiểm tra lối bảo trì.`];
  if(profile.category==="racks")return[`${profile.name} liên kết hình học, ổn định, vị trí tập và điều kiện công trình. Bản vẽ, vùng an toàn, nền, neo và lối lắp được duyệt trước giao.`,`QC bao phủ cắt, khoan, hàn, xử lý bề mặt, sơn, bulông, lắp và chức năng; khung đẹp vẫn có thể sai nếu lỗ không khớp.`];
  if(key.includes("kettlebell"))return[`${profile.name} được so theo cân, đáy, đường kính và bề mặt tay cầm, khoảng nắm và tính nhất quán giữa mức. Dòng thi đấu và fitness có thể khác hình học.`,`Thử ổn định, cạnh, cảm giác cầm và ký hiệu; chọn bước kg phù hợp lớp tập hoặc kênh bán và dự kiến chỗ lưu trữ.`];
  if(/handle|attachments|rope/.test(key))return[`${profile.name} phải tương thích điểm nối, máy, đường kéo và tải. Đo lỗ, đường kính, chiều dài, vùng cầm và liên kết; ảnh giống không bảo đảm cùng giao diện.`,`Kiểm tra xoay, hàn hoặc ép, lớp bọc, đầu chặn và cảm giác dưới tải; bộ phụ kiện phải được đếm từng mã.`];
  return[`${profile.name} được đánh giá từ chức năng, kích thước, vật liệu và môi trường. Vệ sinh, lưu trữ, tiếp xúc sàn và đơn vị đóng gói quyết định phiên bản phù hợp.`,`Với phân phối, kiểm tra trình bày, nhãn, mã và số lượng thùng; với vận hành, kiểm tra ổn định, cầm nắm, bảo trì và thay thế.`];
}

function processText(profile: VietnameseProductProfile) {
  if (profile.category === "dumbbells") return `Quy trình của ${profile.name.toLowerCase()} gồm chuẩn bị đầu tạ hoặc lõi, gia công tay cầm, đúc hay phủ bề mặt, liên kết, hoàn thiện, ghi trọng lượng, cân kiểm tra và đóng gói.`;
  if (profile.category === "plates") return `Với ${profile.name.toLowerCase()}, thân bánh tạ và lỗ tâm hoặc vòng chèn được tạo hình, căn chỉnh, phủ hoàn thiện, ghi trọng lượng, cân, kiểm tra độ phẳng rồi đóng gói.`;
  if (profile.category === "racks") return `Quy trình ${profile.name.toLowerCase()} gồm cắt, đột và khoan thép, hàn theo đồ gá, xử lý bề mặt, sơn tĩnh điện, lắp thử và kiểm tra cáp, ròng rọc hoặc ray dẫn nếu có.`;
  return `${profile.name} được sản xuất qua các bước chuẩn bị vật liệu, tạo hình hoặc gia công, lắp ráp, hoàn thiện, đánh dấu, kiểm tra chức năng, đếm số lượng và xác nhận bao bì.`;
}

function productImages(profile: VietnameseProductProfile): LocalizedImage[] {
  const sources = [profile.source.gallery?.[0] || profile.source.image, "/assets/dumbbell-production.webp", "/assets/resource-plate-finishing.webp"];
  return sources.map((source, index) => ({ id: `hinh-${index + 1}`, src: vietnameseImagePath(source, profile.viSlug, index), alt: index === 0 ? `${profile.name} cho phòng gym chuyên nghiệp` : index === 1 ? `Quy trình sản xuất thực tế của ${profile.name.toLowerCase()}` : `Kiểm tra bề mặt thực tế cho ${profile.name.toLowerCase()}`, caption: index === 0 ? `Hình ảnh sản phẩm ${profile.name.toLowerCase()} hiện có; cấu hình cuối cùng theo báo giá.` : index === 1 ? "Công đoạn sản xuất thực tế tại PowerBaseFit." : "Kiểm tra thực tế về bề mặt và độ hoàn thiện." }));
}

export function vietnameseVersionForProfile(profile: VietnameseProductProfile): LocalizedContentVersion {
  const meta = categoryMeta[profile.category];
  const publicPath = `${meta.root}/${profile.viSlug}`;
  const position = positioning[profile.index % positioning.length];
  const application = applicationAngles[(profile.index * 3 + profile.category.length) % applicationAngles.length];
  const body = [
    viAnswer("tra-loi-nhanh", "Câu trả lời nhanh", `${profile.name} là lựa chọn B2B cho phòng gym, nhà nhập khẩu, nhà phân phối và thương hiệu fitness cần thông số, kiểm soát chất lượng, bao bì và khả năng đặt lại rõ ràng. ${position}`),
    viDefinition("dinh-nghia", profile.name, `${profile.name} là một ${meta.type} được xác định bằng cấu tạo, vật liệu, kích thước, dải trọng lượng hoặc tải làm việc, bề mặt và mục đích sử dụng. Tên gọi thương mại chỉ là điểm bắt đầu; hợp đồng phải gắn với mã hàng và bản thông số được duyệt.`),
    viText("dinh-vi", "Vị trí sản phẩm trong kế hoạch mua B2B", ...positionAngles[profile.index % positionAngles.length](profile)),
    viText("ung-dung", "Ứng dụng và khách hàng mục tiêu", application, `${profile.name} có thể phục vụ phòng gym thương mại, nhà phân phối thiết bị thể hình, nhà nhập khẩu, thương hiệu riêng và dự án có danh mục thiết bị đồng bộ. Cấu hình cuối cùng phụ thuộc tần suất, người dùng và kênh bán.`),
    viText("khac-biet", "Lợi ích và giới hạn cần xác minh", ...differentiationText(profile)),
    viTable("thong-so", "Bảng thông số kỹ thuật cần xác nhận", ["Hạng mục", "Thông tin cho mã hàng", "Cách nghiệm thu"], [["Vật liệu và cấu tạo", materialText(profile), "Mẫu duyệt và hồ sơ vật liệu"], ["Dải quy cách", rangeText(profile), "Bảng mã và phép đo"], ["Bề mặt", "Màu, độ bóng, ký hiệu và vùng tiếp xúc theo mẫu", "Quan sát dưới điều kiện thống nhất"], ["Chức năng", "Theo mục đích sử dụng của mã hàng", "Lắp thử hoặc kiểm tra thao tác"], ["Bao bì", "Bảo vệ riêng, nhãn thùng và pallet theo dự án", "Mẫu đóng gói và packing list"]], "Các trị số cuối cùng nằm trong báo giá và tài liệu được duyệt, không suy đoán từ ảnh."),
    viText("vat-lieu", "Vật liệu, trọng lượng và kích thước", materialText(profile)),
    viText("san-xuat", "Quy trình sản xuất", processText(profile), "Mỗi lệnh sản xuất cần giữ cùng phiên bản bản vẽ, bảng màu, tệp logo và yêu cầu bao bì. Khi có thay đổi về vật liệu hoặc công đoạn, ảnh hưởng đến mẫu, giá và thời gian phải được xác nhận trước khi áp dụng."),
    viText("kiem-soat-chat-luong", "Kiểm soát chất lượng theo rủi ro", qcAngles[profile.index % qcAngles.length], `Đối với ${profile.name.toLowerCase()}, tiêu chí phải có giới hạn, dụng cụ và cỡ mẫu. Ảnh và video hỗ trợ truy xuất nhưng không thay thế số đo.`),
    viTable("so-sanh", "Bảng so sánh phương án mua", ["Phương án", "Lợi ích", "Điểm phải kiểm tra"], [["Mẫu tiêu chuẩn", "Thời gian chuẩn bị ngắn hơn", "Có phù hợp thị trường và danh mục không"], ["Tùy chỉnh logo", "Nhận diện thương hiệu rõ", "Phương pháp logo, vị trí, độ bền và tệp màu"], ["Tùy chỉnh sâu", "Khác biệt sản phẩm lớn", "Khuôn, MOQ, mẫu, trách nhiệm kỹ thuật và thời gian"], ["Đơn thử", "Giảm rủi ro trước khi mở rộng", "Mẫu có đại diện cho lô thương mại không"]]),
    viText("oem", "OEM, ODM và thương hiệu riêng", "Tùy chỉnh có thể gồm logo, màu, nhãn trọng lượng, tem, thùng và tài liệu đóng gói. Thay đổi ảnh hưởng cấu tạo hoặc khuôn cần được tách khỏi thay đổi đồ họa để xác định đúng MOQ, chi phí mẫu và lịch sản xuất.", "Brief OEM nên có thị trường bán, mã hàng, số lượng theo biến thể, tệp logo vector, mã màu, nội dung nhãn, bao bì, tiêu chí nghiệm thu và kế hoạch tái đặt hàng. ODM chỉ nên dùng khi phạm vi phát triển và quyền phê duyệt đã rõ."),
    viText("dong-goi", "Đóng gói, vận chuyển và nhận hàng", logisticsAngles[(profile.index * 5 + profile.category.length) % logisticsAngles.length], "Packing list phải hỗ trợ báo giá vận chuyển và kiểm nhận tại Việt Nam. Chi phí đến kho được xác nhận theo Incoterm với đơn vị logistics và hải quan."),
    viChecklist("checklist", "Checklist mua hàng", ["Mã hàng, ứng dụng và nhóm người dùng", "Dải trọng lượng, kích thước và đơn vị", "Vật liệu, màu, bề mặt và dung sai", "Số lượng từng biến thể và MOQ", "Logo, nhãn, thùng và tệp duyệt", "Mẫu đại diện và tiêu chí chấp nhận", "Kế hoạch QC hoặc kiểm định bên thứ ba", "Packing list, pallet, Incoterm và địa điểm nhận", "Phụ tùng, thay thế và kế hoạch tái đặt hàng"]),
    viText("bao-gia", "Quy trình yêu cầu báo giá", quoteAngles[(profile.index * 7 + profile.category.length) % quoteAngles.length], "PowerBaseFit xác nhận những điểm còn thiếu, khả năng sản xuất, MOQ và phương án mẫu trước khi đưa ra báo giá có thể so sánh.")
  ];
  return {
    locale: "vi", translationStatus: "localized", reviewStatus: "approved", publishStatus: "published", slug: profile.viSlug, publicPath,
    title: `${profile.name} cho phòng gym | Sản xuất OEM PowerBaseFit`,
    description: `${profile.name} cho nhà nhập khẩu, nhà phân phối và phòng gym: vật liệu, thông số, QC, đóng gói, OEM, logo riêng và yêu cầu báo giá B2B.`,
    h1: `${profile.name} cho phòng gym và mua hàng B2B`, body,
    faq: [
      { id: "faq-1", question: `${profile.name} có phù hợp với phòng gym thương mại không?`, answer: "Có thể phù hợp khi cấu hình, dải quy cách, mức sử dụng và tiêu chí QC khớp với dự án. Hãy cung cấp tần suất, người dùng và cách lưu trữ để xác nhận." },
      { id: "faq-2", question: `Có thể in logo riêng trên ${profile.name.toLowerCase()} không?`, answer: "Có, tùy vật liệu, phương pháp logo và số lượng. Tệp vector, vị trí, màu và độ bền được xác nhận bằng bản duyệt hoặc mẫu." },
      { id: "faq-3", question: "MOQ được xác định như thế nào?", answer: "MOQ phụ thuộc cấu tạo, màu, khuôn, logo, bao bì và cách xếp lịch sản xuất. PowerBaseFit xác nhận sau khi nhận brief theo từng biến thể." },
      { id: "faq-4", question: "Cần kiểm tra gì trước khi xuất hàng?", answer: "Kiểm tra mã hàng, số lượng, trọng lượng hoặc kích thước, chức năng, bề mặt, logo, nhãn, bao bì và packing list theo kế hoạch lấy mẫu đã thống nhất." },
      { id: "faq-5", question: "Làm sao nhận báo giá chính xác?", answer: "Gửi mã sản phẩm, số lượng từng biến thể, tùy chỉnh, bao bì, địa điểm giao và Incoterm mong muốn. Các giả định còn thiếu sẽ được làm rõ trước báo giá." }
    ],
    author: vietnameseEditorialAuthor, reviewedBy: vietnameseTechnicalReviewer,
    schemaData: { brand: "PowerBaseFit", manufacturer: "PowerBaseFit", category: meta.label, specifications: [{ name: "Từ khóa chính", value: profile.keyword }, { name: "Dải quy cách", value: rangeText(profile) }], breadcrumbs: [{ name: "Trang chủ", path: "/vi" }, { name: "Sản phẩm", path: "/vi/san-pham" }, { name: meta.label, path: meta.root }, { name: profile.name, path: publicPath }], extra: { primaryKeyword: profile.keyword, searchIntent: "Đánh giá sản phẩm B2B và yêu cầu báo giá" } },
    images: productImages(profile), internalLinks: [{ targetContentId: meta.categoryId, label: `Xem danh mục ${meta.label.toLowerCase()}` }, { targetContentId: "oem-private-label", label: "Quy trình OEM và thương hiệu riêng" }, { targetContentId: "factory", label: "Tìm hiểu nhà máy và QC" }, { targetContentId: "contact", label: "Yêu cầu báo giá" }],
    canonicalData: { mode: "self" }, hreflangData: { include: true }, updatedAt: "2026-07-20T10:00:00.000Z", publishedAt: "2026-07-20T10:00:00.000Z", version: 1
  };
}

export function englishPathForVietnameseProduct(profile: VietnameseProductProfile) {
  const section = profile.category === "dumbbells" ? "dumbbells" : profile.category === "plates" ? "weight-plates" : profile.category === "racks" ? "racks-benches" : "gym-accessories";
  return `/products/${section}/${profile.source.slug}`;
}

export function shadowEnglishVersionForVietnamese(profile: VietnameseProductProfile): LocalizedContentVersion {
  const publicPath = englishPathForVietnameseProduct(profile);
  return { locale: "en", translationStatus: "published", reviewStatus: "approved", publishStatus: "published", slug: profile.source.slug, publicPath, title: `${profile.source.name} | PowerBaseFit`, description: `${profile.source.name} for commercial buyers.`, h1: profile.source.name, body: [{ id: "overview", type: "rich_text", content: profile.source.type }], faq: [], schemaData: { brand: "PowerBaseFit", manufacturer: "PowerBaseFit", category: profile.source.type }, images: [{ id: "product", src: profile.source.image, alt: profile.source.name }], internalLinks: [], canonicalData: { mode: "self" }, hreflangData: { include: true }, updatedAt: "2026-07-20T10:00:00.000Z", publishedAt: "2026-07-20T10:00:00.000Z", version: 1 };
}
