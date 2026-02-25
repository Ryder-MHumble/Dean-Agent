import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 验证URL是否有效
 * @param url - 待验证的URL字符串
 * @returns 如果URL格式有效返回true，否则返回false
 */
export function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 检查数据项是否包含有效的sourceUrl
 * @param item - 包含sourceUrl字段的对象
 * @returns 如果sourceUrl有效返回true，否则返回false
 */
export function hasValidSourceUrl(item: { sourceUrl?: string }): boolean {
  return isValidUrl(item.sourceUrl);
}
