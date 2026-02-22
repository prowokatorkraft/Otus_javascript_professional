import {Post} from "@/src/types/Post";
import {User} from "@/src/types/User";
import {type Response, useFetchApi} from "@/src/hooks/FetchApi";

export async function getPosts(): Promise<Response<Post[]>> {
  return await useFetchApi<Post[]>('https://jsonplaceholder.typicode.com/posts');
}

export async function getUserById(id: number): Promise<Response<User>> {
  return await useFetchApi<User>('https://jsonplaceholder.typicode.com/users/' + id);
}