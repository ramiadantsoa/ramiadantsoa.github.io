import * as fs from 'fs';
import path from 'path';
import Head from 'next/head';
import bibtexParse from 'bibtex-parser-js';
import PublicationCard from '../components/PublicationCard';

export async function getStaticProps() {
  const bibPath = path.join(process.cwd(), 'content', 'publications.bib');
  let published: any[] = [];
  let inPrep: any[] = [];

  if (fs.existsSync(bibPath)) {
    const bibRaw = fs.readFileSync(bibPath, 'utf8');
    const parsedBib = bibtexParse.toJSON(bibRaw) || [];

    published = parsedBib.filter(
      (item: any) => item.entryType && item.entryType.toLowerCase() === 'article'
    );
    inPrep = parsedBib.filter(
      (item: any) => item.entryType && item.entryType.toLowerCase() === 'unpublished'
    );
  }

  return {
    props: {
      published,
      inPrep,
    },
  };
}

export default function Home({ published, inPrep }: { published: any[]; inPrep: any[] }) {
  return (
    <>
      <Head>
        <title>Tanjona&apos;s Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen w-full bg-white text-gray-800 flex flex-col">
        <main className="flex-grow w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 space-y-14">
          {/* HERO / MAP */}
          <section className="text-center w-full">
            <img
              src="/images/map_helena.png"
              alt="Map of the world"
              className="w-full max-w-4xl mx-auto h-auto rounded-lg"
            />
            <h2 className="mt-6 text-xl sm:text-2xl font-medium bg-teal-600 text-white py-3 px-6 rounded shadow-sm w-full">
              Theory at the service of conservation
            </h2>
          </section>

          {/* ABOUT */}
          <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 lg:col-span-3">
              <img
                src="/images/photo_tanjona_web.jpg"
                alt="Tanjona"
                className="rounded-lg shadow w-full max-w-xs mx-auto md:max-w-none object-cover"
              />
            </div>
            <div className="md:col-span-8 lg:col-span-9 space-y-4 leading-relaxed text-gray-700 text-base">
              <h3 className="text-2xl font-bold text-teal-700">About</h3>
              <p>
                I am a Malagasy ecologist and develop mathematical and statistical models to better understand patterns and processes of biodiversity loss.
              </p>
              <p>
                I obtained a MSc in applied mathematics with Arthur Randrianarivony at the University of Antananarivo. I did a PhD with Ilkka Hanski and Otso Ovaskainen at the University of Helsinki. I completed a first postdoc with Emma Goldberg at the University of Minnesota, and a second postdoc with Anthony Ives and Monica G. Turner at the University of Wisconsin-Madison (
                <a href="http://www.aces.ecology.wisc.edu" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-medium">
                  ACES
                </a>
                ), and is doing a third postdoc with Benjamin Roche at the University of Montpellier on COVID-19 modeling. I am currently a lecturer at the department of Life Science and department of Mathematics at the University of Fianarantsoa. I am also a Honorary Fellow at the University of Wisconsin-Madison.
              </p>
            </div>
          </section>

          {/* RESEARCH */}
          <section id="research" className="space-y-6">
            <h3 className="text-2xl font-bold text-teal-700 border-b border-gray-200 pb-2">Research</h3>
            <p className="leading-relaxed text-gray-700">
              I work at the interface of theoretical ecology and conservation biology. I assess the role of environmental variability, spatial processes, and species interactions to understand stability and resilience of ecosystems. My work spans various continents: Asia, Europe, Northern America, and Madagascar, and involves topics such as phylogeography, paleoecology, and contemporary ecology. My research are generally motivated by conservation related questions in Madagascar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="border border-gray-200 p-5 rounded-lg bg-white shadow-sm flex flex-col">
                <img
                  src="/images/mdg_forest.png"
                  alt="habitat destruction in Madagascar"
                  className="mb-4 h-48 w-full object-contain mx-auto"
                />
                <h4 className="font-semibold text-lg text-teal-700 mb-2">
                  Habitat destructions and landscape heterogeneity
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  I use and combine the strength of spatial ecology and landscape ecology for applications in conservation biology to:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  <li>Quantify the loss of habitat quality, quantity, and fragmentation in Madagascar</li>
                  <li>Elaborate on how species-area relationship (SAR) and its derivatives can be used to estimate biodiversity loss</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="border border-gray-200 p-5 rounded-lg bg-white shadow-sm flex flex-col">
                <img
                  src="/images/niche.png"
                  alt="thermal performance curve"
                  className="mb-4 h-48 w-full object-contain mx-auto"
                />
                <h4 className="font-semibold text-lg text-teal-700 mb-2">
                  Species&apos; niche
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Niche is a central ecological concept that characterizes how a species responds to the environment and thus for its conservation. I am currently:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  <li>Using metabolic theory to understand thermal performance curve</li>
                  <li>Characterizing the limits of various regeneration strategies to disturbance regime</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="border border-gray-200 p-5 rounded-lg bg-white shadow-sm flex flex-col">
                <img
                  src="/images/stochasticity.png"
                  alt="extinction threshold as a function of niche breadth"
                  className="mb-4 h-48 w-full object-contain mx-auto"
                />
                <h4 className="font-semibold text-lg text-teal-700 mb-2">
                  Stochastic processes
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Stochasticity can be more than a noise in shaping biodiversity patterns, I aim to:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  <li>Assess the relative role of deterministic and stochastic processes for community assembly, stability, and resilience</li>
                  <li>Diversify the type of stochastic processes used in models</li>
                </ul>
              </div>

              {/* Card 4 */}
              <div className="border border-gray-200 p-5 rounded-lg bg-white shadow-sm flex flex-col">
                <img
                  src="/images/phylogeny.png"
                  alt="phylogenetic pattern"
                  className="mb-4 h-48 w-full object-contain mx-auto"
                />
                <h4 className="font-semibold text-lg text-teal-700 mb-2">
                  Miscellaneous
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I am broadly interested in method developments, from phylogenetic comparative methods to pragmatic statistical approach to optimize fungal spores counting. I have been analyzing large spatiotemporal data: crop yield in the USA, evolution of malaria in Madagascar, and influence of political instability on the economy of Madagascar. If it isn&apos;t obvious yet, I am always excited to venture into new projects.
                </p>
              </div>
            </div>
          </section>

          {/* PUBLICATIONS */}
          <section id="publications">
            <h3 className="text-2xl font-bold text-teal-700 border-b border-gray-200 pb-2 mb-4">
              Publications and in prep.
            </h3>

            {published.length > 0 && <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Published</h4>}
            {published.map((pub, idx) => (
              <PublicationCard key={idx} pub={pub} />
            ))}

            {inPrep.length > 0 && <h4 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Submitted &amp; In Prep</h4>}
            {inPrep.map((pub, idx) => (
              <PublicationCard key={idx} pub={pub} />
            ))}
          </section>

          {/* TEACHING AND OUTREACH */}
          <section id="outreach" className="space-y-4 leading-relaxed text-gray-700">
            <h3 className="text-2xl font-bold text-teal-700 border-b border-gray-200 pb-2">
              Teaching and outreach
            </h3>
            <p>
              I spent a bit of my time showing how mathematics can be applied to ecology and conservation, and giving a glimpse of the life of a research to high school students in Madagascar. I also co-founded (with Cara Brook) and teach workshops (
              <a href="http://www.e2m2.org" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-medium">
                E2M2
              </a>
              ) to improve quantitative skills in Madagascar. Benjamin Rice and I are supporting (financially and academically) master&apos;s students in the STEM field until completion of the thesis. I am also creating a new peer review scientific journal called &quot;zava-boary&quot; (nature in Malagasy) to provide masters students an opportunity to publish their work free of charge.
            </p>
            <p>
              My other activities include fostering cultural exchanges between Madagascar and other countries. I am a member of two societies: the Finnish-based (Suomi-Madagascar Seura) and the Malagasy-based (Madagascar-Finland). On top of cultural exchanges, we organize fund raising to help underprivileged students in Madagascar.
            </p>
          </section>

          {/* CONTACT & CV */}
          <section id="contact" className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-bold text-teal-700 mb-4">Contact &amp; CV</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>
                My{' '}
                <a href="/Ramiadantsoa_FullCV.pdf" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-medium">
                  CV
                </a>
              </li>
              <li>Email: ramiadantsoa-AT-wisc.edu</li>
              <li>
                Twitter:{' '}
                <a href="https://twitter.com/TRamiadantsoa" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline font-medium">
                  @TRamiadantsoa
                </a>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}