// Admin app shell: installable on the phone's home screen (start page: /admin/demandes).
export const metadata = {
  title: 'Demandes — Dépannage.be',
  manifest: '/app-admin.webmanifest',
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: 'Demandes', statusBarStyle: 'default' },
}

export const viewport = { themeColor: '#1A1A2E' }

export default function AdminLayout({ children }) {
  return children
}
