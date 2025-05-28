export const getSystemTheme = (): "light" | "dark" => {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch {
    return "light"; // Default theme for server or unsupported environments
  }
};

