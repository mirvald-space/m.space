import Image from "next/image";
import { socialLinks } from "./config";
import Link from "next/link";

export default function Page() {
  return (
    <section>
      <Link href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full  block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </Link>


      <h1 className="mb-8 text-2xl font-medium tracking-tight">
      Product Designer & Python Developer: Creating Intelligent Digital Solutions
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
        I create <strong>end-to-end digital products</strong> that combine design excellence with automation power:
        </p>
        <p>
        🎨 DESIGN: <strong>Research-driven UX/UI </strong>for fintech, EdTech & SaaS (Figma, design systems, wireframes)
          .
        </p>
        <p>🤖 DEVELOPMENT: <strong>Telegram bots with AI integration</strong>, web scrapers, workflow automation (Python, Aiogram)</p>
        <p>My dual expertise delivers complete solutions — beautiful interfaces backed by intelligent automation that <strong>increases metrics by 15-30%</strong> while <strong>reducing manual operations by 90%.</strong></p>
        <p>Let's build something exceptional together!</p>

      </div>
    </section>
  );
}
