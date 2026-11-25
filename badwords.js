/*
 * DANH SÁCH TỪ NGỮ KHÔNG PHÙ HỢP
 * ------------------------------------------------------------
 * Bạn có thể thêm hoặc xoá từ ở đây (mỗi từ nằm trong dấu "" và cách nhau bằng dấu phẩy).
 * Không cần phân biệt chữ hoa, chữ thường.
 *
 * Có 4 nhóm:
 *
 * 1. accent: từ PHẢI viết đúng dấu mới bị chặn.
 *    Dùng cho từ mà khi bỏ dấu sẽ trùng với từ bình thường.
 *    Ví dụ "buồi" (tục) và "buổi" (buổi tiệc), "lồn" và "lồng đèn", "đụ" và "đụng".
 *
 * 2. plain: từ bị chặn dù viết có dấu, không dấu, hay viết kéo dài (địttt).
 *    Chỉ đưa vào đây những từ mà bỏ dấu rồi vẫn không trùng từ thường dùng.
 *
 * 3. Cụm từ (có dấu cách) được tự ghép lại, nên "dit me", "dit  me", "ditme" đều bị bắt.
 *
 * 4. squash: bị chặn khi nằm LẪN trong câu kể cả khi bị tách chữ ("f u c k", "d.i.t.m.e").
 *    Chỉ dùng cho từ dài và đặc trưng, vì nhóm này dễ chặn nhầm.
 */
module.exports = {
  // ---- 1. Phải đúng dấu ----
  accent: [
    "địt", "dịt", "đụ", "đéo", "đĩ", "lồn", "lổn", "cặc", "cẹc", "buồi", "cứt", "chịch",
    "địt mẹ", "địt cụ", "địt con mẹ", "đụ má", "đụ mẹ",
    "con đĩ", "đồ đĩ", "cái lồn", "mẹ mày",
    "chó chết", "đồ chó", "thằng chó", "óc chó",
    "đồ ngu", "thằng ngu", "con ngu", "ngu ngốc",
    "đồ khốn", "thằng khốn", "khốn nạn", "súc vật",
    "mất dạy", "vô học", "câm mồm", "câm mõm", "đờ mờ", "đê mờ", "vãi lồn", "vãi cứt",
  ],

  // ---- 2. Bỏ dấu vẫn chặn (tiếng Việt + tiếng Anh) ----
  plain: [
    // Tiếng Việt, viết không dấu và viết tắt
    "dit", "dit me", "dit con me", "dit cu", "dit bo",
    "dm", "dmm", "dcm", "dcmm", "dkm", "dkmm", "cdmm",
    "vcl", "vkl", "vl", "vloz", "vlon", "vclon",
    "cmm", "cmn", "cmnr", "clgt", "clm", "loz",
    // Tiếng Anh
    "fuck", "fucked", "fucking", "fucker", "fuckers", "motherfucker", "fuk", "fck", "fcuk", "fack", "phuck",
    "shit", "shits", "shitty", "bullshit",
    "bitch", "bitches", "bastard", "asshole", "assholes", "dumbass", "jackass",
    "cunt", "pussy", "whore", "slut", "dickhead",
    "nigger", "nigga", "niggas", "faggot", "fag", "retard", "retarded",
    "wtf", "stfu", "porn",
  ],

  // ---- 4. Chặn dù bị tách chữ hoặc dính liền trong câu ----
  squash: ["fuck", "ditme", "ditmay", "ditcon", "motherfucker", "nigger", "faggot"],
};
