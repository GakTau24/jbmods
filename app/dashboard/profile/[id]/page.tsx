import Profile from "@/components/Dashboard/ProfileUsers/Profile";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {
  const session = await getServerSession();
  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `${session?.user.name} Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: session?.user.image,
          alt: session?.user.name,
        },
        ...previousImages,
      ],
      title: `${session?.user.name} Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `${session?.user.name} Dashboard - ${process.env.NEXT_PUBLIC_SITE_NAME}`
    },
  };
}

function page({ params }) {
  const { id } = params;
  return (
    <>
      <Profile id={id} />
    </>
  );
}

export default page;
