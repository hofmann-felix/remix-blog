import {Link, Outlet, useLoaderData} from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";
import adminStyles from "~/styles/admin.css";

/*
Each route can export a links function that returns array of <link> tags, except in object form instead of HTML.
So we use { rel: "stylesheet", href: adminStyles} instead of <link rel="stylesheet" href="..." />.
This allows Remix to merge all of your rendered routes links together and render them in the <Links/> element
at the top of your document. You can see another example of this in root.tsx if you're curious.
*/
export const links = () => {
    return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = () => {
    return getPosts();
};

export default function Admin() {
    const posts = useLoaderData<Post[]>();
    return (
        <div className="admin">
            <nav>
                <h1>Admin</h1>
                <ul>
                    {posts.map(post => (
                        <li key={post.slug}>
                            <Link to={`/posts/${post.slug}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}