import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.legal}>
          <Link href="/" style={styles.legalLink}>
            Политика конфиденциальности
          </Link>
          <Link href="/" style={styles.legalLink}>
            Условия использования
          </Link>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Мой Блог. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '2rem 0',
    marginTop: 'auto'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem'
  },
  siteInfo: {
    textAlign: 'center' as const
  },
  siteTitle: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  description: {
    color: '#bdc3c7',
    fontSize: '0.9rem',
    maxWidth: '400px',
    margin: '0 auto'
  },
  breadcrumb: {
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
    fontSize: '0.9rem'
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
    transition: 'color 0.2s',
    ':hover': {
      color: '#2980b9'
    }
  },
  current: {
    opacity: 0.8,
    fontWeight: '500'
  },
  legal: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.2rem',
    textAlign: 'center' as const
  },
  legalLink: {
    color: '#95a5a6',
    textDecoration: 'none',
    fontSize: '0.85rem',
    transition: 'color 0.2s',
    ':hover': {
      color: '#7f8c8d'
    }
  },
  copyright: {
    color: '#7f8c8d',
    fontSize: '0.8rem',
    marginTop: '1rem'
  }
};
