export function formatParams(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== "") // Loại bỏ các trường có giá trị ""
  );
}
