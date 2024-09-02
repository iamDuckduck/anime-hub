
export default function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): T {
    let timeout: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    } as T;
  }