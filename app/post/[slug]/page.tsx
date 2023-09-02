import DetailPosts from "@/components/Posts/detailPosts";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import NotFound from "@/components/Handler/NotFound";
import Comments from "@/components/Posts/Comments";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {
  const posts = await getDetailPost(params.slug);
  const post = posts[0];
  if (!post) {
    return {
      ...NotFound,
    };
  }

  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `${post.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: post.picture,
          alt: post.title,
        },
        ...previousImages,
      ],
      title: `${post.title} - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Download Mod GTA ${post.title} hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Download Mod GTA ${post.title} hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    icons: "",
    keywords: [
      `${process.env.NEXT_PUBLIC_SITE_NAME}`,
      `download mod gta sa ${post.title}`,
      `download mod gta samp ${post.title}`,
      `download cleo gta sa ${post.title}`,
      `download cleo gta samp ${post.title}`,
    ],
  };
}

const prisma = new PrismaClient();

const getDetailPost = async (slug: string) => {
  const res = await prisma.post.findMany({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
      },
    },
  });
  if (!res) {
    return NotFound;
  } else {
    return res;
  }
};

async function page({ params }) {
  const { slug } = params;
  const posts = await getDetailPost(slug);

  if (posts.length === 0) {
    return NotFound;
  }

  const post = posts[0];

  return (
    <>
      <DetailPosts slug={slug} posts={posts} />
      <Comments postId={post.id} />
    </>
  );
}

export default page;
