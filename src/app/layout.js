import './globals.css';

export const metadata = {
  title: 'WarThunder.Info - База знаний игры',
  description: 'Полная информация о технике, нациях и новостях War Thunder',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}