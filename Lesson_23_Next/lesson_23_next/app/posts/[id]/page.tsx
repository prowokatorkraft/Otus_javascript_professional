'use client';

import { getPosts, getUserById } from "@/src/lib/api";
import { type Post } from "@/src/types/Post";
import { type User } from "@/src/types/User";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        setError(null);

        const { id } = await params;
        const posts = await getPosts();
        if (!posts.success) {
          throw new Error(posts.error?.message || 'Не удалось загрузить посты');
        }

        const currentPost = posts.value.find(p => p.id === Number(id));
        if (!currentPost) {
          throw new Error('Пост не найден');
        }
        setPost(currentPost);

        const userResponse = await getUserById(currentPost.userId);
        if (userResponse.success) {
          setUser(userResponse.value);
        } else {
          console.warn('Не удалось загрузить информацию о пользователе');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params]);

  if (loading) {
    return <PostSkeleton />;
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2 style={styles.errorTitle}>Ошибка</h2>
        <p style={styles.errorMessage}>{error}</p>
        <Link href="/posts" style={styles.backLink}>
          ← Вернуться к списку постов
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={styles.notFoundContainer}>
        <h2 style={styles.notFoundTitle}>Пост не найден</h2>
        <Link href="/posts" style={styles.backLink}>
          ← Вернуться к списку постов
        </Link>
      </div>
    );
  }

  return (
    <article style={styles.postContainer}>
      <header style={styles.postHeader}>
        <h1 style={styles.postTitle}>{post.title}</h1>
        <div style={styles.authorInfo}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p style={styles.authorName}>
              {user?.name || 'Автор неизвестен'}
            </p>
            {user?.email && (
              <p style={styles.authorEmail}>{user.email}</p>
            )}
          </div>
        </div>
      </header>

      <div style={styles.postContent}>
        <p style={styles.postBody}>{post.body}</p>
      </div>

      <footer style={styles.postFooter}>
        <div style={styles.metaInfo}>
          <span style={styles.metaItem}>ID: {post.id}</span>
          <span style={styles.metaItem}>User ID: {post.userId}</span>
        </div>
        <Link href="/" style={styles.backLink}>
          ← Вернуться к списку постов
        </Link>
      </footer>
    </article>
  );
}

// Загрузчик скелетон
function PostSkeleton() {
  return (
    <div style={styles.skeletonContainer}>
      <div style={styles.skeletonTitle} />
      <div style={styles.skeletonAuthor} />
      <div style={styles.skeletonBody} />
      <div style={styles.skeletonBody} />
      <div style={{...styles.skeletonBody, width: '80%'}} />
    </div>
  );
}
// Анимация пульсации для скелетона
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

const styles = {
  postContainer: {
    maxWidth: '800px',
    margin: '2rem auto',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif'
  },
  postHeader: {
    padding: '2rem 2rem 1rem',
    borderBottom: '1px solid #eaeaea'
  },
  postTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#333',
    lineHeight: '1.2'
  },
  authorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  authorName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0
  },
  authorEmail: {
    fontSize: '0.9rem',
    color: '#7f8c8d',
    margin: '0.25rem 0 0'
  },
  postContent: {
    padding: '2rem',
    lineHeight: '1.6',
    color: '#444'
  },
  postBody: {
    fontSize: '1.1rem',
    marginBottom: '1rem'
  },
  postFooter: {
    padding: '1.5rem 2rem',
    borderTop: '1px solid #eaeaea',
    backgroundColor: '#f8f9fa'
  },
  metaInfo: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap' as const
  },
  metaItem: {
    fontSize: '0.85rem',
    color: '#6c757d',
    backgroundColor: '#e9ecef',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px'
  },
  backLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s',
    ':hover': {
      color: '#2980b9'
    }
  },
  // Стили для состояния ошибки
  errorContainer: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    color: '#dc3545'
  },
  errorTitle: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  errorMessage: {
    fontSize: '1.1rem',
    marginBottom: '2rem'
  },
  notFoundContainer: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
    color: '#6c757d'
  },
  notFoundTitle: {
    fontSize: '2rem',
    marginBottom: '2rem'
  },
  // Стили для скелетона
  skeletonContainer: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '16px',
    animation: 'pulse 1.5s infinite'
  },
  skeletonTitle: {
    height: '36px',
    backgroundColor: '#e9ecef',
    borderRadius: '8px',
    marginBottom: '1.5rem'
  },
  skeletonAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  skeletonAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#e9ecef'
  },
  skeletonBody: {
    height: '16px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
    marginBottom: '0.75rem'
  }
};