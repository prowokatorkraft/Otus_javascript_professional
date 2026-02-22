import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
