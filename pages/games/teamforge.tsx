import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const TeamForgeApp = dynamic(() => import("@/components/teamforge/TeamForgeApp"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0B0B14] flex flex-col items-center justify-center text-white gap-3">
      <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      <span className="text-xs text-slate-400 tracking-wider uppercase font-mono">Loading TeamForge Arena...</span>
    </div>
  ),
});

export default function TeamForgePage() {
  const router = useRouter();

  const handleExit = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>TeamForge: Build Your Team | Multiverse Squad Auction</title>
        <meta
          name="description"
          content="Draft legends across Marvel, DC, Anime, Sports & more in a budget auction. Evaluate the ultimate squad with AI or tactical analysis!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <TeamForgeApp onExit={handleExit} />
    </>
  );
}
