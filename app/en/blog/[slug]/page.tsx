import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/lib/posts";
import { metaData } from "app/config";

export async function generateStaticParams() {
  let posts = getBlogPosts('en');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = getBlogPosts('en').find((post) => post.slug === slug);
  if (!post) {
    return;
  }
  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${metaData.baseUrl}/og?title=${encodeURIComponent(title)}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${metaData.baseUrl}/en/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  try {
    const { slug } = await params;
    let post = getBlogPosts('en').find((post) => post.slug === slug);
    if (!post) {
      notFound();
    }
    // Проверяем, есть ли украинская версия
    const hasUkr = getBlogPosts('uk').some((p) => p.slug === slug);
    return (
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${metaData.baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${metaData.baseUrl}/en/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: metaData.name,
              },
            }),
          }}
        />
        <h1 className="title mb-3 font-medium text-2xl tracking-tight">
          {post.metadata.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-medium">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
          {hasUkr && (
            <a
              href={`/blog/${slug}`}
              className="text-xs underline text-blue-600 hover:text-blue-800 ml-4"
            >
              Читати українською
            </a>
          )}
        </div>
        <article className="prose prose-quoteless prose-neutral dark:prose-invert">
          <CustomMDX source={post.content} />
        </article>
      </section>
    );
  } catch (error) {
    console.error("Error in Blog component:", error);
    return <div>Error rendering blog: {error?.message || String(error)}</div>;
  }
} 