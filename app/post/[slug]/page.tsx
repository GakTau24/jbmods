import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

const getDetailPost = async (slug: string) => {
  const res = await prisma.post.findMany({
    where: {
      slug: slug,
    },
  });
  return res;
};

async function page({ params }: any) {
  const detail = await getDetailPost(params.slug);

  if (detail && detail.length > 0) {
    const post = detail[0];

    const convertLinksToClickable = (text: string) => {
      const urlRegex = /(?:https?|ftp):\/\/[\S]+/g;
      return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="text-blue-600 hover:text-blue-800">${url}</a>`);
    };

    const contentWithClickableLinks = convertLinksToClickable(post.content);

    return (
      <div className="flex justify-center items-center flex-col lg:mx-20 max-sm:mx-1 lg:my-10 py-6 gap-2 rounded-xl shadow-xl">
        {post.picture && post.picture.startsWith("https://") && post.title && (
          <div className="max-sm:w-full max-sm:px-2">
            <Image
              src={post.picture}
              width={500}
              height={500}
              alt={post.title}
              objectFit="cover"
              priority
            />
          </div>
        )}
        <h1 className="text-xl font-bold">{post.title}</h1>
        <div
          className="w-full lg:px-10 max-sm:px-3 whitespace-pre"
          dangerouslySetInnerHTML={{ __html: contentWithClickableLinks }}
        />
        <p className="text-right w-full lg:px-10 max-sm:px-3">
          Create: {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p className="text-right w-full lg:px-10 max-sm:px-3">
          Update: {new Date(post.updatedAt).toLocaleDateString()}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-center text-xl font-bold">Post not found</h1>
    </div>
  );
}

export default page;
