"use server";

import { cookies } from "next/headers";

export const saveToCookie = async (
  key: string,
  value: string,
  days: number = 7
): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    cookieStore.set(key, value, { maxAge: days * 24 * 60 * 60 });
    return true;
  } catch {
    return false;
  }
};

// This function handles default config for headers
export const getDefaultConfig = async (): Promise<RequestInit> => {
  const cookieStore = await cookies();
  const language = cookieStore.get("language");

  const config: RequestInit = {
    headers: {
      lang: (language?.value as string) || "en-us",
    },
    next: { revalidate: 60 },
  };

  return config;
};
