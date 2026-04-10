import Button from '../../components/Button';
import hm_img1 from '/src/assets/hm_img1.png';
import hm_img2 from '/src/assets/hm_img2.png';
import hm_img3 from '/src/assets/hm_img3.png';
import hm_img4 from '/src/assets/hm_img4.png';

const HomePage = () => {
    return (
        <div className='flex w-full flex-col gap-6'>
            <section className='border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
                    <div>
                        <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                            The Final Chapter
                        </p>
                        <h1 className='max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl'>
                            Resident Evil: Requiem
                        </h1>
                        <p className='mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base'>
                            Marking the ninth mainline entry in the legendary series, *Requiem* follows the naming convention
                            established with *Resident Evil 7: Biohazard*. Experience the culmination of survival horror
                            where you can switch between first and third-person perspectives at any moment. Face new horrors
                            and uncover the truth behind the Ashford legacy.
                        </p>
                        <div className='mt-6'>
                            <Button to='/about' variant='primary'>
                                Begin Your Survival
                            </Button>
                        </div>
                    </div>


                    <div className='rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6'>
                        <div className='flex min-h-65 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-900 to-black overflow-hidden'>
                            <img
                                src={hm_img1}
                                alt="Resident Evil Requiem cover art"
                                className="w-full h-full object-cover rounded-[1.25rem]"
                            />
                        </div>
                    </div>
                </div>
            </section>


            <section className='border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='mb-6 text-center'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                        The Requiem Experience
                    </p>
                    <h2 className='mt-2 text-2xl font-semibold text-zinc-900'>
                        A new standard in survival horror
                    </h2>
                    <p className='mt-2 text-sm text-zinc-600 max-w-2xl mx-auto'>
                        The most ambitious Resident Evil yet, featuring groundbreaking features
                    </p>
                </div>
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                    <div className='rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-transform hover:scale-105'>
                        <p className='text-2xl font-bold text-zinc-900'>9th</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Mainline Entry
                        </p>
                    </div>
                    <div className='rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-transform hover:scale-105'>
                        <p className='text-2xl font-bold text-zinc-900'>Dual</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Perspective Modes
                        </p>
                    </div>
                    <div className='rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-transform hover:scale-105'>
                        <p className='text-2xl font-bold text-zinc-900'>Capcom</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Developer
                        </p>
                    </div>
                    <div className='rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 transition-transform hover:scale-105'>
                        <p className='text-2xl font-bold text-zinc-900'>30th</p>
                        <p className='mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500'>
                            Anniversary Title
                        </p>
                    </div>
                </div>
            </section>


            <section className='border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8'>
                <div className='mb-6 text-center'>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500'>
                        Key Features
                    </p>
                    <h2 className='mt-2 text-2xl font-semibold text-zinc-900'>
                        Discover what makes Requiem unforgettable
                    </h2>
                    <p className='mt-2 text-sm text-zinc-600 max-w-2xl mx-auto'>
                        A terrifying journey through the legacy of the Ashford family
                    </p>
                </div>
                <div className='grid gap-6 md:grid-cols-3'>
                    <article className='flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-lg'>
                        <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-red-800 to-gray-800 overflow-hidden'>
                            <img
                                src={hm_img2}
                                alt="Grace Ashcroft, the new protagonist"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&h=300&fit=crop"}
                            />
                        </div>
                        <div className='flex flex-col flex-grow mt-4'>
                            <h3 className='text-lg font-semibold text-zinc-900'>
                                New Protagonist: Grace Ashcroft
                            </h3>
                            <p className='mt-3 text-sm leading-6 text-zinc-600 flex-grow'>
                                Voiced by Angela Sant'Albano in English and Shihori Kanjiya in Japanese,
                                Grace Ashcroft takes center stage. Joined by returning legends Leon S. Kennedy
                                (Nick Apostolides) and Sherry Birkin (Eden Riegel), uncover a conspiracy tied
                                to the mysterious Ashford bloodline.
                            </p>
                            <div className='mt-4'>
                                <Button variant='primary'>Meet the Cast</Button>
                            </div>
                        </div>
                    </article>


                    <article className='flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-lg'>
                        <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-green-800 to-gray-800 overflow-hidden'>
                            <img
                                src={hm_img3}
                                alt="Victor Gideon, the antagonist"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop"}
                            />
                        </div>
                        <div className='flex flex-col flex-grow mt-4'>
                            <h3 className='text-lg font-semibold text-zinc-900'>
                                A New Antagonist: Victor Gideon
                            </h3>
                            <p className='mt-3 text-sm leading-6 text-zinc-600 flex-grow'>
                                Antony Byrne brings to life Victor Gideon, a figure connected to the
                                resurgence of bioweapon threats. Alongside the mysterious "Umber Eyes" and
                                "The Commander", Requiem introduces a rogues' gallery of terrifying new enemies.
                            </p>
                            <div className='mt-4'>
                                <Button variant='primary'>Know Your Enemy</Button>
                            </div>
                        </div>
                    </article>


                    <article className='flex flex-col rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 transition-all hover:shadow-lg'>
                        <div className='flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-purple-800 to-gray-800 overflow-hidden'>
                            <img
                                src={hm_img4}
                                alt="Resident Evil Requiem key art"
                                className="w-full h-full object-cover"
                                onError={(e) => e.target.src = "https://images.unsplash.com/photo-1580237072353-751a8a5b2598?w=400&h=300&fit=crop"}
                            />
                        </div>
                        <div className='flex flex-col flex-grow mt-4'>
                            <h3 className='text-lg font-semibold text-zinc-900'>
                                30th Anniversary Celebration
                            </h3>
                            <p className='mt-3 text-sm leading-6 text-zinc-600 flex-grow'>
                                As a landmark 30th-anniversary title, *Requiem* features collaborations with
                                Babymetal and Universal Studios Japan. It introduces the ability to switch
                                perspectives at any time, a first for the series, honoring its legacy while
                                pushing survival horror into the future.
                            </p>
                            <div className='mt-4'>
                                <Button variant='primary'>Celebrate 30 Years</Button>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
};


export default HomePage;  