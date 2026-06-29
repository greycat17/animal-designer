import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '动物家园设计师',
  description:
    '一款适合一二年级小学生的趣味H5网页应用，自由拖拽可爱动物素材，设计属于自己的动物家园！',
  openGraph: {
    title: '动物家园设计师',
    description: '自由拖拽可爱动物素材，设计属于你的动物家园！',
    locale: 'zh_CN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
