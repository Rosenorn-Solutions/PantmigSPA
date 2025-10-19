import blogData from "@/components/Blog/blogData";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import RelatedPost from "@/components/Blog/RelatedPost";

export async function generateStaticParams() {
  return blogData.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.find((b) => b.slug === slug);
  if (!post) return { title: "Blog | PantMig" };
  return {
    title: `${post.title} | PantMig`,
    description: post.paragraph,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.paragraph,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { readonly params: Promise<{ readonly slug: string }> }) {
  const { slug } = await params;
  const post = blogData.find((b) => b.slug === slug);
  if (!post) {
    return (
      <section className="pt-[150px] pb-[120px]"><div className="container"><p>Indlægget blev ikke fundet.</p></div></section>
    );
  }

  // Heuristic: treat the first content item as an intro, and the rest as bullets when short
  const intro = post.content?.[0];
  const rest = (post.content ?? []).slice(1);
  const showAsBullets = rest.length > 0 && rest.every((t) => t.length <= 140);

  const related = blogData
    .filter((b) => b.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <Breadcrumb pageName={post.title} description={post.paragraph} />

      <section className="pb-[120px] pt-12">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            {/* Content */}
            <div className="w-full px-4 lg:w-8/12">
              <article>
                {/* Meta */}
                <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-body-color">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full">
                      <Image src={post.author.image} alt={post.author.name} fill />
                    </div>
                    <span>Af {post.author.name}</span>
                  </div>
                  <span aria-hidden>•</span>
                  <span>{post.publishDate}</span>
                  {post.tags?.length ? (
                    <>
                      <span aria-hidden>•</span>
                      <span className="capitalize">{post.tags[0]}</span>
                    </>
                  ) : null}
                </div>

                {/* Cover image */}
                <div className="mb-8 w-full overflow-hidden rounded-sm">
                  <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                    <Image src={post.image} alt={post.title} fill className="object-cover object-center" />
                  </div>
                </div>

                {/* Body */}
                <div>
                  {intro ? (
                    <p className="mb-6 text-lg leading-relaxed text-black/90 dark:text-white/90">
                      {intro}
                    </p>
                  ) : null}

                  {showAsBullets ? (
                    <ul className="mb-8 list-inside list-disc space-y-2 text-base leading-relaxed text-body-color">
                      {rest.map((item) => (
                        <li key={`${post.slug}-${item.slice(0, 24)}`}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-4 text-base leading-relaxed text-body-color">
                      {rest.map((p) => (
                        <p key={`${post.slug}-${p.slice(0, 24)}`}>{p}</p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags + Share */}
                <div className="mt-10 flex flex-wrap items-center justify-between border-t border-stroke-stroke pt-6 dark:border-stroke-dark">
                  <div className="mb-4 flex flex-wrap lg:mb-0">
                    {post.tags?.map((t) => (
                      <TagButton key={t} href={`/blog?tag=${encodeURIComponent(t)}`} text={`#${t}`} />
                    ))}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 text-sm font-medium text-body-color">Del</span>
                    <SharePost />
                  </div>
                </div>

                {/* Author card */}
                <div className="mt-10 flex items-center gap-4 rounded-sm bg-gray-light p-5 dark:bg-gray-dark/50">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={post.author.image} alt={post.author.name} fill />
                  </div>
                  <div>
                    <p className="font-semibold text-black dark:text-white">{post.author.name}</p>
                    <p className="text-sm text-body-color">{post.author.designation}</p>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="w-full px-4 lg:w-4/12">
              <aside className="mt-12 lg:mt-0">
                <div className="mb-8 rounded-sm border border-stroke-stroke p-6 dark:border-stroke-dark">
                  <h4 className="mb-5 text-lg font-semibold text-black dark:text-white">Relaterede indlæg</h4>
                  <div className="space-y-5">
                    {related.map((r) => (
                      <RelatedPost
                        key={r.id}
                        image={r.image}
                        slug={`/blog/${r.slug}`}
                        title={r.title}
                        date={r.publishDate}
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-sm border border-stroke-stroke p-6 dark:border-stroke-dark">
                  <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">Tilbage til bloggen</h4>
                  <Link href="/blog" className="text-primary hover:underline">Se alle indlæg</Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
