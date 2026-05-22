"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import PostCard from "./PostCard";
import { getTrendingPosts } from "../services/api";

function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await getTrendingPosts();
        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading || posts.length === 0) return null;

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 text-saffron-muted">
            <Flame size={18} />
            <p className="text-sm font-semibold uppercase tracking-[0.24em]">Popular</p>
          </div>
          <h3 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Trending blogs
          </h3>
          <p className="mt-1 text-sm leading-7 text-stone-500 dark:text-stone-400">
            Most-read posts across the site.
          </p>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-saffron hover:text-saffron-muted transition shrink-0"
        >
          View all →
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onPostClick={() => {}} />
        ))}
      </div>
    </section>
  );
}

export default TrendingPosts;
