import Button from '../components/Button';
import ab_img1 from '../assets/ab_img1.png';
import ab_img2 from '../assets/ab_img2.png';
import ab_img3 from '../assets/ab_img3.png';
import ab_img4 from '../assets/ab_img4.png';
import ab_img5 from '../assets/ab_img5.png';


const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-800 to-black overflow-hidden">
              <img
                src={ab_img1}
                alt="Resident Evil Requiem logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>


          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              The Legacy Continues
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A global production for the ninth mainline entry
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              *Resident Evil: Requiem* represents a massive international effort. For the first time
              in series history, the game features a full Latin American Spanish dub alongside
              returning favorites in English, Japanese, French, Italian, German, European Spanish,
              Mandarin Chinese, Brazilian Portuguese, and Russian. The cast is led by Angela Sant'Albano
              as Grace Ashcroft, with Nick Apostolides returning as Leon S. Kennedy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Watch the Trailer
              </Button>
              <Button to="/articles">Read Development Stories</Button>
            </div>
          </div>
        </div>
      </section>


      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            The Characters of Requiem
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Familiar faces and new threats</h2>
          <p className="mt-2 text-sm text-zinc-600 max-w-2xl mx-auto">
            A diverse cast brings the final chapter to life
          </p>
        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-xl font-bold text-zinc-900">Grace Ashcroft</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Angela Sant'Albano
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-xl font-bold text-zinc-900">Leon S. Kennedy</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Nick Apostolides
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-xl font-bold text-zinc-900">Sherry Birkin</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Eden Riegel
            </p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-xl font-bold text-zinc-900">Victor Gideon</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Antony Byrne
            </p>
          </div>
        </div>
      </section>


      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Behind the Scenes
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              The making of a survival horror epic
            </h2>
            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  A Truly Global Production
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Recorded in over ten languages with a cast of hundreds, *Requiem* is Capcom's most
                  ambitious localization effort. The addition of Latin American Spanish marks a milestone
                  for the franchise, ensuring wider accessibility.
                </p>
              </article>


              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  The RE Engine Evolved
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Building on the technology behind *Resident Evil Village*, *Requiem* allows seamless
                  switching between first and third-person perspectives. This innovation gives players
                  unprecedented control over their horror experience.
                </p>
              </article>


              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Honoring 30 Years of Fear
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  From collaborations with Babymetal to exclusive merchandise and a Universal Studios
                  Japan attraction, *Requiem* is a full-scale celebration of the franchise's enduring
                  legacy and its passionate global community.
                </p>
              </article>
            </div>
          </div>


          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Iconic Moments
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-800 to-gray-800 overflow-hidden">
                <img
                  src={ab_img2}
                  alt="Leon S. Kennedy in Requiem"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?w=300&h=300&fit=crop"}
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-green-800 to-gray-800 overflow-hidden">
                <img
                  src={ab_img3}
                  alt="Sherry Birkin in Requiem"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=300&h=300&fit=crop"}
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-purple-800 to-gray-800 overflow-hidden">
                <img
                  src={ab_img4}
                  alt="Alyssa Ashcroft in Requiem"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&h=300&fit=crop"}
                />
              </div>
              <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-blue-800 to-gray-800 overflow-hidden">
                <img
                  src={ab_img5}
                  alt="Emily in Requiem"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=300&h=300&fit=crop"}
                />
              </div>
            </div>
            <Button className="mt-5 w-full">Explore Character Bios</Button>
          </div>
        </div>
      </section>
    </div>
  );
};


export default AboutPage;