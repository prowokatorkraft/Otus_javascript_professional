'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const getDisplayName = (segment: string): string => {
  const pathNames: Record<string, string> = {
    'posts': 'Статьи',
    'about': 'О нас',
  };
  return pathNames[segment] || segment;
};

export default function Header() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header style={styles.header}>
      <Link href="/" style={styles.siteName}>Мой Блог</Link>
      <nav style={styles.breadcrumb}>
        <Link href="/" style={styles.homeLink}>
          🏠 Главная
        </Link>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const displayName = getDisplayName(segment);
          const isLast = index === pathSegments.length - 1;

          return (
            <span key={href} style={styles.breadcrumbItem}>
              <span style={styles.separator}> › </span>
              {isLast ? (
                <span style={styles.current}>{displayName}</span>
              ) : (
                <Link href={href === '/posts' ? '/' : href} style={styles.link}>
                  {displayName}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#2c3e50',
    color: 'white'
  },
  siteName: {
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center'
  },
  homeLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500'
  },
  breadcrumbItem: {
    display: 'flex',
    alignItems: 'center'
  },
  separator: {
    margin: '0 0.5rem',
    opacity: 0.7
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    hover: { color: '#2980b9' }
  },
  current: {
    opacity: 0.8,
    fontWeight: '500'
  }
};
