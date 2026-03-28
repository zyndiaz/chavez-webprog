import Button from '../components/Button';
import ar_img1 from '../assets/ar_img1.png';
import ar_img2 from '../assets/ar_img2.png';
import ar_img3 from '../assets/ar_img3.png';
import ar_img4 from '../assets/ar_img4.png';


const ArticlePage = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <section className='border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 text-center'>
                <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                    The Requiem Archives
                </p>
                <h1 className='max-w-3xl mx-auto text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl'>
                    Deep dive into the world of Resident Evil: Requiem
                </h1>
                <p className='mt-4 max-w-2xl mx-auto text-sm leading-7 text-zinc-600 sm:text-base'>
                    Explore exclusive insights, character backgrounds, and the lore connecting *Requiem*
                    to the wider Resident Evil universe. Uncover the truth behind the Ashford conspiracy
                    and prepare for the ultimate survival horror experience.
                </p>
                <div className='mt-6'>
                    <Button to='/'>Explore All Articles</Button>
                </div>
            </section>


            <section className='border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='mb-6'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                        Featured Articles
                    </p>
                    <h2 className='mt-2 text-2xl font-semibold text-zinc-900'>
                        Stories from the shadows
                    </h2>
                    <p className='mt-2 text-sm text-zinc-600'>
                        Everything you need to know about the Requiem experience
                    </p>
                </div>


                <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                    <article className='flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-lg'>
                        <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-800 to-gray-800 overflow-hidden'>
                            <img
                                src={ar_img1}
                                alt="Grace Ashcroft character render"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1538087219182-f7f5c93db0ca?w=400&h=300&fit=crop"}
                            />
                        </div>
                        <div className='flex flex-col flex-grow mt-4'>
                            <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                                Character Profile
                            </p>
                            <h3 className='mt-2 text-lg font-semibold text-zinc-900'>
                                Who is Grace Ashcroft?
                            </h3>
                            <p className='mt-3 text-sm leading-6 text-zinc-600 flex-grow'>
                                The new protagonist of *Requiem*, voiced by Angela Sant'Albano, Grace's
                                connection to the mysterious Ashford family lies at the heart of the game's
                                conspiracy. Discover her background, her motivations, and her role in
                                the final chapter.
                            </p>
                            <div className='mt-4'>
                                <Button>Read Profile →</Button>
                            </div>
                        </div>
                    </article>


                    <article className='flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-lg'>
                        <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-green-800 to-gray-800 overflow-hidden'>
                            <img
                                src={ar_img2}
                                alt="BSAA soldiers in Requiem"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1536240476400-bc1b8cf3eead?w=400&h=300&fit=crop"}
                            />
                        </div>
                        <div className='flex flex-col flex-grow mt-4'>
                            <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                                Lore Deep Dive
                            </p>
                            <h3 className='mt-2 text-lg font-semibold text-zinc-900'>
                                The Return of the BSAA
                            </h3>
                            <p className='mt-3 text-sm leading-6 text-zinc-600 flex-grow'>
                                The Bioterrorism Security Assessment Alliance plays a crucial role in
                                *Requiem*. We analyze their involvement, the new elite units introduced,
                                and how this connects to the organization's controversial evolution since
                                *Resident Evil Village*.
                            </p>
                            <div className='mt-4'>
                                <Button>Explore Lore →</Button>
                            </div>
                        </div>
                    </article>


                    <article className='flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-lg'>
                        <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-purple-800 to-gray-800 overflow-hidden'>
                            <img
                                src={ar_img3}
                                alt="30th Anniversary logo"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=300&fit=crop"}
                            />
                        </div>
                        <div className='flex flex-col flex-grow mt-4'>
                            <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                                Anniversary Special
                            </p>
                            <h3 className='mt-2 text-lg font-semibold text-zinc-900'>
                                Celebrating 30 Years of Resident Evil
                            </h3>
                            <p className='mt-3 text-sm leading-6 text-zinc-600 flex-grow'>
                                From the Babymetal collaboration to the Universal Studios Japan attraction,
                                discover how *Requiem* is honoring three decades of survival horror. Plus,
                                a guide to all the exclusive 30th-anniversary merchandise.
                            </p>
                            <div className='mt-4'>
                                <Button>Celebrate →</Button>
                            </div>
                        </div>
                    </article>


                    <article className='flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-lg'>
                        <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-blue-800 to-gray-800 overflow-hidden'>
                            <img
                                src={ar_img4}
                                alt="Voice acting recording session"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516245834210-c4c142785335?w=400&h=300&fit=crop"}
                            />
                        </div>
                        <div className='flex flex-col flex-grow mt-4'>
                            <p className='text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                                Localization
                            </p>
                            <h3 className='mt-2 text-lg font-semibold text-zinc-900'>
                                Behind the Voices of Requiem
                            </h3>
                            <p className='mt-3 text-sm leading-6 text-zinc-600 flex-grow'>
                                An inside look at the massive voice production for *Requiem*. Learn about
                                the challenges of recording in over ten languages, the addition of Latin
                                American Spanish, and how the cast brought these iconic characters to life.
                            </p>
                            <div className='mt-4'>
                                <Button>Read Interview →</Button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
};


export default ArticlePage;