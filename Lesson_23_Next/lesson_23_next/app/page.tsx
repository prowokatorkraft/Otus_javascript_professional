import { getPosts } from "@/src/lib/api";
import Post from "@/src/components/Post";

export default async function Home() {
  let posts = await getPosts();

  return (
    <div style={styles.container}>
      <div style={styles.postsWrapper}>
        {posts.success ? (
          posts.value.length > 0 ? (
            <div style={styles.postsGrid}>
              {posts.value.map((post: any) => (
                <div key={post.id} style={styles.postCard}>
                  <Post post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <h3>Постов пока нет</h3>
              <p>Загляните позже — скоро появятся новые публикации!</p>
            </div>
          )
        ) : (
          <div style={styles.errorState}>
            <h3>Произошла ошибка</h3>
            <p>Не удалось загрузить посты. Попробуйте обновить страницу.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem',
    backgroundColor: '#f8f9fa'
  },
  postsWrapper: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto'
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    justifyContent: 'start'
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    padding: '12px',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)'
    }
  },
  emptyState: {
    textAlign: 'center' as const,
    padding: '3rem',
    color: '#6c757d'
  },
  errorState: {
    textAlign: 'center' as const,
    padding: '3rem',
    color: '#dc3545',
    backgroundColor: 'rgba(220, 53, 69, 0.05)',
    borderRadius: '8px'
  }
};
