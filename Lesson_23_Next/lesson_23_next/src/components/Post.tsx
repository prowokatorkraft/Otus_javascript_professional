import {type Post} from "@/src/types/Post";
import Link from "next/link";

interface PostProps {
    post: Post
}

export default function Post({ post }: PostProps) {
    return (
      <div>
        <Link href={`/posts/${post.id}`}>
          {post.title}
        </Link>
      </div>
    );
}
