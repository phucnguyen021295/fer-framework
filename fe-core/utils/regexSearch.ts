function removeVietnameseTones(str) {
  return str
    .normalize('NFD') // Chuẩn hóa về dạng tổ hợp ký tự
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu thanh
    .replace(/đ/g, 'd') // Thay 'đ' bằng 'd'
    .replace(/Đ/g, 'D') // Thay 'Đ' bằng 'D'
    .toLowerCase(); // Chuyển về chữ thường
}

// Hàm tìm kiếm với hỗ trợ tiếng Việt
export default function regexSearch(text: string, pattern: string) {
  // Loại bỏ dấu tiếng Việt trong text và pattern
  const normalizedText = removeVietnameseTones(text);
  const normalizedPattern = removeVietnameseTones(pattern);

  // Escape các ký tự đặc biệt trong pattern
  const escapedPattern = normalizedPattern.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&',
  );

  // Tạo một Regular Expression an toàn từ pattern đã escape
  const regex = new RegExp(escapedPattern, 'g');
  const match = normalizedText.match(regex);

  // Trả về vị trí nếu tìm thấy, nếu không thì trả về -1
  return match ? normalizedText.indexOf(match[0]) : -1;
}
