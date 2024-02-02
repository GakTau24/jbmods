import Posts from "@/components/Posts/Posts";
import SearchInput from "@/components/Search/Search";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: any
): Promise<Metadata> {

  const previousImages = (await parent)?.openGraph?.images || [];
  return {
    title: `Home - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    openGraph: {
      images: [
        {
          url: "https://cdn.discordapp.com/icons/885774856770174996/a_e8a9eaf76be1cc621c0e91169b788d34.png?size=240",
          alt: "JBMods",
        },
        ...previousImages,
      ],
      title: `Home - ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      description: `Download Mod GTA hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    description: `Download Mod GTA hanya di ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    icons: "",
    keywords: [
      `${process.env.NEXT_PUBLIC_SITE_NAME}`,
      `download mod gta sa`,
      `download mod gta samp`,
      `download cleo gta sa`,
      `download cleo gta samp`,
    ],
  };
}

function page() {
  return (
    <>
      <div className="py-5">
        <SearchInput />
        <Posts />
      </div>
    </>
  );
}

export default page;
