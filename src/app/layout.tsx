import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '../components/ui/sonner';
import { Inter } from 'next/font/google';
import { SidebarProvider } from '../components/ui/sidebar';
import SideBar from '../components/global/app-sidebar';
import Navbar from '../components/global/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <SideBar />
          <Navbar />

          <main className='container mx-auto flex gap-4 px-1 md:px-4 pt-[84px]'>
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
