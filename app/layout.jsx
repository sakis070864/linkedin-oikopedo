import "./globals.css";

export const metadata = {
  title: "Real Estate AI Plot Analyzer",
  description: "AI-Powered Real Estate Analytics Dashboard by Sakis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}