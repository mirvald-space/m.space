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
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
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
        I create end-to-end digital products that combine design excellence with automation power:
        </p>
        <p>
        🎨 DESIGN: Research-driven UX/UI for fintech, EdTech & SaaS (Figma, design systems, wireframes) {""}
          <a
            target="_blank"
            href="#"
          >
            more
          </a>
          .
        </p>
        <p>🤖 DEVELOPMENT: Telegram bots with AI integration, web scrapers, workflow automation (Python, Aiogram)</p>
        <p>My dual expertise delivers complete solutions — beautiful interfaces backed by intelligent automation that increases metrics by 15-30% while reducing manual operations by 90%.</p>
        <p>Let's build something exceptional together!</p>

      </div>
    </section>
  );
}
