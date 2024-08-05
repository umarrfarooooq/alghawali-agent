import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'my', 'ne', 'in', 'id'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound();
  }

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    notFound();
  }
});
